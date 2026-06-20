"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import { submitReport } from "@/lib/action/reports";
const reasons = ["Spam", "Offensive Content", "Copyright Issue"];

export default function ReportModal({ isOpen, onClose, recipeId }) {
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason) return toast.error("Select a reason");
    setSubmitting(true);
    const res = await submitReport({ recipeId, reason });
    if (res.error) toast.error(res.error); else { toast.success("Report submitted"); onClose(); setReason(""); }
    setSubmitting(false);
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button>
            <div className="flex items-center gap-3 mb-4"><div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg"><AlertTriangle className="w-6 h-6 text-red-500" /></div><div><h3 className="text-lg font-semibold">Report Recipe</h3><p className="text-sm text-slate-400">Help keep the community safe</p></div></div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {reasons.map(r => (
                <label key={r} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${reason === r ? "border-red-300 bg-red-50 dark:bg-red-900/20" : "border-gray-200 dark:border-slate-600"}`}>
                  <input type="radio" name="reason" value={r} checked={reason === r} onChange={e => setReason(e.target.value)} className="text-red-500" />
                  <span className="text-sm font-medium">{r}</span>
                </label>
              ))}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose} className="flex-1 border-2 border-primary-500 text-primary-600 px-4 py-2 rounded-lg text-sm font-medium">Cancel</button>
                <button type="submit" disabled={!reason || submitting} className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50">{submitting ? "Submitting..." : "Submit"}</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}