# Understanding "Coverage" and "Missing Combinations"

## The Concept

Think of it like a **menu at a restaurant**:

- **Possible combinations** = All the dishes you *could* make from your ingredients
- **Actual combinations** = The dishes you've actually created and put on the menu
- **Missing combinations** = Dishes you *could* make but haven't created yet

---

## Concrete Example

### The Dimensions (Your "Ingredients")

**Client Categories (5 options):**
1. General Adult Population
2. Helpers
3. Organizational Teams/Leaders
4. Trauma Survivors
5. Youth & Young Adults

**Themes (5 options):**
1. Building Confidence
2. Exploring Identity & Belonging
3. Finding Safety
4. Rediscovering Balance
5. Relational Dynamics

**Props (4 options):**
1. Physical Tools
2. Creative Tools
3. Sensory Tools
4. No Props

### The Math

**Total possible combinations:** 5 × 5 × 4 = **100 combinations**

This means you *could* create session plans for all 100 different combinations, like:
- General Adult Population + Building Confidence + Physical Tools
- General Adult Population + Building Confidence + Creative Tools
- General Adult Population + Building Confidence + Sensory Tools
- General Adult Population + Building Confidence + No Props
- General Adult Population + Exploring Identity + Physical Tools
- ... and 95 more combinations

---

## What Actually Exists

**Actual combinations in CSV:** **27 combinations**

This means only 27 of those 100 possible combinations have session plans created.

### Examples of Combinations That EXIST ✅

1. **General Adult Population** + **Building Confidence** + **Physical Tools** = ✅ Has a plan ("Rolling Confidence")
2. **General Adult Population** + **Exploring Identity** + **No Props** = ✅ Has a plan ("Belonging in The HERD")
3. **Organizational Teams/Leaders** + **Relational Dynamics** + **Physical Tools** = ✅ Has 3 plans

### Examples of Combinations That DON'T EXIST ❌

1. **General Adult Population** + **Building Confidence** + **Creative Tools** = ❌ No plan exists
2. **Helpers** + **Exploring Identity & Belonging** + **Physical Tools** = ❌ No plan exists
3. **Youth & Young Adults** + **Finding Safety** + **Any Props** = ❌ No plan exists
4. **Trauma Survivors** + **Rediscovering Balance** + **Any Props** = ❌ No plan exists

---

## Visual Example

Imagine a grid:

```
                    Theme 1    Theme 2    Theme 3    Theme 4    Theme 5
Category 1 + Props 1    ✅         ✅         ❌         ✅         ✅
Category 1 + Props 2    ❌         ✅         ✅         ❌         ✅
Category 1 + Props 3    ✅         ❌         ❌         ❌         ✅
Category 1 + Props 4    ✅         ✅         ❌         ❌         ✅
... (and so on for all 5 categories)
```

- ✅ = Has a session plan (27 total)
- ❌ = Missing/doesn't exist (73 total)

---

## Why This Matters

If a user selects:
- **Youth & Young Adults** + **Finding Safety** + **Creative Tools**

The system **cannot** return a session plan because that combination doesn't exist in your database, even though it's a valid combination.

---

## Summary

- **100 possible** = All the combinations you could theoretically create
- **27 exist** = The ones you've actually created
- **73 missing** = The ones you haven't created yet (but could)

**Coverage = 27%** means you've filled in 27 out of 100 possible "slots" in your combination matrix.

