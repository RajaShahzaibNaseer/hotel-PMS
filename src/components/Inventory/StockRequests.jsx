import { useEffect, useState } from "react";

const StockRequests = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [refresh,setRefresh] = useState(true);
  
  // New form state
  const [newOrderForm, setNewOrderForm] = useState({
    id: "",
    item_id: "",
    stock_on_hand: "",
    price_per_unit: "",
    unit_value: "",
    quantity: "",
    destination: "",
    total: "",
    status: ""
    });
  
  const fetchData = async () => {
    const response = await fetch(`${API_URL}/stockrequests`);
    const jsonData = await response.json();
    setNewOrders(jsonData);
  }

  useEffect(() => {
     if(refresh){
      fetchData();
      setRefresh(false);
     }
  });
  // Table data states
  const [newOrders, setNewOrders] = useState([
    { srno: "1", item: "Sugar", stock: "50", supplier: "ABC Supplies", price: "120", unit: "Kg", quantity: "20", deliverTo: "Store A", total: "2400" },
    { srno: "2", item: "Flour", stock: "30", supplier: "XYZ Traders", price: "80", unit: "Kg", quantity: "15", deliverTo: "Store B", total: "1200" },
    { srno: "3", item: "Salt", stock: "40", supplier: "XYZ Traders", price: "60", unit: "Kg", quantity: "10", deliverTo: "Store C", total: "600" }
  ]);

  const [sentOrders, setSentOrders] = useState([
    { srno: "#123", invRefNo: "#456", item: "Sugar", createdBy: "John Doe", sentBy: "John Doe", orderedBy: "John Doe", dueDate: "2023-06-20", total: "1200" },
    { srno: "#456", invRefNo: "#789", item: "Flour", createdBy: "Jane Smith", sentBy: "Jane Smith", orderedBy: "Jane Smith", dueDate: "2023-06-21", total: "800" },
    { srno: "#789", invRefNo: "#123", item: "Salt", createdBy: "Bob Johnson", sentBy: "Bob Johnson", orderedBy: "Bob Johnson", dueDate: "2023-06-22", total: "600" }
  ]);

  const [receivedOrders, setReceivedOrders] = useState([
    { srno: "#123", invRefNo: "#456", item: "Sugar", createdBy: "John Doe", orderedBy: "John Doe", dueDate: "2023-06-20", receivedDate: "2023-06-22", total: "1200" },
    { srno: "#456", invRefNo: "#789", item: "Flour", createdBy: "Jane Smith", orderedBy: "Jane Smith", dueDate: "2023-06-21", receivedDate: "2023-06-23", total: "800" },
    { srno: "#789", invRefNo: "#123", item: "Salt", createdBy: "Bob Johnson", orderedBy: "Bob Johnson", dueDate: "2023-06-22", receivedDate: "2023-06-24", total: "600" }
  ]);

  // Handle form input change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewOrderForm({
      ...newOrderForm,
      [name]: value
    });
  };

  // Handle edit input change
  const handleEditChange = (e, index) => {
    const { name, value } = e.target;
    const updatedOrders = [...newOrders];
    updatedOrders[index] = {
      ...updatedOrders[index],
      [name]: value
    };
    setNewOrders(updatedOrders);
  };

  // Start editing an item
  const handleEditItem = (index) => {
    setEditingIndex(index);
    // Here you would fetch the latest data from backend if needed
  };

  // Save edited item
  const handleSaveEdit = (index) => {
    setEditingIndex(null);
    // Backend integration - send the updated item to your API
    // Example: api.updateOrder(newOrders[index])
    //   .then(() => console.log("Order updated"))
    //   .catch(error => console.error("Error updating order:", error));
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingIndex(null);
    // Optionally revert changes by re-fetching data from backend
  };

  // Add new order
  const handleAddNewOrder = () => {
    // Generate a new ID (in a real app, the backend would handle this)
    const newSrNo = String(newOrders.length + 1);
    
    // Calculate total if not provided
    const total = newOrderForm.total || 
      (parseInt(newOrderForm.price || 0) * parseInt(newOrderForm.quantity || 0)).toString();
    
    const newOrder = {
      ...newOrderForm,
      srno: newSrNo,
      total
    };
    
    setNewOrders([...newOrders, newOrder]);
    
    // Reset form and exit add mode
    setNewOrderForm({
      srno: "",
      item: "",
      stock: "",
      supplier: "",
      price: "",
      unit: "",
      quantity: "",
      deliverTo: "",
      total: ""
    });
    setIsAddingNew(false);
    
    // Backend integration - send the new order to your API
    // Example: api.createOrder(newOrder)
    //   .then(response => console.log("Order created", response))
    //   .catch(error => console.error("Error creating order:", error));
  };

  // Delete an item
  const handleDeleteItem = (index, tabType) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      if (tabType === 0) {
        const orderToDelete = newOrders[index];
        setNewOrders(newOrders.filter((_, i) => i !== index));
        
        // Backend integration - send delete request
        // Example: api.deleteOrder(orderToDelete.id)
        //   .then(() => console.log("Order deleted"))
        //   .catch(error => console.error("Error deleting order:", error));
      } else if (tabType === 1) {
        const orderToDelete = sentOrders[index];
        setSentOrders(sentOrders.filter((_, i) => i !== index));
        
        // Example: api.deleteOrder(orderToDelete.orderNo)
      } else {
        const orderToDelete = receivedOrders[index];
        setReceivedOrders(receivedOrders.filter((_, i) => i !== index));
        
        // Example: api.deleteOrder(orderToDelete.orderNo)
      }
    }
  };

  // Calculate total automatically
  const calculateTotal = () => {
    const price = parseFloat(newOrderForm.price) || 0;
    const quantity = parseFloat(newOrderForm.quantity) || 0;
    const total = (price * quantity).toFixed(2);
    
    setNewOrderForm({
      ...newOrderForm,
      total
    });
  };

  return (
    <div className="bg-gray-900 text-white p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Stock Requests</h2>

      {/* Tabs */}
      <div className="flex border-b border-gray-700 mb-4">
        <button
          onClick={() => setActiveTab(0)}
          className={`flex-1 py-2 text-center ${activeTab === 0 ? "border-b-2 border-blue-500 text-blue-400" : "text-gray-400"}`}
        >
          Open Orders
        </button>
        <button
          onClick={() => setActiveTab(1)}
          className={`flex-1 py-2 text-center ${activeTab === 1 ? "border-b-2 border-blue-500 text-blue-400" : "text-gray-400"}`}
        >
          Sent Orders
        </button>
        <button
          onClick={() => setActiveTab(2)}
          className={`flex-1 py-2 text-center ${activeTab === 2 ? "border-b-2 border-blue-500 text-blue-400" : "text-gray-400"}`}
        >
          Received Orders
        </button>
      </div>

      {/* Content */}
      <div className="mt-4">
        {activeTab === 0 && (
          <div>
            {!isAddingNew ? (
              <button 
                onClick={() => setIsAddingNew(true)} 
                className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 mb-4"
              >
                + New Purchase Order
              </button>
            ) : (
              <div className="bg-gray-800 p-4 rounded mb-4">
                <h3 className="text-xl mb-3">Add New Purchase Order</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm mb-1">Item ID</label>
                    <input
                      type="text"
                      name="item"
                      value={newOrderForm.item_id}
                      onChange={handleFormChange}
                      className="w-full p-2 bg-gray-700 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Stock on Hand</label>
                    <input
                      type="text"
                      name="stock"
                      value={newOrderForm.stock_on_hand}
                      onChange={handleFormChange}
                      className="w-full p-2 bg-gray-700 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Price Per Unit</label>
                    <input
                      type="text"
                      name="supplier"
                      value={newOrderForm.price_per_unit}
                      onChange={handleFormChange}
                      className="w-full p-2 bg-gray-700 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Unit Value</label>
                    <input
                      type="text"
                      name="price"
                      value={newOrderForm.unit_value}
                      onChange={handleFormChange}
                      onBlur={calculateTotal}
                      className="w-full p-2 bg-gray-700 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Quantity</label>
                    <input
                      type="text"
                      name="unit"
                      value={newOrderForm.quantity}
                      onChange={handleFormChange}
                      className="w-full p-2 bg-gray-700 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Destination</label>
                    <input
                      type="text"
                      name="quantity"
                      value={newOrderForm.destination}
                      onChange={handleFormChange}
                      onBlur={calculateTotal}
                      className="w-full p-2 bg-gray-700 rounded"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4 gap-2">
                  <button
                    onClick={() => setIsAddingNew(false)}
                    className="bg-gray-600 px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddNewOrder}
                    className="bg-green-500 px-4 py-2 rounded"
                  >
                    Save Order
                  </button>
                </div>
              </div>
            )}
            
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-700">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="p-2 border border-gray-700">Sr. No.</th>
                    <th className="p-2 border border-gray-700">Item</th>
                    <th className="p-2 border border-gray-700">Stock</th>
                    <th className="p-2 border border-gray-700">Price</th>
                    <th className="p-2 border border-gray-700">Quantity</th>
                    <th className="p-2 border border-gray-700">Deliver To</th>
                    <th className="p-2 border border-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {newOrders.map((order, index) => (
                    <tr key={index} className="hover:bg-gray-800">
                      <td className="p-2 border border-gray-700">{order.id}</td>
                      
                      {editingIndex === index ? (
                        // Editable row
                        <>
                          <td className="p-2 border border-gray-700">
                            <input
                              type="text"
                              name="item"
                              value={order.item_id}
                              onChange={(e) => handleEditChange(e, index)}
                              className="w-full p-1 bg-gray-700 rounded"
                            />
                          </td>
                          <td className="p-2 border border-gray-700">
                            <input
                              type="text"
                              name="stock"
                              value={order.stock_on_hand}
                              onChange={(e) => handleEditChange(e, index)}
                              className="w-full p-1 bg-gray-700 rounded"
                            />
                          </td>
                          <td className="p-2 border border-gray-700">
                            <input
                              type="text"
                              name="price_per_unit"
                              value={order.price_per_unit}
                              onChange={(e) => handleEditChange(e, index)}
                              className="w-full p-1 bg-gray-700 rounded"
                            />
                          </td>
                          <td className="p-2 border border-gray-700">
                            <input
                              type="text"
                              name="unit_value"
                              value={order.unit_value}
                              onChange={(e) => handleEditChange(e, index)}
                              className="w-full p-1 bg-gray-700 rounded"
                            />
                          </td>
                          <td className="p-2 border border-gray-700">
                            <input
                              type="text"
                              name="quantity"
                              value={order.quantity}
                              onChange={(e) => handleEditChange(e, index)}
                              className="w-full p-1 bg-gray-700 rounded"
                            />
                          </td>
                          <td className="p-2 border border-gray-700">
                            <input
                              type="text"
                              name="destination"
                              value={order.destination}
                              onChange={(e) => handleEditChange(e, index)}
                              className="w-full p-1 bg-gray-700 rounded"
                            />
                          </td>
                        </>
                      ) : (
                        // View mode
                        <>
                          <td className="p-2 border border-gray-700">{order.item_id}</td>
                          <td className="p-2 border border-gray-700">{order.stock_on_hand}</td>
                          <td className="p-2 border border-gray-700">{order.price_per_unit}</td>
                          <td className="p-2 border border-gray-700">{order.unit_value}</td>
                          <td className="p-2 border border-gray-700">{order.quantity}</td>
                          <td className="p-2 border border-gray-700">{order.destination}</td>
                        </>
                      )}
                      <td className="p-2 border border-gray-700">
                        {editingIndex === index ? (
                          <div className="flex flex-col gap-1">
                            <button
                              onClick={() => handleSaveEdit(index)}
                              className="bg-green-500 px-2 py-1 rounded"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="bg-gray-500 px-2 py-1 rounded"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-1">
                            <button
                              onClick={() => handleEditItem(index)}
                              className="bg-green-500 px-2 py-1 rounded mb-1"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteItem(index, 0)}
                              className="bg-red-500 px-2 py-1 rounded"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 1 && (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-700">
              <thead>
                <tr className="bg-gray-800">
                  <th className="p-2 border border-gray-700">Sr. No.</th>
                  <th className="p-2 border border-gray-700">Item</th>
                  <th className="p-2 border border-gray-700">Created By</th>
                  <th className="p-2 border border-gray-700">Sent By</th>
                  <th className="p-2 border border-gray-700">Ordered By</th>
                  <th className="p-2 border border-gray-700">Due Date</th>
                  <th className="p-2 border border-gray-700">Total</th>
                  <th className="p-2 border border-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sentOrders.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-800">
                    <td className="p-2 border border-gray-700">{order.srno}</td>
                    <td className="p-2 border border-gray-700">{order.item}</td>
                    <td className="p-2 border border-gray-700">{order.createdBy}</td>
                    <td className="p-2 border border-gray-700">{order.sentBy}</td>
                    <td className="p-2 border border-gray-700">{order.orderedBy}</td>
                    <td className="p-2 border border-gray-700">{order.dueDate}</td>
                    <td className="p-2 border border-gray-700">{order.total}</td>
                    <td className="p-2 border border-gray-700">
                      <div className="flex flex-col gap-1">
                        <button className="bg-blue-500 px-2 py-1 rounded mb-1">
                          Open
                        </button>
                        <button className="bg-green-500 px-2 py-1 rounded mb-1">
                          Receive
                        </button>
                        <button className="bg-yellow-500 px-2 py-1 rounded mb-1">
                          Re-Send
                        </button>
                        <button 
                          onClick={() => handleDeleteItem(index, 1)}
                          className="bg-red-500 px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 2 && (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-700">
              <thead>
                <tr className="bg-gray-800">
                  <th className="p-2 border border-gray-700">Sr. No.</th>
                  <th className="p-2 border border-gray-700">Inv Ref. No.</th>
                  <th className="p-2 border border-gray-700">Item</th>
                  <th className="p-2 border border-gray-700">Created By</th>
                  <th className="p-2 border border-gray-700">Ordered By</th>
                  <th className="p-2 border border-gray-700">Due Date</th>
                  <th className="p-2 border border-gray-700">Received Date</th>
                  <th className="p-2 border border-gray-700">Total</th>
                  <th className="p-2 border border-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {receivedOrders.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-800">
                    <td className="p-2 border border-gray-700">{order.srno}</td>
                    <td className="p-2 border border-gray-700">{order.invRefNo}</td>
                    <td className="p-2 border border-gray-700">{order.item}</td>
                    <td className="p-2 border border-gray-700">{order.createdBy}</td>
                    <td className="p-2 border border-gray-700">{order.orderedBy}</td>
                    <td className="p-2 border border-gray-700">{order.dueDate}</td>
                    <td className="p-2 border border-gray-700">{order.receivedDate}</td>
                    <td className="p-2 border border-gray-700">{order.total}</td>
                    <td className="p-2 border border-gray-700">
                      <button className="bg-blue-500 px-2 py-1 rounded">
                        Open
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockRequests;