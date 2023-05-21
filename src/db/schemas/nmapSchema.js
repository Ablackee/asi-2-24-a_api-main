import { Schema } from "mongoose"

const nmapSchema = new Schema(
  {
    options: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      required: true,
    },
    result: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

export default nmapSchema
