import React, { useState } from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-3/4 max-h-[80vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
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

  // Group data by category
  const groupedData = tableData.reduce((acc, item) => {
    const category = item.catagory || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

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
            <th className="px-4 py-3 text-center font-semibold border-b border-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(groupedData).map(([category, items], index) => (
            <React.Fragment key={category}>
              <tr
                className="bg-gray-800 hover:bg-gray-700 transition-all duration-200 cursor-pointer border-b-2 border-b-gray-700 select-none"
                onClick={() => toggleCategory(category)}
              >
                <td colSpan={tableHeaders.length + 1} className="p-4 font-medium text-gray-200">
                  {isCategoryOpen(category) ? "▲" : "▼"} {category}
                  <span className="ml-2 text-gray-400 text-sm">
                    ({items.length > 1 ? `${items.length} records` : `${items.length} record`})
                  </span>
                </td>
              </tr>
              
              {isCategoryOpen(category) && items.map((item, subIndex) => (
                <tr key={`${category}-${subIndex}`} className="text-center bg-gray-900 hover:bg-gray-800 border-b border-gray-800">
                  <td className="px-4 py-3 text-gray-300">{item.item_name}</td>
                  <td className="px-4 py-3 text-gray-300">{item.item_id}</td>
                  <td className="px-4 py-3 text-gray-300">{item.location}</td>
                  <td className="px-4 py-3 text-gray-300">
                    <span className={`px-2 py-1 rounded ${
                      item.status === 'done' ? 'bg-green-900 text-green-200' : 'bg-yellow-900 text-yellow-200'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-300">
                    <span className="bg-blue-900 text-blue-200 px-2 py-1 rounded">
                      {item.value} {item.unit}
                    </span>
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
      <Modal isOpen={!!selectedStock} onClose={() => setSelectedStock(null)} title={`${selectedStock?.item_name} Stock Movement`}>
        <div className="overflow-x-auto rounded-md">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-700 text-center">
                <th className="p-3 text-gray-300">Date</th>
                <th className="p-3 text-gray-300">Location</th>
                <th className="p-3 text-gray-300">Opening</th>
                <th className="p-3 text-gray-300">Out</th>
                <th className="p-3 text-gray-300">In</th>
                <th className="p-3 text-gray-300">Closing</th>
                <th className="p-3 text-gray-300">Unit</th>
                <th className="p-3 text-gray-300">Status</th>
                <th className="p-3 text-gray-300">Type</th>
                <th className="p-3 text-gray-300">Staff</th>
              </tr>
            </thead>
            <tbody>
              {selectedStock && (
                <tr className="border-b border-gray-600 text-center">
                  <td className="p-3 text-gray-300">{new Date(selectedStock.last_updated).toLocaleDateString()}</td>
                  <td className="p-3 text-gray-300">{selectedStock.location}</td>
                  <td className="p-3 text-gray-300">{selectedStock.opening_balance}</td>
                  <td className="p-3 text-gray-300">{selectedStock.stock_out}</td>
                  <td className="p-3 text-gray-300">{selectedStock.stock_in}</td>
                  <td className="p-3 text-gray-300">{selectedStock.closing_balance}</td>
                  <td className="p-3 text-gray-300">{selectedStock.unit}</td>
                  <td className="p-3 text-gray-300">{selectedStock.status}</td>
                  <td className="p-3 text-gray-300">{selectedStock.movement_type}</td>
                  <td className="p-3 text-gray-300">{selectedStock.staff}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-200">
          <div>
            <h3 className="font-semibold mb-2">Additional Information</h3>
            <p><span className="text-gray-400">Source:</span> {selectedStock?.source}</p>
            <p><span className="text-gray-400">Category:</span> {selectedStock?.catagory}</p>
            <p><span className="text-gray-400">Quantity:</span> {selectedStock?.quantity}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Value Information</h3>
            <p><span className="text-gray-400">Unit Value:</span> {selectedStock?.value}</p>
            <p><span className="text-gray-400">Total Value:</span> {(selectedStock?.value || 0) * (selectedStock?.quantity || 1)}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}