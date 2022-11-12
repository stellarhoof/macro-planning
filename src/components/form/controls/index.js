import { Enum } from "./Enum.jsx"
import { Number } from "./Number.jsx"
import { String } from "./String.jsx"
import { Boolean } from "./Boolean.jsx"
import { Collection } from "./Collection.jsx"

export const controls = {
  enum: Enum,
  number: Number,
  string: String,
  boolean: Boolean,
  array: Collection,
  object: Collection,
}
