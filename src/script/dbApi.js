import fb from '@/script/firebase'
import c from '@/script/constants'

// Firebase DB
const db = fb.database()

const createContentEntry = (path, {data, title}) => {
  return db
    .ref(`${path}/${c.DB_PAGEDATA}/${c.DB_CONTENTLIST}`)
    .push({
      title,
      data,
      type: (typeof data === 'string' ? c.DB_ENTRY_TEXT : c.DB_ENTRY_LIST)
    })
}

export default {
  createContentEntry
}

