import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../../../config";

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
    const tableHeader = ["id", "name", "Cost", "Sale Price", "Profitability", "Track Consumption?", "Actions"];
    // const initialTableData = [
    //     { id: "1" ,name: "Sugar", cost: "120", salePrice: "150", profitability: "30%", ingredients: "Sugar, Flour", trackConsumption: "✔" },
    //     { id: "2" ,name: "Flour", cost: "80", salePrice: "100", profitability: "20%", ingredients: "Sugar, Flour", trackConsumption: "✔" },
    // ];

    const [tableData, setTableData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null); // 'add' or 'edit'
    const [selectedRow, setSelectedRow] = useState(null);
    const [refresh,setRefresh] = useState(true);
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        cost: "",
        salePrice: "",
        profitability: "",
        ingredients: "",
        trackConsumption: "",
    });

    //fetching data from database
    const fetchData = async () =>
    {
        try {
            const response = await fetch(`${API_URL}/recipe`);
            const jsonData = await response.json();
            setTableData(jsonData);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() =>{
        if(refresh)
        {
            fetchData();
            setRefresh(false);
        }
    });

    // Open modal for actions
    const openModal = (type, rowIndex = null) => {
        setModalType(type);
        setSelectedRow(rowIndex);

        if (type === "edit" && rowIndex !== null) {
            setFormData({
                id: tableData[rowIndex].id,
                name: tableData[rowIndex].name,
                cost: tableData[rowIndex].cost,
                salePrice: tableData[rowIndex].salePrice,
                profitability: tableData[rowIndex].profitability,
                trackConsumption: !!tableData[rowIndex].trackConsumption,
            });
        } else if(type ==="delete" && rowIndex !== null) {
            setFormData({
                id: tableData[rowIndex].id,
                name: tableData[rowIndex].name,
                cost: tableData[rowIndex].cost,
                salePrice: tableData[rowIndex].salePrice,
                profitability: tableData[rowIndex].profitability,
                trackConsumption: !!tableData[rowIndex].trackConsumption,
            });
        } else {
            // setFormData({
            //     id: "",
            //     name: "",
            //     cost: "",
            //     salePrice: "",
            //     profitability: "",
            //     ingredients: "",
            //     trackConsumption: "",
            // })
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
    const handleSubmit = async () => {
        if (modalType === "add") {
            try {
                const respone = await fetch(`${API_URL}/recipe`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        cost: formData.cost,
                        salePrice: formData.salePrice,
                        profitability: Number(formData.salePrice) - Number(formData.cost),
                        trackConsumption: !!formData.trackConsumption,
                    })
                });
            } catch (error) {
                console.log(error.message);
            }
            setRefresh(true);
        } else if (modalType === "edit" && selectedRow !== null) {
            try {
                const response = await fetch(`${API_URL}/recipe/${formData.id}`,{
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        cost: formData.cost,
                        salePrice: formData.salePrice,
                        profitability: Number(formData.salePrice) - Number(formData.cost),
                        trackConsumption: !!formData.trackConsumption,
                    })
                });
                setRefresh(true);
            } catch (error) {
                console.log(error.message);
            }
        }
        closeModal();
    }

    // Handle delete confirmation
    const handleDeleteConfirm = async() => {
        try {
            const response = await fetch(`${API_URL}/recipe/${formData.id}`,{
                method: "DELETE"
            });
            setRefresh(true);
        } catch (error) {
            console.log(error.message);
        }
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
                        {Object.keys(row).filter(field => field !== "created_at").map((field, cellIndex) => (
                            <td key={cellIndex} className="border border-gray-700 p-3">
                                {field === "trackConsumption"
                                    ? (row[field] ? "✔️" : "❌")
                                    : row[field]}
                            </td>
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
                            {modalType === "add" ? "Add New Recipe" : "Edit Recipe"}
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
                            <div className="flex items-center space-x-2">
                                <input
                                    id="trackConsumption"
                                    name="trackConsumption"
                                    type="checkbox"
                                    checked={formData.trackConsumption}
                                    onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        trackConsumption: e.target.checked,
                                    }))
                                    }
                                />
                                <label htmlFor="trackConsumption">Track Consumption?</label>
                            </div>
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