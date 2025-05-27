const express = require("express");
const cors = require("cors");

const petsRouter = require('./routes/pets');
const typesRouter = require('./routes/types')
const colorsRouter = require('./routes/colors')
const salesRouter = require('./routes/sales')

const app = express();
const PORT = 4000;


app.use(cors())
app.use(express.json());
app.use('/pets', petsRouter);
app.use('/types', typesRouter);
app.use('/colors', colorsRouter);
app.use('/sales', salesRouter);


app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});