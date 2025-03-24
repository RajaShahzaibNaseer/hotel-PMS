import { Link } from "react-router-dom";
import { useState } from "react";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                {children}
            </div>
        </div>
    );
};

const Recipes = () => {
    const tableHeader = ["Item", "Cost", "Sale Price", "Profitability", "Ingredients", "Track Consumption?", "Actions"];
    const initialTableData = [
        { item: "Sugar", cost: "120", salePrice: "150", profitability: "30%", ingredients: "Sugar, Flour", trackConsumption: "✔" },
        { item: "Flour", cost: "80", salePrice: "100", profitability: "20%", ingredients: "Sugar, Flour", trackConsumption: "✔" },
    ];

    const [tableData, setTableData] = useState(initialTableData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null); // 'add' or 'edit'
    const [selectedRow, setSelectedRow] = useState(null);
    const [formData, setFormData] = useState({
        item: "",
        cost: "",
        salePrice: "",
        profitability: "",
        ingredients: "",
        trackConsumption: "",
    });

    // Open modal for actions
    const openModal = (type, rowIndex = null) => {
        setModalType(type);
        setSelectedRow(rowIndex);

        if (type === "edit" && rowIndex !== null) {
            setFormData({
                item: tableData[rowIndex].item,
                cost: tableData[rowIndex].cost,
                salePrice: tableData[rowIndex].salePrice,
                profitability: tableData[rowIndex].profitability,
                ingredients: tableData[rowIndex].ingredients,
                trackConsumption: tableData[rowIndex].trackConsumption,
            });
        } else {
            setFormData({
                item: "",
                cost: "",
                salePrice: "",
                profitability: "",
                ingredients: "",
                trackConsumption: "",
            });
        }

        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalType(null);
    };

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission for add/edit
    const handleSubmit = () => {
        if (modalType === "add") {
            setTableData([...tableData, formData]);
        } else if (modalType === "edit" && selectedRow !== null) {
            const updatedData = [...tableData];
            updatedData[selectedRow] = formData;
            setTableData(updatedData);
        }
        closeModal();
    };

    // Handle delete confirmation
    const handleDeleteConfirm = (rowIndex) => {
        setTableData(tableData.filter((_, index) => index !== rowIndex));
        closeModal();
    };

    return (
        <div className="flex flex-col min-h-screen p-5 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-6">
                    <Link to="/inventory" className="text-xl border p-2 rounded">⇐</Link>
                    <h1 className="text-3xl font-bold">Recipes</h1>
                </div>
                <button className="bg-green-500 px-4 py-2 rounded" onClick={() => openModal("add")}>Add New</button>
            </div>

            <table className="w-full border border-gray-700 text-center">
                <thead>
                    <tr className="bg-gray-800 text-gray-300">
                        {tableHeader.map((header, index) => (
                            <th key={index} className="border border-gray-700 p-3">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border border-gray-700 hover:bg-gray-800">
                            {Object.values(row).map((cell, cellIndex) => (
                                <td key={cellIndex} className="border border-gray-700 p-3">{cell}</td>
                            ))}
                            <td className="border border-gray-700 p-3">
                                <button
                                    className="bg-green-500 px-4 py-2 rounded mr-2"
                                    onClick={() => openModal("edit", rowIndex)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 px-4 py-2 rounded"
                                    onClick={() => handleDeleteConfirm(rowIndex)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Reusable Modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {modalType === "delete" ? (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
                        <p>
                            Are you sure you want to delete <span className="font-bold">{formData.item}</span>?
                        </p>
                        <div className="flex justify-end gap-2 mt-4">
                            <button onClick={closeModal} className="bg-gray-600 px-4 py-2 rounded">Cancel</button>
                            <button onClick={() => handleDeleteConfirm(selectedRow)} className="bg-red-600 px-4 py-2 rounded">Delete</button>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold mb-4">
                            {modalType === "add" ? "Add New Recipe" : "Edit Recipe"}
                        </h2>
                        <form className="space-y-4">
                            <input
                                name="item"
                                type="text"
                                className="w-full p-2 bg-gray-700 rounded"
                                placeholder="Item"
                                value={formData.item}
                                onChange={handleInputChange}
                            />
                            <input
                                name="cost"
                                type="number"
                                className="w-full p-2 bg-gray-700 rounded"
                                placeholder="Cost"
                                value={formData.cost}
                                onChange={handleInputChange}
                            />
                            <input
                                name="salePrice"
                                type="number"
                                className="w-full p-2 bg-gray-700 rounded"
                                placeholder="Sale Price"
                                value={formData.salePrice}
                                onChange={handleInputChange}
                            />
                            <input
                                name="profitability"
                                type="text"
                                className="w-full p-2 bg-gray-700 rounded"
                                placeholder="Profitability"
                                value={formData.profitability}
                                onChange={handleInputChange}
                            />
                            <input
                                name="ingredients"
                                type="text"
                                className="w-full p-2 bg-gray-700 rounded"
                                placeholder="Ingredients"
                                value={formData.ingredients}
                                onChange={handleInputChange}
                            />
                            <input
                                name="trackConsumption"
                                type="text"
                                className="w-full p-2 bg-gray-700 rounded"
                                placeholder="Track Consumption?"
                                value={formData.trackConsumption}
                                onChange={handleInputChange}
                            />
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={closeModal} className="bg-gray-600 px-4 py-2 rounded">Cancel</button>
                                <button type="button" onClick={handleSubmit} className="bg-green-600 px-4 py-2 rounded">Save</button>
                            </div>
                        </form>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default Recipes;