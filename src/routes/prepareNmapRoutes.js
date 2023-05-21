import NmapModel from "../db/models/NmapModel.js"
import { spawn } from "child_process"
import fetchNmap from "../middlewares/fetchNmap.js"

const preparenmapRoutes = (app) => {
  // CREATE
  app.post("/nmap", async (req, res) => {
    const { optionScan, target, maxRetries, scanDelay, maxRate } = req.body
    const nmap = await new NmapModel({
      optionScan,
      target,
      result: "",
      maxRetries,
      scanDelay,
      maxRate,
    }).save()

    let nmapArgs = [target]

    if (optionScan) {
      nmapArgs.push(optionScan)
    }

    const nmapScan = spawn("nmap", nmapArgs)
    let scanOutput = ""

    nmapScan.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`)
      scanOutput += data
    })

    nmapScan.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`)
    })

    nmapScan.on("close", async (code) => {
      console.log(`child process exited with code ${code}`)
      nmap.result = scanOutput
      await nmap.save()
      res.send({ result: nmap })
    })
  })

  // READ collection
  // READ collection
  app.get("/nmap", async (req, res) => {
    const nmap = await NmapModel.find()
    const mappedNmap = nmap.map((item) => {
      const { maxRetries, scanDelay, maxRate, ...rest } = item.toObject()
      const modifiedItem = {
        ...rest,
        options: rest.optionScan,
        maxRetries: maxRetries || null,
        scanDelay: scanDelay || null,
        maxRate: maxRate || null,
      }

      return modifiedItem
    })
    res.send({ result: mappedNmap })
  })

  // READ single
  app.get("/nmap/:nmapId", fetchNmap, async (req, res) => {
    const { nmap } = req.ctx
    res.send({ result: nmap })
  })

  // DELETE
  app.delete("/nmap/:nmapId", async (req, res) => {
    const { nmap } = req.ctx
    await nmap.remove()
    res.send({ result: "ok" })
  })
}

export default preparenmapRoutes
