require("./config/connection");

const express = require("express");
const port = (process.env.port || 3000);
var cors = require('cors')


//express
const app = express();


//cors
app.use(cors())

//config
app.set('port',port)

//routes
app.use('/api', require("./routes") )

//express init
app.listen(app.get('port'),(err) =>{
    if(err){
        console.log('error al ejecutar el servidor Expresss: '+ err);
    }else{
        console.log('servidor ejecutado en el puerto: '+port);
    }
})
