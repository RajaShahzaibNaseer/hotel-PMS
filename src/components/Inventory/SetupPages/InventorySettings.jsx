import { Link } from "react-router-dom";

const InventorySettings = () => {
    return (
        <div className="flex flex-col min-h-screen p-5 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <div className="flex items-center gap-6 mb-6">
                <Link 
                    to="/inventory"
                    className="flex justify-center items-center w-10 h-10 border border-gray-400 bg-gray-700 
                        hover:bg-gray-600 bg-opacity-40 transition-all text-white font-semibold rounded-lg 
                        shadow-sm hover:shadow-md">
                    <span className="text-xl">⇐</span>
                </Link>
                <h1 className="text-3xl font-bold text-gray-100">Inventory Settings</h1>
            </div>
        </div>
    )
}

export default InventorySettings;