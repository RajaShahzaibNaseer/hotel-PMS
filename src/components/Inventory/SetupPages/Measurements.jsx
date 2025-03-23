import { Link } from "react-router-dom";

const Measurements = () => {

    const measurementHeaders = ["Name", "Actions"];
    const measurementData = [
        ["Kilograms"],
        ["Litres"],
        ["Pounds"],
        ["Grams"],
        ["Ounces"],
        ["Meters"],
    ]

    return (
        <div className="flex flex-col min-h-screen p-5 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-6">
                    <Link to="/inventory" className="text-xl border p-2 rounded">⇐</Link>
                    <h1 className="text-3xl font-bold">Measurement Units</h1>
                </div>
                <button className="bg-green-500 px-4 py-2 rounded" onClick={() => openModal("add")}>Add New</button>
            </div>
            <table className="w-full border border-gray-700 text-center">
                <thead>
                    <tr className="bg-gray-800 text-gray-300">
                        {measurementHeaders.map((header, index) => (
                            <th key={index} className="border border-gray-700 p-3">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {measurementData.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border border-gray-700 hover:bg-gray-800 transition-colors">
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="border border-gray-700 p-3">{cell}</td>
                            ))}
                            <td className="border border-gray-700 p-3">
                                <div className="flex justify-center gap-2">
                                    <button
                                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                                        onClick={() => openModal("edit", rowIndex)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                                        onClick={() => openModal("delete", rowIndex)}
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
    )
}

export default Measurements;