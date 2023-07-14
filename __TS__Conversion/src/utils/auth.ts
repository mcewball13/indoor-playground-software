import { NextApiRequest, NextApiResponse} from 'next'
import jwt, { Secret } from "jsonwebtoken";

const secret: Secret = process.env.JWT_SECRET!;
const expiration: string = process.env.JWT_EXP!;

/**
   const authMiddleware = (req: AuthenticatedNextApiRequest, res: NextApiResponse) => {
     let token: string | undefined =
      req.body.token || req.query.token || req.headers.authorization;
*/   
interface EmployeePayload {
    email: string;
    id: number;
   }
 interface AuthenticatedNextApiRequest extends NextApiRequest {
     employee?: EmployeePayload;
   }



export const auth = {
    authMiddleware: function ( req : AuthenticatedNextApiRequest) {
        let token: string | undefined =
            req.body.token || req.query.token || req.headers.authorization;

        if (typeof token === "string") {
            token = token.split(" ").pop()?.trim();
        }

        if (!token) {
            return req;
        }

        try {
            const { data }: any = jwt.verify(token, secret, { maxAge: expiration });
            req.employee = data;
        } catch {
            console.log("Invalid token");
        }

        return req;
    },
    signToken: function async({ email, id }: EmployeePayload) {
        const payload = { email, id };

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};
