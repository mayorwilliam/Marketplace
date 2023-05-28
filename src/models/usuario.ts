import { Schema, model } from "mongoose";
import { User } from "../interfaces/user.interface";

const UsuarioSchema = new Schema<User>({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    estado: {
        type: Boolean,
        default: true
    },
    rol: {
        type: String,
        required: false,
        default: 'USER_ROLE',
        emun: ['ADMIN_ROLE', 'USER_ROLE', 'VENDEDOR_ROLE']
    }
});


const Usuario = model( 'Usuario', UsuarioSchema );
export default Usuario;