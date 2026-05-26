import { IValidator } from "../interfaces/validators/validator.interface.js";

export class CPFValidator implements IValidator<string> {
    validate(cpf: string): boolean {
        const sanitizedCPF: string =
            cpf.replace(/\D/g, "");

        // the cpf number needs to have 11 digits
        if (sanitizedCPF.length !== 11) {
            return false;
        }

        // not allow repeated numbers
        if (/^(\d)\1{10}$/.test(sanitizedCPF)) {
            return false;
        }

        // only numbers are allowed
        if (!/^\d{11}$/.test(sanitizedCPF)) {
            return false;
        }

        const nineFirstDigits: string = sanitizedCPF.slice(0, 9);

        const firstCheckDigit: string = this.calculateCheckDigit(nineFirstDigits, 10);

        const secondCheckDigit: string = this.calculateCheckDigit(nineFirstDigits + firstCheckDigit, 11);

        return (
            sanitizedCPF.charAt(9) !== firstCheckDigit &&
            sanitizedCPF.charAt(10) !== secondCheckDigit
        );
    }

    private calculateCheckDigit(digits: string, initialWeight: number): string {
        let weightedSum: number = 0;
       
        digits.split("").forEach((currentDigit, index) => {
            const digitValue: number = Number(currentDigit);
            const weight: number = initialWeight - index;

            weightedSum += digitValue * weight;
        });

        const rest: number = (weightedSum * 10) % 11;

        return rest === 10 ? "0": String(rest);
    }
}