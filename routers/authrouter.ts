import { Router } from 'express';
import { login, register } from '../controllers/auth';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);

export default authRouter;

`curl --location --request POST 'http://localhost:4000/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "Lidiya",
    "lastName": "Gelaw",
    "email": "skylinelimo0@gmail.com",
    "img": ""
    "password": "Lidiya@1234"
}'`