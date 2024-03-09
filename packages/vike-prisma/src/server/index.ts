// This file isn't processed by Vite, see https://github.com/vikejs/vike/issues/562
//
//  - When changing this file, you needed to manually restart your server for
//    your changes to take effect.
//  - To use environment variables defined in .env files, you need to install
//    dotenv, see https://vike.dev/env
//  - To use path aliases defined in vite.config.js, you need to tell Node.js
//    about them, see https://vike.dev/path-aliases
//
// If you want Vite to process your server code then
//
//  - Use vavite (https://github.com/cyco130/vavite)
//  - Use vite-node (https://github.com/antfu/vite-node)
//  - Follow https://github.com/vikejs/vike/issues/562 for updates

import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

import Koa from "koa"
import bodyParser from "koa-bodyparser"
import compress from "koa-compress"
import connect from "koa-connect"
import Router from "koa-router"
import serve from "koa-static"
import { telefunc } from "telefunc"
import { renderPage } from "vike/server"

const root = `${dirname(fileURLToPath(import.meta.url))}/../..`

const router = new Router()

router.all("/_telefunc", async (ctx, next) => {
  const response = await telefunc({
    url: ctx.originalUrl,
    method: ctx.method,
    body: ctx.request.body as string,
    context: {}, // https://telefunc.com/getContext
  })

  if (response) {
    ctx.body = response.body
    ctx.status = response.statusCode
    ctx.type = response.contentType
  }

  return next()
})

// Vike middleware should always be last.
router.get("(.*)", async (ctx, next) => {
  const { httpResponse: response, errorWhileRendering: error } =
    await renderPage({ urlOriginal: ctx.originalUrl })

  if (error) {
    // Install error tracking here, see https://vike.dev/errors
  }

  if (response) {
    ctx.body = response.body
    ctx.status = response.statusCode
    ctx.set(Object.fromEntries(response.headers))
  }

  return next()
})

const app = new Koa()

if (process.env.NODE_ENV === "production") {
  app.use(compress())
  app.use(serve(`${root}/dist/client`))
} else {
  // Vite middleware.
  const { createServer } = await import("vite")
  const server = await createServer({ root, server: { middlewareMode: true } })
  app.use(connect(server.middlewares))
}

app.use(
  bodyParser({
    encoding: "utf-8",
    enableTypes: ["text", "json", "form"],
  }),
)

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {
  console.info("Server running at http://localhost:3000")
})
