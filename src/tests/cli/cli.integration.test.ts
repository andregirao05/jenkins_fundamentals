import { beforeAll, describe, expect, it } from "vitest";
import { execSync, spawnSync } from "child_process";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CLI_PATH = resolve(__dirname, "../../../dist/index.js");

beforeAll(() => {
    execSync("npm run build", { stdio: "pipe" });
});

describe("CLI - argument mode", () => {
    it("should exit with code 0 and print valid for a formatted valid CPF", () => {
        const { status, stdout } = spawnSync("node", [CLI_PATH, "529.982.247-25"], { encoding: "utf-8" });

        expect(status).toBe(0);
        expect(stdout).toContain("is valid");
    });

    it("should exit with code 0 and print valid for an unformatted valid CPF", () => {
        const { status, stdout } = spawnSync("node", [CLI_PATH, "52998224725"], { encoding: "utf-8" });

        expect(status).toBe(0);
        expect(stdout).toContain("is valid");
    });

    it("should exit with code 1 and print invalid for wrong check digits", () => {
        const { status, stdout } = spawnSync("node", [CLI_PATH, "52998224724"], { encoding: "utf-8" });

        expect(status).toBe(1);
        expect(stdout).toContain("is invalid");
    });

    it("should exit with code 1 and print invalid for repeated digits", () => {
        const { status, stdout } = spawnSync("node", [CLI_PATH, "11111111111"], { encoding: "utf-8" });

        expect(status).toBe(1);
        expect(stdout).toContain("is invalid");
    });
});

describe("CLI - missing argument", () => {
    it("should exit with code 1 and print usage message when no argument is provided", () => {
        const { status, stderr } = spawnSync("node", [CLI_PATH], { encoding: "utf-8" });

        expect(status).toBe(1);
        expect(stderr).toContain("Uso:");
    });
});
