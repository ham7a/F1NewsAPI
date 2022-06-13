const PORT = process.env.PORT || 8000
const express = require('express')

const root = require('./root')
const formula1 = require('./formula1')
const motorsport = require('./motorsport')
const skysports = require('./skysports')

const news = []
news.push(formula1)
news.push(motorsport)
news.push(skysports)


const app = express()

app.get('/', (req, res) => {
    res.json(root)
})

app.get('/news', (req, res) => {
    res.json(news)
})

app.get('/formula1', (req, res) => {
    res.json(formula1)
})

app.get('/motorsport', (req, res) => {
    res.json(motorsport)
})

app.get('/skysports', (req, res) => {
    res.json(skysports)
})

app.listen(PORT, () => console.log(`server running on port ${PORT}`))