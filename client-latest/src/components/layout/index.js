import React from "react";
import Navigation from "@/components/navigation";
import Footer from "../footer";

const Layout = ({ children }) => {
  return (
    <>
      <Navigation />
      <main className="h-full w-full">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
