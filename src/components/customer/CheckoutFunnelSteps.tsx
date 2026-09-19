import React from "react";
import { ShoppingBag, Truck, CreditCard, Check } from "lucide-react";

interface CheckoutFunnelStepsProps {
  currentStep: 1 | 2 | 3;
}

const CheckoutFunnelSteps: React.FC<CheckoutFunnelStepsProps> = ({ currentStep }) => {
  const steps = [
    { number: 1, label: "Shopping Bag", icon: ShoppingBag },
    { number: 2, label: "Shipping & Details", icon: Truck },
    { number: 3, label: "Payment & Confirmation", icon: CreditCard },
  ];

  return (
    <nav aria-label="Checkout Progress" className="w-full max-w-2xl mx-auto mb-8 sm:mb-10 px-2">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-full bg-base-300 z-0" />
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-primary z-0 transition-all duration-500"
          style={{
            width: currentStep === 1 ? "0%" : currentStep === 2 ? "50%" : "100%",
          }}
        />

        {steps.map((step) => {
          const isCompleted = step.number < currentStep;
          const isActive = step.number === currentStep;
          const Icon = step.icon;

          return (
            <div key={step.number} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm border-2 transition-all duration-300 shadow-sm ${
                  isCompleted
                    ? "bg-primary border-primary text-white"
                    : isActive
                    ? "bg-base-100 border-primary text-primary ring-4 ring-primary/20 scale-105"
                    : "bg-base-200 border-base-300 text-gray-400"
                }`}
              >
                {isCompleted ? <Check size={16} /> : <Icon size={16} />}
              </div>
              <span
                className={`mt-2 text-[11px] sm:text-xs font-semibold text-center whitespace-nowrap transition-colors ${
                  isActive
                    ? "text-primary font-bold"
                    : isCompleted
                    ? "text-base-content font-medium"
                    : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default CheckoutFunnelSteps;
