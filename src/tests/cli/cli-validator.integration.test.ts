import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { validateAndPrint } from "../../cli.js";
import { CPFValidator } from "../../validators/cpf-validator.js";

describe("CLI ↔ CPFValidator integration", () => {
    beforeEach(() => {
        vi.spyOn(process, "exit").mockImplementation(() => undefined as never);
        vi.spyOn(console, "log").mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("should delegate to CPFValidator and exit 0 when it returns true", () => {
        const validateSpy = vi.spyOn(CPFValidator.prototype, "validate");

        validateAndPrint("52998224725");

        expect(validateSpy).toHaveBeenCalledWith("52998224725");
        expect(validateSpy).toHaveReturnedWith(true);
        expect(process.exit).toHaveBeenCalledWith(0);
    });

    it("should delegate to CPFValidator and exit 1 when it returns false", () => {
        const validateSpy = vi.spyOn(CPFValidator.prototype, "validate");

        validateAndPrint("52998224724");

        expect(validateSpy).toHaveBeenCalledWith("52998224724");
        expect(validateSpy).toHaveReturnedWith(false);
        expect(process.exit).toHaveBeenCalledWith(1);
    });
});
