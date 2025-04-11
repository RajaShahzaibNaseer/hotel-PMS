import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../../../config";


const Items = () => {
    const itemHeaders = ["ID", "Name", "Barcode","Item Code","Price","Description", "Category", "Item Status", "Re-order level", "Actions"];
    const [itemData, setSupplierData] = useState([]);
    const [refresh,setRefresh] = useState(true);

    //fetching data from the database
    const fetchData = async () =>
    {
        try {
            const response = await fetch(`${API_URL}/items`);
            const jsonData = await response.json();
            setSupplierData(jsonData);
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
        setSupplierData((prevData) =>
            prevData.map((item, i) =>
                i === index ? { ...item, isEditing: !item.isEditing } : item
            )
        );
    };

    // Handle input change
    const handleInputChange = (index, field, value) => {
        setSupplierData((prevData) =>
            prevData.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        );
    };

    // Save edited item
    const handleSave = async (index) => {
       const item = itemData[index];
       try {
        if(item.id != "")
        {
            const response = await fetch(`${API_URL}/items/${item.id}`,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    name: item.name,
                    email:item.email,
                    phone:item.phone,
                    address1: item.address1,
                    address2: item.address2
                 }),
            });
            
            if (!response.ok) throw new Error("Failed to create item.");
        }
        else
        {
            const response = await fetch(`${API_URL}/items`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    name: item.name,
                    email:item.email,
                    phone:item.phone,
                    address1: item.address1,
                    address2: item.address2
                 }),
            });
        }
        setRefresh(true);
       } catch (error) {
        console.log(error.message);
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
        const newSupplier = {
            id: "", 
            name: "",
            email:"",
            phone:"",
            address1: "",
            address2: "",
            isEditing: true };
        setSupplierData([...itemData, newSupplier]);
    };


    return (
        <div className="flex flex-col min-h-screen p-5 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <div className="flex items-center gap-6 mb-6">
                <Link to="/inventory" className="text-xl border p-2 rounded">
                    <span className="text-xl">⇐</span>
                </Link>
                <h1 className="text-3xl font-bold text-gray-100">Suppliers</h1>
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