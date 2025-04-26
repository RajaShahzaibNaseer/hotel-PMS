import AccordionTable from "../UI/AccordionTable";
import { useEffect, useState } from "react";
import { API_URL } from "../../config";

const StockOnHand = () => {
  const [tableData, setTableData] = useState([]);
  const tableHeaders = ["Item", "Details", "Stock Value", "Status", "Price"];

  const mergeJson = (stockData, itemsData) => {
    return stockData.map(stockItem => {
      const matchedItem = itemsData.find(item => item.id === stockItem.item_id);
      return {
        ...stockItem,
        item_name: matchedItem?.name || 'Unknown',
        item_price: matchedItem?.price || 0,
        item_barcode: matchedItem?.barcode || '',
        item_description: matchedItem?.description || '',
        item_reorder_level: matchedItem?.reorder_level || 0
      };
    });
  };
  
  // Usage:
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/stocks`);
        const items = await fetch(`${API_URL}/items`);
        const jsonData = await response.json();
        const itemsData = await items.json();
        const mergedData = mergeJson(jsonData, itemsData);
        console.log(mergedData)
        setTableData(mergedData);
      } catch (error) {
        console.error("Failed to fetch stock data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4 text-center">Stock on Hand</h2>
      <AccordionTable tableHeaders={tableHeaders} tableData={tableData} />
    </>
  );
};

export default StockOnHand;
