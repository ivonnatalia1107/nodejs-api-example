const express = require("express") 
const app = express()
const bodyParser = require("body-parser")
const { readData, writeData } = require("./function")
require ('dotenv').config() 



app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("welcome to my API with NodeJS")
})

app.get("/dishes", (req, res) => {
    const data = readData()
    res.json(data.dishes)
})

app.post("/dishes", (req, res) => {
    const data = readData()
    const dish = req.body
    const newDish = {
        id: data.dishes.length + 1,
        ... dish
    }
    data.dishes.push(newDish)
    writeData(data)
    res.json(newDish)

})

//Ejemplo de create y read 

app.get("/deseases", (req, res) => {
    const data = readData()
    res.json(data.deseases)
})

app.post("/deseases", (req, res) => {
    const data = readData()
    const desease = req.body
    const newDesease = {
        id: data.deseases.length + 1,
        ... desease
    }
    data.deseases.push(newDesease)
    writeData(data)
    res.json(newDesease)

})


app.put("/deseases/:id" , (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const deseaseIndex = data.deseases.findIndex(desease => desease.id === id)
    console.log(deseaseIndex)
    data.deseases[deseaseIndex] = {
        id, 
        ...body
    }
writeData(data)
res.json({message: "Dish updated successfuly"})

})

app.delete("/deseases/:id", (req, res) => {

    const data = readData()
    const id = parseInt(req.params.id)
    const deseaseIndex = data.deseases.findIndex(desease => desease.id === id)
    data.deseases.splice(deseaseIndex, 1)
    writeData(data)
    res.json({message:"Dish deleted successfuly"})

})

// Ejemplo de update y delete

app.put("/dishes/:id" , (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const dishIndex = data.dishes.findIndex(dish => dish.id === id)
    console.log(dishIndex)
    data.dishes[dishIndex] = {
        id, 
        ...body
    }
writeData(data)
res.json({message: "Dish updated successfuly"})

})


app.delete("/dishes/:id", (req, res) => {

    const data = readData()
    const id = parseInt(req.params.id)
    const dishIndex = data.dishes.findIndex(dish => dish.id === id)
    data.dishes.splice(dishIndex, 1)
    writeData(data)
    res.json({message:"Dish deleted successfuly"})

})


const port = process.env.PORT

app.listen(port , () => {
    console.log(`El servidor esta corriendo en el puerto ${process.env.BACKEND_BASEURL}`)
})






