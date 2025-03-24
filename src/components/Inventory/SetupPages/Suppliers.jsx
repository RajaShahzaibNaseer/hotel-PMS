import { Link } from "react-router-dom";
import { useState } from "react";

const Suppliers = () => {
    const supplierHeaders = ["Supplier Name", "Supplier Email", "Actions"];
    const [supplierData, setSupplierData] = useState([
        { name: "ABC Supplies", email: "GZ2X1@example.com", isEditing: false },
        { name: "XYZ Traders", email: "2nTl1@example.com", isEditing: false },
    ]);

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
    const handleSave = (index) => {
        setSupplierData((prevData) =>
            prevData.map((item, i) =>
                i === index ? { ...item, isEditing: false } : item
            )
        );
    };

    // Delete an item
    const handleDelete = (index) => {
        setSupplierData((prevData) => prevData.filter((_, i) => i !== index));
    };

    return (
        <div className="flex flex-col min-h-screen p-5 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <div className="flex items-center gap-6 mb-6">
                <Link to="/inventory" className="text-xl border p-2 rounded">
                    <span className="text-xl">⇐</span>
                </Link>
                <h1 className="text-3xl font-bold text-gray-100">Suppliers</h1>
            </div>

            <table className="w-full border border-gray-700 text-center">
                <thead>
                    <tr className="bg-gray-800 text-gray-300">
                        {supplierHeaders.map((header, index) => (
                            <th key={index} className="border border-gray-700 p-3">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {supplierData.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border border-gray-700 hover:bg-gray-800">
                            {Object.keys(row).slice(0, 2).map((field, cellIndex) => (
                                <td key={cellIndex} className="border border-gray-700 p-3">
                                    {row.isEditing ? (
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

export default Suppliers;