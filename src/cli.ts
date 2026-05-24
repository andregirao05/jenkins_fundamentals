import { CPFValidator } from "./validators/cpf-validator.js";

const validator = new CPFValidator();

export function validateAndPrint(cpf: string): void {
    const isValid = validator.validate(cpf);

    if (isValid) {
        console.log(`CPF ${cpf} is valid.`);
        process.exit(0);
    } else {
        console.log(`CPF ${cpf} is invalid.`);
        process.exit(1);
    }
}
