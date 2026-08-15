import React from "react";
import { Link } from "react-router-dom";
import { LucideIcon, PackageOpen } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  actionLink?: string;
  onActionClick?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = PackageOpen,
  title,
  description,
  actionText,
  actionLink,
  onActionClick,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`text-center py-16 px-6 rounded-3xl border flex flex-col items-center justify-center max-w-lg mx-auto my-6 ${
        isDark ? "bg-[#211E1D] border-white/10" : "bg-white border-[#E8DED2]"
      }`}
    >
      <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
        <Icon size={32} />
      </div>

      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm mb-6 leading-relaxed">
        {description}
      </p>

      {actionText && actionLink && (
        <Link to={actionLink} className="btn btn-primary rounded-full px-6 btn-sm font-semibold">
          {actionText}
        </Link>
      )}

      {actionText && !actionLink && onActionClick && (
        <button
          onClick={onActionClick}
          className="btn btn-primary rounded-full px-6 btn-sm font-semibold"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
