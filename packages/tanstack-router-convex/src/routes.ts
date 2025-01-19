import { index, rootRoute } from "@tanstack/virtual-file-routes"

export const routes = rootRoute("./routes/root/index.tsx", [
  index("./routes/index/index.tsx"),
])
