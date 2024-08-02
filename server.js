const express = require('express')
const mongoose = require("mongoose")
const { createHandler } = require('graphql-http/lib/use/express');
const schema = require('./graphql/schema')

const app = express();

mongoose.connect("mongodb://127.0.0.1/graphql")
mongoose.connection.once("open", () => {
    console.log(`Connected to database >>`)
})
app.use("/graphql", createHandler({ schema }))

app.get("/", (req, res) => {
    return res.json({ message: "Hello from main !!!" })
})

app.listen(4005, () => {
    console.log(`Server is running on port 4005`)
})