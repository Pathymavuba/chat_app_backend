const express = require('express');
const cors = require('cors');
require("dotenv").config();
const app = express();

app.use(cors())
app.use(express.urlencoded({extended: true}))

app.get('/',function(req,res){
    res.send("Welcome !")
})

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`server listening on ${process.env.PORT}`);
});