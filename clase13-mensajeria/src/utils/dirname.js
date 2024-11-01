import { fileURLToPath } from 'node:os'
import { dirname } from 'node:path'


const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

