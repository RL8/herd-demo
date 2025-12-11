import { Session } from '@/lib/sessions';

interface Props {
  session: Session;
  onClick: () => void;
}

export default function SessionCard({ session, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-2xl p-4 border-2 border-gray-200 hover:border-teal-500 hover:shadow-md transition-all text-left group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h4 className="font-bold text-gray-900 group-hover:text-teal-700 text-sm mb-1">
            {session.session_plan_name}
          </h4>
          <p className="text-xs text-gray-600 line-clamp-2">
            {session.short_description}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-medium">
              {session.specific_focus}
            </span>
          </div>
        </div>
        <svg
          className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
}

