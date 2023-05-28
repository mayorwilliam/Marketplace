import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

export interface RequestExt extends Request {
        user?: JwtPayload | {id:string};
        usuario: {
            estado: boolean;
            rol: 'ADMIN_ROLE' | 'COMPRADOR_ROLE' | 'USER_ROLE';
            nombre: string;
            correo: string;
            uid: string;
            }
        token: string;
}
