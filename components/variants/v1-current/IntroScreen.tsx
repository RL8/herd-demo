'use client';

interface Props {
  onNext: () => void;
}

export default function IntroScreen({ onNext }: Props) {
  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-full fade-in pb-20 pt-24">
      <div className="glass-card rounded-2xl p-8 max-w-2xl w-full">
        <div className="flex justify-end mb-2">
          <button className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">
          HOW TO USE THE SESSION PLANS
        </h1>
        
        <div className="space-y-4 text-sm leading-relaxed text-gray-600">
          <p>
            At HERDMind®, we believe that each equine facilitated session is a unique unfolding 
            between the horses and humans present. We truly believe that "It's not about the activity" 
            - the creator of HERDMind, Dr. Veronica Lac, even wrote a book all about that! So, why 
            have we developed this session plan generator?
          </p>
          
          <p>
            We recognize that even the most seasoned practitioner might need some help to think 
            creatively in sessions. We also hear from new practitioners asking for help to get them 
            started with ideas for different client populations.
          </p>
          
          <p>
            All of the session plans that our generator creates are designed using The HERD Institute 
            Model™ as a foundation, so you can adapt, flex, and modify each session however you want 
            to meet the needs of your specific client population.
          </p>
          
          <p className="font-medium text-teal-700">
            These sessions are NOT designed for you to follow step-by-step as tasks to complete. 
            Instead, they offer a broad framework of ideas for you to take and make them your own.
          </p>
          
          <p>
            Each session begins by assuming that you have already covered the basics of safety and 
            confidentiality in your session.
          </p>
          
          <p className="italic">
            Have some ideas of your own? Feel free to share a session plan with us in our discussion forum!
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          <label className="flex items-center gap-2 text-sm cursor-pointer select-none text-gray-600">
            <input type="checkbox" className="w-4 h-4 text-teal-600 rounded border-gray-300" />
            Don't show this message again
          </label>
          
          <button
            onClick={onNext}
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-colors w-full sm:w-auto"
          >
            CREATE SESSION PLAN
          </button>
        </div>
      </div>
    </div>
  );
}

