import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useUserStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, X } from 'lucide-react';
import { Button } from './ui/button';

interface TapToEarnModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FloatingText {
  id: number;
  x: number;
  y: number;
}

export function TapToEarnModal({ open, onOpenChange }: TapToEarnModalProps) {
  const [tapCount, setTapCount] = useState(0);
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const addCoins = useUserStore((state) => state.addCoins);

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    setTapCount((prev) => prev + 1);
    addCoins(1);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newFloatingText: FloatingText = {
      id: Date.now() + Math.random(),
      x,
      y,
    };

    setFloatingTexts((prev) => [...prev, newFloatingText]);

    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'tap-ripple';
    ripple.style.left = `${x - 25}px`;
    ripple.style.top = `${y - 25}px`;
    ripple.style.width = '50px';
    ripple.style.height = '50px';
    e.currentTarget.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);

    setTimeout(() => {
      setFloatingTexts((prev) => prev.filter((t) => t.id !== newFloatingText.id));
    }, 1000);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTapCount(0);
    setFloatingTexts([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-gradient-to-b from-card to-background border-primary/20">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
              <Coins className="text-accent" />
              Tap to Earn
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="text-white/60 hover:text-white"
            >
              <X size={20} />
            </Button>
          </div>
        </DialogHeader>

        <div className="py-8">
          <div className="text-center mb-6">
            <p className="text-white/70 text-sm mb-2">Jetons gagnés</p>
            <p className="text-accent text-5xl font-bold glow-gold">{tapCount}</p>
          </div>

          <div
            className="relative w-64 h-64 mx-auto cursor-pointer select-none"
            onClick={handleTap}
          >
            <motion.div
              className="w-full h-full rounded-full bg-gradient-to-br from-accent via-accent to-yellow-600 flex items-center justify-center shadow-2xl"
              whileTap={{ scale: 0.9 }}
              animate={{
                boxShadow: [
                  '0 0 30px rgba(245, 193, 68, 0.5)',
                  '0 0 60px rgba(245, 193, 68, 0.8)',
                  '0 0 30px rgba(245, 193, 68, 0.5)',
                ],
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
            >
              <Coins size={100} className="text-black/20" />
            </motion.div>

            <AnimatePresence>
              {floatingTexts.map((text) => (
                <motion.div
                  key={text.id}
                  initial={{ opacity: 1, y: 0, x: text.x - 20, scale: 1 }}
                  animate={{ opacity: 0, y: -100, scale: 1.5 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute text-accent font-bold text-2xl pointer-events-none"
                  style={{ left: text.x, top: text.y }}
                >
                  +1
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <p className="text-center text-white/60 text-sm mt-6">
            Clique sur le jeton pour gagner des pièces !
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
