import { deepmergeCustom } from "deepmerge-ts"
import { writeFile } from "node:fs/promises"
import config from "../config.js"
import read from "./read.js"

const deepmerge = deepmergeCustom({ mergeArrays: false })

const write = async (data) => {
  const db = await read()
  await writeFile(config.db.path, JSON.stringify(deepmerge(db, data)), {
    encoding: "utf-8",
  })
}

export default write
