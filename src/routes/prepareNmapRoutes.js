import NmapModel from "../db/models/NmapModel.js"
import { spawn } from "child_process"
import fetchNmap from "../middlewares/fetchNmap.js"

const preparenmapRoutes = (app) => {
  // CREATE
  app.post("/nmap", async (req, res) => {
    const { options, target } = req.body
    const nmap = await new NmapModel({
      options,
      target,
      result: "",
    }).save()

    const nmapScan = spawn("nmap", [target])
    let scanOutput = ""

    nmapScan.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`)
      scanOutput += data
    })
    console.log(scanOutput)
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
  app.get("/nmap", async (req, res) => {
    const nmap = await NmapModel.find()

    res.send({ result: nmap })
  })
  // // READ single
  app.get("/nmap/:nmapId", fetchNmap, async (req, res) => {
    const { nmap } = req.ctx

    res.send({ result: nmap })
  })

  // // DELETE
  app.delete("/nmap/:nmapId", async (req, res) => {
    const { nmap } = req.ctx

    await nmap.remove()

    res.send({ result: "ok" })
  })
}
export default preparenmapRoutes
