// import { relations } from "drizzle-orm/relations";
import {
  pgTable,
  serial,
  integer,
  varchar,
  text,
  boolean,
  timestamp,
  numeric,
  uniqueIndex,
} from "drizzle-orm/pg-core";

/**
 * Units & conventions
 * - All percentages are 0–100 with up to 4 decimal places
 * - `maxConcentrationPct` on Allergen is an optional generic cap (NOT category-specific IFRA caps).
 */
export const ingredients = pgTable(
  "ingredients",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
    isDeprecated: boolean("is_deprecated").default(false).notNull(),
  },
  (t) => [
    uniqueIndex("ux_ing_name").on(t.name),
  ]
);

export const allergens = pgTable(
  "allergens",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    // Keep NUMERIC as string at runtime (PG returns text); if you want TS number inference:
    // maxConcentrationPct: numeric("max_concentration_pct", { precision: 6, scale: 4 }).$type<number>(),
    maxConcentrationPct: numeric("max_concentration_pct", { precision: 6, scale: 4 }).$type<number | null>(),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    uniqueIndex("ux_all_name").on(t.name),
  ]
);

export const ingredientAllergens = pgTable(
  "ingredient_allergens",
  {
    id: serial("id").primaryKey(),
    ingredientId: integer("ingredient_id")
      .notNull()
      .references(() => ingredients.id, { onDelete: "cascade", onUpdate: "cascade" }),
    allergenId: integer("allergen_id")
      .notNull()
      .references(() => allergens.id, { onDelete: "cascade", onUpdate: "cascade" }),
    concentrationPct: numeric("concentration_pct", { precision: 6, scale: 4 }).notNull().$type<number>(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    uniqueIndex("ux_ing_all_pair").on(t.ingredientId, t.allergenId),
  ]
);
