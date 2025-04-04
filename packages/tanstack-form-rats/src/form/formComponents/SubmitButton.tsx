import { Button, type ButtonProps } from "#ui-rats/rats/buttons/Button.tsx"

import { useFormContext } from "../contexts.ts"

interface SubmitButtonProps extends ButtonProps {}

export function SubmitButton(props: SubmitButtonProps) {
  const form = useFormContext()
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button {...props} type="submit" isDisabled={isSubmitting} />
      )}
    </form.Subscribe>
  )
}
