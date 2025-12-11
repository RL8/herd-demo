import sessionsData from '@/data/sessions.json';

export interface Session {
  id: string;
  session_plan_name: string;
  short_description: string;
  specific_focus: string;
  session_objectives: string;
  detailed_session_plan: string;
  facilitator_notes: string;
  equine_welfare_considerations: string;
  variation_1: string;
  variation_2: string;
  variation_3: string;
  client_category: string;
  session_theme: string;
  prop_type: string;
  materials_needed: string;
  overall_rating: string;
  number_of_ratings: string;
  prop_tags: string;
}

export interface FormData {
  scope?: string;
  who?: string;
  props?: string;
  theme?: string;
}

export function getSessions(): Session[] {
  return sessionsData as Session[];
}

export function filterSessions(formData: FormData): Session[] {
  const sessions = getSessions();
  
  return sessions.filter(session => {
    if (formData.who && !session.client_category.toLowerCase().includes(formData.who.toLowerCase())) {
      return false;
    }
    if (formData.props && formData.props !== 'none' && !session.prop_type.toLowerCase().includes(formData.props.toLowerCase())) {
      return false;
    }
    if (formData.theme && !session.session_theme.toLowerCase().includes(formData.theme.toLowerCase())) {
      return false;
    }
    return true;
  });
}

export function getSessionById(id: string): Session | undefined {
  return getSessions().find(s => s.id === id);
}

