import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-full justify-between min-h-full">
      <Header />
      <div className="flex">
        <main style={{ flexGrow: 1 }} className="py-6 pb-8">
          <div style={{ paddingBottom: 40 }} className="container">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
