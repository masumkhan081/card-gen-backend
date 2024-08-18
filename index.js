const express = require('express');
const app = express();
// const fetch = require('node-fetch');
const axios = require('axios');
const PORT = 3000;
app.use(express.json());
const cors = require('cors');
// 
const corsOptions = {
      origin: 'http://localhost:5173',
      methods: 'GET,POST',
      allowedHeaders: 'Content-Type',
};
app.use(cors(corsOptions));
// 

app.get('/', async (req, res) => {
      res.send("hello world !")
});



// Start the server
app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
});