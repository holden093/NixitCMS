import path from 'path'
import type * as PrismaClientModule from '../../generated/prisma-client-app'

const prismaClientModule = require(path.join(process.cwd(), 'generated/prisma-client-app')) as typeof PrismaClientModule

export const Prisma = prismaClientModule.Prisma
export const PrismaClient = prismaClientModule.PrismaClient
