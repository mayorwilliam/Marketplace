import { Router } from "express";
import { check } from "express-validator";


import { validarCampos } from "../middlewares/validar-campos";


import { login } from "../services/auth";


const routerAuth = Router();

routerAuth.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login );




export default routerAuth;