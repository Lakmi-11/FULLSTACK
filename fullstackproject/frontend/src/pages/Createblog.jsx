import { useState } from "react";
import { createPost } from "../api";

export function Createblog() {
    const [date, setDate] = useState("");
    const [Weight, setWeight] = useState("");
    const [inventoryManagerName, setInventoryManagerName] = useState("");
    const [CustomerName, setCustomerName] = useState("");
    const [Materials, setMaterials] = useState("");


    function handleSubmit(e) {
        e.preventDefault(); // Prevent page refresh
    
        let submitObject = {
            date:new Date(),
            Weight: Weight,
            inventoryManagerName: inventoryManagerName,
            CustomerName: CustomerName,
            Materials: Materials,
        };
    
        console.log("Submitted data:", submitObject);
        createPost(submitObject)
    }

    return (
        <form onSubmit={handleSubmit}>

            <label>Date: </label>
            <input onChange={(e) => setDate(e.target.value)} maxLength={100} required name="date" />

            <label>Weight: </label>
            <input onChange={(e) => setWeight(e.target.value)} maxLength={100} required name="Weight" />

            <label>Inventory Manager Name: </label>
            <input onChange={(e) => setInventoryManagerName(e.target.value)} maxLength={100} required name="inventoryManagerName" />

            <label>Customer Name: </label>
            <input onChange={(e) => setCustomerName(e.target.value)} maxLength={100} required name="CustomerName" />
            
            <label>Materials: </label>
            <input onChange={(e) => setMaterials(e.target.value)} maxLength={100} required name="Materials" />
           
            <button type="submit">Submit</button>
        </form>
    );
}


