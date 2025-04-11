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
          <label className="block text-sm mb-1">Item</label>
          <input
            type="text"
            name="item"
            value={formData.item}
            onChange={handleFormChange}
            className="w-full p-2 bg-gray-700 rounded"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Stock on Hand</label>
          <input
            type="text"
            name="stock"
            value={formData.stock}
            onChange={handleFormChange}
            className="w-full p-2 bg-gray-700 rounded"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Price per Unit</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleFormChange}
            onBlur={calculateTotal}
            className="w-full p-2 bg-gray-700 rounded"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Unit</label>
          <input
            type="text"
            name="unit"
            value={formData.unit}
            onChange={handleFormChange}
            className="w-full p-2 bg-gray-700 rounded"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Quantity</label>
          <input
            type="text"
            name="quantity"
            value={formData.quantity}
            onChange={handleFormChange}
            onBlur={calculateTotal}
            className="w-full p-2 bg-gray-700 rounded"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Deliver To</label>
          <input
            type="text"
            name="deliverTo"
            value={formData.deliverTo}
            onChange={handleFormChange}
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
        item: "",
        stock: "",
        supplier: "",
        price: "",
        unit: "",
        quantity: "",
        deliverTo: "",
        total: "",
    });
    const [refresh,setRefresh] = useState(true);

    //fetching data from backend
    const fetchData = async () =>
    {
      try {
        const response = await fetch(`${API_URL}/stocktransfer`);
        const jsonData = await response.json();
        setTransferData(jsonData);
      } catch (error) {
        console.log(error.message);
      }
    }

    //using the fetch function
    useEffect(() => {
      if(refresh)
      {
        fetchData();
        setRefresh(false);
      }
    });

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setnewTransferForm({
          ...newTransferForm,
          [name]: value,
        });
      };
    
      // Calculate total
      const calculateTotal = () => {
        const price = parseFloat(newTransferForm.price) || 0;
        const quantity = parseFloat(newTransferForm.quantity) || 0;
        const total = (price * quantity).toFixed(2);
    
        setnewTransferForm({
          ...newTransferForm,
          total,
        });
      };
    
      // Handle form submission
      const handleAddNewOrder = () => {
        // Generate a new transfer number (for demonstration purposes)
        const newTransferNo = String(transferData.length + 1);
    
        // Create a new transfer entry
        const newTransfer = [
          newTransferNo,
          newTransferForm.item,
          "Admin", // Replace with the actual creator (e.g., logged-in user)
          "Warehouse X", // Replace with the actual source
          new Date().toISOString().split("T")[0], // Current date as the due date
          "Pending", // Default status
        ];
    
        // Add the new transfer to the table data
        setTransferData([...transferData, newTransfer]);
    
        // Reset the form
        setnewTransferForm({
          item: "",
          stock: "",
          supplier: "",
          price: "",
          unit: "",
          quantity: "",
          deliverTo: "",
          total: "",
        });
    
        // Close the form
        setIsAdding(false);
      };
    
    
    
    const transferHeader = ["Transfer No.", "Item", "Created By", "Source", "Due Date", "Status"];
    const [transferData, setTransferData] = useState([
        ["123", "Item A", "John Doe", "Warehouse A", "2023-09-01", "Pending"],
        ["456", "Item B", "Jane Smith", "Warehouse B", "2023-09-05", "Received"],
        ["789", "Item C", "Bob Johnson", "Warehouse C", "2023-09-10", "Received"],
    ]);
    

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
                                    {transfer.map((item, itemIndex) => (
                                        <td key={itemIndex} className="p-2 border border-gray-700">
                                            {item}
                                        </td>
                                    ))}
                                    <td className="p-2 border border-gray-700">
                                        <button
                                            className={`px-2 py-1 rounded shadow-lg transition w-full ${
                                                transfer[5] === "Received" ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"
                                            }`}
                                            onClick={() => {
                                                if (transfer[5] === "Received") {
                                                    // Handle "Open" action
                                                    console.log("Open transfer:", transfer[0]);
                                                } else {
                                                    // Handle "Receive" action
                                                    console.log("Receive transfer:", transfer[0]);
                                                }
                                            }}
                                        >
                                            {transfer[5] === "Received" ? "Open" : "Receive"}
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