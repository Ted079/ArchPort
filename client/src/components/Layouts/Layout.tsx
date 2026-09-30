import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="px-4 sm:px-6 md:px-8 lg:px-16">
        <Outlet />
      </main>
      <Footer/>
    </>
  );
};

export default Layout;
