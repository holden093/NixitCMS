import { readBootstrapAdminCredentials } from './lib/bootstrapAdmin'
import { PrismaClient } from './lib/prismaClient'

const prisma = new PrismaClient()

async function main() {
  const { email, passwordHash } = readBootstrapAdminCredentials()

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, passwordHash },
  })

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 },
  })

  const contentSeeds: Record<string, Partial<{
    title_it: string
    title_en: string
    subtitle_it: string
    subtitle_en: string
    body_it: string
    body_en: string
    sections_it: string
    sections_en: string
  }>> = {
    home: {
      title_it: 'Titolo home',
      title_en: 'Home title',
    },
    about: {
      title_it: 'Titolo about',
      title_en: 'About title',
    },
    contacts: {
      title_it: 'Contattaci',
      title_en: 'Contact us',
    },
    rooms: {
      title_it: 'Le nostre camere',
      title_en: 'Our rooms',
      subtitle_it: 'Categorie di camera pensate per soggiorni semplici, ordinati e confortevoli.',
      subtitle_en: 'Room categories designed for stays that feel simple, calm and comfortable.',
    },
    site: {
      title_it: 'Copy globale sito',
      title_en: 'Global site copy',
    },
    'service-template': {
      title_it: 'Template servizio',
      title_en: 'Service template',
    },
    'not-found': {
      title_it: 'Pagina non trovata',
      title_en: 'Page not found',
    },
  }

  for (const slug of ['news', ...Object.keys(contentSeeds)]) {
    await prisma.page.upsert({
      where: { slug },
      update: {},
      create: { slug, isVisible: true },
    })

    if (!(slug in contentSeeds)) {
      continue
    }

    const seed = contentSeeds[slug] ?? {}
    await prisma.content.upsert({
      where: { pageSlug: slug },
      update: {},
      create: {
        pageSlug: slug,
        title_it: seed.title_it ?? '',
        title_en: seed.title_en ?? '',
        subtitle_it: seed.subtitle_it ?? '',
        subtitle_en: seed.subtitle_en ?? '',
        body_it: seed.body_it ?? '',
        body_en: seed.body_en ?? '',
        sections_it: seed.sections_it ?? '{}',
        sections_en: seed.sections_en ?? '{}',
      },
    })
  }

  console.log('Seed complete.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
