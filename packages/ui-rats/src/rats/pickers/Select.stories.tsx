import type { Meta, StoryObj } from "@storybook/react"
import { Form, Header, ListBoxSection } from "react-aria-components"

import { Button } from "../buttons/Button.tsx"
import { ListBoxItem } from "../collections/ListBox.tsx"
import { Select } from "./Select.tsx"

export default { component: Select } satisfies Meta<typeof Select>

type Story = StoryObj<typeof Select>

export const Example: Story = {
  args: {
    label: "Ice cream flavor",
  },
  render: (args) => (
    <Select {...args}>
      <ListBoxItem>Chocolate</ListBoxItem>
      <ListBoxItem id="mint">Mint</ListBoxItem>
      <ListBoxItem>Strawberry</ListBoxItem>
      <ListBoxItem>Vanilla</ListBoxItem>
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
      <ListBoxSection>
        <Header>Fruit</Header>
        <ListBoxItem id="Apple">Apple</ListBoxItem>
        <ListBoxItem id="Banana">Banana</ListBoxItem>
        <ListBoxItem id="Orange">Orange</ListBoxItem>
        <ListBoxItem id="Honeydew">Honeydew</ListBoxItem>
        <ListBoxItem id="Grapes">Grapes</ListBoxItem>
        <ListBoxItem id="Watermelon">Watermelon</ListBoxItem>
        <ListBoxItem id="Cantaloupe">Cantaloupe</ListBoxItem>
        <ListBoxItem id="Pear">Pear</ListBoxItem>
      </ListBoxSection>
      <ListBoxSection>
        <Header>Vegetable</Header>
        <ListBoxItem id="Cabbage">Cabbage</ListBoxItem>
        <ListBoxItem id="Broccoli">Broccoli</ListBoxItem>
        <ListBoxItem id="Carrots">Carrots</ListBoxItem>
        <ListBoxItem id="Lettuce">Lettuce</ListBoxItem>
        <ListBoxItem id="Spinach">Spinach</ListBoxItem>
        <ListBoxItem id="Bok Choy">Bok Choy</ListBoxItem>
        <ListBoxItem id="Cauliflower">Cauliflower</ListBoxItem>
        <ListBoxItem id="Potatoes">Potatoes</ListBoxItem>
      </ListBoxSection>
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
        <ListBoxItem>Chocolate</ListBoxItem>
        <ListBoxItem id="mint">Mint</ListBoxItem>
        <ListBoxItem>Strawberry</ListBoxItem>
        <ListBoxItem>Vanilla</ListBoxItem>
      </Select>
      <Button type="submit" variant="secondary">
        Submit
      </Button>
    </Form>
  ),
}
