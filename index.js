const express = require('express')

const app = express()
app.use(express.static('./public'))

app.get('/', (req, res)=>{
    console.log('home request')
    res.sendFile('home.html', { root: __dirname +"/public"})
})

app.get('/login', (req, res)=>{
    res.sendFile('login.html', { root: __dirname +"/public"})
})

const port = process.env.PORT || 5000
app.listen(port, ()=>
console.log(`Server running on port ${port}`))