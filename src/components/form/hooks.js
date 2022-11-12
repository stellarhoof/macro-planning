import _ from "lodash/fp.js"
import { useEffect } from "react"
import { when, autorun, reaction } from "mobx"

export const useControlEffect = (field) => {
  if (_.isFunction(field.schema.control.effect))
    useEffect(() => {
      const disposers = []
      field.schema.control.effect({
        field,
        when: (...args) => disposers.push(when(...args)),
        autorun: (...args) => disposers.push(autorun(...args)),
        reaction: (...args) => disposers.push(reaction(...args)),
      })
      return _.over(disposers)
    }, [])
}
