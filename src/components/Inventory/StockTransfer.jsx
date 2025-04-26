import { useEffect, useState } from "react";
import { API_URL } from "../../config";
import React from "react";

const OrderForm = ({
  formData,
  handleFormChange,
  calculateTotal,
  onCancel,
  onSubmit,
}) => {
  return (
    <div className="mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm mb-1">Item ID</label>
          <input
            type="text"
            name="item_id"
            value={formData.item_id}
            onChange={handleFormChange}
            className="w-full p-2 bg-gray-700 rounded"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Destination</label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleFormChange}
            onBlur={calculateTotal}
            className="w-full p-2 bg-gray-700 rounded"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Unit</label>
          <input
            type="text"
            name="unit_value"
            value={formData.unit_value}
            onChange={handleFormChange}
            onBlur={calculateTotal}
            className="w-full p-2 bg-gray-700 rounded"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Cost per Unit</label>
          <input
            type="text"
            name="cost_per_unit"
            value={formData.cost_per_unit}
            onChange={handleFormChange}
            onBlur={calculateTotal}
            className="w-full p-2 bg-gray-700 rounded"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Opening Balance</label>
          <input
            type="text"
            name="opening_balance"
            value={formData.opening_balance}
            onChange={handleFormChange}
            className="w-full p-2 bg-gray-700 rounded"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Closing Balance</label>
          <input
            type="text"
            name="closing_balance"
            value={formData.closing_balance}
            onChange={handleFormChange}
            onBlur={calculateTotal}
            className="w-full p-2 bg-gray-700 rounded"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Transferred Quantity</label>
          <input
            type="text"
            name="transferred_quantity"
            value={formData.transferred_quantity}
            onChange={handleFormChange}
            onBlur={calculateTotal}
            className="w-full p-2 bg-gray-700 rounded"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Total</label>
          <input
            type="text"
            name="total"
            value={formData.total}
            onChange={handleFormChange}
            onBlur={calculateTotal}
            className="w-full p-2 bg-gray-700 rounded"
            readOnly
          />
        </div>
      </div>

      <div className="flex justify-end mt-4 gap-2">
        <button
          onClick={onCancel}
          className="bg-gray-600 px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          className="bg-green-500 px-4 py-2 rounded"
        >
          Save Order
        </button>
      </div>
    </div>
  );
};

const StockTransfer = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTransferForm, setnewTransferForm] = useState({
    item_id: "",
    opening_balance: "",
    cost_per_unit: "",
    unit_value: "",
    transferred_quantity: "",
    destination: "",
    closing_balance: "",
    total: "",
    status: "unreceived",
  });
  const [refresh, setRefresh] = useState(true);
  const [transferData, setTransferData] = useState([]);

  const mergeJson = (stockData, itemsData) => {
    return stockData.map((stockItem) => {
      const matchedItem = itemsData.find(
        (item) => item.id === stockItem.item_id
      );
      return {
        ...stockItem,
        item_name: matchedItem?.name || "Unknown",
        item_price: matchedItem?.price || 0,
        item_barcode: matchedItem?.barcode || "",
        item_description: matchedItem?.description || "",
        item_reorder_level: matchedItem?.reorder_level || 0,
      };
    });
  };

  //fetching data from backend
  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/stocktransfer`);
      const jsonData = await response.json();

      const itemsResponse = await fetch(`${API_URL}/items`);
      const itemsData = await itemsResponse.json();

      const mergedData = mergeJson(jsonData, itemsData);
      const unreceivedTransfers = mergedData.filter(
        (transfer) => transfer.status === "unreceived"
      );
      setTransferData(mergedData);
      console.log(mergedData);
    } catch (error) {
      console.error("Failed to fetch stock data:", error);
    }
  };

  //using the fetch function
  useEffect(() => {
    if (refresh) {
      fetchData();
      setRefresh(false);
    }
  }, [refresh]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setnewTransferForm({
      ...newTransferForm,
      [name]: value,
    });
  };

  // Calculate total
  const calculateTotal = () => {
    const price = parseFloat(newTransferForm.cost_per_unit) || 0;
    const quantity = parseFloat(newTransferForm.transferred_quantity) || 0;
    const total = (price * quantity).toFixed(2);

    setnewTransferForm({
      ...newTransferForm,
      total,
    });
  };

  // Handle form submission
  const handleAddNewOrder = async () => {
    try {
      const response = await fetch(`${API_URL}/stocktransfer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTransferForm),
      });

      if (response.ok) {
        console.log("New transfer added successfully!");
        // Reset the form
        setnewTransferForm({
          item_id: "",
          opening_balance: "",
          cost_per_unit: "",
          unit_value: "",
          transferred_quantity: "",
          destination: "",
          closing_balance: "",
          total: "",
          status: "unreceived",
        });

        // Close the form
        setIsAdding(false);
        setRefresh(true); // Refresh the transfer list
      } else {
        console.error("Failed to add new transfer:", response.status);
        // Optionally handle error feedback to the user
      }
    } catch (error) {
      console.error("Error adding new transfer:", error);
      // Optionally handle error feedback to the user
    }
  };

  const transferHeader = [
    "Transfer No.",
    "Item",
    "Destination",
    "Opening Balance",
    "Closing Balance",
    "Transferred Quantity",
    "Unit",
    "Total",
  ];

  return (
    <div className="bg-gray-900 text-white p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Stock Transfers</h2>

      {/* Content */}
      <div className="mt-4">
        <div>
          {isAdding ? (
            <OrderForm
              formData={newTransferForm}
              handleFormChange={handleFormChange}
              calculateTotal={calculateTotal}
              onCancel={() => setIsAdding(false)}
              onSubmit={handleAddNewOrder}
            />
          ) : (
            <button
              onClick={() => setIsAdding(true)}
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 mb-4"
            >
              + Add New Transfer
            </button>
          )}
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-700">
              <thead>
                <tr className="bg-gray-800">
                  {transferHeader.map((header, index) => (
                    <th key={index} className="p-2 border border-gray-700">
                      {header}
                    </th>
                  ))}
                  <th className="p-2 border border-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {transferData.map((transfer, index) => (
                  <tr key={index} className="bg-gray-800">
                    <td className="p-2 border border-gray-700">
                      {transfer.id}
                    </td>
                    <td className="p-2 border border-gray-700">
                      {transfer.item_name}
                    </td>
                    <td className="p-2 border border-gray-700">
                      {transfer.destination}
                    </td>
                    <td className="p-2 border border-gray-700">
                      {transfer.opening_balance}
                    </td>
                    <td className="p-2 border border-gray-700">
                      {transfer.closing_balance}
                    </td>
                    <td className="p-2 border border-gray-700">
                      {transfer.transferred_quantity}
                    </td>
                    <td className="p-2 border border-gray-700">
                      {transfer.unit_value}
                    </td>
                    <td className="p-2 border border-gray-700">{transfer.total}</td>
                    <td className="p-2 border border-gray-700">
                      <button
                        className={`px-2 py-1 rounded shadow-lg transition w-full ${
                          transfer.closing_balance === 0
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                        onClick={() => {
                          if (transfer.closing_balance === 0) {
                            // Handle "Open" action
                            console.log("Open transfer:", transfer.id);
                          } else {
                            // Handle "Receive" action
                            console.log("Receive transfer:", transfer.id);
                          }
                        }}
                      >
                        {transfer.closing_balance === 0 ? "Open" : "Receive"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockTransfer;