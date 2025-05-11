require('dotenv').config();
const express=require('express')
const app=express()
const pool=require('./config/dbconfig')

const cors=require('cors')
app.use(cors())
app.use(express.json());

const navmenuRoutes = require('./routes/navmenu.routes');
const contentRoutes=require('./routes/content.routes')
app.use('/api/contents',contentRoutes);
app.use('/api/navmenus', navmenuRoutes);

app.get('/',(req,res)=>{
    res.send("Test")
})
app.listen(3001)