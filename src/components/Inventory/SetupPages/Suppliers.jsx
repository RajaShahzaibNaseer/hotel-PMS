import { Link } from "react-router-dom";

const Suppliers = () => {

    const supplierHeaders = ["Supplier Name", "Supplier Email", "Actions"];
    const supplierData = [
        ["ABC Supplies", "GZ2X1@example.com"],
        ["XYZ Traders", "2nTl1@example.com"],
    ]

    return (
        <div className="flex flex-col min-h-screen p-5 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <div className="flex items-center gap-6 mb-6">
                <Link 
                    to="/inventory"
                    className="text-xl border p-2 rounded">
                    <span className="text-xl">⇐</span>
                </Link>
                <h1 className="text-3xl font-bold text-gray-100">Suppliers</h1>
            </div>
            <table className="w-full border border-gray-700 text-center">
                <thead>
                    <tr className="bg-gray-800 text-gray-300">
                        {supplierHeaders.map((header, index) => (
                            <th key={index} className="border border-gray-700 p-3">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {supplierData.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border border-gray-700 hover:bg-gray-800">
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="border border-gray-700 p-3">{cell}</td>
                            ))}
                            <td className="border flex flex-col border-gray-700 p-3 gap-2">
                                <button
                                    className="bg-green-500 px-4 py-2 rounded"
                                    onClick={() => openModal("edit", rowIndex)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 px-4 py-2 rounded"
                                    onClick={() => openModal("delete", rowIndex)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Suppliers;