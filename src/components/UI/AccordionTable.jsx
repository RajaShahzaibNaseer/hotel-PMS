import React, { useState } from "react";

export default function AccordionTable({ tableData, tableHeaders }) {
  const [openCategories, setOpenCategories] = useState([]);

  const toggleCategory = (category) => {
    if (openCategories.includes(category)) {
      setOpenCategories(openCategories.filter((c) => c !== category));
    } else {
      setOpenCategories([...openCategories, category]);
    }
  };

  const isCategoryOpen = (category) => {
    return openCategories.includes(category);
  };

  return (
    <div className="w-full rounded-lg overflow-hidden border border-gray-700 shadow-lg">
      <table className="w-full border-collapse table-fixed">
        <thead>
          <tr className="bg-gray-800 text-gray-200">
            {tableHeaders.map((header, index) => (
              <th 
                key={index} 
                className="px-4 py-3 text-left font-semibold border-b border-gray-700"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((section, index) => (
            <React.Fragment key={index}>
              {/* Category Row */}
              <tr 
                className="bg-gray-800 hover:bg-gray-700 transition-all duration-200 cursor-pointer group w-full"
                onClick={() => toggleCategory(index)}
              >
                <td 
                  colSpan={tableHeaders.length} 
                  className="p-4 font-medium text-gray-200 w-full"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-2">
                      {isCategoryOpen(index) ? "▲" : "▼"}
                      <span className="transition-colors duration-200 ml-2">{section.category}</span>
                    </div>
                    <span className="text-xs bg-gray-700 px-2 py-1 rounded-full text-gray-300">
                      {section.items.length} items
                    </span>
                  </div>
                </td>
              </tr>

              {/* Sub-rows with smooth transition */}
              {isCategoryOpen(index) &&
                section.items.map((item, subIndex) => (
                  <tr 
                    key={subIndex} 
                    className="bg-gray-900 hover:bg-gray-800 border-b border-gray-800 transition-all duration-150"
                  >
                    <td className="px-4 py-3 pl-10 text-gray-300 border-r border-gray-800">{item.name}</td>
                    <td className="px-4 py-3 text-gray-300 border-r border-gray-800">{item.details}</td>
                    <td className="px-4 py-3 text-gray-300 font-medium">
                      <span className="bg-blue-900 text-blue-200 px-3 py-1 rounded-md">
                        {item.price} KES
                      </span>
                    </td>
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}