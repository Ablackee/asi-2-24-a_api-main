import { readFile } from "node:fs/promises"
import config from "../config.js"

const read = async () => {
  try {
    const data = await readFile(config.db.path, { encoding: "utf-8" })

    return JSON.parse(data)
  } catch (err) {
    return {
      users: {
        lastId: 0,
        rows: {},
      },
      posts: {
        lastId: 0,
        rows: {},
      },
      comments: {
        lastId: 0,
        rows: {},
      },
    }
  }
}

export default read
