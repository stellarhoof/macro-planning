import type { Meta, StoryObj } from "@storybook/react"
import { Form } from "react-aria-components"

import { Button } from "../Button.tsx"
import { ComboBox, ComboBoxItem, ComboBoxSection } from "./ComboBox.tsx"

export default { component: ComboBox } satisfies Meta<typeof ComboBox>

type Story = StoryObj<typeof ComboBox>

export const Example: Story = {
  args: {
    label: "Ice cream flavor",
  },
  render: (args) => (
    <ComboBox {...args}>
      <ComboBoxItem>Chocolate</ComboBoxItem>
      <ComboBoxItem id="mint">Mint</ComboBoxItem>
      <ComboBoxItem>Strawberry</ComboBoxItem>
      <ComboBoxItem>Vanilla</ComboBoxItem>
    </ComboBox>
  ),
}

export const DisabledItems: Story = {
  args: {
    label: "Ice cream flavor",
    disabledKeys: ["mint"],
  },
  render: Example.render,
}

export const Sections: Story = {
  args: {
    label: "Preferred fruit or vegetable",
  },
  render: (args) => (
    <ComboBox {...args}>
      <ComboBoxSection title="Fruit">
        <ComboBoxItem id="Apple">Apple</ComboBoxItem>
        <ComboBoxItem id="Banana">Banana</ComboBoxItem>
        <ComboBoxItem id="Orange">Orange</ComboBoxItem>
        <ComboBoxItem id="Honeydew">Honeydew</ComboBoxItem>
        <ComboBoxItem id="Grapes">Grapes</ComboBoxItem>
        <ComboBoxItem id="Watermelon">Watermelon</ComboBoxItem>
        <ComboBoxItem id="Cantaloupe">Cantaloupe</ComboBoxItem>
        <ComboBoxItem id="Pear">Pear</ComboBoxItem>
      </ComboBoxSection>
      <ComboBoxSection title="Vegetable">
        <ComboBoxItem id="Cabbage">Cabbage</ComboBoxItem>
        <ComboBoxItem id="Broccoli">Broccoli</ComboBoxItem>
        <ComboBoxItem id="Carrots">Carrots</ComboBoxItem>
        <ComboBoxItem id="Lettuce">Lettuce</ComboBoxItem>
        <ComboBoxItem id="Spinach">Spinach</ComboBoxItem>
        <ComboBoxItem id="Bok Choy">Bok Choy</ComboBoxItem>
        <ComboBoxItem id="Cauliflower">Cauliflower</ComboBoxItem>
        <ComboBoxItem id="Potatoes">Potatoes</ComboBoxItem>
      </ComboBoxSection>
    </ComboBox>
  ),
}

export const Validation: Story = {
  args: {
    isRequired: true,
  },
  render: (args) => (
    <Form className="flex flex-col items-start gap-2">
      <ComboBox {...args}>
        <ComboBoxItem>Chocolate</ComboBoxItem>
        <ComboBoxItem id="mint">Mint</ComboBoxItem>
        <ComboBoxItem>Strawberry</ComboBoxItem>
        <ComboBoxItem>Vanilla</ComboBoxItem>
      </ComboBox>
      <Button type="submit" variant="secondary">
        Submit
      </Button>
    </Form>
  ),
}
