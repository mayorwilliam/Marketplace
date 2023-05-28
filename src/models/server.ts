import express from "express";
import cors from "cors";
import { Paths } from "../interfaces/paths.interface";
import routerAuth from '../routes/auth';
import routerBuscar from '../routes/buscar';
import routerProductos from '../routes/productos';
import routerUsuarios from '../routes/usuarios';

import { dbConnection } from "../database/config";

class Server {
    app;
    port:string;
    paths:Paths;
    constructor() {
        this.app  = express();
        this.port = process.env.PORT || '8080';

        this.paths = {
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            productos:  '/api/productos',
            usuarios:   '/api/usuarios',
        }


        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        
        this.app.use(express.json());
        this.app.use( this.paths.auth, routerAuth);
        this.app.use( this.paths.buscar, routerBuscar );
        this.app.use( this.paths.productos, routerProductos);
        this.app.use( this.paths.usuarios, routerUsuarios);
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




export default Server;
