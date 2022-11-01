import _ from "lodash/fp.js"
import { useState, useEffect } from "react"
import { when, autorun, reaction, computed } from "mobx"

export const useComputed = (...args) =>
  _.head(useState(() => computed(...args)))

export const useReaction = (...args) => useEffect(() => reaction(...args), [])

// Quality of life: track disposers automatically :)
export const withReactions = (fn) => {
  const disposers = []
  fn({
    when: (...args) => disposers.push(when(...args)),
    autorun: (...args) => disposers.push(autorun(...args)),
    reaction: (...args) => disposers.push(reaction(...args)),
  })
  return _.over(disposers)
}
