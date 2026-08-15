import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store/store";
import { removeFromCompare, clearCompare } from "../../redux/features/comparisonSlice";
import { Link } from "react-router-dom";
import { Scale, X, ArrowRight, Trash2 } from "lucide-react";

const CompareFloatingBar = () => {
  const compareItems = useSelector((state: RootState) => state.comparison.items);
  const dispatch = useDispatch();

  if (compareItems.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-2xl bg-base-100/95 backdrop-blur-md border border-base-300 shadow-2xl rounded-2xl p-4 transition-all duration-300 animate-in fade-in slide-in-from-bottom-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
            <Scale size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-sm">Product Comparison</h4>
            <p className="text-xs text-gray-500">{compareItems.length} / 3 products selected</p>
          </div>
        </div>

        {/* Selected Product Previews */}
        <div className="flex items-center gap-2">
          {compareItems.map((product) => (
            <div
              key={product.id}
              className="relative group w-11 h-11 rounded-xl overflow-hidden border border-base-300 bg-base-200"
            >
              <img
                src={product.imageUrl?.[0] || "/placeholder.png"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => dispatch(removeFromCompare(product.id))}
                className="absolute inset-0 bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch(clearCompare())}
            className="btn btn-ghost btn-xs text-gray-400 hover:text-error"
            title="Clear all"
          >
            <Trash2 size={15} />
          </button>

          <Link
            to="/compare"
            className="btn btn-primary btn-sm rounded-xl gap-1.5 shadow-sm text-xs font-semibold"
          >
            <span>Compare Now</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompareFloatingBar;
