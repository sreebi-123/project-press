import PDFDocument from "pdfkit";
import { Order } from "../model/OrderSchema.js";
import { printingPressunit } from "../model/printingPressunit.js";

export const generateInvoicePDF = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate("walkInCustomer onlineCustomer")
      .lean();

    const shop = await printingPressunit.findById(order.shopId).lean();

    if (!order || !shop) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice-${id}.pdf`
    );

    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(res);

    // Shop Info
    doc.fontSize(20).text(shop.name, { align: "center" });
    doc.fontSize(12).text(shop.address, { align: "center" });
    doc.text(`Phone: ${shop.phone}`, { align: "center" });
    doc.moveDown();

    // Invoice Header
    doc.fontSize(18).text("INVOICE", { align: "center", underline: true });
    doc.moveDown();

    // Invoice Metadata
    doc.fontSize(12);
    doc.text(`Invoice ID: ${order._id}`);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`);
    doc.moveDown();

    // Customer Info
    const customer = order.walkInCustomer || order.onlineCustomer || {};
    doc.text(`Customer Name: ${customer.name || "-"}`);
    doc.text(`Customer Phone: ${customer.phone || "-"}`);
    doc.moveDown();

    // Order Info
    doc.text(`Job Type: ${order.jobType}`);
    doc.text(`Order Type: ${order.orderType}`);
    doc.moveDown();

    // Work Description
    if (order.billingDetails?.workDescription) {
      doc.font("Helvetica-Bold").text("Work Description:", { underline: true });
      doc.font("Helvetica").text(order.billingDetails.workDescription);
      doc.moveDown();
    }

    // Charges Table
    if (order.billingDetails?.charges?.length > 0) {
      doc.font("Helvetica-Bold").text("Charges:", { underline: true });
      doc.moveDown(0.5);

      // Table Header
      doc.font("Helvetica-Bold").text("Label", 50, doc.y, { continued: true });
      doc.text("Amount (INR)", 400, doc.y, { align: "right" });
      doc.moveDown(0.5);

      // Charges Rows (Fixing alignment)
      doc.font("Helvetica");
      order.billingDetails.charges.forEach((item) => {
        const y = doc.y;
        doc.text(item.label, 50, y);
        doc.text(`${Number(item.amount).toLocaleString("en-IN")}`, 400, y, { align: "right" });
      });


      // Total
      doc.moveDown();
      doc
        .font("Helvetica-Bold")
        .text(
          `Total: INR ${Number(order.billingDetails.total).toLocaleString("en-IN")}`,
          { align: "right" }
        );
    }

    doc.moveDown();

    // Payment Info
    doc.font("Helvetica").text(`Payment Method: ${order.billingDetails.paymentMethod}`);
    doc.text(`Status: ${order.billingDetails.isPaid ? "Paid" : "Unpaid"}`);

    doc.end();
  } catch (error) {
    console.error("PDF Generation Error:", error);
    res.status(500).json({ message: "Failed to generate PDF" });
  }
};
