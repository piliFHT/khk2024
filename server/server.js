const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
//const { error } = require("console");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/kultura", (req, res) => {
  // res.json({ message: "Hello from Lukáš!",
  //            kokos: "Něco něco!"
  // });
  const filePath = path.join(__dirname, "zamky.geojson");

  fs.readFile(filePath, "utf-8", (err, data) =>
  {
    if(!data || err){
      return res.status(500).json({error: "JSON not found!"});
    }
    else{
      res.json(JSON.parse(data));
    }
  })
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});