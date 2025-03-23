const ViewConsignment = () => {
    const date = new Date();
    const tableHeaders = ["Sr. No.", "Item", "Opening Balance", "Supplier", "Supplier Price / Unit", "Unit Value", "Ordered Quantity", 
                    "Deliver To", "Received Quantity", "Closing Balance", "Total (KES)"];
    const tableData = [
        {
            srNo: 1,
            item: "Sugar",
            openingBalance: 50,
            supplier: "ABC Supplies",
            supplierPricePerUnit: 120,
            unitValue: "Kg",
            orderedQuantity: 20,
            deliverTo: "Store A",
            receivedQuantity: 20,
            closingBalance: 70,
            total: 2400, // 20 * 120
        },
        {
            srNo: 2,
            item: "Flour",
            openingBalance: 30,
            supplier: "XYZ Traders",
            supplierPricePerUnit: 80,
            unitValue: "Kg",
            orderedQuantity: 15,
            deliverTo: "Store B",
            receivedQuantity: 15,
            closingBalance: 45,
            total: 1200, // 15 * 80
        },
        {
            srNo: 3,
            item: "Rice",
            openingBalance: 100,
            supplier: "Sunshine Foods",
            supplierPricePerUnit: 150,
            unitValue: "Kg",
            orderedQuantity: 50,
            deliverTo: "Store C",
            receivedQuantity: 50,
            closingBalance: 150,
            total: 7500, // 50 * 150
        },
        {
            srNo: 4,
            item: "Cooking Oil",
            openingBalance: 20,
            supplier: "Healthy Oils Ltd.",
            supplierPricePerUnit: 250,
            unitValue: "Liters",
            orderedQuantity: 10,
            deliverTo: "Store A",
            receivedQuantity: 10,
            closingBalance: 30,
            total: 2500, // 10 * 250
        },
        {
            srNo: 5,
            item: "Salt",
            openingBalance: 40,
            supplier: "Pure Salt Co.",
            supplierPricePerUnit: 50,
            unitValue: "Kg",
            orderedQuantity: 25,
            deliverTo: "Store B",
            receivedQuantity: 25,
            closingBalance: 65,
            total: 1250, // 25 * 50
        },
    ];
    return (
        <div className="min-h-screen p-5 md:p-10 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <h2 className="text-xl md:text-2xl font-semibold mb-5 md:mb-7 text-center">Stock Requests</h2>
            
            {/* Meta Info Section */}
            <div className="flex flex-col items-center justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 m-5 md:m-10 text-sm md:text-base">
                    <p><b>Order No/Ref:</b> #12345</p>
                    <p><b>Ordered By:</b> Distribution</p>
                    <p><b>Created By:</b> John Doe</p>
                    <p><b>Received By:</b> John Doe</p>
                    <p><b>Received Date:</b> {date.toLocaleDateString()}</p>
                    <p><b>Invoice/Ref No:</b> INV000416/10000417</p>
                    <p><b>Comments:</b> Distribution</p>
                </div>

                {/* Responsive Table Container */}
                <div className="w-full overflow-x-auto">
                    <table className="w-full min-w-[600px] border-collapse border border-gray-700 text-center">
                        <thead>
                            <tr className="bg-gray-800 text-gray-300 text-xs md:text-sm">
                                {tableHeaders.map((header, index) => (
                                    <th key={index} className="border border-gray-700 px-2 py-3 md:px-4 md:py-4">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((section, index) => (
                                <tr key={index} className="bg-gray-900 hover:bg-gray-800 transition">
                                    <td className="border border-gray-700 px-2 py-2 md:px-4 md:py-3">{section.srNo}</td>
                                    <td className="border border-gray-700 px-2 py-2 md:px-4 md:py-3">{section.item}</td>
                                    <td className="border border-gray-700 px-2 py-2 md:px-4 md:py-3">{section.openingBalance}</td>
                                    <td className="border border-gray-700 px-2 py-2 md:px-4 md:py-3">{section.supplier}</td>
                                    <td className="border border-gray-700 px-2 py-2 md:px-4 md:py-3">{section.supplierPricePerUnit}</td>
                                    <td className="border border-gray-700 px-2 py-2 md:px-4 md:py-3">{section.unitValue}</td>
                                    <td className="border border-gray-700 px-2 py-2 md:px-4 md:py-3">{section.orderedQuantity}</td>
                                    <td className="border border-gray-700 px-2 py-2 md:px-4 md:py-3">{section.deliverTo}</td>
                                    <td className="border border-gray-700 px-2 py-2 md:px-4 md:py-3">{section.receivedQuantity}</td>
                                    <td className="border border-gray-700 px-2 py-2 md:px-4 md:py-3">{section.closingBalance}</td>
                                    <td className="border border-gray-700 px-2 py-2 md:px-4 md:py-3">{section.total.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex justify-between m-5">
                <button className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md shadow-md transition">Close</button>
                <button className="px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-md shadow-md transition">⧉ Duplicate</button>
            </div>
        </div>
    );
};

export default ViewConsignment;