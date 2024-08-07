import dotenv from 'dotenv'
import { Command } from 'commander';

const program = new Command();

program
    .option('-d', 'Variable para debug', false)
    .option('-p <port>', 'Puerto del servidor', 8080)
    .option('--mode <mode>', 'Modo de trabajo', 'develop')
program.parse();


console.log("Mode Option: ", program.opts().mode);

const environment = program.opts().mode;



dotenv.config({path: environment === "production" ? "./src/config/.env.production" : "./src/config/.env.development"});

export default  {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    sessionSecret: process.env.SESSION_SECRET,
    persistence: process.env.PERSISTENCE,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    environment: environment
}