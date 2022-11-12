import _ from "lodash/fp"
import { useEffect, forwardRef, useCallback } from "react"
import { when, autorun, reaction } from "mobx"

export const Field = forwardRef(({ field, ...props }, ref) => {
  const layoutRef = useCallback((node) => {
    if (
      node !== null &&
      field.schema.type !== "array" &&
      field.schema.type !== "object"
    ) {
      const el = node.querySelector("input")
      el?.addEventListener(
        "change",
        () => console.info(field.path) || console.info(field.reportValidity())
      )
    }
  }, [])

  useEffect(() => {
    if (_.isFunction(field.schema.effect)) {
      const disposers = []
      field.schema.effect(field, {
        when: (...args) => disposers.push(when(...args)),
        autorun: (...args) => disposers.push(autorun(...args)),
        reaction: (...args) => disposers.push(reaction(...args)),
      })
      return _.over(disposers)
    }
  }, [])

  return (
    <field.schema.layout.component
      ref={layoutRef}
      field={field}
      {...field.schema.layout.props}
      {...props}
    >
      <field.schema.control.component
        ref={ref}
        field={field}
        {...field.schema.control.props}
      />
    </field.schema.layout.component>
  )
})
