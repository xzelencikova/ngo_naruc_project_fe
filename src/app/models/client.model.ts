export interface ClientModel {
    _id?: number;
    name: string;
    surname: string;
    registration_date: Date;
    contract_no?: string;
    last_phase: number;
    active: boolean;
}