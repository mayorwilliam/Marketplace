import { Router } from "express";
import { check } from "express-validator";

import { validarCampos, validarJWT, esVendedor } from "../middlewares";

import {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
} from "../helpers/db-validators";

import {
  usuariosGet,
  obtenerUsuario,
  obtenerProductosVendedor,
  usuariosPost,
} from "../services/usuarios";

const routerUsuarios = Router();

routerUsuarios.get("/", [validarJWT], usuariosGet);

routerUsuarios.get("/:id", [validarJWT], obtenerUsuario);

routerUsuarios.get(
  "/vendedor/:id",
  [
    validarJWT,
    esVendedor,
    check("id", "No es un id de Mongo válido").isMongoId(),
    // check('id').custom( existeProductoPorId ),
    validarCampos,
  ],
  obtenerProductosVendedor
);

routerUsuarios.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe de ser más de 6 letras").isLength({
      min: 6,
    }),
    check("correo", "El correo no es válido").isEmail(),
    check("correo").custom(emailExiste),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPost
);

export default routerUsuarios;
