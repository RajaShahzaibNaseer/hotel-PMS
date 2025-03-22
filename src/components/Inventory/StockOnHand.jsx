import AccordionTable from "../UI/AccordionTable";


const StockOnHand = () => {
    const tableHeaders = ["Item", "Stock On Hand", "Stock Value", "Actions"];
    const tableData = [
        {
            category: "Drinks",
            items: [
                {
                    name: "Coke",
                    details: "Coca-Cola, 500ml",
                    quantity: 20,
                    price: 20,
                    history: [
                        {
                            date: "2024-03-01",
                            location: "Warehouse A",
                            openingBalance: 30,
                            out: 10,
                            in: 0,
                            closingBalance: 20,
                            unit: "bottles",
                            status: "Sold",
                            movementType: "Sale",
                            source: "POS System",
                            otherDetails: "Sold at Store 1",
                            staff: "John Doe"
                        },
                        {
                            date: "2024-02-15",
                            location: "Warehouse A",
                            openingBalance: 40,
                            out: 10,
                            in: 0,
                            closingBalance: 30,
                            unit: "bottles",
                            status: "Sold",
                            movementType: "Sale",
                            source: "POS System",
                            otherDetails: "Sold at Store 2",
                            staff: "Jane Doe"
                        }
                    ]
                },
                {
                    name: "Pepsi",
                    details: "Pepsi, 500ml",
                    quantity: 15,
                    price: 50,
                    history: [
                        {
                            date: "2024-03-01",
                            location: "Warehouse B",
                            openingBalance: 25,
                            out: 10,
                            in: 0,
                            closingBalance: 15,
                            unit: "bottles",
                            status: "Sold",
                            movementType: "Sale",
                            source: "POS System",
                            otherDetails: "Sold at Store 3",
                            staff: "John Smith"
                        },
                        {
                            date: "2024-02-15",
                            location: "Warehouse B",
                            openingBalance: 35,
                            out: 10,
                            in: 0,
                            closingBalance: 25,
                            unit: "bottles",
                            status: "Sold",
                            movementType: "Sale",
                            source: "POS System",
                            otherDetails: "Sold at Store 4",
                            staff: "Jane Smith"
                        }
                    ]
                }
            ]
        },
        {
            category: "Snacks",
            items: [
                {
                    name: "Chips",
                    details: "Lays, 150g",
                    quantity: 10,
                    price: 30,
                    history: [
                        {
                            date: "2024-03-01",
                            location: "Warehouse C",
                            openingBalance: 20,
                            out: 10,
                            in: 0,
                            closingBalance: 10,
                            unit: "packs",
                            status: "Sold",
                            movementType: "Sale",
                            source: "POS System",
                            otherDetails: "Sold at Store 5",
                            staff: "Mark Lee"
                        },
                        {
                            date: "2024-02-15",
                            location: "Warehouse C",
                            openingBalance: 30,
                            out: 10,
                            in: 0,
                            closingBalance: 20,
                            unit: "packs",
                            status: "Sold",
                            movementType: "Sale",
                            source: "POS System",
                            otherDetails: "Sold at Store 6",
                            staff: "Anna Kim"
                        }
                    ]
                }
            ]
        }
    ];
    
      
    return (
        <>
            <h2 className="text-2xl font-semibold mb-4 text-center">Stock on Hand</h2>
            <AccordionTable tableHeaders={tableHeaders} tableData={tableData}/>
        </>
    )
}

export default StockOnHand;