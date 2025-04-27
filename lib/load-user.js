import {fileURLToPath} from 'node:url'
import path, {dirname} from 'node:path'
import {loadJsonFile} from 'load-json-file'

const directoryName = dirname(fileURLToPath(import.meta.url))

const loadUser = async hostname => {
  const [id] = hostname.split('.')

  // Fallback
  const user = {
    copyright: 'malefic',
    url: 'https://malefic.xyz',
    email: 'om@malefic.xyz',
    format: 'html',
    theme: 'terminal',
    license: 'MIT',
    gravatar: true
  }

  try {
    return {
      ...user,
      ...await loadJsonFile(path.join(directoryName, '..', 'users', `${id}.json`)),
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      return user
    }

    throw error
  }
}

export default loadUser
