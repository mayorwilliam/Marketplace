import { validationResult } from "express-validator";
import {Response, NextFunction, Request} from 'express';
import { RequestExt } from "../interfaces/request.inferface";



const validarCampos = ( expressRequest: Request, res: Response, next: NextFunction ) => {
    const req = expressRequest as RequestExt;
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    next();
}


export {
    validarCampos
}
