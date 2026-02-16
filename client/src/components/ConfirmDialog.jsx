import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const ConfirmDialog = ({ isOpen, message, onConfirm, onCancel }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="absolute inset-0 bg-white/10 backdrop-blur-md"
          />

          {/* Dialog Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-[500px] bg-black text-white shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Red Top Border Accent */}
            <div className="h-1 w-full bg-red-600" />

            <div className="p-10 md:p-12">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center mb-8">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>

                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500 mb-4">
                  System_Confirmation_Required
                </h2>

                <p className="text-2xl md:text-3xl font-display font-black uppercase tracking-tight leading-none mb-12">
                  {message ||
                    "Are you sure you want to proceed with this action?"}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <button
                    onClick={onCancel}
                    className="flex-1 bg-neutral-900 text-white py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-neutral-800 transition-all border border-white/5"
                  >
                    NO
                  </button>
                  <button
                    onClick={onConfirm}
                    className="flex-1 bg-red-600 text-white py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-red-700 transition-all shadow-[0_0_30px_rgba(220,38,38,0.3)]"
                  >
                    YES
                  </button>
                </div>
              </div>
            </div>

            {/* Technical Detail */}
            <div className="absolute bottom-2 right-4 text-[6px] font-mono opacity-20 uppercase tracking-[0.5em] pointer-events-none">
              AUTH_SECURE_LAYER_V2
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDialog;
