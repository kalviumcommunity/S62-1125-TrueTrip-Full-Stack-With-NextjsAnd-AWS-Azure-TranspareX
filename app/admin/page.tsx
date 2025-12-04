import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import AdminActions from "./AdminActions";
import { 
  ShieldCheck, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  XCircle,
  Banknote,
  ArrowDownLeft,
  ArrowUpRight,
  Clock
} from "lucide-react";

export default async function AdminDashboard() {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  // Fetch Data
  const allRefunds = await prisma.refund.findMany({
    include: {
      booking: {
        include: { user: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const allBookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
  });

  // --- FINANCIAL CALCULATIONS ---
  
  // 1. Total Booking Fares (Gross Revenue)
  const totalBookingValue = allBookings.reduce((acc, b) => acc + b.amount, 0);

  // 2. Total Refunded Fares (Money sent back - Approved only)
  const totalRefundedValue = allRefunds
    .filter((r) => r.status === "APPROVED")
    .reduce((acc, r) => acc + (r.estimatedAmount || 0), 0);

  // 3. Pending Refund Liability (Money currently at risk)
  const totalPendingValue = allRefunds
    .filter((r) => r.status === "PENDING")
    .reduce((acc, r) => acc + (r.estimatedAmount || 0), 0);

  // 4. Net Income (Gross - Approved Refunds)
  const netIncome = totalBookingValue - totalRefundedValue;

  // Counts
  const pendingRefunds = allRefunds.filter((r) => r.status === "PENDING");
  const approvedRefunds = allRefunds.filter((r) => r.status === "APPROVED");
  const rejectedRefunds = allRefunds.filter((r) => r.status === "REJECTED");

  return (
    <div className="min-h-screen p-6 md:p-12 space-y-8 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="fixed top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* --- HEADER --- */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3 h-3" /> Admin Access
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Bookings <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">Overview.</span>
          </h1>
          <p className="text-slate-400 mt-2 text-lg">
            Track bookings, processed refunds, and net revenue.
          </p>
        </div>
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        
        {/* 1. TOTAL BOOKINGS (Gross) */}
        <div className="group p-6 rounded-3xl bg-slate-900/60 border border-white/5 backdrop-blur-md hover:bg-slate-800/60 transition-all">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
              <Banknote className="w-5 h-5" />
            </div>
            <span className="text-slate-400 text-sm font-medium">Total Booking Fares</span>
          </div>
          <div className="text-3xl font-bold text-white">
            ₹{totalBookingValue.toLocaleString()}
          </div>
          <div className="text-xs text-slate-500 mt-2 flex items-center gap-1">
             <ArrowUpRight className="w-3 h-3 text-emerald-500" /> Gross Income
          </div>
        </div>

        {/* 2. TOTAL REFUNDED (Money Out) */}
        <div className="group p-6 rounded-3xl bg-slate-900/60 border border-white/5 backdrop-blur-md hover:bg-slate-800/60 transition-all">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400">
              <ArrowDownLeft className="w-5 h-5" />
            </div>
            <span className="text-slate-400 text-sm font-medium">Total Refunded</span>
          </div>
          <div className="text-3xl font-bold text-rose-200">
            -₹{totalRefundedValue.toLocaleString()}
          </div>
          <div className="text-xs text-slate-500 mt-2">
             Processed: {approvedRefunds.length} requests
          </div>
        </div>

        {/* 3. NET REVENUE (Real Profit) */}
        <div className="group p-6 rounded-3xl bg-emerald-950/30 border border-emerald-500/20 backdrop-blur-md hover:bg-emerald-900/20 transition-all">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-emerald-400/80 text-sm font-medium">Net Revenue</span>
          </div>
          <div className="text-3xl font-bold text-white">
            ₹{netIncome.toLocaleString()}
          </div>
          <div className="text-xs text-emerald-500/60 mt-2">
             After deductions
          </div>
        </div>

        {/* 4. PENDING ACTIONS (Action Required) */}
        <div className="group p-6 rounded-3xl bg-slate-900/60 border border-white/5 backdrop-blur-md hover:bg-slate-800/60 transition-all relative overflow-hidden">
          {pendingRefunds.length > 0 && (
            <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/20 blur-2xl -mr-10 -mt-10 animate-pulse"></div>
          )}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
              <AlertCircle className="w-5 h-5" />
            </div>
            <span className="text-slate-400 text-sm font-medium">Pending Review</span>
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-bold text-white">
                {pendingRefunds.length}
            </div>
            <span className="text-sm text-slate-500 font-medium">reqs</span>
          </div>
          <div className="text-xs text-orange-400/80 mt-2 font-mono">
             Est. Value: ₹{totalPendingValue.toLocaleString()}
          </div>
        </div>
      </div>

      {/* --- REFUNDS TABLE --- */}
      <div className="relative z-10">
        <h2 className="text-xl font-bold text-white mb-4 px-2">Recent Refund Requests</h2>
        
        <div className="rounded-3xl border border-white/10 bg-black/20 backdrop-blur-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-slate-400 uppercase text-xs font-semibold tracking-wider">
                <tr>
                  <th className="px-6 py-5">Traveler</th>
                  <th className="px-6 py-5">Journey</th>
                  <th className="px-6 py-5">Amount</th>
                  <th className="px-6 py-5">Requested</th>
                  <th className="px-6 py-5">Status</th>
                  <th className="px-6 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {allRefunds.map((refund) => (
                  <tr key={refund.id} className="group hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-white">{refund.booking.user.name || "Unknown"}</div>
                      <div className="text-xs text-slate-500">{refund.booking.user.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-300">
                        <span className="font-medium">{refund.booking.fromCity}</span>
                        <span className="text-slate-600">→</span>
                        <span className="font-medium">{refund.booking.toCity}</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {new Date(refund.booking.journeyDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="font-mono text-emerald-400">₹{refund.estimatedAmount}</div>
                        <div className="text-[10px] text-slate-500">Est. Refund</div>
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        {new Date(refund.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        refund.status === "PENDING" ? "bg-orange-500/10 text-orange-400 border-orange-500/20" :
                        refund.status === "APPROVED" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                        "bg-slate-800 text-slate-400 border-slate-700"
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${
                            refund.status === "PENDING" ? "bg-orange-400 animate-pulse" :
                            refund.status === "APPROVED" ? "bg-emerald-400" :
                            "bg-slate-400"
                        }`} />
                        {refund.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {refund.status === "PENDING" ? (
                        <AdminActions refundId={refund.id} />
                      ) : (
                        <span className="text-xs text-slate-600 italic">No actions</span>
                      )}
                    </td>
                  </tr>
                ))}
                
                {allRefunds.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6 text-slate-600" />
                        </div>
                        <p>All caught up! No refunds found.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}