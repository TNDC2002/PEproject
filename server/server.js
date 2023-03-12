const express = require('express')
const app = express()

app.listen(5000, () => {
    console.log("Server running on port 5000")
})

// This is for testing if frontend can fetch data from backend
app.get("/api", (req, res) => {
    res.json({"members": ["Thanh", "Khang", "Viet", "Vinh", "Nam", "Bob", "Duy", "Chuong"]})
})