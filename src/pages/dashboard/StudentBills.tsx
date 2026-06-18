import { useState } from "react";
import { Link } from "react-router-dom";
import { SectionHeader } from "@/components/common/SectionHeader";
import { bills as initialBills } from "@/data/mockStudentData";

export function StudentBills() {
  const [bills] = useState(initialBills);

  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Bills" title="Bills and payments" description="View pending and paid institutional charges." align="left" />
      <div className="space-y-3">
        {bills.map((bill) => (
          <div key={bill.id} className="flex flex-col gap-2 rounded-sm border bg-muted/60 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">{bill.title}</p>
              <p className="text-xs text-muted-foreground">Due: {bill.due}</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="font-bold text-primary">BDT {bill.amount.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground capitalize">{bill.status}</p>
            </div>
          </div>
        ))}
      </div>

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
