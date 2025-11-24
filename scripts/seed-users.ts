import { db } from '@/lib/utils/prisma';
import bcrypt from 'bcryptjs';

async function seedUsers() {
  try {
    console.log('🌱 Seeding users...');

    // Create regular user
    const hashedPassword1 = await bcrypt.hash('password123', 12);
    const user1 = await db.user.create({
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'john@example.com',
      password: hashedPassword1,
      role: 'USER',
    });
    console.log('✅ Regular user created:', user1.email);

    // Create admin user
    const hashedPassword2 = await bcrypt.hash('admin123', 12);
    const user2 = await db.user.create({
      firstName: 'Admin',
      lastName: 'User',
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword2,
      role: 'ADMIN',
    });
    console.log('✅ Admin user created:', user2.email);

    console.log('🎉 Seeding completed!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  }
}

seedUsers();