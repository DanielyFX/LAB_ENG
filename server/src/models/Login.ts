import { Schema, model } from 'mongoose';

interface Login {
    email: string;
    senha: string;
    permission: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: Number;

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
    },
    resetPasswordToken: {
        type: String,
        required: false,
    },
    resetPasswordExpires: {
        type: Number,
        required: false,
    }
});

const LoginModel = model<Login>('Login', LoginSchema);
export { LoginModel, Login };