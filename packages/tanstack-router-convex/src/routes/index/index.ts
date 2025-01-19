import { createFileRoute } from "@tanstack/react-router"
import { Component } from "./Component.tsx"

export const Route = createFileRoute("/")({
  component: Component,
})
