import React from "react";
import { CheckCircle2, Clock, Package, Truck, XCircle } from "lucide-react";
import { TOrderStatus } from "../../types";

interface OrderTimelineProps {
  status?: TOrderStatus;
  date?: string;
  shippingCity?: string;
}

const STEPS = [
  { key: "PENDING", label: "Order Placed", icon: Clock },
  { key: "PROCESSING", label: "Processing", icon: Package },
  { key: "SHIPPED", label: "Shipped", icon: Truck },
  { key: "DELIVERED", label: "Delivered", icon: CheckCircle2 },
];

const OrderTimeline: React.FC<OrderTimelineProps> = ({ status = "PENDING", date, shippingCity }) => {
  if (status === "CANCELLED") {
    return (
      <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm font-medium">
        <XCircle size={18} />
        <span>Order Cancelled</span>
      </div>
    );
  }

  const getStepIndex = (st: string) => {
    switch (st) {
      case "PENDING":
        return 0;
      case "PROCESSING":
        return 1;
      case "SHIPPED":
        return 2;
      case "DELIVERED":
      case "COMPLETED":
        return 3;
      default:
        return 0;
    }
  };

  const currentIndex = getStepIndex(status);

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between relative">
        {/* Background track */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-zinc-700 -translate-y-1/2 z-0" />
        {/* Active progress bar */}
        <div
          className="absolute top-1/2 left-0 h-1 bg-[#A66B55] -translate-y-1/2 z-0 transition-all duration-500"
          style={{ width: `${(currentIndex / (STEPS.length - 1)) * 100}%` }}
        />

        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isCompleted = idx <= currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div key={step.key} className="flex flex-col items-center relative z-10">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300 shadow-sm ${
                  isCompleted
                    ? "bg-[#A66B55] text-white ring-4 ring-[#A66B55]/20"
                    : "bg-white dark:bg-zinc-800 text-gray-400 border border-gray-300 dark:border-zinc-700"
                } ${isCurrent ? "scale-110" : ""}`}
              >
                <Icon size={16} />
              </div>
              <span
                className={`mt-2 text-xs font-semibold whitespace-nowrap ${
                  isCompleted ? "text-[#A66B55] dark:text-[#C9A68F] font-bold" : "text-gray-400 dark:text-zinc-500"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {(date || shippingCity) && (
        <div className="mt-3 flex justify-between text-xs text-gray-500 dark:text-zinc-400 px-1">
          {date && <span>Placed: {new Date(date).toLocaleDateString()}</span>}
          {shippingCity && <span>Destination: {shippingCity}</span>}
        </div>
      )}
    </div>
  );
};

export default OrderTimeline;
