import _ from "lodash/fp.js"
import { useState, useEffect } from "react"
import { computed, reaction } from "mobx"

export const useComputed = (...args) =>
  _.head(useState(() => computed(...args)))

export const useReaction = (...args) => useEffect(() => reaction(...args), [])
