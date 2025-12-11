// Category abbreviations
const CATEGORY_ABBREVIATIONS: Record<string, string> = {
  "General Adult Population": "Gen Adult",
  "Helpers (e.g., teachers, Healthcare workers, EMT, veterans, caregivers)": "Helpers",
  "Organizational Teams/Leaders": "Org Teams",
  "Trauma Survivors &/or Marginalized Populations (e.g. BIPOC/LGBTQ+/Neurodivergent etc.)": "Trauma/Marginalized",
  "Youth & Young Adults": "Youth",
};

// Theme abbreviations
const THEME_ABBREVIATIONS: Record<string, string> = {
  "Building Confidence & Self Esteem": "Confidence",
  "Exploring Identity & Belonging": "Identity",
  "Finding Safety & Nervous System Regulation": "Safety/Regulation",
  "Rediscovering Balance": "Balance",
  "Relational Dynamics (e.g. Trust, Boundaries etc)": "Relational",
};

// Props abbreviations
const PROPS_ABBREVIATIONS: Record<string, string> = {
  "Creative Tools (e.g.paint, chalk, journaling, crafts)": "Creative",
  "No Props Needed": "No Props",
  "Physical Tools (Pool noodles, cones, ground poles, halter, lead rope, buckets)": "Physical",
  "Sensory Tools (e.g. Aromatherapy, sound makers, soft toys/fidgets, grooming brushes etc)": "Sensory",
};

export function abbreviateCategory(category: string): string {
  return CATEGORY_ABBREVIATIONS[category] || category;
}

export function abbreviateTheme(theme: string): string {
  return THEME_ABBREVIATIONS[theme] || theme;
}

export function abbreviateProps(props: string): string {
  return PROPS_ABBREVIATIONS[props] || props;
}

// Generate abbreviated plan name for potential plans
export function generateAbbreviatedPlanName(
  folio: number,
  category: string,
  theme: string,
  props: string
): string {
  const catAbbr = abbreviateCategory(category);
  const themeAbbr = abbreviateTheme(theme);
  const propsAbbr = abbreviateProps(props);
  
  return `Plan ${folio} - ${catAbbr} × ${themeAbbr} × ${propsAbbr}`;
}

