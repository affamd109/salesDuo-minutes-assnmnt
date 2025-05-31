import { useState } from 'react';
import MinutesForm from './components/MinutesForm';
import ResultBox from './components/ResultBox';
import { motion } from 'framer-motion';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showHero, setShowHero] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {showHero ? (
        <motion.div 
          className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gradient-to-br from-[#0f0f0f] to-[#1a0b2e]"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#EC4899] text-center mb-6 drop-shadow-lg"
            variants={itemVariants}
          >
            Meeting Minutes Extractor
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-2xl text-center mb-10"
            variants={itemVariants}
          >
            Transform messy meeting notes into structured, actionable insights with AI-powered analysis.
          </motion.p>
          
          <motion.div variants={itemVariants}>
            <button 
              onClick={() => setShowHero(false)}
              className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Get Started
            </button>
          </motion.div>
          
          <motion.div 
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl"
            variants={containerVariants}
          >
            {[
              {
                icon: '⚡',
                title: 'Instant Analysis',
                desc: 'Get key points extracted in seconds'
              },
              {
                icon: '🔍',
                title: 'Deep Insights',
                desc: 'Identify action items and decisions'
              },
              {
                icon: '📁',
                title: 'File Support',
                desc: 'Upload text files or paste directly'
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                className="bg-[#0f0f0f] p-6 rounded-xl border border-[#2a2a2a] hover:border-purple-600 transition-all"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      ) : (
        <div className="min-h-screen flex flex-col items-center px-4 py-10 bg-gradient-to-br from-[#0f0f0f] to-[#1a0b2e]">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl"
          >
            <div className="flex justify-between items-center mb-10">
              <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#EC4899]">
                Meeting Minutes Extractor
              </h1>
              <button 
                onClick={() => setShowHero(true)}
                className="text-gray-400 hover:text-white transition"
              >
                ← Back
              </button>
            </div>

            <MinutesForm
              onResult={setResult}
              onError={setError}
              setLoading={setLoading}
              loading={loading}
            />

            {error && (
              <motion.p 
                className="text-red-400 mt-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.p>
            )}

            {loading && (
              <motion.div 
                className="mt-8 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
              </motion.div>
            )}

            {result && <ResultBox result={result} />}
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default App;