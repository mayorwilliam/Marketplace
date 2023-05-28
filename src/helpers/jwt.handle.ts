import { sign , verify} from 'jsonwebtoken';


const generateToken = async (id: string) => {
    try {
        const jwt = sign({id} , `${process.env.SECRETORPRIVATEKEY}`  , {
            expiresIn: '2d'
        });
        return jwt;
    } catch (error) {
        return { message: `hubo un error, es : ${error}`};
    }
};

const verifyToken =  (jwt:string) => {
    try {
        const isOk = verify(jwt , `${process.env.SECRETORPRIVATEKEY}` );
        return isOk;
    } catch (error) {
        return { message: `hubo un error, es : ${error}`};
    }
};

export { generateToken , verifyToken };
