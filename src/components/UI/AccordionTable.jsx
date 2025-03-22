import React, { useState } from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-3/4" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-semibold text-gray-200 mb-4">{title}</h2>
            {children}
            <button onClick={onClose} className="mt-4 bg-red-600 px-4 py-2 rounded text-white hover:bg-red-500">
            Close
            </button>
        </div>
    </div>
  );
}


export default function AccordionTable({ tableData, tableHeaders }) {
  const [openCategories, setOpenCategories] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);

  const toggleCategory = (category) => {
    setOpenCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const isCategoryOpen = (category) => openCategories.includes(category);

  return (
    <div className="w-full rounded-lg overflow-hidden border border-gray-700 shadow-lg">
      <table className="w-full border-collapse table-fixed">
        <thead>
          <tr className="bg-gray-800 text-gray-200">
            {tableHeaders.map((header, index) => (
              <th key={index} className="px-4 py-3 text-center font-semibold border-b border-gray-700">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((section, index) => (
            <React.Fragment key={index}>
              <tr
                className="bg-gray-800 hover:bg-gray-700 transition-all duration-200 cursor-pointer border-b-2 border-b-gray-700"
                onClick={() => toggleCategory(index)} >
                <td colSpan={tableHeaders.length} className="p-4 font-medium text-gray-200 mb-2">
                  {isCategoryOpen(index) ? "▲" : "▼"} {section.category}
                </td>
              </tr>
              {/* Stocks */}
              {isCategoryOpen(index) &&
                section.items.map((item, subIndex) => (
                  <tr key={subIndex} className="text-center bg-gray-900 hover:bg-gray-800 border-b border-gray-800">
                    <td className="text-center px-4 py-3 pl-10 text-gray-300 border-r border-gray-800">{item.name}</td>
                    <td className="text-center px-4 py-3 text-gray-300 border-r border-gray-800">{item.details}</td>
                    <td className="text-center px-4 py-3 text-gray-300 font-medium">
                      <span className="bg-blue-900 text-blue-200 px-3 py-1 rounded-md">{item.price * item.quantity} KES</span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSelectedStock(item)}
                        className="bg-blue-700 hover:bg-blue-600 text-gray-200 px-3 py-1 rounded shadow-md"
                      >
                        📈 History
                      </button>
                    </td>
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Stock History Modal */}
      <Modal isOpen={!!selectedStock} onClose={() => setSelectedStock(null)} title={`${selectedStock?.name} Stock Movement`}>
        <div className="overflow-x-auto rounded-md">
            <table className="w-full border-collapse">
            <thead>
                <tr className="bg-gray-700 text-center">
                    <th className="p-3 text-gray-300">Date</th>
                    <th className="p-3 text-gray-300">Location</th>
                    <th className="p-3 text-gray-300">Opening Balance</th>
                    <th className="p-3 text-gray-300">Out</th>
                    <th className="p-3 text-gray-300">In</th>
                    <th className="p-3 text-gray-300">Closing Balance</th>
                    <th className="p-3 text-gray-300">Unit</th>
                    <th className="p-3 text-gray-300">Status</th>
                    <th className="p-3 text-gray-300">Movement Type</th>
                    <th className="p-3 text-gray-300">Source</th>
                    <th className="p-3 text-gray-300">Other Details</th>
                    <th className="p-3 text-gray-300">Staff</th>
                </tr>
            </thead>
            <tbody>
                {selectedStock?.history.map((record, index) => (
                    <tr key={index} className="border-b border-gray-600 text-center">
                        <td className="p-3 text-gray-300">{record.date}</td>
                        <td className="p-3 text-gray-300">{record.location}</td>
                        <td className="p-3 text-gray-300">{record.openingBalance}</td>
                        <td className="p-3 text-gray-300">{record.out}</td>
                        <td className="p-3 text-gray-300">{record.in}</td>
                        <td className="p-3 text-gray-300">{record.closingBalance}</td>
                        <td className="p-3 text-gray-300">{record.unit}</td>
                        <td className="p-3 text-gray-300">{record.status}</td>
                        <td className="p-3 text-gray-300">{record.movementType}</td>
                        <td className="p-3 text-gray-300">{record.source}</td>
                        <td className="p-3 text-gray-300">{record.otherDetails}</td>
                        <td className="p-3 text-gray-300">{record.staff}</td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
        
      </Modal>
    </div>
  );
}
