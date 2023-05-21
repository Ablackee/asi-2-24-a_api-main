import { model } from "mongoose"
import nmapSchema from "../schemas/nmapSchema.js"

const nmapModel = model("nmap", nmapSchema)

export default nmapModel
