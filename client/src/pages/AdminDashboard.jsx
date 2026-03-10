import { FaMoneyBillWave, FaShoppingCart, FaUsers } from "react-icons/fa";
import KpiCard from "../components/KpiCard";
import SalesLineChart from "../components/SalesLineChart";

const AdminDashboard = () => {
  return (
    <div className=" md:p-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard
          title="Sales"
          icon={FaShoppingCart}
          todayValue={8}
          monthValue={122}
          growth={{ today: 12.5, month: 9.8 }}
        />

        <KpiCard
          title="Revenue"
          icon={FaMoneyBillWave}
          todayValue={`₹4,250`}
          monthValue={`₹98,200`}
          growth={{ today: -3.2, month: 6.1 }}
        />

        <KpiCard
          title="Customers"
          icon={FaUsers}
          todayValue={3}
          monthValue={45}
          growth={{ today: 0.0, month: 2.5 }}
        />
      </div>
      <SalesLineChart />
    </div>
  );
};

export default AdminDashboard;
