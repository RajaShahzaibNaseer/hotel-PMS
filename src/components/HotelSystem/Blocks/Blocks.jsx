import { useState, useEffect } from "react";
import DataTableForm from "../../UI/DataTableForm";

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
    <DataTableForm
      title="Manage Blocks"
      formFields={[
        {
          name: "blockname",
          type: "text",
          placeholder: "Enter Block Name",
          value: blockname,
          onChange: (e) => setBlockName(e.target.value),
        }
      ]}
      onFormSubmit={onSubmitForm}
      tableHeaders={["Block ID", "Block Name"]}
      tableData={blocks}
      dataKeys={["id", "blockname"]}
      renderActions={(row) => (
        <button
          onClick={() => deleteBlock(row.blockid)}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md transition"
        >
          Delete
        </button>
      )}
    />
  );
};

// <DataTableForm
//   title="Manage Blocks"
//   formFields={[{ name: "blockname", placeholder: "Enter Block Name" }]}
//   formValues={{ blockname }}
//   onFormChange={(e) => setBlockName(e.target.value)}
//   onFormSubmit={onSubmitForm}
//   tableHeaders={["Block ID", "Block Name"]}
//   tableData={blocks}
//   dataKeys={["blockid", "blockname"]}
//   onDelete={deleteBlock}
// />


export default Blocks;
