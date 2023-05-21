import { Schema } from "mongoose"

const nmapSchema = new Schema(
  {
    optionsScan: {
      type: String,
    },
    target: {
      type: String,
      required: true,
    },
    result: {
      type: String,
    },
    maxRetries: {
      type: Number,
    },
    scanDelay: {
      type: Number,
    },
    maxRate: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
)

export default nmapSchema
