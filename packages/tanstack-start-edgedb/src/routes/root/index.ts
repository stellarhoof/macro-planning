import { createRootRoute } from "@tanstack/react-router"

import { Component } from "./Component.tsx"
import { Error_ } from "./Error.tsx"
import { NotFound } from "./NotFound.tsx"
import css from "./index.css?url"

export const Route = createRootRoute({
  meta: () => [
    { charSet: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { title: "Macro Planning" },
  ],
  links: () => [{ rel: "stylesheet", href: css }],
  component: Component,
  errorComponent: Error_,
  notFoundComponent: NotFound,
})
