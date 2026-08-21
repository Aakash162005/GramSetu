require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // Create Schemes
  const s1 = await prisma.scheme.create({
    data: {
      title: 'PM Kisan Samman Nidhi',
      category: 'Agriculture',
      description: 'Under the scheme an income support of 6,000/- per year in three equal installments will be provided to all land holding farmer families.',
      eligibility: 'Landholding farmers',
      documentsRequired: ['Aadhar Card', 'Bank Passbook', 'Land Ownership Proof'],
      status: 'Active',
      deadline: new Date('2026-12-31')
    }
  });

  const s2 = await prisma.scheme.create({
    data: {
      title: 'Jal Jeevan Mission',
      category: 'Infrastructure',
      description: 'Providing safe and adequate drinking water through individual household tap connections to all households in rural India.',
      eligibility: 'Rural households without tap connection',
      documentsRequired: ['Aadhar Card', 'Address Proof'],
      status: 'Active',
      deadline: new Date('2026-10-15')
    }
  });

  // Create Notices
  await prisma.notice.create({
    data: {
      title: 'Gram Sabha Meeting',
      content: 'A Gram Sabha meeting will be conducted this Sunday to discuss the new water pipeline project. All villagers are requested to attend.',
      date: new Date('2026-08-20'),
      type: 'Important'
    }
  });

  await prisma.notice.create({
    data: {
      title: 'Polio Vaccination Drive',
      content: 'Polio vaccination drive will be held at the village health center on 25th August from 9 AM to 4 PM.',
      date: new Date('2026-08-19'),
      type: 'Health'
    }
  });

  // Create Events
  await prisma.event.create({
    data: {
      title: 'Kisan Mela (Farmer Fair)',
      date: new Date('2026-09-05'),
      location: 'Panchayat Ground',
      description: 'Exhibition of new farming equipment and seeds.'
    }
  });

  // Create User
  const demoUser = await prisma.user.create({
    data: {
      name: 'Ramesh Kumar',
      phone: '9876543210',
      password: 'password', // In production, hash this!
      village: 'Palampur',
      district: 'Kangra',
      state: 'Himachal Pradesh'
    }
  });

  // Create Complaints
  await prisma.complaint.create({
    data: {
      title: 'Broken Street Light',
      category: 'Infrastructure',
      description: 'The street light near the main temple is broken for the last 3 days.',
      status: 'Pending',
      userId: demoUser.id
    }
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
