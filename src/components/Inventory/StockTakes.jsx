import { useState, useEffect } from "react";
import { API_URL } from "../../config";

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

const StockTable = ({ stockDetails, onCountChange }) => {
  return (
    <div className="m-6 max-h-[650px] overflow-y-scroll">
      <table className="w-full border border-gray-700">
        <thead>
          <tr className="bg-gray-800">
            <th className="p-2 border border-gray-700">Item ID</th>
            <th className="p-2 border border-gray-700">Item Name</th>
            <th className="p-2 border border-gray-700">Unit</th>
            <th className="p-2 border border-gray-700">Expected</th>
            <th className="p-2 border border-gray-700">Count</th>
            <th className="p-2 border border-gray-700">Stock Diff</th>
          </tr>
        </thead>
        <tbody>
          {stockDetails && stockDetails.map((row, index) => {
            const stockDiff = (row.counted || 0) - row.quantity;
            return (
              <tr key={index} className="border-t border-gray-700">
                <td className="p-2">{row.item_id}</td>
                <td className="p-2">{row.item_name}</td>
                <td className="p-2">{row.unit}</td>
                <td className="p-2 text-center">{row.quantity}</td>
                <td className="p-2 flex items-center gap-2 justify-center">
                  <input
                    type="number"
                    className="w-16 border border-gray-400 text-center p-1 rounded"
                    value={row.counted || ''}
                    onChange={(e) => onCountChange(row.id, parseFloat(e.target.value))}
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
};

const NewStockTakeForm = ({ onCancel, onSave }) => {
  const [location, setLocation] = useState('');
  const [recordedBy, setRecordedBy] = useState('');
  const [stockId, setStockId] = useState('');
  const [takeDate, setTakeDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ stock_id: stockId, location: location, recorded_by: recordedBy, taken_at: takeDate, status: 'incomplete' });
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-200 mb-4">Add New Stock Take</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="stockId" className="block text-gray-300 text-sm font-bold mb-2">
            Stock ID:
          </label>
          <input
            type="text"
            id="stockId"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
            value={stockId}
            onChange={(e) => setStockId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-gray-300 text-sm font-bold mb-2">
            Location:
          </label>
          <input
            type="text"
            id="location"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="recordedBy" className="block text-gray-300 text-sm font-bold mb-2">
            Recorded By:
          </label>
          <input
            type="text"
            id="recordedBy"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
            value={recordedBy}
            onChange={(e) => setRecordedBy(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="takeDate" className="block text-gray-300 text-sm font-bold mb-2">
            Date:
          </label>
          <input
            type="date"
            id="takeDate"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
            value={takeDate}
            onChange={(e) => setTakeDate(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="bg-gray-600 px-4 py-2 rounded text-white hover:bg-gray-500"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

const StockTakes = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStockTake, setSelectedStockTake] = useState(null);
  const [stockTakesData, setStockTakesData] = useState([]);
  const [stocksData, setStocksData] = useState([]);
  const [stockTakeDetails, setStockTakeDetails] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const fetchStockTakes = async () => {
    try {
      const response = await fetch(`${API_URL}/stocktake`);
      const jsonData = await response.json();
      setStockTakesData(jsonData);
    } catch (error) {
      console.error("Failed to fetch stock takes:", error);
    }
  };

  const fetchStocks = async () => {
    try {
      const response = await fetch(`${API_URL}/stocks`);
      const jsonData = await response.json();
      setStocksData(jsonData);
    } catch (error) {
      console.error("Failed to fetch stocks:", error);
    }
  };

  useEffect(() => {
    fetchStockTakes();
    fetchStocks();
  }, []);

  useEffect(() => {
    fetchStockTakes();
    fetchStocks();
  }, [refresh]);

  const getStockDetailsForTake = (stockTakeId) => {
    return stocksData.filter(stock => stock.id === stockTakeId);
  };

  const handleOpenModal = (stockTake) => {
    setSelectedStockTake(stockTake);
    const details = getStockDetailsForTake(stockTake.stock_id);
    setStockTakeDetails(details.map(item => ({ ...item, counted: null })));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStockTake(null);
    setStockTakeDetails([]);
  };

  const handleCountChange = (stockId, value) => {
    setStockTakeDetails(prevDetails =>
      prevDetails.map(item =>
        item.id === stockId ? { ...item, counted: value } : item
      )
    );
  };

  const handleSaveNewStockTake = async (newTake) => {
    try {
      const response = await fetch(`${API_URL}/stocktake`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTake),
      });
      
      const responseData = await response.json(); // Always parse the response
      
      if (!response.ok) {
        console.error('Failed to save new stock take:', responseData);
        // Show error to user
        return;
      }
      
      console.log('Successfully saved:', responseData);
      setRefresh(prev => !prev); // Force refresh
      setIsAdding(false);
      
    } catch (error) {
      console.error('Error saving new stock take:', error);
      // Show error to user
    }
  };

  const takeHeader = ["Stock Take No.", "For Location", "Date", "Recorded By", "Status", "Actions"];

  const filteredStockTakes = () => {
    if (activeTab === 0) {
      return stockTakesData.filter(take => take.status === "incomplete");
    } else if (activeTab === 1) {
      return stockTakesData.filter(take => take.status === "under review");
    } else if (activeTab === 2) {
      return stockTakesData.filter(take => take.status === "complete");
    }
    return stockTakesData;
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
              <NewStockTakeForm onCancel={() => setIsAdding(false)} onSave={handleSaveNewStockTake} />
            ) : (
              <button
                onClick={() => setIsAdding(true)}
                className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 mb-4"
              >
                + Add New Stock Take
              </button>
            )}
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
                {filteredStockTakes().map((take) => (
                  <tr key={take.id} className="border border-gray-700">
                    <td className="p-2 border border-gray-700">{take.id}</td>
                    <td className="p-2 border border-gray-700">{take.location}</td>
                    <td className="p-2 border border-gray-700">{new Date(take.taken_at).toLocaleDateString()}</td>
                    <td className="p-2 border border-gray-700">{take.recorded_by}</td>
                    <td className={`p-2 border border-gray-700 capitalize ${
                      take.status === 'complete' ? 'text-green-500' :
                      take.status === 'under review' ? 'text-yellow-500' :
                      'text-red-500'
                    }`}>{take.status}</td>
                    <td className="p-2 border border-gray-700">
                      <button
                        className="bg-blue-500 px-2 py-1 rounded w-full"
                        onClick={() => handleOpenModal(take)}
                      >
                        Open
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {activeTab === 1 && selectedStockTake && (
          <>
            <StockTable stockDetails={stockTakeDetails} onCountChange={handleCountChange} />
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
              {filteredStockTakes().map((take) => (
                <tr key={take.id} className="border border-gray-700">
                  <td className="p-2 border border-gray-700">{take.id}</td>
                  <td className="p-2 border border-gray-700">{take.location}</td>
                  <td className="p-2 border border-gray-700">{new Date(take.taken_at).toLocaleDateString()}</td>
                  <td className="p-2 border border-gray-700">{take.recorded_by}</td>
                  <td className={`p-2 border border-gray-700 capitalize ${
                    take.status === 'complete' ? 'text-green-500' :
                    take.status === 'under review' ? 'text-yellow-500' :
                    'text-red-500'
                  }`}>{take.status}</td>
                  <td className="p-2 border border-gray-700">
                    <button
                      className="bg-blue-500 px-2 py-1 rounded w-full"
                      onClick={() => handleOpenModal(take)}
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
        {selectedStockTake && (
          <>
            <div className="flex justify-center gap-10 m-10">
              <h3 className="text-lg mb-4"><span className="font-extrabold">Date:</span><br/> {new Date(selectedStockTake.taken_at).toLocaleDateString()}</h3>
              <h3 className="text-lg mb-4"><span className="font-extrabold">Stock Take Number / Reference:</span><br/> {selectedStockTake.id}</h3>
              <h3 className="text-lg mb-4"><span className="font-extrabold">For Location:</span><br/> {selectedStockTake.location}</h3>
              <h3 className="text-lg mb-4"><span className="font-extrabold">Recorded By:</span><br/> <span className="font-extrabold">{selectedStockTake.recorded_by}</span></h3>
            </div>
            {stockTakeDetails.length > 0 ? (
              <StockTable stockDetails={stockTakeDetails} onCountChange={handleCountChange} />
            ) : (
              <p className="text-gray-400 text-center">No stock details found for this stock take.</p>
            )}
          </>
        )}
      </Modal>
    </div>
  );
};

export default StockTakes;