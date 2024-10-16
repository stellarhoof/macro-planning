import { index, rootRoute, route } from "@tanstack/virtual-file-routes"

export const routes = rootRoute("./routes/root/index.ts", [
  index("./routes/index/index.ts"),
  route("/foods", "./routes/foods/index.ts"),
  route("/help", "./routes/help/index.ts"),
])
