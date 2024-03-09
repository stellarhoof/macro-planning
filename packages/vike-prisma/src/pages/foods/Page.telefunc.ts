import type { Prisma } from "@prisma/client"
import { PrismaClient } from "@prisma/client"
import { SortDescriptor } from "react-stately"

const prisma = new PrismaClient()

function sortDescriptorToOrderBy({
  column,
  direction = "descending",
}: SortDescriptor): Prisma.FoodOrderByWithRelationInput {
  return column
    ? { [column]: { ascending: "asc", descending: "desc" }[direction] }
    : {}
}

export function onLoad({
  sortDescriptor = {},
}: {
  sortDescriptor?: SortDescriptor
} = {}) {
  return prisma.food.findMany({
    orderBy: sortDescriptorToOrderBy(sortDescriptor),
  })
}
