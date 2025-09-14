import { useTrafficLight } from "./hooks/useTrafficLight";

export const TrafficLightWithHook = () => {
  const { countdown, percentage, greenLigth, redLigth, yellowLigth } =
    useTrafficLight();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-white text-3xl">Semáforo con el effect</h1>
        <h2 className="text-white text-xl">{countdown}</h2>
        <div className="w-64 bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transaction-all duration-1000 ease-linear"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className={`w-32 h-32 ${redLigth} rounded-full `}></div>
        <div className={`w-32 h-32 ${yellowLigth} rounded-full `}></div>
        <div className={`w-32 h-32 ${greenLigth} rounded-full `}></div>
      </div>
    </div>
  );
};
