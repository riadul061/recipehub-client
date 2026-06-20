"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
export default function Pagination({ pagination, onPageChange }) {
  if (!pagination || pagination.pages <= 1) return null;
  const { page, pages } = pagination;
  const getPages = () => {
    const r = []; const d = []; let l;
    for (let i = 1; i <= pages; i++) { if (i === 1 || i === pages || (i >= page - 2 && i <= page + 2)) r.push(i); }
    r.forEach(i => { if (l) { if (i - l === 2) d.push(l + 1); else if (i - l !== 1) d.push("..."); } d.push(i); l = i; });
    return d;
  };
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button onClick={() => onPageChange(page - 1)} disabled={page <= 1} className="p-2 rounded-lg border border-gray-300 dark:border-slate-600 hover:bg-gray-100 disabled:opacity-50"><ChevronLeft className="w-5 h-5" /></button>
      {getPages().map((p, i) => p === "..." ? <span key={i} className="px-2 text-slate-400">...</span> : (
        <button key={p} onClick={() => onPageChange(p)} className={`min-w-[40px] h-10 rounded-lg font-medium ${page === p ? "bg-primary-500 text-white shadow-md" : "border border-gray-300 dark:border-slate-600 hover:bg-gray-100 text-slate-600"}`}>{p}</button>
      ))}
      <button onClick={() => onPageChange(page + 1)} disabled={page >= pages} className="p-2 rounded-lg border border-gray-300 dark:border-slate-600 hover:bg-gray-100 disabled:opacity-50"><ChevronRight className="w-5 h-5" /></button>
    </div>
  );
}