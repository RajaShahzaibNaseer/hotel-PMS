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
const FinishedGoods = () => {
    const tableHeader = ["Name", "Unit Name", "Cost/Unit (KES)", "Supplier", "Actions"];
    const [tableData, setTableData] = useState([
        ["Sugar", "Kg", "120", "ABC Supplies"],
        ["Flour", "Kg", "80", "XYZ Traders"]
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [itemData, setItemData] = useState({ name: "", unit: "", cost: "", supplier: "" });

    // Open modal for actions
    const openModal = (index = null) => {
        setCurrentIndex(index);

        if (index !== null) {
            const [name, unit, cost, supplier] = tableData[index];
            setItemData({ name, unit, cost, supplier });
        } else {
            setItemData({ name: "", unit: "", cost: "", supplier: "" });
        }

        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    // Handle input change
    const handleInputChange = (e) => {
        setItemData({ ...itemData, [e.target.name]: e.target.value });
    };

    // Add new item
    const addItem = () => {
        setTableData([...tableData, [itemData.name, itemData.unit, itemData.cost, itemData.supplier]]);
        closeModal();
    };

    // Edit existing item
    const editItem = () => {
        const updatedTable = [...tableData];
        updatedTable[currentIndex] = [itemData.name, itemData.unit, itemData.cost, itemData.supplier];
        setTableData(updatedTable);
        closeModal();
    };

    // Delete item
    const deleteItem = () => {
        setTableData(tableData.filter((_, i) => i !== currentIndex));
        closeModal();
    };

    return (
        <div className="flex flex-col min-h-screen p-5 bg-gray-900 text-white">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-6">
                    <Link to="/inventory" className="text-xl border p-2 rounded">⇐</Link>
                    <h1 className="text-3xl font-bold">Finished Goods</h1>
                </div>
                <button className="bg-green-500 px-4 py-2 rounded" onClick={() => openModal()}>Add New</button>
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
                            <tr key={rowIndex} className="border border-gray-700 text-gray-200 hover:bg-gray-800 transition">
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="border border-gray-700 px-2 py-3 md:px-4 md:py-4">
                                        {cell}
                                    </td>
                                ))}
                                <td className="border border-gray-700 px-2 py-3 md:px-4 md:py-4">
                                    <button
                                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow-md mr-2 transition"
                                        onClick={() => openModal(rowIndex)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-md transition"
                                        onClick={() => {
                                            setCurrentIndex(rowIndex);
                                            deleteItem();
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Custom Modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2 className="text-2xl font-bold mb-4">
                    {currentIndex !== null ? "Edit Item" : "Add New Item"}
                </h2>
                <div className="flex flex-col gap-3">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={itemData.name}
                        onChange={handleInputChange}
                        className="p-2 bg-gray-700 rounded"
                    />
                    <input
                        type="text"
                        name="unit"
                        placeholder="Unit Name"
                        value={itemData.unit}
                        onChange={handleInputChange}
                        className="p-2 bg-gray-700 rounded"
                    />
                    <input
                        type="text"
                        name="cost"
                        placeholder="Cost/Unit (KES)"
                        value={itemData.cost}
                        onChange={handleInputChange}
                        className="p-2 bg-gray-700 rounded"
                    />
                    <input
                        type="text"
                        name="supplier"
                        placeholder="Supplier"
                        value={itemData.supplier}
                        onChange={handleInputChange}
                        className="p-2 bg-gray-700 rounded"
                    />
                </div>
                <div className="flex justify-end mt-4 gap-3">
                    {currentIndex !== null ? (
                        <>
                            <button
                                className="bg-green-500 px-4 py-2 rounded"
                                onClick={editItem}
                            >
                                Save
                            </button>
                            <button
                                className="bg-red-500 px-4 py-2 rounded"
                                onClick={deleteItem}
                            >
                                Delete
                            </button>
                        </>
                    ) : (
                        <button
                            className="bg-green-500 px-4 py-2 rounded"
                            onClick={addItem}
                        >
                            Add
                        </button>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default FinishedGoods;