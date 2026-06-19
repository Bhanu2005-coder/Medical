const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Doctor = require('./models/Doctor');
const User = require('./models/User');
const connectDB = require('./config/db');
const bcrypt = require('bcryptjs');

dotenv.config();
connectDB();

const doctors = [
  {
    name: 'Dr. Sarah Jenkins',
    specialty: 'Cardiologist',
    experience: 15,
    bio: 'Expert in heart-related ailments and surgeries with over 15 years of experience at top hospitals.',
    feesPerConsultation: 150,
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    name: 'Dr. Michael Chen',
    specialty: 'Dermatologist',
    experience: 8,
    bio: 'Specializes in skin health, cosmetic dermatology, and treating complex skin conditions.',
    feesPerConsultation: 100,
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    name: 'Dr. Emily Carter',
    specialty: 'Pediatrician',
    experience: 12,
    bio: 'Dedicated to providing comprehensive medical care for infants, children, and adolescents.',
    feesPerConsultation: 120,
    imageUrl: 'https://images.unsplash.com/photo-1594824436998-058a23158f05?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    name: 'Dr. Robert Wilson',
    specialty: 'Neurologist',
    experience: 20,
    bio: 'Renowned neurologist with extensive research in cognitive disorders and neurodegenerative diseases.',
    feesPerConsultation: 200,
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300'
  }
];

const importData = async () => {
  try {
    await Doctor.deleteMany();
    await User.deleteMany({ role: 'admin' });

    await Doctor.insertMany(doctors);
    
    await User.create({
      name: 'System Admin',
      email: 'admin@affordmed.com',
      password: 'admin123',
      role: 'admin',
    });

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
