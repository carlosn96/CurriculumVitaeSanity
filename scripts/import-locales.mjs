import {readFile} from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {getCliClient} from 'sanity/cli'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const monthMap = {
  ene: '01',
  jan: '01',
  feb: '02',
  mar: '03',
  abr: '04',
  apr: '04',
  may: '05',
  jun: '06',
  jul: '07',
  ago: '08',
  aug: '08',
  sep: '09',
  oct: '10',
  nov: '11',
  dic: '12',
  dec: '12',
}

const categoryOrder = [
  'backend',
  'frontend',
  'data',
  'tools',
  'management',
  'digital',
]

const communicationSkillEntries = [
  ['contentManagement', 'digital'],
  ['institutional', 'digital'],
  ['digital_pastoral', 'digital'],
  ['academic', 'management'],
  ['educational', 'management'],
]

const technologyCategoryMap = {
  java: 'backend',
  python: 'backend',
  c_cpp: 'backend',
  csharp: 'backend',
  php: 'backend',
  laravel: 'backend',
  api_rest: 'backend',
  react: 'frontend',
  javascript: 'frontend',
  jquery: 'frontend',
  typescript: 'frontend',
  html_css: 'frontend',
  bootstrap_tailwind: 'frontend',
  next: 'frontend',
  mysql: 'data',
  firestore: 'data',
  classification: 'data',
  git: 'tools',
  vercel: 'tools',
  postman: 'tools',
  mysql_workbench: 'tools',
  vs_code: 'tools',
  sanity: 'tools',
  antigravity: 'tools',
}

const stripHtml = (text) => (text || '').replace(/<[^>]*>/g, '').trim()

const blockText = (text) => [
  {
    _key: `b_${Math.random().toString(36).slice(2, 10)}`,
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [
      {
        _key: `c_${Math.random().toString(36).slice(2, 10)}`,
        _type: 'span',
        marks: [],
        text: text || '',
      },
    ],
  },
]

const localeTextFromPlain = (es, en) => ({
  es: blockText(es),
  en: blockText(en),
})

const normalizePart = (value) => value.toLowerCase().replace('.', '').trim()

const parseMonthYear = (value) => {
  const part = normalizePart(value)
  const match = part.match(/^([a-záéíóúñ]+)\s+(\d{4})$/i)
  if (!match) return null

  const month = monthMap[match[1].slice(0, 3)]
  const year = match[2]
  if (!month) return null

  return `${year}-${month}-01`
}

const parseDateRange = (rangeEs = '', rangeEn = '') => {
  const [esStart = '', esEnd = ''] = rangeEs.split(' - ')
  const [enStart = '', enEnd = ''] = rangeEn.split(' - ')

  const startDate = parseMonthYear(esStart) || parseMonthYear(enStart) || null
  const endDate = parseMonthYear(esEnd) || parseMonthYear(enEnd) || null

  return {startDate, endDate}
}

const readJson = async (locale, fileName) => {
  const filePath = path.join(rootDir, 'locales', locale, fileName)
  const raw = await readFile(filePath, 'utf8')
  return JSON.parse(raw)
}

const main = async () => {
  const [headerEs, headerEn, expEs, expEn, eduEs, eduEn, skillsEs, skillsEn, footerEs] =
    await Promise.all([
      readJson('es', 'header.json'),
      readJson('en', 'header.json'),
      readJson('es', 'experience.json'),
      readJson('en', 'experience.json'),
      readJson('es', 'education.json'),
      readJson('en', 'education.json'),
      readJson('es', 'skills.json'),
      readJson('en', 'skills.json'),
      readJson('es', 'footer.json'),
    ])

  const client = getCliClient({apiVersion: process.env.SANITY_STUDIO_API_VERSION || '2026-02-23'})

  const nameFromFooter = (footerEs.copyright || '')
    .replace(/^©\s*\d{4}\s*/i, '')
    .trim()

  const profileDoc = {
    _id: 'profile',
    _type: 'profile',
    name: nameFromFooter || 'Jan Dev',
    role: {
      es: headerEs.role,
      en: headerEn.role,
    },
    location: {
      es: headerEs.location,
      en: headerEn.location,
    },
    description: localeTextFromPlain(stripHtml(headerEs.description), stripHtml(headerEn.description)),
  }

  const experienceEntries = [
    ['academic-coordinator', 'academic_coordinator'],
    ['software-engineer', 'software_engineer'],
    ['teacher', 'teacher'],
    ['assistant', 'assistant'],
  ]

  const experienceDocs = experienceEntries.map(([slug, key], index) => {
    const es = expEs[key]
    const en = expEn[key]
    const {startDate, endDate} = parseDateRange(es.date, en.date)

    const esDescription = Array.isArray(es.tasks) ? es.tasks.join('\n') : es.description
    const enDescription = Array.isArray(en.tasks) ? en.tasks.join('\n') : en.description

    return {
      _id: `experience-${slug}`,
      _type: 'experience',
      title: {es: es.title, en: en.title},
      company: es.company,
      startDate: startDate || `200${index}-01-01`,
      endDate: endDate || null,
      isCurrent: false,
      description: localeTextFromPlain(esDescription, enDescription),
      order: index + 1,
    }
  })

  const publicationYear = Number((expEs.publication.title || '').match(/\((\d{4})\)/)?.[1] || '2019')

  const achievementDocs = [
    {
      _id: 'achievement-academic-publication',
      _type: 'achievement',
      title: {
        es: expEs.publication.title,
        en: expEn.publication.title,
      },
      type: 'publication',
      organization: 'DIM Didáctica, Innovación y Multimedia',
      year: publicationYear,
      description: localeTextFromPlain(expEs.publication.description, expEn.publication.description),
      order: 1,
    },
  ]

  const educationDocs = [
    {
      _id: 'education-computer-engineering',
      _type: 'education',
      title: {es: eduEs.computer_engineering.title, en: eduEn.computer_engineering.title},
      institution: eduEs.computer_engineering.institution,
      category: 'technical',
      status: {es: eduEs.computer_engineering.status, en: eduEn.computer_engineering.status},
      timeframe: eduEs.computer_engineering.date,
      details: localeTextFromPlain(
        `${eduEs.computer_engineering.specialty} ${eduEs.computer_engineering.specialty_text}\n${eduEs.computer_engineering.electives} ${eduEs.computer_engineering.electives_text}`,
        `${eduEn.computer_engineering.specialty} ${eduEn.computer_engineering.specialty_text}\n${eduEn.computer_engineering.electives} ${eduEn.computer_engineering.electives_text}`,
      ),
    },
    {
      _id: 'education-ai-datascience',
      _type: 'education',
      title: {es: eduEs.ai_datascience.title, en: eduEn.ai_datascience.title},
      institution: eduEs.ai_datascience.institution,
      category: 'continuous',
      status: {es: eduEs.ai_datascience.status, en: eduEn.ai_datascience.status},
      timeframe: eduEs.ai_datascience.date,
    },
    {
      _id: 'education-communication',
      _type: 'education',
      title: {es: eduEs.communication.title, en: eduEn.communication.title},
      institution: eduEs.communication.institution,
      category: 'media',
      status: {es: 'Completado', en: 'Completed'},
      timeframe: '2019',
      details: localeTextFromPlain(eduEs.communication.description, eduEn.communication.description),
    },
    {
      _id: 'education-philosophy',
      _type: 'education',
      title: {es: eduEs.philosophy, en: eduEn.philosophy},
      institution: eduEs.philosophy_inst,
      category: 'humanist',
      status: {es: 'Formación', en: 'Training'},
      timeframe: 'N/A',
    },
    {
      _id: 'education-interests-languages',
      _type: 'education',
      title: {es: eduEs.interests, en: eduEn.interests},
      institution: 'Perfil personal',
      category: 'interests',
      status: {es: 'Activo', en: 'Active'},
      timeframe: 'Actual',
      details: localeTextFromPlain(
        `${eduEs.interests_text}\n${eduEs.languages} ${eduEs.languages_text}`,
        `${eduEn.interests_text}\n${eduEn.languages} ${eduEn.languages_text}`,
      ),
    },
  ]

  const skillCategoryDocs = categoryOrder.map((key, index) => ({
    _id: `skill-category-${key}`,
    _type: 'skillCategory',
    title: {
      es: skillsEs[key],
      en: skillsEn[key],
    },
    order: index + 1,
  }))

  const skillDocs = Object.entries(skillsEs.technologies).map(([key, value], index) => ({
    _id: `skill-${key}`,
    _type: 'skill',
    name: value,
    category: {
      _type: 'reference',
      _ref: `skill-category-${technologyCategoryMap[key] || 'backend'}`,
    },
  }))

  const communicationSkills = communicationSkillEntries.map(([key, categoryKey]) => ({
    _id: `skill-${key}`,
    _type: 'skill',
    name: skillsEn[key] || skillsEs[key],
    category: {
      _type: 'reference',
      _ref: `skill-category-${categoryKey}`,
    },
  }))

  const obsoleteCategoryIds = [
    'skill-category-engineering',
    'skill-category-communication',
    'skill-category-contentManagement',
    'skill-category-institutional',
    'skill-category-digital_pastoral',
    'skill-category-academic',
    'skill-category-educational',
  ]

  const obsoleteDocumentIds = ['experience-publication']

  const docs = [
    profileDoc,
    ...experienceDocs,
    ...achievementDocs,
    ...educationDocs,
    ...skillCategoryDocs,
    ...skillDocs,
    ...communicationSkills,
  ]

  let tx = client.transaction()
  for (const obsoleteId of obsoleteCategoryIds) {
    tx = tx.delete(obsoleteId)
  }

  for (const obsoleteId of obsoleteDocumentIds) {
    tx = tx.delete(obsoleteId)
  }

  for (const doc of docs) {
    tx = tx.createOrReplace(doc)
  }

  await tx.commit()

  console.log(`Importación completada: ${docs.length} documentos procesados.`)
  console.log(
    `Profile: 1, Experience: ${experienceDocs.length}, Achievements: ${achievementDocs.length}, Education: ${educationDocs.length}, Skill categories: ${skillCategoryDocs.length}, Skills: ${skillDocs.length + communicationSkills.length}`,
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
