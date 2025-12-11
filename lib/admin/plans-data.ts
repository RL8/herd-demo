import dashboardData from '@/dashboard_data.json';
import { generateAbbreviatedPlanName } from './abbreviations';

export interface Plan {
  id: string;
  name: string;
  description: string;
  focus: string;
}

export interface PlanCombination {
  folio: number;
  row: number;
  category: string;
  theme: string;
  props: string;
  hasPlan: boolean;
  planName: string;
  plans: Plan[];
  count: number;
}

export interface PlansData {
  stats: {
    total: number;
    existing: number;
    missing: number;
    coverage: number;
  };
  categories: string[];
  themes: string[];
  props: string[];
  combinations: PlanCombination[];
}

// Restructure the data with folio numbers
function restructurePlansData(): PlansData {
  const data = dashboardData as PlansData;
  
  // Separate existing and potential plans
  const existingPlans = data.combinations.filter(c => c.hasPlan);
  const potentialPlans = data.combinations.filter(c => !c.hasPlan);
  
  // Sort both by row number
  existingPlans.sort((a, b) => a.row - b.row);
  potentialPlans.sort((a, b) => a.row - b.row);
  
  // Assign folio numbers to existing plans (1-27)
  const restructuredExisting = existingPlans.map((combo, index) => ({
    ...combo,
    folio: index + 1,
  }));
  
  // Assign folio numbers to potential plans (28+)
  const restructuredPotential = potentialPlans.map((combo, index) => ({
    ...combo,
    folio: existingPlans.length + index + 1,
    // Update plan name with abbreviations
    planName: generateAbbreviatedPlanName(
      existingPlans.length + index + 1,
      combo.category,
      combo.theme,
      combo.props
    ),
  }));
  
  // Combine: existing first, then potential
  const combinedCombinations = [
    ...restructuredExisting,
    ...restructuredPotential,
  ];
  
  return {
    stats: data.stats,
    categories: data.categories,
    themes: data.themes,
    props: data.props,
    combinations: combinedCombinations,
  };
}

// Export the restructured data
export const plansData = restructurePlansData();

// Helper functions
export function getUniqueCategoriesFromPlans(): string[] {
  return plansData.categories;
}

export function getUniqueThemesFromPlans(): string[] {
  return plansData.themes;
}

export function getUniquePropsFromPlans(): string[] {
  return plansData.props;
}

export function getPlansStats() {
  return plansData.stats;
}

