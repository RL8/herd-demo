'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface Props {
  message?: string;
}

export default function TransitionScreen({ message = "Returning to demo home..." }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-gradient-to-br from-teal-50 via-white to-purple-50 flex items-center justify-center"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: 'spring', damping: 15 }}
          className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-700 rounded-3xl flex items-center justify-center text-white text-3xl font-bold mb-6 mx-auto shadow-xl"
        >
          🐴
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Loader2 className="h-8 w-8 animate-spin text-teal-600 mx-auto mb-4" />
          <p className="text-gray-700 font-medium text-lg">{message}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

