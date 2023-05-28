import { Schema, model } from "mongoose";
import { Producto } from "../interfaces/producto.interface";

const ProductoSchema = new Schema<Producto>({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    estado: {
        type: Boolean,
        default: true
    },
    cantidad: {
        type: Number,
        default: 0
    }
});


const Producto = model( 'Producto', ProductoSchema );
export default Producto;