import type { Meta, StoryObj } from "@storybook/react-vite"
import { Form, Header, ListBoxSection } from "react-aria-components"

import { Button } from "../buttons/Button.tsx"
import { ListBoxItem } from "../collections/ListBox.tsx"
import { ComboBox } from "./ComboBox.tsx"

export default { component: ComboBox } satisfies Meta<typeof ComboBox>

type Story = StoryObj<typeof ComboBox>

export const Example: Story = {
  args: {
    label: "Ice cream flavor",
  },
  render: (args) => (
    <ComboBox {...args}>
      <ListBoxItem>Chocolate</ListBoxItem>
      <ListBoxItem id="mint">Mint</ListBoxItem>
      <ListBoxItem>Strawberry</ListBoxItem>
      <ListBoxItem>Vanilla</ListBoxItem>
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
        <ListBoxItem>Chocolate</ListBoxItem>
        <ListBoxItem id="mint">Mint</ListBoxItem>
        <ListBoxItem>Strawberry</ListBoxItem>
        <ListBoxItem>Vanilla</ListBoxItem>
      </ComboBox>
      <Button type="submit" variant="secondary">
        Submit
      </Button>
    </Form>
  ),
}
