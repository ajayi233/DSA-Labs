const express = require('express')
const path = require('path')

//initializing app
const app = express();

app.use(express.urlencoded({extended: true}))

const indexPage = path.join(__dirname ,'public/index.html')
const usersPage = path.join(__dirname, 'public/users.html')

//routes
app.get('/', (req,res) => {
    res.sendFile(indexPage)
})

app.get('/users', (req, res) =>{
    res.sendFile(usersPage)
})

app.post('/create-user', (req, res) => {
    let name = req.body
    console.log(name.username);
    res.redirect('/')
})




//declaring port
const PORT = process.env.PORT || 3000


//listen for request
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
})