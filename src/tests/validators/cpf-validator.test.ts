import { describe, expect, it } from "vitest";

import { CPFValidator } from "../../validators/cpf-validator.js";

describe("CPFValidator", () => {

    const validator: CPFValidator =
        new CPFValidator();

    it("should validate a valid CPF", () => {
        const result: boolean = validator.validate("52998224725");

        expect(result).toBe(true);
    });

    it("should validate a formatted CPF", () => {
        const result: boolean = validator.validate("529.982.247-25");

        expect(result).toBe(true);
    });

    it("should reject CPF with invalid check digits", () => {
        const result: boolean = validator.validate("52998224724");

        expect(result).toBe(false);
    });

    it("should reject CPF with repeated digits", () => {
        const result: boolean = validator.validate("11111111111");

        expect(result).toBe(false);
    });

    it("should reject CPF with less than 11 digits", () => {
        const result: boolean = validator.validate("123");

        expect(result).toBe(false);
    });

    it("should reject CPF with more than 11 digits", () => {
        const result: boolean = validator.validate("529982247255");

        expect(result).toBe(false);
    });

    it("should reject CPF with letters", () => {
        const result: boolean = validator.validate("abc");

        expect(result).toBe(false);
    });
});