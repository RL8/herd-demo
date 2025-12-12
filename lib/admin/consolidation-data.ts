export interface ConsolidationOpportunity {
  category: string;
  currentScreens: number;
  potentialScreens: number;
  savings: number;
  savingsPercent: number;
  priority: 'extreme' | 'high' | 'moderate' | 'low';
  complexity: 'low' | 'medium' | 'high';
  quickWins?: QuickWin[];
  duplicates: DuplicateGroup[];
}

export interface QuickWin {
  action: string;
  from: number;
  to: number;
  saves: number;
  complexity: 'low' | 'medium' | 'high';
  estimatedWeeks: string;
  category: string;
}

export interface DuplicateGroup {
  name: string;
  screens: string[];
  consolidatedTo: string;
  approach: string;
  parameters?: string[];
}

export const topQuickWins: QuickWin[] = [
  {
    action: 'Consolidate membership pricing screens',
    from: 9,
    to: 2,
    saves: 7,
    complexity: 'low',
    estimatedWeeks: '1-2',
    category: 'Subscriptions & Billing'
  },
  {
    action: 'Unify block/delete/report modals',
    from: 16,
    to: 3,
    saves: 13,
    complexity: 'medium',
    estimatedWeeks: '2-3',
    category: 'Social / Community'
  },
  {
    action: 'Merge platform home screens',
    from: 4,
    to: 1,
    saves: 3,
    complexity: 'low',
    estimatedWeeks: '1',
    category: 'Misc / Utilities'
  },
  {
    action: 'Consolidate success/transition modals',
    from: 6,
    to: 2,
    saves: 4,
    complexity: 'low',
    estimatedWeeks: '1-2',
    category: 'Modals & Transitions'
  },
];

export const consolidationData: ConsolidationOpportunity[] = [
  {
    category: 'Social / Community',
    currentScreens: 73,
    potentialScreens: 40,
    savings: 33,
    savingsPercent: 45,
    priority: 'extreme',
    complexity: 'medium',
    duplicates: [
      {
        name: 'Block User Actions',
        screens: ['Block User Confirmed', 'Block User HERDMind Comment', 'Block User HERDMind Post', 'Block User HERDster Comment', 'Block User HERDster Post'],
        consolidatedTo: 'Unified Block Modal',
        approach: 'Single modal with community and content type parameters'
      },
      {
        name: 'Delete Actions',
        screens: ['Delete HERDMind Comment', 'Delete HERDMind Post', 'Delete HERDster Comment', 'Delete HERDster Post', 'Delete Chat Modal'],
        consolidatedTo: 'Unified Delete Modal',
        approach: 'Single confirmation modal with content type parameter'
      },
      {
        name: 'Report Flow',
        screens: ['Report Comment (HERDMind)', 'Report Comment (HERDster)', 'Report Post (HERDMind)', 'Report Post (HERDster)', 'Report Submitted (HERDMind)', 'Report Submitted HERDster'],
        consolidatedTo: 'Unified Report System',
        approach: 'Two screens: report form + confirmation with parameters'
      },
      {
        name: 'Social Profiles',
        screens: ['Social Profile HERDMind Comments', 'Social Profile HERDMind Posts', 'Social Profile HERDSter Comments', 'Social Profile HERDster Posts'],
        consolidatedTo: 'Unified Profile with Tabs',
        approach: 'Single profile screen with tab navigation'
      }
    ]
  },
  {
    category: 'Games & Interactive Flow',
    currentScreens: 61,
    potentialScreens: 40,
    savings: 21,
    savingsPercent: 34,
    priority: 'high',
    complexity: 'high',
    duplicates: [
      {
        name: 'Field Theory Scenes',
        screens: ['Field Theory Screen 1', '...24 more scenes', 'Field Theory Ending A-G (7 endings)'],
        consolidatedTo: 'Data-Driven Scene Engine',
        approach: 'Scene renderer + JSON data structure (long-term optimization)'
      }
    ]
  },
  {
    category: 'Subscriptions & Billing',
    currentScreens: 21,
    potentialScreens: 12,
    savings: 9,
    savingsPercent: 43,
    priority: 'extreme',
    complexity: 'low',
    quickWins: [
      {
        action: 'Consolidate membership pricing screens',
        from: 9,
        to: 2,
        saves: 7,
        complexity: 'low',
        estimatedWeeks: '1-2',
        category: 'Subscriptions & Billing'
      }
    ],
    duplicates: [
      {
        name: 'Membership Pricing Variants',
        screens: ['Annual Membership Pricing', 'Annual Membership Pricing HERDGM', 'Annual Membership Pricing HERDSG', 'Annual Membership Pricing Release 2', 'Annual Membership Pricing Transition', 'Monthly Membership Pricing', 'Monthly Membership Pricing HERDGM', 'Monthly Membership Pricing HERDSG', 'Monthly Membership Pricing Release 2'],
        consolidatedTo: 'Unified Pricing Screen (Annual + Monthly)',
        approach: 'Two screens with user type and release version parameters',
        parameters: ['userType: HERDGM|HERDSG|generic', 'period: annual|monthly', 'releaseVersion']
      },
      {
        name: 'Upgrade Flow',
        screens: ['Upgrade Codes Modal', 'Upgrade Prompt', 'Upgrade Prompt Transition'],
        consolidatedTo: 'Unified Upgrade Modal',
        approach: 'Single modal with state management for flow stages'
      }
    ]
  },
  {
    category: 'Authentication & Account',
    currentScreens: 18,
    potentialScreens: 14,
    savings: 4,
    savingsPercent: 22,
    priority: 'moderate',
    complexity: 'low',
    duplicates: [
      {
        name: 'Sign Up Variants',
        screens: ['Email Sign Up Release 1.0', 'Sign Up Release 2', 'Sign Up Release 1.0'],
        consolidatedTo: 'Unified Sign Up Screen',
        approach: 'Feature flags for release versions'
      },
      {
        name: 'IAPHUB Checks',
        screens: ['IAPHUB Check Subscription Screen (Sign up)', 'IAPHUB Check Subscription Screen Log in'],
        consolidatedTo: 'Unified IAPHUB Check',
        approach: 'Single screen with entry context parameter'
      }
    ]
  },
  {
    category: 'Misc / Utilities / For Later Release',
    currentScreens: 11,
    potentialScreens: 6,
    savings: 5,
    savingsPercent: 45,
    priority: 'extreme',
    complexity: 'low',
    duplicates: [
      {
        name: 'Platform Home Screens',
        screens: ['Home', 'Home Android Version 0.23', 'Home Apple Version 0.0.23', 'Home WPA'],
        consolidatedTo: 'Responsive Home Screen',
        approach: 'Single screen with platform detection and responsive design'
      },
      {
        name: 'Log Updates',
        screens: ['Annual Log Update Screen', 'Monthly Log Update Screen'],
        consolidatedTo: 'Unified Log Update Screen',
        approach: 'Single screen with period parameter'
      }
    ]
  },
  {
    category: 'Modals, Confirmations & Transitions',
    currentScreens: 11,
    potentialScreens: 6,
    savings: 5,
    savingsPercent: 45,
    priority: 'extreme',
    complexity: 'low',
    duplicates: [
      {
        name: 'Success Transitions',
        screens: ['Restored Success', 'Restored Success Transition', 'Restored Success Transition 2'],
        consolidatedTo: 'Reusable Success Modal',
        approach: 'Single modal component with customizable message'
      },
      {
        name: 'IAPHUB Transitions',
        screens: ['IAPHUB Check Transition Screen', 'IAPHUB Check Transition Screen 2', 'IAPHUB Check Transition Screen 3'],
        consolidatedTo: 'State-Based Transition',
        approach: 'Single screen with state machine'
      }
    ]
  },
  {
    category: 'Session Plans & Meetings',
    currentScreens: 9,
    potentialScreens: 6,
    savings: 3,
    savingsPercent: 33,
    priority: 'high',
    complexity: 'low',
    duplicates: [
      {
        name: 'Favorite Sessions',
        screens: ['Favorite Sessions', 'Favorite Session Plan Details', 'Print Favorite Sessions'],
        consolidatedTo: 'Integrated Favorites View',
        approach: 'Single screen with detail view and print action'
      },
      {
        name: 'Session Requests',
        screens: ['New Session Request', 'New Session Request 2 (For release 1.2)'],
        consolidatedTo: 'Unified Session Request',
        approach: 'Feature flags for version differences'
      }
    ]
  },
  {
    category: 'Notifications & Alerts',
    currentScreens: 5,
    potentialScreens: 3,
    savings: 2,
    savingsPercent: 40,
    priority: 'extreme',
    complexity: 'low',
    duplicates: [
      {
        name: 'Notification Lists',
        screens: ['Notifications List', 'Notifications List 2', 'Notifications Routing Screen'],
        consolidatedTo: 'Unified Notifications',
        approach: 'Single screen with routing logic'
      }
    ]
  },
];

export const consolidationSummary = {
  totalScreens: 242,
  potentialScreens: 150,
  totalSavings: 92,
  savingsPercent: 38,
  phase1Savings: 35,
  phase1Weeks: '4-6',
  phase2Savings: 26,
  phase2Weeks: '6-8',
  phase3Savings: 31,
  phase3Weeks: '8-12',
  maintenanceReduction: '35-40%',
};

export function getConsolidationStats() {
  return consolidationSummary;
}

export function getTopPriorityCategories() {
  return consolidationData
    .filter(cat => cat.priority === 'extreme')
    .sort((a, b) => b.savings - a.savings);
}

export function getQuickWins() {
  return topQuickWins;
}

