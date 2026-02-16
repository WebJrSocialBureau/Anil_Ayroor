import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

const Toaster = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-24 right-6 z-100 flex flex-col gap-4 w-full max-w-[400px] pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}
            className="pointer-events-auto"
          >
            <ToastItem toast={toast} onRemove={() => removeToast(toast.id)} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const ToastItem = ({ toast, onRemove }) => {
  const getTypeStyles = () => {
    switch (toast.type) {
      case "success":
        return {
          bg: "bg-black",
          accent: "bg-emerald-500",
          icon: <CheckCircle className="w-5 h-5 text-emerald-500" />,
          text: "text-white",
        };
      case "error":
        return {
          bg: "bg-white",
          accent: "bg-red-600",
          icon: <AlertCircle className="w-5 h-5 text-red-600" />,
          text: "text-black",
        };
      default:
        return {
          bg: "bg-neutral-900",
          accent: "bg-blue-500",
          icon: <Info className="w-5 h-5 text-blue-500" />,
          text: "text-white",
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div
      className={`relative overflow-hidden ${styles.bg} border border-black/5 shadow-2xl p-5 flex items-center gap-4 group`}
    >
      {/* Accent Bar */}
      <div className={`absolute top-0 left-0 bottom-0 w-1 ${styles.accent}`} />

      <div className="shrink-0">{styles.icon}</div>

      <div className="grow">
        <p
          className={`${styles.text} text-[11px] font-black uppercase tracking-[0.2em] leading-tight`}
        >
          {toast.message}
        </p>
      </div>

      <button
        onClick={onRemove}
        className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className={`w-4 h-4 ${styles.text} opacity-40 hover:opacity-100`} />
      </button>

      {/* Technical Detail */}
      <div className="absolute top-1 right-2 text-[6px] font-mono opacity-20 uppercase tracking-widest pointer-events-none">
        {toast.type}_NOTIFICATION_V1
      </div>
    </div>
  );
};

export default Toaster;
