const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();
db.$connect()
    .then(() => {
        console.log("Connected successfully");
        process.exit(0);
    })
    .catch((e) => {
        console.error("Connection failed:", e);
        process.exit(1);
    });
