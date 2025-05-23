import { Link } from "react-router-dom";

const Setup = () => {
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

    return (
        <>
            <h2 className="text-2xl font-semibold mb-4 text-center">Inventory Setup</h2>
            <hr/>
            <div className="flex justify-center mt-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Button icon={"📕"} title={"Recipes"} link={"recipes"} />
                    <Button icon={"📋"} title={"Menu"} link={"menu"} />
                    <Button icon={"📜"} title={"Ingredients & Sub Recipes"} link={"ingredients"} />
                    <Button icon={"📦"} title={"Finished Goods"} link={"finished_goods"} />
                    <Button icon={"🍴"} title={"Items"} link={"Items"} />
                    <Button icon={"⚙️"} title={"Inventory Settings"} link={"settings"} />
                </div>
            </div>
        </>
    )
}

export default Setup;