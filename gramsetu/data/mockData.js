export const mockUser = {
  id: 'u1',
  name: 'Ramesh Kumar',
  phone: '+91 9876543210',
  village: 'Palampur',
  district: 'Kangra',
  state: 'Himachal Pradesh',
  role: 'citizen'
};

export const schemes = [
  {
    id: 's1',
    title: 'PM Kisan Samman Nidhi',
    category: 'Agriculture',
    description: 'Under the scheme an income support of 6,000/- per year in three equal installments will be provided to all land holding farmer families.',
    eligibility: 'Landholding farmers',
    documentsRequired: ['Aadhar Card', 'Bank Passbook', 'Land Ownership Proof'],
    status: 'Active',
    deadline: '2026-12-31'
  },
  {
    id: 's2',
    title: 'Jal Jeevan Mission',
    category: 'Infrastructure',
    description: 'Providing safe and adequate drinking water through individual household tap connections to all households in rural India.',
    eligibility: 'Rural households without tap connection',
    documentsRequired: ['Aadhar Card', 'Address Proof'],
    status: 'Active',
    deadline: '2026-10-15'
  },
  {
    id: 's3',
    title: 'Pradhan Mantri Awas Yojana - Gramin',
    category: 'Housing',
    description: 'Financial assistance provided to the rural poor for constructing their houses.',
    eligibility: 'Houseless or living in kutcha houses',
    documentsRequired: ['Aadhar Card', 'Job Card', 'Bank Account Details'],
    status: 'Active',
    deadline: '2027-03-31'
  }
];

export const servicesList = [
  {
    id: 'srv1',
    title: 'Birth Certificate',
    icon: 'Baby',
    description: 'Apply for a new birth certificate or request a copy.',
  },
  {
    id: 'srv2',
    title: 'Death Certificate',
    icon: 'FileText',
    description: 'Apply for a death certificate.',
  },
  {
    id: 'srv3',
    title: 'Income Certificate',
    icon: 'IndianRupee',
    description: 'Apply for an income certificate for schemes and subsidies.',
  },
  {
    id: 'srv4',
    title: 'Water Connection',
    icon: 'Droplets',
    description: 'Request a new water connection or report an issue.',
  }
];

export const mockComplaints = [
  {
    id: 'c1',
    title: 'Broken Street Light',
    category: 'Infrastructure',
    description: 'The street light near the main temple is broken for the last 3 days.',
    status: 'Pending',
    date: '2026-08-18'
  },
  {
    id: 'c2',
    title: 'Water Supply Issue',
    category: 'Water',
    description: 'No water supply in Ward No. 4 since morning.',
    status: 'Resolved',
    date: '2026-08-10'
  }
];

export const mockNotices = [
  {
    id: 'n1',
    title: 'Gram Sabha Meeting',
    content: 'A Gram Sabha meeting will be conducted this Sunday to discuss the new water pipeline project. All villagers are requested to attend.',
    date: '2026-08-20',
    type: 'Important'
  },
  {
    id: 'n2',
    title: 'Polio Vaccination Drive',
    content: 'Polio vaccination drive will be held at the village health center on 25th August from 9 AM to 4 PM.',
    date: '2026-08-19',
    type: 'Health'
  }
];

export const mockEvents = [
  {
    id: 'e1',
    title: 'Kisan Mela (Farmer Fair)',
    date: '2026-09-05',
    location: 'Panchayat Ground',
    description: 'Exhibition of new farming equipment and seeds.'
  },
  {
    id: 'e2',
    title: 'Village Cleanliness Drive',
    date: '2026-08-28',
    location: 'Main Market Area',
    description: 'Community effort to clean the main market area and plant trees.'
  }
];
