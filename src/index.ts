import { validateAndPrint } from "./cli.js";

const cpfArg = process.argv[2];

if (!cpfArg) {
    console.error("Uso: node dist/index.js <cpf>");
    process.exit(1);
}

validateAndPrint(
