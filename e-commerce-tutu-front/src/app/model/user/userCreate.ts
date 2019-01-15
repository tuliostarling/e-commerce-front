export interface UserCreateModel {
    id: number;
    name: string;
    email: string;
    password: string;
    cep: number;
    cpf: number;
    state: string;
    city: string;
    street: string;
    neighborhood: string;
    num: number;
    comp: number;
}

export interface UserChangePass {
    email: string;
    oldpass: string;
    newpass: string;
}
