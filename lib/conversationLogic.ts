import { FormData } from './sessions';

export interface ConversationState {
  collected: {
    who?: string;
    props?: string;
    theme?: string;
  };
  needsClarification: boolean;
  currentQuestion?: string;
  confidence: number; // 0-1, how confident we are in the match
}

const keywords = {
  who: {
    teams: ['team', 'teams', 'organization', 'organizational', 'leaders', 'group of people'],
    individuals: ['individual', 'person', 'one person', 'single', 'client'],
    groups: ['group', 'groups', 'multiple', 'several people'],
  },
  props: {
    physical: ['physical', 'tools', 'pool noodles', 'cones', 'poles', 'equipment'],
    natural: ['natural', 'objects', 'nature', 'organic', 'found'],
    none: ['no props', 'without props', 'no tools', 'nothing'],
  },
  theme: {
    identity: ['identity', 'belonging', 'self', 'who am i'],
    leadership: ['leadership', 'lead', 'communication', 'teamwork'],
    boundaries: ['boundaries', 'safety', 'limits', 'personal space'],
    balance: ['balance', 'equilibrium', 'stability'],
  },
};

export function parseUserInput(input: string, state: ConversationState): ConversationState {
  const lowerInput = input.toLowerCase();
  const newState = { ...state };

  // Extract who
  if (!newState.collected.who) {
    for (const [key, terms] of Object.entries(keywords.who)) {
      if (terms.some(term => lowerInput.includes(term))) {
        newState.collected.who = key;
        break;
      }
    }
  }

  // Extract props
  if (!newState.collected.props) {
    for (const [key, terms] of Object.entries(keywords.props)) {
      if (terms.some(term => lowerInput.includes(term))) {
        newState.collected.props = key;
        break;
      }
    }
  }

  // Extract theme
  if (!newState.collected.theme) {
    for (const [key, terms] of Object.entries(keywords.theme)) {
      if (terms.some(term => lowerInput.includes(term))) {
        newState.collected.theme = key;
        break;
      }
    }
  }

  // Calculate confidence
  const collectedCount = Object.values(newState.collected).filter(Boolean).length;
  newState.confidence = collectedCount / 3;

  // Determine if clarification needed
  newState.needsClarification = collectedCount < 3;

  return newState;
}

export function generateFollowUpQuestion(state: ConversationState): string {
  if (!state.collected.who) {
    return "Who is this session for? Is it for a team, an individual, or a group?";
  }
  if (!state.collected.props) {
    return "Would you like to use props in the session? Physical tools, natural objects, or no props?";
  }
  if (!state.collected.theme) {
    return "What theme would you like to explore? Identity, leadership, boundaries, or balance?";
  }
  return "Perfect! Let me find sessions that match your needs...";
}

export function extractFormData(state: ConversationState): FormData {
  return {
    who: state.collected.who,
    props: state.collected.props,
    theme: state.collected.theme,
  };
}

