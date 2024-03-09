-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Food" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT,
    "fats" INTEGER NOT NULL,
    "carbs" INTEGER NOT NULL,
    "proteins" INTEGER NOT NULL,
    "calories" INTEGER NOT NULL,
    CONSTRAINT "Food_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "steps" TEXT NOT NULL,
    "fats" INTEGER NOT NULL,
    "carbs" INTEGER NOT NULL,
    "proteins" INTEGER NOT NULL,
    "calories" INTEGER NOT NULL,
    CONSTRAINT "Recipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Meal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "fats" INTEGER NOT NULL,
    "carbs" INTEGER NOT NULL,
    "proteins" INTEGER NOT NULL,
    "calories" INTEGER NOT NULL,
    CONSTRAINT "Meal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "carbs" INTEGER NOT NULL,
    "fats" INTEGER NOT NULL,
    "proteins" INTEGER NOT NULL,
    CONSTRAINT "Plan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RecipeFood" (
    "recipeId" INTEGER NOT NULL,
    "foodId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    PRIMARY KEY ("recipeId", "foodId"),
    CONSTRAINT "RecipeFood_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RecipeFood_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MealRecipe" (
    "mealId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,

    PRIMARY KEY ("mealId", "recipeId"),
    CONSTRAINT "MealRecipe_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MealRecipe_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Food_userId_name_key" ON "Food"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_userId_name_key" ON "Recipe"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Meal_userId_name_key" ON "Meal"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_userId_name_key" ON "Plan"("userId", "name");
