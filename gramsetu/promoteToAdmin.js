const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("Please run the script with --env-file=.env");
  process.exit(1);
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function promoteToAdmin(phone) {
  try {
    const user = await prisma.user.update({
      where: { phone },
      data: { role: 'admin' },
    });
    console.log(`Successfully promoted ${user.name} (${user.phone}) to Admin!`);
  } catch (error) {
    console.error('Failed to promote user:', error.message);
    console.log('Ensure the user exists and the phone number is correct.');
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

// Get phone number from command line arguments
const phoneArg = process.argv[2];

if (!phoneArg) {
  console.log('Usage: node --env-file=.env promoteToAdmin.js <phone_number>');
  process.exit(1);
}

promoteToAdmin(phoneArg);
