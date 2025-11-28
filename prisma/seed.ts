import pkg from "@prisma/client";
import bcrypt from "bcrypt";

const { PrismaClient, UserRole } = pkg;
const prisma = new PrismaClient();

async function main() {
  // Hash passwords
  const adminPass = await bcrypt.hash("Admin@123", 10);
  const userPass = await bcrypt.hash("User@123", 10);

  // Insert Admin
  await prisma.tripUser.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      username: "admin",
      password: adminPass,
      firstName: "Admin",
      lastName: "User",
      role: UserRole.ADMIN,
    },
  });

  // Insert Normal User
  await prisma.tripUser.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      email: "user@example.com",
      username: "demo",
      password: userPass,
      firstName: "Demo",
      lastName: "User",
      role: UserRole.USER,
    },
  });

  console.log("🌱 Seed completed.");
}

main()
  .catch(err => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
