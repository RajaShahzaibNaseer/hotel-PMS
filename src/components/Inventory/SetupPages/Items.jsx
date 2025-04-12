import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../../../config";


const Items = () => {
    const itemHeaders = ["ID", "Name", "Barcode","Item Code","Price","Description", "Category", "Item Status", "Re-order level", "Item Modifiers", "Item Symbols","Actions"];
    const [itemData, setItemData] = useState([]);
    const [refresh,setRefresh] = useState(true);

    //fetching data from the database
    const fetchData = async () =>
    {
        try {
            const response = await fetch(`${API_URL}/items`);
            const jsonData = await response.json();
            setItemData(jsonData);
        } catch (error) {
            console.log(error.message);
        }
    }

    //using fetch function
    useEffect(() =>{
        if(refresh)
        {
            fetchData();
            setRefresh(false);
        }
    });

    // Toggle edit mode for a row
    const handleEditToggle = (index) => {
        setItemData((prevData) =>
            prevData.map((item, i) =>
                i === index ? { ...item, isEditing: !item.isEditing } : item
            )
        );
    };

    // Handle input change
    const handleInputChange = (index, field, value) => {
        setItemData((prevData) =>
            prevData.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        );
    };

    // Save edited item
    const cleanInteger = (value) => {
        if (value === "") return null;
        const parsed = parseInt(value);
        return isNaN(parsed) ? null : parsed;
    };
    
    const cleanFloat = (value) => {
        if (value === "") return null;
        const parsed = parseFloat(value);
        return isNaN(parsed) ? null : parsed;
    };
    
    const handleSave = async (index) => {
        const item = itemData[index];
    
        const payload = {
            name: item.name,
            barcode: item.barcode,
            item_code: item.item_code,
            price: cleanFloat(item.price),
            description: item.description || null,
            category_id: cleanInteger(item.category_id),
            item_status: item.item_status || null,
            reorder_level: cleanInteger(item.reorder_level),
            item_modifier: item.item_modifier || null,
            item_symbol: item.item_symbol || null,
        };
    
        try {
            console.log("Saving item:", payload);
    
            const response = await fetch(
                item.id !== "" ? `${API_URL}/items/${item.id}` : `${API_URL}/items`,
                {
                    method: item.id !== "" ? "PUT" : "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );
    
            const resultText = await response.text();
            console.log("Response:", response.status, resultText);
    
            if (!response.ok) throw new Error("Failed to save item.");
            setRefresh(true);
        } catch (error) {
            console.error("Save error:", error.message);
        }
    };
    
    

    // Delete an item
    const handleDelete = async (index) => {
        try {
            const id = itemData[index].id;
            const response = await fetch(`${API_URL}/items/${id}`,{
                method: "DELETE"
            });
            setRefresh(true);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleAddNew = () => {
        const newItem = {
            id: "",
            name: "",
            barcode: "",
            item_code: "",
            price: "",
            description: "",
            category: "",
            item_status: "",
            reorder_level: "",
            item_modifier: "",
            item_symbol: "",
            isEditing: true
        };
        setItemData([...itemData, newItem]);
    };


    return (
        <div className="flex flex-col min-h-screen p-5 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <div className="flex items-center gap-6 mb-6">
                <Link to="/inventory" className="text-xl border p-2 rounded">
                    <span className="text-xl">⇐</span>
                </Link>
                <h1 className="text-3xl font-bold text-gray-100">Items</h1>
                <button
                    className="bg-green-500 px-4 py-2 rounded"
                    onClick={handleAddNew}
                >
                    Add New
                </button>
            </div>

            <table className="w-full border border-gray-700 text-center">
                <thead>
                    <tr className="bg-gray-800 text-gray-300">
                        {itemHeaders.map((header, index) => (
                            <th key={index} className="border border-gray-700 p-3">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {itemData.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border border-gray-700 hover:bg-gray-800">
                            {Object.keys(row).filter(field => field != "isEditing").map((field, cellIndex) => (
                                <td key={cellIndex} className="border border-gray-700 p-3">
                                    {field === "id" ? (
                                        row[field]
                                        ) :row.isEditing ? (
                                        <input
                                            type="text"
                                            value={row[field]}
                                            onChange={(e) =>
                                                handleInputChange(rowIndex, field, e.target.value)
                                            }
                                            className="p-2 bg-gray-700 rounded w-full"
                                        />
                                    ) : (
                                        row[field]
                                    )}
                                </td>
                            ))}
                            <td className="border border-gray-700 p-3">
                                {row.isEditing ? (
                                    <>
                                        <button
                                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow-md mr-2"
                                            onClick={() => handleSave(rowIndex)}
                                        >
                                            Save
                                        </button>

                                    </>
                                ) : (
                                    <>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-md mr-2"
                                            onClick={() => handleEditToggle(rowIndex)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-md"
                                            onClick={() => handleDelete(rowIndex)}
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Items;