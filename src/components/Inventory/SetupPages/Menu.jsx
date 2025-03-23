import { Link } from "react-router-dom";
import { useState } from "react";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                {children}
                <button
                    className="mt-4 bg-gray-500 px-4 py-2 rounded"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

const Menu = () => {
    const tableHeader = ["Name", "Price (KES)", "Actions"];
    const initialTableData = [
        ["3 TUSKER LITE OFFER", "120"],
        ["3 TUSKER MALT OFFER", "80"],
        ["3 WHITECAP LAGER OFFER", "120"],
    ];
    const [tableData, setTableData] = useState(initialTableData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null); // 'add', 'edit', or 'delete'
    const [selectedRow, setSelectedRow] = useState(null);
    const [formData, setFormData] = useState({ name: "", price: "" });

    // Open modal for actions
    const openModal = (type, rowIndex = null) => {
        setModalType(type);
        setSelectedRow(rowIndex);

        if (type === "edit" && rowIndex !== null) {
            setFormData({ name: tableData[rowIndex][0], price: tableData[rowIndex][1] });
        } else if (type === "delete" && rowIndex !== null) {
            setFormData({ name: tableData[rowIndex][0], price: tableData[rowIndex][1] });
        } else {
            setFormData({ name: "", price: "" });
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
            setTableData([...tableData, [formData.name, formData.price]]);
        } else if (modalType === "edit" && selectedRow !== null) {
            const updatedData = [...tableData];
            updatedData[selectedRow] = [formData.name, formData.price];
            setTableData(updatedData);
        }
        closeModal();
    };

    // Handle delete confirmation
    const handleDeleteConfirm = () => {
        setTableData(tableData.filter((_, index) => index !== selectedRow));
        closeModal();
    };

    return (
        <div className="flex flex-col min-h-screen p-5 bg-gray-900 text-white">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-6">
                    <Link to="/inventory" className="text-xl border p-2 rounded">⇐</Link>
                    <h1 className="text-3xl font-bold">Menu</h1>
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
                            {row.map((cell, cellIndex) => (
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
                                    onClick={() => openModal("delete", rowIndex)}
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
                            Are you sure you want to delete <span className="font-bold">{formData.name}</span>?
                        </p>
                        <div className="flex justify-end gap-2 mt-4">
                            <button onClick={closeModal} className="bg-gray-600 px-4 py-2 rounded">Cancel</button>
                            <button onClick={handleDeleteConfirm} className="bg-red-600 px-4 py-2 rounded">Delete</button>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold mb-4">
                            {modalType === "add" ? "Add New Menu Item" : "Edit Menu Item"}
                        </h2>
                        <form className="space-y-4">
                            <input
                                name="name"
                                type="text"
                                className="w-full p-2 bg-gray-700 rounded"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                            <input
                                name="price"
                                type="number"
                                className="w-full p-2 bg-gray-700 rounded"
                                placeholder="Price (KES)"
                                value={formData.price}
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

export default Menu;