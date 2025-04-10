import { Link } from "react-router-dom";

const Button = ({icon, title, link}) => {
    return (
        <Link 
            to={`/${link}`}
            className="w-54 h-36 flex items-center justify-center border border-gray-500 bg-gray-700 
                    hover:bg-gray-600 bg-opacity-30 transition-all text-white font-semibold rounded-2xl
                    shadow-md hover:shadow-lg hover:scale-105 active:scale-100">

            <div className="flex flex-col items-center">
                <div>{icon}</div>
                <div className="mt-2">{title}</div>
            </div>
        </Link>
    )
}

const InventorySettings = () => {
    return (
        <div className="flex flex-col min-h-screen p-5 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <div className="flex items-center gap-6 mb-6">
                <Link 
                    to="/inventory"
                    className="text-xl border p-2 rounded">
                    <span className="text-xl">⇐</span>
                </Link>
                <h1 className="text-3xl font-bold text-gray-100">Inventory Settings</h1>
            </div>
            <hr/>
            <div className="items-center flex flex-col justify-center sm:flex-row gap-4 mt-10">
                <Button icon={"🚚"} title={"Suppliers"} link={"suppliers"} />
                <Button icon={"📏"} title={"Measurement Units"} link={"measurement_units"} />
                <Button icon={"🏷"} title={"Categories"} link={"categories"} />``
            </div>
        </div>
    )
}

export default InventorySettings;