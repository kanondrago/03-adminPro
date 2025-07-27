import { Hospital } from "./hospital.model";


interface _MedicoUser {
    _id: string,
    nombre: string
    img: string,
}

export class Medicos {

    constructor(
        public nombre: string,
        public _id?: string,
        public _img?: string,
        public usuario?: _MedicoUser,
        public hospital?: Hospital
    ) {}

}