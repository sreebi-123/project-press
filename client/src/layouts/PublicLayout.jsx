import { Outlet ,ScrollRestoration} from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";

const PublicLayout = () => {
  return (
    <div>
      <Header />
      <ToastContainer position="bottom-right" />
      <main className=" pt-24 bg-stone-50 min-h-screen flex justify-center items-center">
        <Outlet />
        <ScrollRestoration />
      </main>

      <Footer />
    </div>
  );
};

export default PublicLayout;
