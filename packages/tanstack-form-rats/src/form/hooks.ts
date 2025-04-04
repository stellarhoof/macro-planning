import { createFormHook } from "@tanstack/react-form"

import { fieldContext, formContext } from "./contexts.ts"
import { CheckboxField } from "./fieldComponents/CheckboxField.tsx"
import { CheckboxGroupField } from "./fieldComponents/CheckboxGroupField.tsx"
import { ComboBoxField } from "./fieldComponents/ComboBoxField.tsx"
import { DatePickerField } from "./fieldComponents/DatePickerField.tsx"
import { NumberField } from "./fieldComponents/NumberField.tsx"
import { RadioGroupField } from "./fieldComponents/RadioGroupField.tsx"
import { SelectField } from "./fieldComponents/SelectField.tsx"
import { TextAreaField } from "./fieldComponents/TextAreaField.tsx"
import { TextField } from "./fieldComponents/TextField.tsx"
import { SubmitButton } from "./formComponents/SubmitButton.tsx"
import { JsonSchemaCheckboxField } from "./jsonSchemaFieldComponents/JsonSchemaCheckboxField.tsx"
import { JsonSchemaCheckboxGroupField } from "./jsonSchemaFieldComponents/JsonSchemaCheckboxGroupField.tsx"
import { JsonSchemaComboBoxField } from "./jsonSchemaFieldComponents/JsonSchemaComboBoxField.tsx"
import { JsonSchemaField } from "./jsonSchemaFieldComponents/JsonSchemaField.tsx"
import { JsonSchemaNumberField } from "./jsonSchemaFieldComponents/JsonSchemaNumberField.tsx"
import { JsonSchemaObjectField } from "./jsonSchemaFieldComponents/JsonSchemaObjectField.tsx"
import { JsonSchemaRadioGroupField } from "./jsonSchemaFieldComponents/JsonSchemaRadioGroupField.tsx"
import { JsonSchemaSelectField } from "./jsonSchemaFieldComponents/JsonSchemaSelectField.tsx"
import { JsonSchemaTextAreaField } from "./jsonSchemaFieldComponents/JsonSchemaTextAreaField.tsx"
import { JsonSchemaTextField } from "./jsonSchemaFieldComponents/JsonSchemaTextField.tsx"

export const { useAppForm, withForm } = createFormHook({
  formContext,
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  fieldComponents: {
    TextField,
    TextAreaField,
    NumberField,
    SelectField,
    CheckboxField,
    CheckboxGroupField,
    RadioGroupField,
    ComboBoxField,
    DatePickerField,
    JsonSchemaField,
    JsonSchemaObjectField,
    JsonSchemaCheckboxField,
    JsonSchemaTextField,
    JsonSchemaTextAreaField,
    JsonSchemaNumberField,
    JsonSchemaSelectField,
    JsonSchemaCheckboxGroupField,
    JsonSchemaRadioGroupField,
    JsonSchemaComboBoxField,
  },
})
