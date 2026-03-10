import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../slices/orderSlice";
import { useShopProfileQuery } from "../slices/shopSlice";
import { useDownloadInvoicePDFMutation } from "../slices/pdfSlice";
import { useReactToPrint } from "react-to-print";

const InvoicePage = () => {
  const { id } = useParams();
  const invoiceRef = useRef();

  const { data: order, isLoading } = useGetOrderByIdQuery(id);
  const { data: shop, isLoading: isShopLoading } = useShopProfileQuery();
  const [downloadInvoicePDF] = useDownloadInvoicePDFMutation();

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: `Invoice_${id}`,
  });

  const handleDownloadBackendPDF = async () => {
    try {
      const blob = await downloadInvoicePDF(id).unwrap();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice-${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (error) {
      console.error("RTK Query download error:", error);
      alert("Failed to download invoice.");
    }
  };

  if (isLoading || isShopLoading || !order || !shop) {
    return <div className="text-center mt-8">Loading invoice...</div>;
  }

  const billing = order.billingDetails;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md mt-6 rounded text-black">
      {/* PDF / Print Content */}
      <div id="invoice" ref={invoiceRef} className="min-h-screen bg-white p-6">
        {/* Shop Logo */}
        {shop.logo && (
          <div className="flex justify-center mb-4 ">
            <img
              src={`http://localhost:3000/uploads/${shop.logo}`}
              // crossOrigin="anonymous"
              alt="Shop Logo"
              className="h-16 object-contain"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
        )}

        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold mb-1">{shop.name}</h2>
          <p>{shop.address}</p>
          <p>Phone: {shop.phone}</p>
        </div>

        <h2 className="text-2xl font-bold text-center mb-4">INVOICE</h2>

        {/* Invoice Meta */}
        <div className="mb-6 text-sm text-gray-700">
          <p><strong>Invoice ID:</strong> {order._id}</p>
          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>

        {/* Customer & Order Info */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="font-semibold mb-1">Customer Info</h4>
            <p><strong>Name:</strong> {order.walkInCustomer?.name || order.onlineCustomer?.name || "-"}</p>
            <p><strong>Phone:</strong> {order.walkInCustomer?.phone || "-"}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Order Info</h4>
            <p><strong>Job Type:</strong> {order.jobType}</p>
            <p><strong>Order Type:</strong> {order.orderType}</p>
          </div>
        </div>

        {/* Work Description */}
        {billing?.workDescription && (
          <div className="mb-4">
            <h4 className="font-semibold mb-1">Work Description</h4>
            <p>{billing.workDescription}</p>
          </div>
        )}

        {/* Charges Table */}
        <h4 className="font-semibold mb-2">Charges</h4>
        <table className="w-full border text-sm mb-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-2 border">#</th>
              <th className="text-left p-2 border">Label</th>
              <th className="text-right p-2 border">Amount</th>
            </tr>
          </thead>
          <tbody>
            {billing.charges.map((item, index) => (
              <tr key={index}>
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{item.label}</td>
                <td className="p-2 border text-right">
                  <span className="inline-block mb-1 mr-1">₹</span>
                  {Number(item.amount).toLocaleString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total */}
        <div className="text-right font-bold text-lg mb-2">
          Total: ₹ {Number(billing.total).toLocaleString("en-IN")}
        </div>

        {/* Payment Info */}
        <p><strong>Payment Method:</strong> {billing.paymentMethod}</p>
        <p><strong>Status:</strong> {billing.isPaid ? "Paid" : "Unpaid"}</p>
      </div>

      {/* Buttons */}
      <div className="text-right mt-4 space-x-2 print:hidden">
        <button
          onClick={handlePrint}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 cursor-pointer"
        >
          Print Invoice
        </button>
        <button
          onClick={handleDownloadBackendPDF}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default InvoicePage;
