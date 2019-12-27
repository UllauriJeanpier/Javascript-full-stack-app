// nota 

// El modulo fs- extra hace exactamente los mismo que hace el modulo fs, pero este soporta las promesas 
// el modulo cors - permite que las solicitudes omitan la politica de origen y accedan a los recursos de host remotos(uso compartido de recursos de origen cruzado)


if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();  // este modulo sirve para guardar y llamar variables de entorno  -- solo sirve para desarrollo
}

//  console.log(process.env.NODE_ENV);

const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const cors = require('cors');       // sirve para permitir la comunicacion de dos servidores 

// Initalizations
const app = express();
require('./database')
// settings 

app.set('port', 3000);

// middlewares

app.use(morgan('dev'));

const storage = multer.diskStorage({
    destination: path.join( __dirname, 'public/upload'),
    filename(req, file, cb){        // req: informacion de peticion de usuario, flie : la informacion del archivo, cb : siguiente funcion,
         cb(null, new Date().getTime() + path.extname(file.originalname))   // null para indicar que no hay errores, siguiente dato es el nombre que se le da basado en un numero generado por la fecha (nombre de la imagen), se le concatena con la extencison (jpg, png, etc)
    }
});
app.use(multer({storage}).single('image'));     // se le pasa la configuracion, el metodo single es para decirle que una imagen a la vez, en el front end el definimos el tipo de dato : 'image'
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cors());        // para permitir el acceso a los datos del backend desde un puerto diferente al que se esta usando

// routes

app.use('/api/books', require('./routes/books'));      // debido a que el middleware necesita una funcion, se exporta la funcion Router desde otro archivo;

// static files

app.use(express.static(path.join(__dirname, 'public')))   // el navegador accede a la carpeta donde estaran los archivos estaticos (css, images, etc)

// strat the server

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});



