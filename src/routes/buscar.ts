import { Router } from "express";
import { buscar } from "../services/buscar";

const routerBuscar = Router();


routerBuscar.get('/:coleccion/:termino', buscar );




export default routerBuscar;