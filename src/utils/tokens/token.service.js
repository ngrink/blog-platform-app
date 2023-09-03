import jwt from 'jsonwebtoken';


export class TokenService {
    static async generate(payload, secret, options) {
        return jwt.sign(payload, secret, options);
    }

    static async decode(payload, options) {
        return jwt.decode(payload, options);
    }

    static async verify(token, secret, options) {
        try {
            return jwt.verify(token, secret, options);
        } catch (e) {
            return null;
        }
    }
}
