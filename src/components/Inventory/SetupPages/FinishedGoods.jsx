import { Link } from "react-router-dom";
import { useState } from "react";

const FinishedGoods = () => {
    const tableHeader = ["Name", "Unit Name", "Cost/Unit (KES)", "Supplier", "Reorder Level", "Actions"];
    const [tableData, setTableData] = useState([
        { name: "Sugar", unit: "Kg", cost: "120", supplier: "ABC Supplies", reorderLevel: "5", isEditing: false },
        { name: "Flour", unit: "Kg", cost: "80", supplier: "XYZ Traders", reorderLevel: "10", isEditing: false }
    ]);

    const handleEditToggle = (index) => {
        setTableData(prevData => prevData.map((item, i) => i === index ? { ...item, isEditing: !item.isEditing } : item));
    };

    const handleInputChange = (index, field, value) => {
        setTableData(prevData => prevData.map((item, i) => i === index ? { ...item, [field]: value } : item));
    };

    const handleSave = (index) => {
        setTableData(prevData => prevData.map((item, i) => i === index ? { ...item, isEditing: false } : item));
    };

    const handleDelete = (index) => {
        setTableData(prevData => prevData.filter((_, i) => i !== index));
    };

    return (
        <div className="flex flex-col min-h-screen p-5 bg-gray-900 text-white">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-6">
                    <Link to="/inventory" className="text-xl border p-2 rounded">⇐</Link>
                    <h1 className="text-3xl font-bold">Finished Goods</h1>
                </div>
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
                        {tableData.map((item, index) => (
                            <tr key={index} className="border border-gray-700 text-gray-200 hover:bg-gray-800 transition">
                                {Object.keys(item).slice(0, 5).map((field, cellIndex) => (
                                    <td key={cellIndex} className="border border-gray-700 px-2 py-3 md:px-4 md:py-4">
                                        {item.isEditing ? (
                                            <input
                                                type="text"
                                                value={item[field]}
                                                onChange={(e) => handleInputChange(index, field, e.target.value)}
                                                className="p-2 bg-gray-700 rounded w-full"
                                            />
                                        ) : (
                                            item[field]
                                        )}
                                    </td>
                                ))}
                                <td className="border border-gray-700 px-2 py-3 md:px-4 md:py-4">
                                    {item.isEditing ? (
                                        <>
                                            <button
                                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow-md mr-2"
                                                onClick={() => handleSave(index)}
                                            >
                                                Save
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-md mr-2"
                                                onClick={() => handleEditToggle(index)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-md"
                                                onClick={() => handleDelete(index)}
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