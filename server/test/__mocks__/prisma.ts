// tests/__mocks__/prisma.ts
import { vi } from 'vitest';

export const mockPrisma = {
    quiz: {
        findMany: vi.fn(),
        findUnique: vi.fn(),
    },
};

// Mock the prisma module
vi.mock('@/prisma/prismaClient.js', () => ({
    default: mockPrisma,
}));
