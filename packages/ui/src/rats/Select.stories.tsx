import type { Meta, StoryObj } from "@storybook/react"
import { Form } from "react-aria-components"

import { Button } from "./Button.jsx"
import { Select, SelectItem, SelectSection } from "./Select.jsx"

export default { component: Select } satisfies Meta<typeof Select>

type Story = StoryObj<typeof Select>

export const Example: Story = {
  args: {
    label: "Ice cream flavor",
  },
  render: (args) => (
    <Select {...args}>
      <SelectItem>Chocolate</SelectItem>
      <SelectItem id="mint">Mint</SelectItem>
      <SelectItem>Strawberry</SelectItem>
      <SelectItem>Vanilla</SelectItem>
    </Select>
  ),
}

export const DisabledItems: Story = {
  args: {
    ...Example.args,
    disabledKeys: ["mint"],
  },
  render: Example.render,
}

export const Sections: Story = {
  args: {
    label: "Preferred fruit or vegetable",
  },
  render: (args) => (
    <Select {...args}>
      <SelectSection title="Fruit">
        <SelectItem id="Apple">Apple</SelectItem>
        <SelectItem id="Banana">Banana</SelectItem>
        <SelectItem id="Orange">Orange</SelectItem>
        <SelectItem id="Honeydew">Honeydew</SelectItem>
        <SelectItem id="Grapes">Grapes</SelectItem>
        <SelectItem id="Watermelon">Watermelon</SelectItem>
        <SelectItem id="Cantaloupe">Cantaloupe</SelectItem>
        <SelectItem id="Pear">Pear</SelectItem>
      </SelectSection>
      <SelectSection title="Vegetable">
        <SelectItem id="Cabbage">Cabbage</SelectItem>
        <SelectItem id="Broccoli">Broccoli</SelectItem>
        <SelectItem id="Carrots">Carrots</SelectItem>
        <SelectItem id="Lettuce">Lettuce</SelectItem>
        <SelectItem id="Spinach">Spinach</SelectItem>
        <SelectItem id="Bok Choy">Bok Choy</SelectItem>
        <SelectItem id="Cauliflower">Cauliflower</SelectItem>
        <SelectItem id="Potatoes">Potatoes</SelectItem>
      </SelectSection>
    </Select>
  ),
}

export const Validation: Story = {
  args: {
    isRequired: true,
  },
  render: (args) => (
    <Form className="flex flex-col items-start gap-2">
      <Select {...args}>
        <SelectItem>Chocolate</SelectItem>
        <SelectItem id="mint">Mint</SelectItem>
        <SelectItem>Strawberry</SelectItem>
        <SelectItem>Vanilla</SelectItem>
      </Select>
      <Button type="submit" variant="secondary">
        Submit
      </Button>
    </Form>
  ),
}
