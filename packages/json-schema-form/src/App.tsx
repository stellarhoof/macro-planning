import { FormProvider, type SubmitHandler, useForm } from "react-hook-form"
import { Button } from "#ui-rats/rats/buttons/Button.tsx"
import { Checkbox as RACCheckbox } from "#ui-rats/rats/forms/Checkbox.tsx"
import { Form } from "#ui-rats/rats/forms/Form.tsx"
import { Radio as RACRadio } from "#ui-rats/rats/forms/RadioGroup.tsx"
import { ComboBoxItem } from "#ui-rats/rats/pickers/ComboBox.tsx"
import { SelectItem } from "#ui-rats/rats/pickers/Select.tsx"
import { Checkbox } from "./fields/Checkbox.tsx"
import { CheckboxGroup } from "./fields/CheckboxGroup.tsx"
import { ComboBox } from "./fields/Combobox.tsx"
import { NumberField } from "./fields/NumberField.tsx"
import { RadioGroup } from "./fields/RadioGroup.tsx"
import { Select } from "./fields/Select.tsx"
import { TextArea, TextField } from "./fields/TextField.tsx"

interface FormInput {
  firstName: string
  lastName: string
  age: number
}

const required = { value: true, message: "This field is required" }

export default function App() {
  const methods = useForm<FormInput>()
  const onSubmit: SubmitHandler<FormInput> = (data) => console.log(data)
  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="w-80 flex gap-4 flex-col"
      >
        <TextField name="firstName" label="First Name" rules={{ required }} />

        <TextArea name="story" label="Story" rules={{ required }} />

        <NumberField name="age" label="Age" rules={{ required }} />

        <Checkbox name="subscribed" rules={{ required }}>
          Subscribed
        </Checkbox>

        <Select
          name="iceCreamFlavor"
          label="Ice cream flavor"
          rules={{ required }}
        >
          <SelectItem id="chocolate">Chocolate</SelectItem>
          <SelectItem id="mint">Mint</SelectItem>
          <SelectItem id="strawberry">Strawberry</SelectItem>
          <SelectItem id="vanilla">Vanilla</SelectItem>
        </Select>

        <ComboBox name="fruit" label="Fruit" rules={{ required }}>
          <ComboBoxItem id="apple">Apple</ComboBoxItem>
          <ComboBoxItem id="banana">Banana</ComboBoxItem>
          <ComboBoxItem id="orange">Orange</ComboBoxItem>
          <ComboBoxItem id="watermelon">Watermelon</ComboBoxItem>
        </ComboBox>

        <CheckboxGroup
          name="favoriteSports"
          label="Favorite sports"
          rules={{ required }}
        >
          <RACCheckbox value="soccer">Soccer</RACCheckbox>
          <RACCheckbox value="baseball">Baseball</RACCheckbox>
          <RACCheckbox value="basketball">Basketball</RACCheckbox>
        </CheckboxGroup>

        <RadioGroup
          name="favoritePet"
          label="Favorite pet"
          rules={{ required }}
        >
          <RACRadio value="dog">Dog</RACRadio>
          <RACRadio value="cat">Cat</RACRadio>
          <RACRadio value="dragon">Dragon</RACRadio>
        </RadioGroup>

        <Button type="submit">Submit</Button>
      </Form>
    </FormProvider>
  )
}
