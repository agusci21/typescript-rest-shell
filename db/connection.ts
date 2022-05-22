import { Sequelize } from "sequelize";

const db = new Sequelize('<dbName>', '<dbuser>', '<dbPassword>', {
    host: 'localhost',
    dialect: 'mysql',
})

export default db