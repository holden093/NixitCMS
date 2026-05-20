import { config } from '../config'
import { prisma } from '../lib/prisma'

export async function syncConfiguredAdminUser() {
  const email = config.adminEmail.trim().toLowerCase()
  const passwordHash = config.adminPasswordHash

  await prisma.$transaction([
    prisma.user.deleteMany({
      where: {
        email: {
          not: email,
        },
      },
    }),
    prisma.user.upsert({
      where: { email },
      update: {
        email,
        passwordHash,
      },
      create: {
        email,
        passwordHash,
      },
    }),
  ])
}
