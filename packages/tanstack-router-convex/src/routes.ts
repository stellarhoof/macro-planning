import { index, rootRoute } from "@tanstack/virtual-file-routes"

export const routes = rootRoute("./routes/root/index.ts", [
  index("./routes/index/index.ts"),
])
