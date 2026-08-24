const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("Please run the script with --env-file=.env");
  process.exit(1);
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // 1. Create Admin User
  const phone = '9370089763';
  const password = 'aakash9370';
  
  const existingUser = await prisma.user.findUnique({ where: { phone } });
  
  if (!existingUser) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    await prisma.user.create({
      data: {
        name: 'Aakash Admin',
        phone,
        password: hashedPassword,
        village: 'Admin Village',
        role: 'admin'
      }
    });
    console.log('Admin user created successfully.');
  } else {
    // If it exists but isn't admin or password differs, update it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await prisma.user.update({
      where: { phone },
      data: { role: 'admin', password: hashedPassword }
    });
    console.log('Admin user updated successfully.');
  }

  // 2. Add Dummy Village News
  await prisma.villageNews.deleteMany({});
  await prisma.villageNews.createMany({
    data: [
      {
        title: 'Road Construction Completed',
        content: 'The main road connecting the village square has been fully paved and is now open.',
        category: 'Work Progress'
      },
      {
        title: 'New Water Pump Installed',
        content: 'A new water pump was successfully installed in the eastern sector to resolve water scarcity.',
        category: 'Complaint Solution'
      },
      {
        title: 'Village Fair Next Week',
        content: 'The annual village fair will be held next weekend. All are welcome!',
        category: 'News'
      }
    ]
  });
  console.log('Dummy Village News added.');

  // 3. Add Dummy Schemes
  await prisma.scheme.deleteMany({});
  await prisma.scheme.createMany({
    data: [
      {
        title: 'Kisan Samman Nidhi',
        category: 'Agriculture',
        description: 'Financial assistance for farmers.',
        eligibility: 'Must own farming land.',
        documentsRequired: ['Aadhar Card', 'Land Records', 'Bank Passbook'],
        deadline: new Date('2026-12-31')
      },
      {
        title: 'PM Awas Yojana',
        category: 'Housing',
        description: 'Subsidies to build homes for the rural poor.',
        eligibility: 'Must not own a pucca house.',
        documentsRequired: ['Aadhar Card', 'Income Certificate', 'Ration Card'],
        deadline: new Date('2026-10-15')
      },
      {
        title: 'Vidya Lakshmi Education Loan',
        category: 'Education',
        description: 'Low interest educational loans for rural youth pursuing higher education.',
        eligibility: 'Students from rural backgrounds admitted to recognized colleges.',
        documentsRequired: ['Aadhar Card', 'Admission Letter', '12th Marksheet'],
        deadline: new Date('2026-09-30')
      },
      {
        title: 'Ayushman Bharat Yojana',
        category: 'Health',
        description: 'Free healthcare coverage up to ₹5 lakh per family per year.',
        eligibility: 'Families belonging to socio-economic backward classes.',
        documentsRequired: ['Aadhar Card', 'Ration Card'],
        deadline: new Date('2027-03-31')
      },
      {
        title: 'Solar Water Pump Scheme',
        category: 'Agriculture',
        description: 'Subsidies up to 60% for installing solar water pumps for irrigation.',
        eligibility: 'Farmers with active agricultural land and water source.',
        documentsRequired: ['Aadhar Card', 'Land Records', 'Bank Passbook'],
        deadline: new Date('2026-11-30')
      }
    ]
  });
  console.log('Dummy Schemes added.');

  // 4. Add Dummy Notices
  await prisma.notice.deleteMany({});
  await prisma.notice.createMany({
    data: [
      {
        title: 'Gram Sabha Meeting',
        content: 'A mandatory Gram Sabha meeting will take place this Sunday at 10 AM regarding the new budget allocation.',
        type: 'Important',
        date: new Date()
      },
      {
        title: 'Panchayat Office Holiday',
        content: 'The Panchayat office will remain closed on Monday due to a public holiday.',
        type: 'Update',
        date: new Date()
      },
      {
        title: 'Health Camp Notice',
        content: 'A free general health and eye check-up camp will be organized at the primary school next Wednesday.',
        type: 'Event',
        date: new Date()
      },
      {
        title: 'Water Supply Disruption',
        content: 'Water supply in the northern sector will be interrupted for 4 hours tomorrow due to pipeline maintenance.',
        type: 'Important',
        date: new Date()
      },
      {
        title: 'New Seed Distribution',
        content: 'Subsidized wheat seeds for the Rabi season will be distributed starting from Friday at the society office.',
        type: 'Update',
        date: new Date()
      }
    ]
  });
  console.log('Dummy Notices added.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
