export const ALLERGENS = [
{ name: "Limonene", maxConcentrationPct: null, notes: "Common in citrus oils" },
{ name: "Linalool", maxConcentrationPct: null, notes: "Lavender, coriander" },
{ name: "Citral", maxConcentrationPct: null, notes: "Lemon-scent component" },
{ name: "Geraniol", maxConcentrationPct: null, notes: "Rose-like" },
{ name: "Coumarin", maxConcentrationPct: null, notes: "Sweet hay/tonka" },
{ name: "Eugenol", maxConcentrationPct: null, notes: "Clove-like" },
{ name: "Cinnamal", maxConcentrationPct: null, notes: "Cinnamon aldehyde" },
{ name: "Hydroxycitronellal", maxConcentrationPct: null, notes: "Fresh floral" },
{ name: "Benzyl alcohol", maxConcentrationPct: null, notes: "Aromatic alcohol" },
{ name: "Benzyl benzoate", maxConcentrationPct: null, notes: "Solvent/fixative" },
] as const;


export const INGREDIENTS = [
{ name: "Bergamot Oil", description: "Citrus top note" },
{ name: "Lavender Oil", description: "Aromatic floral" },
{ name: "Rose Absolute", description: "Rich floral" },
{ name: "Sandalwood Oil", description: "Creamy woody" },
{ name: "Vanilla Extract", description: "Sweet gourmand" },
] as const;


/** Map allergens present per ingredient with concentration (%) inside the ingredient. */
export const INGREDIENT_ALLERGENS: Array<{
ingredient: string;
allergen: string;
concentrationPct: number;
}> = [
// Bergamot (typical citrus allergen profile, illustrative only)
{ ingredient: "Bergamot Oil", allergen: "Limonene", concentrationPct: 18.25 },
{ ingredient: "Bergamot Oil", allergen: "Linalool", concentrationPct: 9.6 },
{ ingredient: "Bergamot Oil", allergen: "Citral", concentrationPct: 0.6 },


// Lavender
{ ingredient: "Lavender Oil", allergen: "Linalool", concentrationPct: 32.1 },
{ ingredient: "Lavender Oil", allergen: "Limonene", concentrationPct: 1.2 },


// Rose
{ ingredient: "Rose Absolute", allergen: "Citral", concentrationPct: 0.3 },
{ ingredient: "Rose Absolute", allergen: "Geraniol", concentrationPct: 8.4 },


// Sandalwood (illustrative placeholders)
{ ingredient: "Sandalwood Oil", allergen: "Benzyl benzoate", concentrationPct: 0.4 },


// Vanilla
{ ingredient: "Vanilla Extract", allergen: "Coumarin", concentrationPct: 0.2 },
];