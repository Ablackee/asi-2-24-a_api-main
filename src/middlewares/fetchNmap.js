import nmapModel from "../db/models/NmapModel.js"

const fetchNmap = async (req, res, next) => {
  const nmap = await nmapModel.findById(req.params.nmapId)

  if (!nmap) {
    res.status(404).send({ error: "Not found" })

    return
  }

  req.ctx.nmap = nmap
  next()
}

export default fetchNmap
