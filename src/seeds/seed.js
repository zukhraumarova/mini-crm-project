require('dotenv').config();

const bcrypt = require('bcrypt');
const pool = require('../config/db');

async function seed() {

    console.log('Start seeding...');

    const adminPassword = await bcrypt.hash('admin123', 10);

    const managerPassword = await bcrypt.hash('manager123', 10);

    await pool.query(`
        INSERT INTO users(name,email,password,role)
        VALUES
        ('Admin','admin@crm.kz',$1,'admin'),
        ('Manager','manager@crm.kz',$2,'manager')
        ON CONFLICT (email) DO NOTHING
    `,[adminPassword, managerPassword]);

    await pool.query(`
        INSERT INTO companies(name,website,industry)
        VALUES
        ('Kaspi','https://kaspi.kz','FinTech'),
        ('Kolesa','https://kolesa.kz','IT'),
        ('Air Astana','https://airastana.com','Airlines')
        ON CONFLICT DO NOTHING
    `);

    console.log('Seed finished');

    process.exit();

}

seed();