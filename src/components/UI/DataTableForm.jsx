const DataTableForm = ({ 
    title, 
    formFields, 
    onFormSubmit, 
    tableHeaders, 
    tableData, 
    dataKeys, 
    renderActions 
  }) => {
  return (
    <div className="min-h-screen mx-auto p-6 bg-gray-900 text-white shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>

      {/* Dynamic Form */}
      <form onSubmit={onFormSubmit} className="flex flex-wrap gap-3 mb-6">
        {formFields.map((field, index) => (
          <input
            key={index}
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            value={field.value}
            onChange={field.onChange}
            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        ))}
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition"
        >
          Add Data
        </button>
      </form>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-700 text-center">
          <thead>
            <tr className="bg-gray-800 text-gray-300">
              {tableHeaders.map((header, index) => (
                <th key={index} className="border border-gray-700 p-3">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              tableData.map((row, rowIndex) => (
                <tr key={rowIndex} className="bg-gray-900 hover:bg-gray-800 transition">
                  {dataKeys.map((key, colIndex) => (
                    <td key={colIndex} className="border border-gray-700 p-3">{row[key]}</td>
                  ))}
                  <td className="border border-gray-700 p-3">
                    {renderActions && renderActions(row)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={tableHeaders.length} className="p-4 text-gray-400">
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTableForm;
