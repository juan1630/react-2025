import { useEffect, useState } from "react";
import { colors } from "../types/colorTypes";

type TrafficLightColor = keyof typeof colors;

export const useTrafficLight = () => {
  const [light, setLight] = useState<TrafficLightColor>("red");
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown === 0) return;
    const idInterval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(idInterval);
    };
  }, [countdown, light]);

  //change light effect

  useEffect(() => {
    if (countdown > 0) return;
    setCountdown(5);

    if (countdown === 0) {
      if (light === "red") {
        setLight("green");
        return;
      }
      if (light === "yellow") {
        setLight("red");
        return;
      }
      if (light === "green") {
        setLight("yellow");
        return;
      }
    }
  }, [countdown, light]);

  return {
    //prop
    light,
    countdown,

    //computed
    percentage: (countdown / 5) * 100,
    greenLigth: light === "green" ? colors.green : "bg-gray-500",
    yellowLigth: light === "yellow" ? colors.yellow : "bg-gray-500",
    redLigth: light === "red" ? colors.red : "bg-gray-500",
  };
};
