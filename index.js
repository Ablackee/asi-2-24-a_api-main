import cors from "cors"
import express from "express"
import mongoose from "mongoose"
import config from "./src/config.js"
import prepareNmapRoutes from "./src/routes/prepareNmapRoutes.js"

await mongoose.connect(config.db.uri)

const app = express()

app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
  req.ctx = {
    util: {
      handleNotFound: (x) => {
        if (!x) {
          res.status(404).send({ error: "Not found" })

          return true
        }

        return false
      },
    },
  }

  next()
})

prepareNmapRoutes(app)

app.listen(config.port, () => console.log(`Listening on :${config.port}`))
