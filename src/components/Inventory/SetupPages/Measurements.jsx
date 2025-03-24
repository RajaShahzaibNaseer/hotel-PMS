import { Link } from "react-router-dom";
import { useState } from "react";

const Measurements = () => {
    const measurementHeaders = ["Name", "Actions"];
    const [measurementData, setMeasurementData] = useState([
        { name: "Kilograms", isEditing: false },
        { name: "Litres", isEditing: false },
        { name: "Pounds", isEditing: false },
        { name: "Grams", isEditing: false },
        { name: "Ounces", isEditing: false },
        { name: "Meters", isEditing: false },
    ]);

    // Toggle edit mode for a row
    const handleEditToggle = (index) => {
        setMeasurementData((prevData) =>
            prevData.map((item, i) =>
                i === index ? { ...item, isEditing: !item.isEditing } : item
            )
        );
    };

    // Handle input change
    const handleInputChange = (index, value) => {
        setMeasurementData((prevData) =>
            prevData.map((item, i) =>
                i === index ? { ...item, name: value } : item
            )
        );
    };

    // Save edited item
    const handleSave = (index) => {
        setMeasurementData((prevData) =>
            prevData.map((item, i) =>
                i === index ? { ...item, isEditing: false } : item
            )
        );
    };

    // Delete an item
    const handleDelete = (index) => {
        setMeasurementData((prevData) => prevData.filter((_, i) => i !== index));
    };

    // Add a new measurement unit
    const handleAddNew = () => {
        const newMeasurement = { name: "New Unit", isEditing: true };
        setMeasurementData([...measurementData, newMeasurement]);
    };

    return (
        <div className="flex flex-col min-h-screen p-5 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-6">
                    <Link to="/inventory" className="text-xl border p-2 rounded">⇐</Link>
                    <h1 className="text-3xl font-bold">Measurement Units</h1>
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
                        {measurementHeaders.map((header, index) => (
                            <th key={index} className="border border-gray-700 p-3">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {measurementData.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border border-gray-700 hover:bg-gray-800 transition-colors">
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

export default Measurements;