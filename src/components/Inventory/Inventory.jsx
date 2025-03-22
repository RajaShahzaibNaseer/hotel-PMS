import { useState, useEffect } from "react";
import { toFormData } from "axios";
import { Navigate, useNavigate, Link, Routes, Route } from "react-router-dom";

import StockOnHand from "./StockOnHand";
import PurchaseOrders from "./PurchaseOrders";
import Setup from "./Setup";
import StockRequests from "./StockRequests";
import StockTransfer from "./StockTransfer";
import StockTakes from "./StockTakes";

const Inventory = () => {
  
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState(<StockOnHand />);
  const [activePage, setActivePage] = useState("Blocks");

  const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false); // Toggle state for nav

    return (
      <>
        {/* Hamburger Button */}
        <button
          className="lg:hidden fixed top-5 left-3 z-50 py-1 px-2 bg-gray-800 text-white rounded-md"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
        
        <nav className={`fixed top-0 left-0 w-64 p-5 flex flex-col items-center border-r border-gray-700 bg-gray-900 shadow-lg transform ${
          isOpen ? "translate-x-0 h-full" : "-translate-x-full"
        } transition-transform lg:relative lg:translate-x-0`}
        >
          <h2 className="text-xl font-semibold">Welcome, Admin</h2>
          
          <hr className="border-gray-700 w-full my-4" />
          
          {/* Navigation Buttons */}
          <div>
            {routes.map(({ title, component }) => (
              <button
                key={title}
                className={`w-full min-w-32 mt-2 py-2 ${activePage === title ? "bg-gray-700" : "bg-gray-800 hover:bg-gray-700"} rounded-md text-white font-medium transition`}
                onClick={() => updatePage(component, title)}
              >
                {title}
              </button>
            ))}
            <button 
              className="w-full mt-2 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-white font-medium transition"
              onClick={() => navigate('/navigator')}
              >
                  Go Back
            </button>
          </div>
        </nav>
      </>
    );
  };

  const updatePage = (component, title) => {
    setSelectedPage(component)
    setActivePage(title)
  }
  const routes = [
    { title: "Stock On Hand", url: "/stock_on_hand", component: <StockOnHand /> },
    { title: "Purchase Orders", url: "/purchase_orders", component: <PurchaseOrders /> },
    { title: "Stock Requests", url: "/stock_requests", component: <StockRequests /> },
    { title: "Stock Transfers", url: "/stock_transfer", component: <StockTransfer /> },
    { title: "Stock Takes", url: "/stock_takes", component: <StockTakes /> },
    { title: "Setup", url: "/setup", component: <Setup /> },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <NavBar />
      {/* Main Content Area */}
      <div className="flex-1 p-6">
        {selectedPage}
      </div>
      
    </div>
  );
};

export default Inventory;