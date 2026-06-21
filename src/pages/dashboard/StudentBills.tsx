import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SectionHeader } from "@/components/common/SectionHeader";
import { getStudentBills } from "@/services/api";
import { TableSkeleton } from "@/components/common/LoadingSkeleton";

export function StudentBills() {
  const [bills, setBills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudentBills()
      .then(setBills)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <SectionHeader eyebrow="Bills" title="Fee & bill records" description="Loading bills..." align="left" />
        <TableSkeleton rows={4} />
      </div>
    );
  }

  const pendingBills = bills.filter((b) => b.status === "pending");
  const paidBills = bills.filter((b) => b.status === "paid");

  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Bills" title="Bills and payments" description="View pending and paid institutional charges." align="left" />

      {bills.length === 0 ? (
        <div className="rounded-sm border bg-card p-8 text-center text-muted-foreground">
          No bills found. Contact the accounts office for details.
        </div>
      ) : (
        <>
          {/* Pending Bills */}
          {pendingBills.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-bold text-yellow-600">Pending ({pendingBills.length})</h3>
              <div className="space-y-3">
                {pendingBills.map((bill: any) => (
                  <div key={bill.id} className="flex flex-col gap-2 rounded-sm border border-yellow-200 bg-yellow-50/50 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold">{bill.title || bill.type}</p>
                      <p className="text-xs text-muted-foreground">Due: {bill.due_date ? new Date(bill.due_date).toLocaleDateString() : "—"}</p>
                      {bill.description && <p className="text-xs text-muted-foreground mt-1">{bill.description}</p>}
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="font-bold text-yellow-700">৳{parseFloat(bill.amount || 0).toLocaleString()}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">Pending</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Paid Bills */}
          {paidBills.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-bold text-green-600">Paid ({paidBills.length})</h3>
              <div className="space-y-3">
                {paidBills.map((bill: any) => (
                  <div key={bill.id} className="flex flex-col gap-2 rounded-sm border bg-muted/60 p-4 sm:flex-row sm:items-center sm:justify-between opacity-75">
                    <div>
                      <p className="font-semibold">{bill.title || bill.type}</p>
                      <p className="text-xs text-muted-foreground">Paid: {bill.paid_at ? new Date(bill.paid_at).toLocaleDateString() : "—"}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="font-bold text-green-700">৳{parseFloat(bill.amount || 0).toLocaleString()}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">Paid</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <div className="rounded-sm border bg-card p-6 text-center shadow-sm">
        <p className="text-sm text-muted-foreground">Need a challan or payment receipt?</p>
        <p className="mt-2 text-base font-bold">Contact the accounts office during working hours.</p>
        <Link to="/contact" className="mt-4 inline-flex rounded-sm bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary-dark">
          Contact office
        </Link>
      </div>
    </div>
  );
}
