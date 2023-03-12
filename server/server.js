const express = require('express'),
PORT = 5000,
app = express()

app.listen(PORT, () => {
    console.log('Server started running on ' + PORT)
})

// This is for testing if frontend can fetch data from backend
app.get("/api", (req, res) => {
    res.json({"members": ["Thanh", "Khang", "Viet", "Vinh", "Nam", "Bob", "Duy", "Chuong"]})
})