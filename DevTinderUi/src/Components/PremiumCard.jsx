import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

const PremiumCard = ({ memberShipType }) => {
  useEffect(() => {
    confetti({
      particleCount: 250,
      spread: 180,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-slate-950 relative overflow-hidden py-10">
      {/* Background Glow */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-yellow-500/20 blur-[120px]" />
      <div className="absolute w-[250px] h-[250px] rounded-full bg-amber-300/20 blur-[90px] top-20 right-20" />

      {/* Floating Sparkles */}
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-yellow-300"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${12 + Math.random() * 14}px`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 1, 0.2],
            rotate: [0, 180],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
          }}
        >
          ✨
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0.4, opacity: 0, y: 80 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 12,
        }}
        className="gold-border w-[400px] max-w-[90vw]"
      >
        <div className="relative z-10 rounded-[22px] bg-white/90 backdrop-blur-xl px-8 py-6 text-center">
          {/* Floating Crown */}
          <div className="relative mb-4">
            <div className="absolute inset-0 rounded-full bg-yellow-400 blur-2xl opacity-40"></div>

            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="relative text-6xl"
            >
              👑
            </motion.div>
          </div>

          <h1 className="text-4xl font-black shimmer-text">
            Premium
            <br />
            Unlocked
          </h1>

          <p className="mt-3 text-gray-600">🎉 Welcome to DevAgent Premium</p>

          <div className="badge badge-warning badge-lg mt-5 px-5 py-4">
            {memberShipType}
          </div>

          <div className="my-5 h-px bg-yellow-500/20"></div>

          <div className="mt-5 space-y-4 text-left text-cyan-500 font-medium">
            <div className="flex items-center gap-3">
              <span className="text-green-500">✓</span>
              <span>Unlimited Connections</span>
            </div>

            <div className="flex items-center gap-3">
              <span>🤖</span>
              <span>AI Premium Features</span>
            </div>

            <div className="flex items-center gap-3">
              <span>⚡</span>
              <span>Priority Support</span>
            </div>
          </div>

          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="
                    mt-8
                    w-full
                    rounded-xl
                    py-3
                    font-bold
                    text-black
                    bg-gradient-to-r
                    from-yellow-400
                    to-amber-500
                    shadow-xl
                    hover:scale-105
                    transition-all
                    duration-300
                    "
          >
            Start Exploring 🚀
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default PremiumCard;
