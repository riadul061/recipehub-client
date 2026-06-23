"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const t = setInterval(() => {
      setCountdown(p => (p <= 1 ? 0 : p - 1));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      router.push("/dashboard/user");
    }
  }, [countdown, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-primary-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 px-4">
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
        <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Payment Successful! 🎉</h1>
        <p className="text-slate-500 mb-6">Transaction completed successfully.</p>
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 mb-6 text-left space-y-2">
          <p className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />Payment recorded</p>
          <p className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />Premium features unlocked</p>
          <p className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />Unlimited recipe creation</p>
        </div>
        <Link href="/dashboard/user" className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2">
          Go to Dashboard <ArrowRight className="w-5 h-5" />
        </Link>
        <p className="text-sm text-slate-400 mt-4">Redirecting in {countdown}s...</p>
      </motion.div>
    </div>
  );
}