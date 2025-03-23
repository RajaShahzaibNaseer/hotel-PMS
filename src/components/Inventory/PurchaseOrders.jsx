import { useState } from "react";
import Modal from "../UI/Modal";


const setTableHeader = ["Order No.", "Item", "Created By", "Sent By", "Ordered By", "Due Date", "Total (KES)", "Actions"];
const sentTableData = [
    ["#123", "Sugar", "John Doe", "John Doe", "John Doe", "2023-06-20", "1200"],
    ["#456", "Flour", "Jane Smith", "Jane Smith", "Jane Smith", "2023-06-21", "800"],
    ["#789", "Salt", "Bob Johnson", "Bob Johnson", "Bob Johnson", "2023-06-22", "600"],
];

const newTableHeader = ["Sr. No.", "Item", "Stock on Hand", "Supplier", "Price/Unit", "Unit Value", "Quantity", "Deliver to", "Total (KES)", "Actions"];
const newTableData = [
    ["1", "Sugar", "50", "ABC Supplies", "120", "Kg", "20", "Store A", "2400"],
    ["2", "Flour", "30", "XYZ Traders", "80", "Kg", "15", "Store B", "1200"],
    ["3", "Salt", "40", "XYZ Traders", "60", "Kg", "10", "Store C", "600"],
]

const receivedTableHeader = ["Order No.", "Inv Ref. No.", "Item", "Created By", "Ordered By", "Due Date", "Received Date", "Total (KES)", "Actions"];
const receivedTableData = [
    ["#123", "#456", "Sugar", "John Doe", "John Doe", "2023-06-20", "2023-06-22", "1200"],
    ["#456", "#789", "Flour", "Jane Smith", "Jane Smith", "2023-06-21", "2023-06-23", "800"],
    ["#789", "#123", "Salt", "Bob Johnson", "Bob Johnson", "2023-06-22", "2023-06-24", "600"],
];

const SentPurchaseOrders = () => {
    return (
        <table className="w-full border border-gray-700 text-center">
            <thead>
                <tr className="bg-gray-800 text-gray-300">
                    {setTableHeader.map((header, index) => (
                        <th key={index} className="border border-gray-700 p-3">{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {sentTableData.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border border-gray-700 hover:bg-gray-800">
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="border border-gray-700 p-3">{cell}</td>
                        ))}
                        <td className="border flex flex-col border-gray-700 p-3 gap-2">
                            <button
                                className="bg-blue-500 px-4 py-2 rounded"
                                onClick={() => openModal("edit", rowIndex)}
                            >
                                Open
                            </button>
                            <button
                                className="bg-green-500 px-4 py-2 rounded"
                                onClick={() => openModal("delete", rowIndex)}
                            >
                                Receive
                            </button>
                            <button
                                className="bg-yellow-500 px-4 py-2 rounded"
                                onClick={() => openModal("edit", rowIndex)}
                            >
                                Re-Send
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
    )
}

const NewPurchaseOrder = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <button className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 mb-4">
                <span className="font-extrabold">+</span>New Purchase Order
            </button>
            <table className="w-full border border-gray-700 text-center">
                <thead>
                    <tr className="bg-gray-800 text-gray-300">
                        {newTableHeader.map((header, index) => (
                            <th key={index} className="border border-gray-700 p-3">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {newTableData.map((row, rowIndex) => (
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

const ReceivedPurchaseOrder = () => {
    return (
        <>
            <table className="w-full border border-gray-700 text-center">
                <thead>
                    <tr className="bg-gray-800 text-gray-300">
                        {setTableHeader.map((header, index) => (
                            <th key={index} className="border border-gray-700 p-3">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sentTableData.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border border-gray-700 hover:bg-gray-800">
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="border border-gray-700 p-3">{cell}</td>
                            ))}
                            <td className="border flex flex-col border-gray-700 p-3 gap-2">
                                <button
                                    className="bg-blue-500 px-4 py-2 rounded"
                                    onClick={() => openModal("edit", rowIndex)}
                                >
                                    Open
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

const PurchaseOrders = () => {
    const [tab, setTab] = useState(0);

    const tabs = [
        { label: "Open Purchase Order", component: <NewPurchaseOrder /> },
        { label: "Sent Purchase Order", component: <SentPurchaseOrders /> },
        { label: "Received Purchase Order", component: <ReceivedPurchaseOrder /> },
    ];

    return (
        <>
            <h2 className="text-2xl font-semibold mb-4 text-center">Purchase Orders</h2>

            {/* Tabs */}
            <div className="flex border-b border-gray-700">
                {tabs.map((tabItem, index) => (
                    <button
                        key={index}
                        onClick={() => setTab(index)}
                        className={`flex-1 py-2 text-center transition ${
                            tab === index
                                ? "border-b-2 border-blue-500 text-blue-400 font-semibold"
                                : "text-gray-400 hover:text-white"
                        }`}
                    >
                        {tabItem.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="mt-4 p-4 bg-gray-800 rounded-lg">{tabs[tab].component}</div>
        </>
    );
};

export default PurchaseOrders;