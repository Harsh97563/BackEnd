const express= require('express');
const app= express();
const cors= require('cors')
const mainrouter= require('./Express/main');
app.use(cors())
app.use(express.json())
app.use('/api/v1', mainrouter);


app.listen(3001);