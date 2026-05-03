import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const getDeadline = () => {
  const now = new Date();
  let firstDay = new Date(now.getFullYear(), now.getMonth(), 1);

  if (Date.now() > firstDay.getTime() + 30 * 24 * 60 * 60 * 1000) {
    firstDay = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  }

  return firstDay.getTime() + 30 * 24 * 60 * 60 * 1000;
};

const Timer = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [deadline] = useState(getDeadline);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });

  useEffect(() => {
    const getTime = () => {
      const time = Math.max(deadline - Date.now(), 0);

      setTimeLeft({
        days: Math.floor(time / (1000 * 60 * 60 * 24)),
        hours: Math.floor((time / (1000 * 60 * 60)) % 24),
        mins: Math.floor((time / 1000 / 60) % 60),
        secs: Math.floor((time / 1000) % 60),
      });
    };

    getTime();

    const interval = setInterval(getTime, 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  const items = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.mins },
    { label: "Secs", value: timeLeft.secs },
  ];

  return (
    <div className="space-y-5">
      <p
        className={`text-sm font-medium ${
          isDark ? "text-[#B8AAA3]" : "text-[#6B5E57]"
        }`}
      >
        Sale ends in
      </p>

      <div className="grid grid-cols-4 gap-3">
        {items.map((item) => (
          <div
            key={item.label}
            className={`rounded-2xl border px-3 py-4 text-center ${
              isDark
                ? "border-white/10 bg-[#2D2927]"
                : "border-[#E8DED2] bg-[#F9F5F0]"
            }`}
          >
            <h3
              className={`text-2xl font-bold md:text-3xl ${
                isDark ? "text-[#F9F5F0]" : "text-[#3D352F]"
              }`}
            >
              {String(item.value).padStart(2, "0")}
            </h3>

            <span
              className={`mt-1 block text-[11px] uppercase tracking-widest ${
                isDark ? "text-[#C9A68F]" : "text-[#A66B55]"
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timer;
