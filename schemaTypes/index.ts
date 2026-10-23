import {achievement} from './documents/achievement'
import {education} from './documents/education'
import {experience} from './documents/experience'
import {faq} from './documents/faq'
import {profile} from './documents/profile'
import {service} from './documents/service'
import {skill} from './documents/skill'
import {skillCategory} from './documents/skillCategory'
import {localeString} from './objects/localeString'
import {localeText} from './objects/localeText'

export const schemaTypes = [
	localeString,
	localeText,
	profile,
	experience,
	service,
	faq,
	achievement,
	education,
	skillCategory,
	skill,
]
