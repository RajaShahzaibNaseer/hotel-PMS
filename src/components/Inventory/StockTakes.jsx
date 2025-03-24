import { useState } from "react";

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
};

const StockTable = ({mockData}) => {
    const [stockData, setStockData] = useState(mockData);
    
      
    const handleCountChange = (index, value) => {
      const updatedData = [...stockData];
      updatedData[index].counted = value ? parseFloat(value) : 0;
      setStockData(updatedData);
    };
  
    return (
        <div className="m-6 max-h-[650px] overflow-y-scroll">
            <table className="w-full border border-gray-700">
                <thead>
                    <tr className="bg-gray-800">
                        <th className="p-2 border border-gray-700">Item</th>
                        <th className="p-2 border border-gray-700">Count</th>
                        <th className="p-2 border border-gray-700">Stock Diff</th>
                    </tr>
                </thead>
                <tbody>
                    {stockData.map((row, index) => {
                        const stockDiff = row.counted - row.expected;
                        return (
                            <tr key={index} className="border-t border-gray-700">
                            <td className="p-2">{row.item}</td>
                            <td className="p-2 flex items-center gap-2 justify-center">
                                <input
                                type="number"
                                className="w-16 border border-gray-400 text-center p-1 rounded"
                                value={row.counted}
                                onChange={(e) => handleCountChange(index, e.target.value)}
                                />
                                {row.unit}
                            </td>
                            <td
                                className={`p-2 text-center ${
                                stockDiff < 0 ? "text-red-500 font-bold" : ""
                                }`}
                            >
                                {stockDiff} {row.unit}
                            </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
  }  

const StockTakes = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [isAdding, setIsAdding] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);

    const takeHeader = ["Stock Take No.", "For Location", "Date", "Created By", "Completed By", "Reconciled By", "Actions"];
    const takeData = [
        ["ST-0001", "Block 1", "2023-06-01", "John Doe", "Jane Smith", ""],
        ["ST-0002", "Block 2", "2023-06-02", "John Doe", "Jane Smith", "Bob Johnson"],
        ["ST-0003", "Block 3", "2023-06-03", "John Doe", "Jane Smith", ""],
    ];

    const modalHeader = ["Item", "Unit Name", "Closing Stock", "Closing Stock Value", "Counted Stock", "Counted Stock Value", "Stock Difference", "Cost Difference", "Auto Reconciled"];

    const modalData = [
        ["Sugar", "Kg", 50, 5000, 10, 6000],
        ["Flour", "Kg", 30, 3000, 30, 4000],
        ["Salt", "Kg", 40, 4000, 40, 5000],
        ["Sugar", "Kg", 50, 5000, 50, 6000],
        ["Flour", "Kg", 30, 3000, 30, 4000],
        ["Salt", "Kg", 40, 4000, 50, 5000],
        ["Sugar", "Kg", 50, 5000, 50, 6000],
        ["Flour", "Kg", 30, 3000, 30, 4000],
        ["Salt", "Kg", 40, 4000, 40, 5000],
    ]

    const mockData = [
        { item: "Amarula", unit: "bottle", counted: 2, expected: 2 },
        { item: "Baileys", unit: "bottle", counted: 1, expected: 2 },
        { item: "Bond 7", unit: "bottle", counted: 3, expected: 3 },
        { item: "Gilbeys Gin", unit: "bottle", counted: 5, expected: 5 },
        { item: "Grants", unit: "bottle", counted: 3, expected: 3 },
        { item: "Jack Daniels", unit: "bottle", counted: 5, expected: 5 },
        { item: "Jameson", unit: "bottle", counted: 3, expected: 3 },
        { item: "Amarula", unit: "bottle", counted: 2, expected: 2 },
        { item: "Baileys", unit: "bottle", counted: 1, expected: 2 },
        { item: "Bond 7", unit: "bottle", counted: 3, expected: 3 },
        { item: "Gilbeys Gin", unit: "bottle", counted: 5, expected: 5 },
        { item: "Grants", unit: "bottle", counted: 3, expected: 3 },
        { item: "Jack Daniels", unit: "bottle", counted: 5, expected: 5 },
        { item: "Jameson", unit: "bottle", counted: 3, expected: 3 },
        { item: "Amarula", unit: "bottle", counted: 2, expected: 2 },
        { item: "Baileys", unit: "bottle", counted: 1, expected: 2 },
        { item: "Bond 7", unit: "bottle", counted: 3, expected: 3 },
        { item: "Gilbeys Gin", unit: "bottle", counted: 5, expected: 5 },
        { item: "Grants", unit: "bottle", counted: 3, expected: 3 },
        { item: "Jack Daniels", unit: "bottle", counted: 5, expected: 5 },
        { item: "Jameson", unit: "bottle", counted: 3, expected: 3 },
        { item: "Amarula", unit: "bottle", counted: 2, expected: 2 },
        { item: "Baileys", unit: "bottle", counted: 1, expected: 2 },
        { item: "Bond 7", unit: "bottle", counted: 3, expected: 3 },
        { item: "Gilbeys Gin", unit: "bottle", counted: 5, expected: 5 },
        { item: "Grants", unit: "bottle", counted: 3, expected: 3 },
        { item: "Jack Daniels", unit: "bottle", counted: 5, expected: 5 },
        { item: "Jameson", unit: "bottle", counted: 3, expected: 3 },
        { item: "Amarula", unit: "bottle", counted: 2, expected: 2 },
        { item: "Baileys", unit: "bottle", counted: 1, expected: 2 },
        { item: "Bond 7", unit: "bottle", counted: 3, expected: 3 },
        { item: "Gilbeys Gin", unit: "bottle", counted: 5, expected: 5 },
        { item: "Grants", unit: "bottle", counted: 3, expected: 3 },
        { item: "Jack Daniels", unit: "bottle", counted: 5, expected: 5 },
        { item: "Jameson", unit: "bottle", counted: 3, expected: 3 },
    ];

  // Open modal and set selected row data
  const handleOpenModal = (rowData) => {
    setSelectedRowData(rowData);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRowData(null);
  };

  return (
    <div className="min-h-full bg-gray-900 text-white p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Stock Takes</h2>

      {/* Tabs */}
      <div className="flex border-b border-gray-700 mb-4">
        <button
          onClick={() => setActiveTab(0)}
          className={`flex-1 py-2 text-center ${
            activeTab === 0 ? "border-b-2 border-blue-500 text-blue-400" : "text-gray-400"
          }`}
        >
          Incomplete
        </button>
        <button
          onClick={() => setActiveTab(1)}
          className={`flex-1 py-2 text-center ${
            activeTab === 1 ? "border-b-2 border-blue-500 text-blue-400" : "text-gray-400"
          }`}
        >
          Under Review
        </button>
        <button
          onClick={() => setActiveTab(2)}
          className={`flex-1 py-2 text-center ${
            activeTab === 2 ? "border-b-2 border-blue-500 text-blue-400" : "text-gray-400"
          }`}
        >
          Completed
        </button>
      </div>

      {/* Content */}
      <div className="mt-4">
        {activeTab === 0 && (
          <>
            {isAdding ? (
              <div className="flex gap-4">
                <p>Adding New Takes</p>
                <button
                  onClick={() => setIsAdding(false)}
                  className="bg-gray-600 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAdding(true)}
                className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 mb-4"
              >
                + Add New Stock Take
              </button>
            )}
          </>
        )}

        {activeTab === 1 && (
        //   <p>Under Review</p>
          <>
            <StockTable mockData={mockData} />
            <div className="flex justify-between">
                <button className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">Reject</button>
                <div className="flex gap-2">
                <button className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300">💾 Save</button>
                <button className="bg-green-500 px-4 py-2 rounded hover:bg-green-600">✔ Complete</button>
                </div>
            </div>
          </>
        )}

        {activeTab === 2 && (
          <table className="w-full border border-gray-700">
            <thead>
              <tr className="bg-gray-800">
                {takeHeader.map((header, index) => (
                  <th key={index} className="p-2 border border-gray-700">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {takeData.map((data, index) => (
                <tr key={index} className="border border-gray-700">
                  {data.map((item, index) => (
                    <td key={index} className={`p-2 border border-gray-700 
                    ${index === data.length - 1 && item !== "" ? "text-green-500" : ""}`}>
                      {index === data.length - 1 && item !== "" ? "✅" : ""} {item}
                    </td>
                  ))}
                  <td className="p-2 border border-gray-700">
                    <button
                      className="bg-blue-500 px-2 py-1 rounded w-full"
                      onClick={() => handleOpenModal(data)}
                    >
                      Open
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Stock Take Details">
        {selectedRowData && (
            <>
                <div className="flex justify-center gap-10 m-10">
                    <h3 className="text-lg mb-4"><span className="font-extrabold">Date:</span><br/> {selectedRowData[2]}</h3>
                    <h3 className="text-lg mb-4"><span className="font-extrabold">Stock Take Number / Reference:</span><br/> {selectedRowData[0]}</h3>
                    <h3 className="text-lg mb-4"><span className="font-extrabold">For Location:</span><br/> {selectedRowData[1]}</h3>
                    <h3 className="text-lg mb-4"><span className="font-extrabold">Stock Takes:</span><br/> 
                        Created By: <span className="font-extrabold">{selectedRowData[3]}</span> <br/> 
                        Completed By: <span className="font-extrabold">{selectedRowData[4]}</span></h3>
                </div>
                <div className="max-h-80 overflow-y-auto"> {/* Limit height and add scrollbar */}
                    <table className="w-full border border-gray-700">
                    <thead>
                        <tr className="bg-gray-700">
                        {modalHeader.map((header, index) => (
                            <th key={index} className="p-2 border border-gray-700 sticky top-0 bg-gray-700">
                            {header}
                            </th>
                        ))}
                        </tr>
                    </thead>
                    <tbody>
                    {modalData.map((data, index) => {
                        const closingStock = data[2];
                        const countedStock = data[4];
                        const closingStockValue = data[3];
                        const countedStockValue = data[5];

                        const stockDiff = countedStock - closingStock;
                        const costDiff = countedStockValue - closingStockValue;
                        const needsReconciliation = closingStock !== countedStock;

                        return (
                            <tr key={index} className="border border-gray-700">
                                {data.map((item, idx) => (
                                    <td key={idx} className="p-2 border border-gray-700">{item}</td>
                                ))}
                                {/* Stock Difference Column */}
                                <td className={`p-2 border border-gray-700 text-center ${stockDiff < 0 ? "text-red-500 font-bold" : ""}`}>
                                    {stockDiff}
                                </td>
                                {/* Cost Difference Column */}
                                <td className={`p-2 border border-gray-700 text-center ${costDiff < 0 ? "text-red-500 font-bold" : ""}`}>
                                    {costDiff}
                                </td>
                                {/* Status Column */}
                                <td className="p-2 border border-gray-700 text-center">
                                    {needsReconciliation ? "✔️" : ""}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                    </table>
                </div>
            </>
        )}
      </Modal>
    </div>
  );
};

export default StockTakes;