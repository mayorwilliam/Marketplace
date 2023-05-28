import { Schema } from "mongoose";


export interface Producto{
    nombre:string;
    usuario:Schema.Types.ObjectId;
    estado:boolean;
    cantidad:number;
    precio:number;
}
