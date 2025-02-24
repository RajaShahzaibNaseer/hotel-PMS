import { useState, useEffect } from "react";

const Blocks = () => {
  const [blocks, setBlocks] = useState([]);
  const [blockname, setBlockName] = useState("");

  // Adding a block
  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (!blockname.trim()) return; // Prevent empty submissions

    try {
      const body = { blockname };
      await fetch("http://localhost:5000/blocks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setBlockName(""); // Clear input after adding
      getBlocks(); // Refresh the list
    } catch (error) {
      console.error(error.message);
    }
  };

  // Deleting a block
  const deleteBlock = async (id) => {
    try {
      await fetch(`http://localhost:5000/blocks/${id}`, { method: "DELETE" });
      setBlocks(blocks.filter((block) => block.blockid !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  // Fetching blocks
  const getBlocks = async () => {
    try {
      const response = await fetch("http://localhost:5000/blocks");
      const jsonData = await response.json();
      setBlocks(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getBlocks();
  }, []);

  return (
    <div className="min-h-screen mx-auto p-6 bg-gray-900 text-white shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Manage Blocks</h2>

      {/* Add Block Form */}
      <form onSubmit={onSubmitForm} className="flex gap-3 mb-6">
        <input
          className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          type="text"
          value={blockname}
          placeholder="Enter Block Name"
          onChange={(e) => setBlockName(e.target.value)}
        />
        <button
          type="submit"
          className="px-5 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition"
        >
          Add
        </button>
      </form>

      {/* Blocks Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-700 text-center">
          <thead>
            <tr className="bg-gray-800 text-gray-300">
              <th className="border border-gray-700 p-3">Block ID</th>
              <th className="border border-gray-700 p-3">Block Name</th>
              <th className="border border-gray-700 p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blocks.length > 0 ? (
              blocks.map((block) => (
                <tr key={block.blockid} className="bg-gray-900 hover:bg-gray-800 transition">
                  <td className="border border-gray-700 p-3">{block.blockid}</td>
                  <td className="border border-gray-700 p-3">{block.blockname}</td>
                  <td className="border border-gray-700 p-3">
                    <button
                      onClick={() => deleteBlock(block.blockid)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-4 text-gray-400">
                  No blocks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Blocks;
