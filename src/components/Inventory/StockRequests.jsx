import { useEffect, useState } from "react";
import { API_URL } from "../../config";

const StockRequests = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [refresh, setRefresh] = useState(true);

  // New form state
  const [newOrderForm, setNewOrderForm] = useState({
    item_id: "",
    stock_on_hand: "",
    price_per_unit: "",
    unit_value: "",
    quantity: "",
    destination: "",
    total: "",
    status: "Open",
  });

  const mergeJson = (jsonData, itemsData) => {
    return jsonData.map(item => {
      const matchedItem = itemsData.find(i => i.id === item.item_id);
      return {
        ...item,
        item_name: matchedItem?.name || 'Unknown',
        item_price: matchedItem?.price || 0,
        item_description: matchedItem?.description || '',
        item_reorder_level: matchedItem?.reorder_level || 0
      };
    });
  };
  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/stockrequest`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonData = await response.json();

      const itemsResponse = await fetch(`${API_URL}/items`);
      if (!itemsResponse.ok) {
        throw new Error(`HTTP error! status: ${itemsResponse.status}`);
      }
      const itemsData = await itemsResponse.json();
      const mergedData = mergeJson(jsonData, itemsData);
      console.log(mergedData)

      const openItems = mergedData.filter(item => item.status === "Open");
      const sentItems = mergedData.filter(item => item.status === "Sent");
      const receivedItems = mergedData.filter(item => item.status === "Received");
      setNewOrders(openItems);
      setSentOrders(sentItems);
      setReceivedOrders(receivedItems);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Optionally display an error message to the user
    }
  }

  useEffect(() => {
    if (refresh) {
      fetchData();
      setRefresh(false);
    }
  }, [refresh]);

  // Table data states
  const [newOrders, setNewOrders] = useState([]);
  const [sentOrders, setSentOrders] = useState([]);
  const [receivedOrders, setReceivedOrders] = useState([]);

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
  };

  //handle sending an item
  const handleSendItem = async (id) => {
    try {
      const order = newOrders[id].id;
      console.log(order)
      const response = await fetch(`${API_URL}/stockrequest/${order}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "Sent",
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order');
      }

      if (!response.ok) throw new Error("Failed to update order");
      setRefresh(true)
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };


  // Save edited item
  const handleSaveEdit = async (index) => {
    try {
      const orderToUpdate = newOrders[index];

      // Prepare the updated data
      const updatedData = {
        ...orderToUpdate,
        total: (parseFloat(orderToUpdate.price_per_unit || 0) * parseFloat(orderToUpdate.quantity || 0))
      };

      // Send PUT request to update the order
      const response = await fetch(`${API_URL}/stockrequest/${orderToUpdate.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          { stock_on_hand: updatedData.stock_on_hand, price_per_unit: updatedData.price_per_unit, quantity: updatedData.quantity, destination: updatedData.destination }
        )
      });

      if (!response.ok) {
        throw new Error('Failed to update order');
      }

      // Update local state only after successful API call
      const updatedOrders = [...newOrders];
      updatedOrders[index] = updatedData;
      setNewOrders(updatedOrders);

      setEditingIndex(null);
      setRefresh(true); // Refresh data to ensure consistency
    } catch (error) {
      console.error("Error updating order:", error);
      // Optionally show error to user
    }
  };


  // Cancel editing
  const handleCancelEdit = () => {
    setEditingIndex(null);
    // Re-fetch data to discard any changes
    setRefresh(true);
  };


  // Add new order
  const handleAddNewOrder = async () => {
    try {
      // Calculate total if not provided
      const total = newOrderForm.total ||
        (parseFloat(newOrderForm.price_per_unit || 0) * parseFloat(newOrderForm.quantity || 0)).toFixed(2);

      const newOrderToSend = {
        ...newOrderForm,
        total: parseFloat(total), // Ensure total is a number
      };

      const response = await fetch(`${API_URL}/stockrequest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrderToSend),
      });

      if (!response.ok) {
        throw new Error('Failed to add new order');
      }

      // Reset form and exit add mode
      setNewOrderForm({
        item_id: "",
        stock_on_hand: "",
        price_per_unit: "",
        unit_value: "",
        quantity: "",
        destination: "",
        total: "",
        status: "Open",
      });
      setIsAddingNew(false);
      setRefresh(true); // Refresh data to show the new order
    } catch (error) {
      console.error("Error adding new order:", error);
      // Optionally display an error message to the user
    }
  };

  // Delete an item
  const handleDeleteItem = async (id, tabType) => {
    const orderToDelete = tabType === 0 ? newOrders[id].id : tabType === 1 ? sentOrders[id].id : receivedOrders[id].id;
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const response = await fetch(`${API_URL}/stockrequest/${orderToDelete}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete order');
        }

        // Update local state after successful deletion
        if (tabType === 0) {
          setNewOrders(newOrders.filter(order => order.id !== orderToDelete));
        } else if (tabType === 1) {
          setSentOrders(sentOrders.filter(order => order.id !== orderToDelete));
        } else {
          setReceivedOrders(receivedOrders.filter(order => order.id !== orderToDelete));
        }
      } catch (error) {
        console.error("Error deleting order:", error);
        // Optionally display an error message to the user
      }
    }
  };

  // Calculate total automatically
  const calculateTotal = () => {
    const price = parseFloat(newOrderForm.price_per_unit) || 0;
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
                      name="item_id"
                      value={newOrderForm.item_id}
                      onChange={handleFormChange}
                      className="w-full p-2 bg-gray-700 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Stock on Hand</label>
                    <input
                      type="text"
                      name="stock_on_hand"
                      value={newOrderForm.stock_on_hand}
                      onChange={handleFormChange}
                      className="w-full p-2 bg-gray-700 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Price Per Unit</label>
                    <input
                      type="text"
                      name="price_per_unit"
                      value={newOrderForm.price_per_unit}
                      onChange={handleFormChange}
                      className="w-full p-2 bg-gray-700 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Unit Value</label>
                    <input
                      type="text"
                      name="unit_value"
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
                      name="quantity"
                      value={newOrderForm.quantity}
                      onChange={handleFormChange}
                      className="w-full p-2 bg-gray-700 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Destination</label>
                    <input
                      type="text"
                      name="destination"
                      value={newOrderForm.destination}
                      onChange={handleFormChange}
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
                              value={order.item_name}
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
                          {/* <td className="p-2 border border-gray-700">
                            <input
                              type="text"
                              name="unit_value"
                              value={order.unit_value}
                              onChange={(e) => handleEditChange(e, index)}
                              className="w-full p-1 bg-gray-700 rounded"
                            />
                          </td> */}
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
                          <td className="p-2 border border-gray-700">{order.item_name}</td>
                          <td className="p-2 border border-gray-700">{order.stock_on_hand}</td>
                          <td className="p-2 border border-gray-700">{order.price_per_unit}</td>
                          {/* <td className="p-2 border border-gray-700">{order.unit_value}</td> */}
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
                              onClick={() => handleSendItem(index)}
                              className="bg-yellow-500 px-2 py-1 rounded mb-1"
                            >
                              Send
                            </button>
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
                    <td className="p-2 border border-gray-700">{order.id}</td>
                    <td className="p-2 border border-gray-700">{order.item_name}</td>
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
                    <td className="p-2 border border-gray-700">{order.id}</td>
                    <td className="p-2 border border-gray-700">{order.invRefNo}</td>
                    <td className="p-2 border border-gray-700">{order.item_name}</td>
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