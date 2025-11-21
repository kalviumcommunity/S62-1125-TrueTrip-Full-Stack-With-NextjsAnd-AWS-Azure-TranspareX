import { PrismaClient, TripUser, UserRole } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Define types based on your actual schema
export type SafeTripUser = {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
};

// Helper functions for common operations
export const db = {
  // TripUser operations (using TripUser model from your schema)
  user: {
    async findByEmail(email: string): Promise<TripUser | null> {
      return prisma.tripUser.findUnique({
        where: { email },
      });
    },

    async findByUsername(username: string): Promise<TripUser | null> {
      return prisma.tripUser.findUnique({
        where: { username },
      });
    },

    async create(userData: {
      firstName: string;
      lastName: string;
      username: string;
      email: string;
      password: string;
      role?: UserRole;
    }): Promise<TripUser> {
      return prisma.tripUser.create({
        data: userData,
      });
    },

    async findById(id: number): Promise<TripUser | null> {
      return prisma.tripUser.findUnique({
        where: { id },
      });
    },

    async updateLastLogin(id: number): Promise<TripUser> {
      return prisma.tripUser.update({
        where: { id },
        data: { updatedAt: new Date() },
      });
    },
  },

  // Direct prisma access for complex queries
  prisma,
};

// Helper function to convert TripUser to SafeTripUser
export function toSafeUser(user: TripUser): SafeTripUser {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export default prisma;