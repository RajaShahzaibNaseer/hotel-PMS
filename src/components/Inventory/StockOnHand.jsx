import AccordionTable from "../UI/AccordionTable";


const StockOnHand = () => {
    const tableHeaders = ["Item", "Stock On Hand", "Stock Value"];
    const tableData = [
        { 
            category: "Drinks", 
            items: [{ name: "Item A", details: "Details A", price: "10" }, { name: "Item B", details: "Details B", price: "15" }]
        },
        { 
            category: "Food", 
            items: [{ name: "Item C", details: "Details C", price: "20" }, { name: "Item D", details: "Details D", price: "25" }] 
        },
      ];
    return (
        <>
            <h2 className="text-2xl font-semibold mb-4 text-center">Stock on Hand</h2>
            {/* <Table tableHeaders={tableHeaders} tableData={tableData}/> */}
            <AccordionTable tableHeaders={tableHeaders} tableData={tableData}/>
        </>
    )
}

export default StockOnHand;