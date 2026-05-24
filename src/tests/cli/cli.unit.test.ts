import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { validateAndPrint } from "../../cli.js";

describe("validateAndPrint", () => {
    beforeEach(() => {
        vi.spyOn(process, "exit").mockImplementation(() => undefined as never);
        vi.spyOn(console, "log").mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe("valid CPF", () => {
        it("should print valid message and exit with code 0 for unformatted CPF", () => {
            validateAndPrint("52998224725");

            expect(console.log).toHaveBeenCalledWith("CPF 52998224725 is valid.");
            expect(process.exit).toHaveBeenCalledWith(0);
        });

        it("should print valid message and exit with code 0 for formatted CPF", () => {
            validateAndPrint("529.982.247-25");

            expect(console.log).toHaveBeenCalledWith("CPF 529.982.247-25 is valid.");
            expect(process.exit).toHaveBeenCalledWith(0);
        });
    });

    describe("invalid CPF", () => {
        it("should print invalid message and exit with code 1 for wrong check digits", () => {
            validateAndPrint("52998224724");

            expect(console.log).toHaveBeenCalledWith("CPF 52998224724 is invalid.");
            expect(process.exit).toHaveBeenCalledWith(1);
        });

        it("should print invalid message and exit with code 1 for repeated digits", () => {
            validateAndPrint("11111111111");

            expect(console.log).toHaveBeenCalledWith("CPF 11111111111 is invalid.");
            expect(process.exit).toHaveBeenCalledWith(1);
        });

        it("should print invalid message and exit with code 1 for wrong length", () => {
            validateAndPrint("1234");

            expect(console.log).toHaveBeenCalledWith("CPF 1234 is invalid.");
            expect(process.exit).toHaveBeenCalledWith(1);
        });

        it("should print invalid message and exit with code 1 for CPF with letters", () => {
            validateAndPrint("abc.def.ghi-jk");

            expect(console.log).toHaveBeenCalledWith("CPF abc.def.ghi-jk is invalid.");
            expect(process.exit).toHaveBeenCalledWith(1);
        });
    });
});
