import { useState, useEffect } from "react";
import { API_URL } from "../../config";

const PurchaseOrders = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [refresh, setRefresh] = useState(false); // Initialize to false, set to true when needed

  // New form state
  const [newOrderForm, setNewOrderForm] = useState({
    item_id: "",
    stock_on_hand: "",
    supplier_id: "",
    price_per_unit: "",
    unit_value: "",
    quantity: "",
    deliver_to: "",
    status:"",
    dueDate: "",
    total: "0.00", // Initialize total as a string
  });

  const mergeJson = (stockData, itemsData, suppliersData) => {
    return stockData.map((stockItem) => {
      const matchedItem = itemsData.find((item) => item.id === stockItem.item_id);
      const matchedSupplier = suppliersData.find(
        (supplier) => supplier.id === stockItem.supplier_id
      );

      return {
        ...stockItem,
        item_name: matchedItem?.name || "Unknown",
        item_price: matchedItem?.price || 0,
        item_barcode: matchedItem?.barcode || "",
        item_description: matchedItem?.description || "",
        item_reorder_level: matchedItem?.reorder_level || 0,
        supplier_name: matchedSupplier?.name || "Unknown",
        supplier_email: matchedSupplier?.email || "",
        supplier_phone: matchedSupplier?.phone || "",
        supplier_address_1: matchedSupplier?.address_1 || "",
        supplier_address_2: matchedSupplier?.address_2 || "",
      };
    });
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/purchase-orders`);
      const jsonData = await response.json();

      const itemsResponse = await fetch(`${API_URL}/items`);
      const itemsData = await itemsResponse.json();

      const suppliersResponse = await fetch(`${API_URL}/suppliers`);
      const suppliersData = await suppliersResponse.json();

      const mergedData = mergeJson(jsonData, itemsData, suppliersData);

      setNewOrders(mergedData.filter(order => order.status === "open"));
      setSentOrders(mergedData.filter(order => order.status === "sent"));
      setReceivedOrders(mergedData.filter(order => order.status === "received"));
    } catch (error) {
      console.error("Failed to fetch stock data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

    // Handle date input field
    if (name === "dueDate") {
      setNewOrderForm({
        ...newOrderForm,
        [name]: value,
      });
      return;
    }

    // Automatically calculate total if price_per_unit or quantity changes
    if (name === "price_per_unit" || name === "quantity") {
      const price = name === "price_per_unit" ? parseFloat(value) || 0 : parseFloat(newOrderForm.price_per_unit) || 0;
      const quantity = name === "quantity" ? parseFloat(value) || 0 : parseFloat(newOrderForm.quantity) || 0;
      const total = (price * quantity).toFixed(2);

      setNewOrderForm({
        ...newOrderForm,
        [name]: value,
        total,
      });
    } else {
      setNewOrderForm({
        ...newOrderForm,
        [name]: value,
      });
    }
  };

  // Handle edit input change
  const handleEditChange = (e, index) => {
    const { name, value } = e.target;
    const updatedOrders = [...newOrders];
    updatedOrders[index] = {
      ...updatedOrders[index],
      [name]: value,
      // Recalculate total if price or quantity changes
      ...(name === "price_per_unit" || name === "quantity"
        ? {
            total: (
              parseFloat(
                name === "price_per_unit" ? value : updatedOrders[index].price_per_unit
              ) *
              parseFloat(name === "quantity" ? value : updatedOrders[index].quantity)
            ).toFixed(2),
          }
        : {}),
    };
    setNewOrders(updatedOrders);
  };

  const handleSendItem = async (id) => {
    try {
      console.log(id)
      const response = await fetch(`${API_URL}/purchase-orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "sent",
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

  const handleReceiveItem = async (id) => {
    try {
      console.log(id)
      const response = await fetch(`${API_URL}/purchase-orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "received",
          received_date: new Date().toISOString(),
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

  // Start editing an item
  const handleEditItem = (index) => {
    setEditingIndex(index);
    // Here you would fetch the latest data from backend if needed
  };

  // Save edited item
  const handleSaveEdit = async (index) => {
    try {
      const orderToUpdate = newOrders[index];
      const response = await fetch(`${API_URL}/purchase-orders/${orderToUpdate.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item_id: orderToUpdate.item_id,
          stock_on_hand: orderToUpdate.stock_on_hand,
          supplier_id: orderToUpdate.supplier_id,
          price_per_unit: orderToUpdate.price_per_unit,
          unit_value: orderToUpdate.unit_value,
          quantity: orderToUpdate.quantity,
          deliver_to: orderToUpdate.deliver_to,
          status: orderToUpdate.status,
          total: orderToUpdate.total,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order');
      }

      if (!response.ok) throw new Error("Failed to update order");

      setEditingIndex(null);
      setRefresh(true);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingIndex(null);
    setRefresh(true); // Refresh to get original data
  };

  // Add new order
  const handleAddNewOrder = async () => {
    try {
      const newOrderToSend = {
        item_id: parseInt(newOrderForm.item_id) || null,
        stock_on_hand: parseInt(newOrderForm.stock_on_hand) || 0,
        supplier_id: parseInt(newOrderForm.supplier_id) || null,
        price_per_unit: parseFloat(newOrderForm.price_per_unit || 0),
        unit_value: newOrderForm.unit_value || "",
        quantity: parseInt(newOrderForm.quantity) || 0,
        deliver_to: newOrderForm.deliver_to || "",
        due_date: newOrderForm.dueDate,
        created_by: "admin",
        status: newOrderForm.status || "open",
        total: parseFloat(newOrderForm.total || 0), // Use the calculated total from state
      };

      const response = await fetch(`${API_URL}/purchase-orders/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrderToSend),
      });

      if (!response.ok) {
        throw new Error("Failed to add new order");
      }

      // After successfully adding, trigger a refresh to fetch updated data
      setIsAddingNew(false);
      setRefresh(true);
      // Reset form immediately after initiating the save
      setNewOrderForm({
        item_id: "",
        supplier_id: "",
        stock_on_hand: "",
        price_per_unit: "",
        unit_value: "",
        quantity: "",
        deliver_to: "",
        status: "open",
        total: "0.00",
      });
    } catch (error) {
      console.error("Error adding new order:", error);
    }
  };

  // Delete an item
  const handleDeleteItem = async (id, tabType) => {
    console.log(id);
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const response = await fetch(`${API_URL}/purchase-orders/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error('Failed to delete order');
        }

        setRefresh(true);
      } catch (error) {
        console.error("Error deleting order:", error);
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
      total,
    });
  };

  return (
    <div className="bg-gray-900 text-white p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Purchase Orders</h2>

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
              <label className="block text-sm mb-1">Item</label>
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
              <label className="block text-sm mb-1">Supplier</label>
              <input
                type="text"
                name="supplier_id"
                value={newOrderForm.supplier_id}
                onChange={handleFormChange}
                className="w-full p-2 bg-gray-700 rounded"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Price per Unit</label>
              <input
                type="text"
                name="price_per_unit"
                value={newOrderForm.price_per_unit}
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
                value={newOrderForm.unit_value}
                onChange={handleFormChange}
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
                onBlur={calculateTotal}
                className="w-full p-2 bg-gray-700 rounded"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Deliver To</label>
              <input
                type="text"
                name="deliver_to"
                value={newOrderForm.deliver_to}
                onChange={handleFormChange}
                className="w-full p-2 bg-gray-700 rounded"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Total</label>
              <input
                type="text"
                name="total"
                value={newOrderForm.total}
                onChange={handleFormChange}
                className="w-full p-2 bg-gray-700 rounded"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={newOrderForm.dueDate}
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
              <th className="p-2 border border-gray-700">ID</th>
              <th className="p-2 border border-gray-700">Item</th>
              <th className="p-2 border border-gray-700">Stock</th>
              <th className="p-2 border border-gray-700">Supplier</th>
              <th className="p-2 border border-gray-700">Price</th>
              <th className="p-2 border border-gray-700">Unit</th>
              <th className="p-2 border border-gray-700">Quantity</th>
              <th className="p-2 border border-gray-700">Deliver To</th>
              <th className="p-2 border border-gray-700">Due Date</th>
              <th className="p-2 border border-gray-700">Total</th>
              <th className="p-2 border border-gray-700">Status</th>
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
                              name="item_name"
                              value={order.item_name}
                              onChange={(e) => handleEditChange(e, index)}
                              className="w-full p-1 bg-gray-700 rounded"
                            />
                          </td>
                          <td className="p-2 border border-gray-700">
                            <input
                              type="text"
                              name="stock_on_hand"
                              value={order.stock_on_hand}
                              onChange={(e) => handleEditChange(e, index)}
                              className="w-full p-1 bg-gray-700 rounded"
                            />
                          </td>
                          <td className="p-2 border border-gray-700">
                            <input
                              type="text"
                              name="supplier_name"
                              value={order.supplier_name}
                              onChange={(e) => handleEditChange(e, index)}
                              className="w-full p-1 bg-gray-700 rounded"
                            />
                          </td>
                          <td className="p-2 border border-gray-700">
                            <input
                              type="text"
                              name="item_price"
                              value={order.item_price}
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
                              name="deliver_to"
                              value={order.deliver_to}
                              onChange={(e) => handleEditChange(e, index)}
                              className="w-full p-1 bg-gray-700 rounded"
                            />
                          </td>
                          <td className="p-2 border border-gray-700">
                            <input
                              type="date"
                              name="due_date"
                              value={order.due_date}
                              onChange={(e) => handleEditChange(e, index)}
                              className="w-full p-1 bg-gray-700 rounded"
                            />
                          </td>
                          <td className="p-2 border border-gray-700">
                            <input
                              type="text"
                              name="total"
                              value={order.total}
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
                          <td className="p-2 border border-gray-700">{order.supplier_name}</td>
                          <td className="p-2 border border-gray-700">{order.item_price}</td>
                          <td className="p-2 border border-gray-700">{order.unit_value}</td>
                          <td className="p-2 border border-gray-700">{order.quantity}</td>
                          <td className="p-2 border border-gray-700">{order.deliver_to}</td>
                          <td className="p-2 border border-gray-700">{new Date(order.due_date).toLocaleDateString("en-US")}</td>
                          <td className="p-2 border border-gray-700">{order.total}</td>
                          <td className="p-2 border border-gray-700">{order.status}</td>
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
                              onClick={() => handleSendItem(order.id)}
                              className="bg-blue-500 px-2 py-1 rounded mb-1"
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
                              onClick={() => handleDeleteItem(order.id, 0)}
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
                  <th className="p-2 border border-gray-700">Order No.</th>
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
                    <td className="p-2 border border-gray-700">{order.created_by}</td>
                    <td className="p-2 border border-gray-700">{order.created_by}</td>
                    <td className="p-2 border border-gray-700">{order.deliver_to}</td>
                    <td className="p-2 border border-gray-700">{new Date(order.due_date).toLocaleDateString("en-US")}</td>
                    <td className="p-2 border border-gray-700">{order.total}</td>
                    <td className="p-2 border border-gray-700">
                      <div className="flex flex-col gap-1">
                        <button className="bg-green-500 px-2 py-1 rounded mb-1"
                        onClick={() => handleReceiveItem(order.id)}>
                          Receive
                        </button>
                        <button 
                          onClick={() => handleDeleteItem(order.id, 1)}
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
                  <th className="p-2 border border-gray-700">Order No.</th>
                  <th className="p-2 border border-gray-700">Item</th>
                  <th className="p-2 border border-gray-700">Created By</th>
                  <th className="p-2 border border-gray-700">Ordered By</th>
                  <th className="p-2 border border-gray-700">Due Date</th>
                  <th className="p-2 border border-gray-700">Received Date</th>
                  <th className="p-2 border border-gray-700">Total</th>
                </tr>
              </thead>
              <tbody>
                {receivedOrders.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-800">
                    <td className="p-2 border border-gray-700">{order.id}</td>
                    <td className="p-2 border border-gray-700">{order.item_name}</td>
                    <td className="p-2 border border-gray-700">{order.created_by}</td>
                    <td className="p-2 border border-gray-700">{order.deliver_to}</td>
                    <td className="p-2 border border-gray-700">{new Date(order.due_date).toLocaleDateString("en-US")}</td>
                    <td className="p-2 border border-gray-700">{new Date(order.received_date).toLocaleDateString("en-US")}</td>
                    <td className="p-2 border border-gray-700">{order.total}</td>
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

export default PurchaseOrders;