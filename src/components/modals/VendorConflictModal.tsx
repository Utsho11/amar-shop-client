import React from "react";
import { Store, AlertTriangle, ArrowRight, X } from "lucide-react";
import { TProduct } from "../../types";

interface VendorConflictModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmReplace: () => void;
  currentVendorName?: string;
  newProduct: TProduct | null;
  quantity?: number;
}

const VendorConflictModal: React.FC<VendorConflictModalProps> = ({
  isOpen,
  onClose,
  onConfirmReplace,
  currentVendorName = "Another Boutique",
  newProduct,
  quantity = 1,
}) => {
  if (!isOpen || !newProduct) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="vendor-conflict-title"
    >
      <div className="relative w-full max-w-lg rounded-3xl bg-base-100 p-6 sm:p-8 shadow-2xl border border-base-200 space-y-6 text-base-content animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn btn-ghost btn-circle btn-sm absolute top-4 right-4 text-gray-400 hover:text-base-content"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Header Icon & Title */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 id="vendor-conflict-title" className="text-xl font-bold">
              Different Store Detected
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
              Amar Shop packages are shipped directly by verified partner boutiques. An order can only contain products from one store at a time.
            </p>
          </div>
        </div>

        {/* Store Comparison Visual Cards */}
        <div className="space-y-3 bg-base-200/50 p-4 rounded-2xl border border-base-200 text-xs sm:text-sm">
          <div className="flex items-center justify-between pb-3 border-b border-base-200">
            <span className="text-gray-500 flex items-center gap-1.5 font-medium">
              <Store size={14} className="text-gray-400" />
              Current Cart Boutique:
            </span>
            <span className="font-bold text-base-content">{currentVendorName}</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-gray-500 flex items-center gap-1.5 font-medium">
              <Store size={14} className="text-primary" />
              New Item Store:
            </span>
            <span className="font-bold text-primary">
              {newProduct.shop?.name || "New Boutique"}
            </span>
          </div>

          <div className="pt-2 text-xs text-gray-400 italic">
            Adding <span className="font-semibold text-base-content font-sans">"{newProduct.name}"</span> ({quantity} item{quantity > 1 ? "s" : ""}) will clear your current bag from {currentVendorName}.
          </div>
        </div>

        {/* Action Buttons: Isolation Effect (Clear differentiation between cancel and replace) */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost rounded-full w-full sm:w-auto px-6 text-sm font-semibold hover:bg-base-200"
          >
            Keep Current Cart
          </button>

          <button
            type="button"
            onClick={() => {
              onConfirmReplace();
              onClose();
            }}
            className="btn btn-primary rounded-full w-full sm:w-auto px-7 text-sm font-semibold shadow-lg shadow-primary/25 gap-2 hover:scale-[1.02] transition-transform"
          >
            <span>Replace Cart & Add Item</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorConflictModal;
