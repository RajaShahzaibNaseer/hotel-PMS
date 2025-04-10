import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../../../config";

const Categoriess = () => {
    const categoriesHeaders = ["id" ,"Name","Description", "Actions"];
    const [categoriesData, setCategoriesData] = useState([]);
    const [refresh, setRefresh] = useState(true);

    //fetching categories data from database
    const fetchData = async () =>
    {
        try {
            const response = await fetch(`${API_URL}/categories`);
            const jsonData = await response.json();
            setCategoriesData(jsonData);
        } catch (error) {
            console.log(error.message);
        }
    }

    //usage of fetch function
    useEffect(() =>{
        if(refresh)
        {
            fetchData();
            setRefresh(false);
        }
    });

    // Toggle edit mode for a row
    const handleEditToggle = (index) => {
        setCategoriesData((prevData) =>
            prevData.map((item, i) =>
                i === index ? { ...item, isEditing: !item.isEditing } : item
            )
        );
    };

    // Handle input change
    const handleInputChange = (index, value) => {
        setCategoriesData((prevData) =>
            prevData.map((item, i) =>
                i === index ? { ...item, name: value } : item
            )
        );
    };

    // Save edited item
    const handleSave = async (index) => {
        const item = categoriesData[index];
    
        try {
            if (item.id != "") {
                // Existing item – update it with PUT
                const response = await fetch(`${API_URL}/categories/${item.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name: item.name }),
                });
    
                if (!response.ok) throw new Error("Failed to update item.");
            } else {
                // New item – create it with POST
                const response = await fetch(`${API_URL}/categories`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name: item.name }),
                });
    
                if (!response.ok) throw new Error("Failed to create item.");
            }
    
            // Trigger refresh to fetch updated list
            setRefresh(true);
        } catch (error) {
            console.error("Save error:", error.message);
        }
    };
    

    // Delete an item
    const handleDelete = async (index) => {
        try {
            const id = categoriesData[index].id;
            const respone = await fetch(`${API_URL}/categories/${id}`, {
                method: "DELETE",
            });
            setRefresh(true);
        } catch (error) {
            console.log(error.message);
        }
    };

    // Add a new categories unit
    const handleAddNew = () => {
        const newCategories = { id: "",name: "New Unit", isEditing: true };
        setCategoriesData([...categoriesData, newCategories]);
    };

    return (
        <div className="flex flex-col min-h-screen p-5 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-6">
                    <Link to="/inventory" className="text-xl border p-2 rounded">⇐</Link>
                    <h1 className="text-3xl font-bold">Categories Units</h1>
                </div>
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
                        {categoriesHeaders.map((header, index) => (
                            <th key={index} className="border border-gray-700 p-3">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {categoriesData.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border border-gray-700 hover:bg-gray-800 transition-colors">
                        <td className="border border-gray-700 p-3">
                                {
                                    row.id
                                }
                            </td>
                            <td className="border border-gray-700 p-3">
                                {row.isEditing ? (
                                    <input
                                        type="text"
                                        value={row.name}
                                        onChange={(e) =>
                                            handleInputChange(rowIndex, e.target.value)
                                        }
                                        className="p-2 bg-gray-700 rounded w-full"
                                    />
                                ) : (
                                    row.name
                                )}
                            </td>
                            <td className="border border-gray-700 p-3">
                                <div className="flex justify-center gap-2">
                                    {row.isEditing ? (
                                        <button
                                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                                            onClick={() => handleSave(rowIndex)}
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                                            onClick={() => handleEditToggle(rowIndex)}
                                        >
                                            Edit
                                        </button>
                                    )}
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                                        onClick={() => handleDelete(rowIndex)}
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
    );
};

export default Categoriess;