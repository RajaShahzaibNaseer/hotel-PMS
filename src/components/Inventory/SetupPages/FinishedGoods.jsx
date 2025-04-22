import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../../../config";

const FinishedGoods = () => {
    const tableHeader = ["ID", "Item ID", "Measurement Unit", "Buying Unit", "Supplier", "Price","Tax on Purchase", "Actions"];
    const [tableData, setTableData] = useState([]);
    const [refresh, setRefresh] = useState(true);

    //fetching data from backend
    const fetchData = async () =>
    {
        const response = await fetch(`${API_URL}/finished-goods`);
        const jsonData = await response.json();
        setTableData(jsonData); 
    }

    useEffect(() => {
        if(refresh)
        {
            fetchData();
            setRefresh(false);
        }
    });

    
    // Toggle edit mode for a row
    const handleEditToggle = (index) => {
        setTableData((prevData) =>
            prevData.map((item, i) =>
                i === index ? { ...item, isEditing: !item.isEditing } : item
            )
        );
    };

    // Handle input change
    const handleInputChange = (index, field, value) => {
        setTableData((prevData) =>
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
        const item = tableData[index];
    
        const payload = {
            item_id: item.item_id,
            measurement_unit: item.measurement_unit,
            buying_unit: item.buying_unit,
            price: cleanFloat(item.price),
            supplier_id: item.supplier_id,
            tax_on_purchase: item.tax_on_purchase || null,
        };
    
        try {
            console.log("Saving item:", payload);
    
            const response = await fetch(
                item.id !== "" ? `${API_URL}/finished-goods/${item.id}` : `${API_URL}/finished-goods`,
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
            const id = tableData[index].id;
            const response = await fetch(`${API_URL}/finished-goods/${id}`,{
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
            item_id: "",
            measurement_unit: "",
            buying_unit: "",
            supplier_id: "",
            price: "",
            tax_on_purchase: "",
            isEditing: true
        };
        setTableData([...tableData, newItem]);
    };


    return (
        <div className="flex flex-col min-h-screen p-5 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <div className="flex items-center gap-6 mb-6">
                <Link to="/inventory" className="text-xl border p-2 rounded">
                    <span className="text-xl">⇐</span>
                </Link>
                <h1 className="text-3xl font-bold text-gray-100">Finished Goods</h1>
                <button
                    className="bg-green-500 px-4 py-2 rounded"
                    onClick={handleAddNew}
                >
                    Add New
                </button>
            </div>
            <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[600px] border-collapse border border-gray-700 text-center">
                    <thead>
                        <tr className="bg-gray-800 text-gray-300 text-xs md:text-sm">
                            {tableHeader.map((header, index) => (
                                <th key={index} className="border border-gray-700 px-2 py-3 md:px-4 md:py-4">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                    {tableData.map((row, rowIndex) => (
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
        </div>
    );
};

export default FinishedGoods;