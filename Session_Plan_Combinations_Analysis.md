# HERDMind Session Plan Combinations Analysis

## Executive Summary

Based on the UI inputs defined in the HTML mockup and the actual data in the CSV file, here's how many session plans are possible from different combinations of inputs.

---

## UI Input Dimensions (from HTML)

The HTML form defines **4 input dimensions**:

### 1. Scope of Practice
- **Psychotherapy/Counseling Incorporating Equines**
- **Coaching/Education Incorporating Equines**
- **Total options: 2**

### 2. Who is the Session For?
- **Organizational Teams/Leaders**
- **Individuals**
- **Groups**
- **Total options: 3**

### 3. Want to Include Props?
- **Physical Tools** (Pool noodles, cones, ground poles...)
- **Natural Objects**
- **No Props**
- **Total options: 3**

### 4. General Session Theme?
- **Exploring Identity & Belonging**
- **Leadership & Communication**
- **Boundaries & Safety**
- **Total options: 3**

---

## Actual Data in CSV

The CSV contains **39 session plans** with the following dimensions:

### Client Categories (5 unique values)
1. General Adult Population (10 sessions)
2. Helpers (e.g., teachers, Healthcare workers, EMT, veterans, caregivers) (8 sessions)
3. Organizational Teams/Leaders (5 sessions)
4. Trauma Survivors &/or Marginalized Populations (e.g. BIPOC/LGBTQ+/Neurodivergent etc.) (12 sessions)
5. Youth & Young Adults (4 sessions)

### Session Themes (5 unique values)
1. Building Confidence & Self Esteem (7 sessions)
2. Exploring Identity & Belonging (5 sessions)
3. Finding Safety & Nervous System Regulation (4 sessions)
4. Rediscovering Balance (8 sessions)
5. Relational Dynamics (e.g. Trust, Boundaries etc) (15 sessions)

### Prop Types (4 unique values)
1. Creative Tools (e.g.paint, chalk, journaling, crafts) (6 sessions)
2. No Props Needed (5 sessions)
3. Physical Tools (Pool noodles, cones, ground poles, halter, lead rope, buckets) (17 sessions)
4. Sensory Tools (e.g. Aromatherapy, sound makers, soft toys/fidgets, grooming brushes etc) (11 sessions)

**Note:** The CSV does NOT contain a "Scope of Practice" dimension, so this input from the HTML is not currently used in the data filtering.

---

## Combination Calculations

### Theoretical Combinations Based on HTML UI

If all HTML inputs were independent and all combinations were valid:

```
Scope (2) × Who (3) × Props (3) × Theme (3) = 54 possible combinations
```

**However**, the "Scope of Practice" dimension is not present in the CSV data, so it cannot be used for filtering.

### Theoretical Combinations Based on CSV Data

If all CSV dimensions were independent:

```
Client Category (5) × Prop Type (4) × Session Theme (5) = 100 possible combinations
```

### Actual Combinations in CSV

**27 unique combinations** exist in the CSV data (out of 100 theoretically possible).

This represents **27.0% coverage** of all possible combinations.

Some combinations appear multiple times (39 total session plans = 27 unique combinations), meaning some combinations have multiple session plan variations.

---

## Key Findings

1. **UI vs. Data Mismatch:**
   - The HTML UI shows 3 options for "Who is the session for?" but the CSV has 5 different client categories
   - The HTML UI shows 3 prop types, but the CSV has 4 (missing "Natural Objects" in CSV, but has "Creative Tools" and "Sensory Tools" not in HTML)
   - The HTML UI shows 3 themes, but the CSV has 5 themes
   - The HTML UI has a "Scope of Practice" field that doesn't exist in the CSV

2. **Most Common Combinations:**
   - **Relational Dynamics** theme appears in 15 sessions (most popular)
   - **Physical Tools** props appear in 17 sessions (most popular)
   - **Trauma Survivors &/or Marginalized Populations** category has 12 sessions

3. **Coverage:**
   - Only 27 out of 100 theoretically possible combinations are represented
   - This suggests the system could be expanded with more session plans to cover additional combinations

---

## Recommendations

1. **Align UI with Data:** Update the HTML form to match the actual CSV dimensions, or filter the CSV data to match the HTML options.

2. **Add Missing Combinations:** Consider creating session plans for the 73 missing combinations (100 - 27) to provide full coverage.

3. **Handle Scope of Practice:** Either:
   - Add a "scope_of_practice" column to the CSV, or
   - Remove this field from the HTML form if it's not needed for filtering

4. **Clarify Mapping:** Create a clear mapping between:
   - HTML "Who is the session for?" → CSV "client_category"
   - HTML "Props" → CSV "prop_type"  
   - HTML "Theme" → CSV "session_theme"

---

## Summary Table

| Dimension | HTML UI Options | CSV Unique Values | Match? |
|-----------|----------------|-------------------|--------|
| Scope of Practice | 2 | 0 (not in CSV) | ❌ No |
| Who/Client Category | 3 | 5 | ⚠️ Partial |
| Props | 3 | 4 | ⚠️ Partial |
| Theme | 3 | 5 | ⚠️ Partial |
| **Total Theoretical (HTML)** | **54** | - | - |
| **Total Theoretical (CSV)** | - | **100** | - |
| **Actual Unique Combinations** | - | **27** | - |
| **Total Session Plans** | - | **39** | - |

---

*Analysis generated from: `html mockup of app flow.html` and `HERDMind_Session_Plans.csv`*

