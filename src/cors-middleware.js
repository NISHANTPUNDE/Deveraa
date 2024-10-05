import Cors from 'cors';

const allowedOrigins = ['http://localhost:3000', 'http://167.71.235.216'];

const cors = Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
    origin: (origin, callback) => {

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
});

function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

export default cors;
export { runMiddleware };
