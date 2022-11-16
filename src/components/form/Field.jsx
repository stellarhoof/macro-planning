import _ from "lodash/fp"
import { useEffect, forwardRef, useCallback } from "react"
import { when, autorun, reaction } from "mobx"

const useValidateOnChange = (field) => {
  return useCallback((node) => {
    if (node && !field.fields) {
      node
        .querySelector("input")
        ?.addEventListener("change", field.reportValidity)
    }
  }, [])
}

const useSchemaEffect = (field) => {
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
}

export const Field = forwardRef(({ field, ...props }, ref) => {
  useSchemaEffect(field)
  return (
    <field.schema.layout.component
      ref={useValidateOnChange(field)}
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
