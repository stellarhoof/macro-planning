# Packages

## ./packages/mobx-keystone

- Abandoned because I wanted to learn about SSR

## ./packages/convex

- Abandoned because convex doesn't support ordering on arbitrary fields and paginating at the same time

## ./packages/vike-prisma

Started out with a simple manual sqlite approach but it quickly became obvious that I would have to deal with schema and data migrations, database seeding, and single source of truth schemas from which I could generate other schemas for various uses (db schemas, frontend schemas, etc...). Ultimately I settled on using https://www.prisma.io/docs/orm/prisma-schema/overview

- Abandoned because SQL/ORMs are a pain to write and maintain

# Vike

- Vike does not have nested routing so it needs a client-side router

`+config.ts` can be defined at any level.

Properties specified in this file can also be specified in a file with a naming convention of `+${property}`. For example, the file equivalent of a property `renderMode` is `+renderMode.ts`.

The config will be available in the page context.

The requested route is rendered server side and any data used gets serialized and added to index.html as json. Then the html is served and the route is rendered client side with the parsed data from the html.

[Good resource](https://vuejs.org/guide/scaling-up/ssr.html)

Rendering order

```
index.html
└── src/pages/Root.tsx
    └── src/pages/+Layout.tsx
        ├── src/pages/index/+Page.tsx
        ├── src/pages/foods/+Page.tsx
        └── src/pages/_error/+Page.tsx
```

# Interesting readings

https://riffle.systems/essays/prelude/

# Some conversions

1cup pea milk = 230g
1cup chickpea flour = 135g
1/4 cup maple syrup = 60ml = 40g
1tbsp maple syrup = 15ml = 10g
1tbsp butter = 15ml = 12g
1tsp butter = 5ml = 4g
1/2 cup steel cut oats = 100g
1/2 heaping cup brown rice = 100g
