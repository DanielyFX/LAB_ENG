import { Schema, model } from 'mongoose';

interface Login {
    email: string;
    senha: string;
    permission: string;
}

const LoginSchema = new Schema<Login>({
    email: {
        type: String,
        default: '',
        required: true,
    },
    senha: {
        type: String,
        default: '',
        required: true,
    },
    permission: {
        type: String,
        default: '',
        required: true,
    }
});

const LoginModel = model<Login>('Login', LoginSchema);
export { LoginModel, Login };