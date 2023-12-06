export interface UserModel {
    _id?: number;
    name: string;
    surname: string;
    email: string;
    role: string;
    token?: string;
    password?:string;
}