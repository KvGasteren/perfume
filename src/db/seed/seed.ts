import "dotenv/config";
import { db } from "../";
import { allergens, ingredients, ingredientAllergens } from "../schema";
import { inArray } from "drizzle-orm";
import { ALLERGENS, INGREDIENTS, INGREDIENT_ALLERGENS } from "./data";

async function upsertAllergens() {
  // Insert, ignore duplicates by unique index on name
  for (const a of ALLERGENS) {
    await db
      .insert(allergens)
      .values({
        name: a.name,
        maxConcentrationPct: a.maxConcentrationPct,
        notes: a.notes ?? null,
      })
      .onConflictDoUpdate({
        target: allergens.name,
        set: {
          notes: a.notes ?? null,
          maxConcentrationPct: a.maxConcentrationPct,
        },
      });
  }

  const rows = await db
    .select()
    .from(allergens)
    .where(
      inArray(
        allergens.name,
        ALLERGENS.map((a) => a.name)
      )
    );
  return new Map(rows.map((r) => [r.name, r.id]));
}

async function upsertIngredients() {
  for (const i of INGREDIENTS) {
    await db
      .insert(ingredients)
      .values({ name: i.name, description: i.description ?? null })
      .onConflictDoUpdate({
        target: ingredients.name,
        set: { description: i.description ?? null },
      });
  }
  const rows = await db
    .select()
    .from(ingredients)
    .where(
      inArray(
        ingredients.name,
        INGREDIENTS.map((i) => i.name)
      )
    );
  return new Map(rows.map((r) => [r.name, r.id]));
}

async function linkIngredientAllergens(
  ingredientIds: Map<string, number>,
  allergenIds: Map<string, number>
) {
  for (const link of INGREDIENT_ALLERGENS) {
    const ingId = ingredientIds.get(link.ingredient);
    const allId = allergenIds.get(link.allergen);
    if (!ingId || !allId) continue;

    await db
      .insert(ingredientAllergens)
      .values({
        ingredientId: ingId,
        allergenId: allId,
        concentrationPct: link.concentrationPct,
      })
      .onConflictDoUpdate({
        target: [
          ingredientAllergens.ingredientId,
          ingredientAllergens.allergenId,
        ],
        set: { concentrationPct: link.concentrationPct },
      });
  }
}

async function main() {
  const allergenIds = await upsertAllergens();
  const ingredientIds = await upsertIngredients();
  await linkIngredientAllergens(ingredientIds, allergenIds);
  console.log("✅ Seed complete");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
