export interface UserModel {
    _id?: string;
    name: string;
    surname: string;
    email: string;
    role: string;
    token?: string;
    password?:string;
}