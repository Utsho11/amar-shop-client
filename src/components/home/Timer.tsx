import { useEffect, useState } from "react";

const Timer = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);

  const deadline = "December,31,2024";

  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();
    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMins(Math.floor((time / 1000 / 60) % 60));
    setSecs(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-8 rounded-lg shadow-lg">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <h1 className="text-4xl font-semibold mb-6 text-center">
          Flash Sale For Winter
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-10">
          <div className="time-box bg-white text-blue-800 p-4 rounded-md shadow-md flex flex-col items-center">
            <h1 className="text-4xl font-bold">
              {days < 10 ? "0" + days : days}
            </h1>
            <span className="text-sm uppercase font-semibold">Days</span>
          </div>
          <div className="time-box bg-white text-blue-800 p-4 rounded-md shadow-md flex flex-col items-center">
            <h1 className="text-4xl font-bold">
              {hours < 10 ? "0" + hours : hours}
            </h1>
            <span className="text-sm uppercase font-semibold">Hours</span>
          </div>
          <div className="time-box bg-white text-blue-800 p-4 rounded-md shadow-md flex flex-col items-center">
            <h1 className="text-4xl font-bold">
              {mins < 10 ? "0" + mins : mins}
            </h1>
            <span className="text-sm uppercase font-semibold">Minutes</span>
          </div>
          <div className="time-box bg-white text-blue-800 p-4 rounded-md shadow-md flex flex-col items-center">
            <h1 className="text-4xl font-bold">
              {secs < 10 ? "0" + secs : secs}
            </h1>
            <span className="text-sm uppercase font-semibold">Sec</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
