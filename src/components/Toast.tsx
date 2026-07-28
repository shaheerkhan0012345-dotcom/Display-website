import React from 'react';
import { ToastMessage } from '../types';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full px-4 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-lg border backdrop-blur-md transition-all transform translate-y-0 animate-in fade-in slide-in-from-bottom-3 ${
            toast.type === 'error'
              ? 'bg-rose-900/90 text-rose-100 border-rose-700'
              : toast.type === 'info'
              ? 'bg-sky-900/90 text-sky-100 border-sky-700'
              : 'bg-emerald-950/95 text-emerald-100 border-emerald-600/60 ring-1 ring-emerald-500/30'
          }`}
        >
          <div className="flex items-center gap-3">
            {toast.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            ) : toast.type === 'info' ? (
              <Info className="w-5 h-5 text-sky-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            )}
            <p className="text-sm font-medium leading-tight">{toast.message}</p>
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors ml-2"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
