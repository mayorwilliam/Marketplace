import { Response, Request} from 'express';
import { RequestExt } from "../interfaces/request.inferface";
import { Producto } from "../models";


const obtenerProductos = async(expressRequest: Request, res: Response) => {
    const req = expressRequest as RequestExt;
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, productos ] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    return res.json({
        total,
        productos
    });
}

const obtenerProducto = async(expressRequest: Request, res: Response) => {
    const req = expressRequest as RequestExt;
    const { id } = req.params;
    const producto = await Producto.findById( id )
                            .populate('usuario', 'nombre')

   return res.json( producto );

}


const crearProducto = async(expressRequest: Request, res: Response) => {
    const req = expressRequest as RequestExt;
    const { estado, usuario, ...body } = req.body;

    const productoDB = await Producto.findOne({ nombre: body.nombre });

    if ( productoDB ) {
        return res.status(400).json({
            msg: `El producto ${ productoDB.nombre }, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario.uid
    }

    const producto = new Producto( data );

    // Guardar DB
    await producto.save();

   return res.status(201).json(producto);

}






export {
    crearProducto,
    obtenerProductos,
    obtenerProducto
}