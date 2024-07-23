"use client";
import { useState, useEffect } from "react";
import ReactSpeedometer from "react-d3-speedometer";

export default function SDTCalculator() {
  const [calculationType, setCalculationType] = useState("speed");
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [result, setResult] = useState("");
  const [unit1, setUnit1] = useState("m");
  const [unit2, setUnit2] = useState("sec");
  const [resultUnit, setResultUnit] = useState("m/s");

  const distanceUnits = ["m", "km", "mi", "ft"];
  const speedUnits = ["m/s", "km/h", "mi/h", "ft/s"];
  const timeUnits = ["sec", "min", "hours", "days"];

  const getUnitsForType = (type) => {
    if (type === "speed") return speedUnits;
    if (type === "distance") return distanceUnits;
    return timeUnits;
  };

  const handleCalculationTypeChange = (e) => {
    setCalculationType(e.target.value);
    setValue1("");
    setValue2("");
    setResult("");
    setUnit1(getUnitsForType(e.target.value)[0]);
    setUnit2(
      getUnitsForType(e.target.value === "distance" ? "speed" : "time")[0]
    );
    setResultUnit(getUnitsForType(e.target.value)[0]);
  };

  const handleValueChange = (e, setter) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setter(value);
    }
  };

  const handleUnitChange = (e, setter) => {
    setter(e.target.value);
  };

  const convertToBaseUnit = (value, unit) => {
    switch (unit) {
      case "km":
        return value * 1000;
      case "mi":
        return value * 1609.34;
      case "ft":
        return value * 0.3048;
      case "km/h":
        return value / 3.6;
      case "mi/h":
        return value * 0.44704;
      case "ft/s":
        return value * 0.3048;
      case "days":
        return value * 86400;
      case "hours":
        return value * 3600;
      case "min":
        return value * 60;
      default:
        return value;
    }
  };

  const convertFromBaseUnit = (value, unit) => {
    switch (unit) {
      case "km":
        return value / 1000;
      case "mi":
        return value / 1609.34;
      case "ft":
        return value / 0.3048;
      case "km/h":
        return value * 3.6;
      case "mi/h":
        return value / 0.44704;
      case "ft/s":
        return value / 0.3048;
      case "days":
        return value / 86400;
      case "hours":
        return value / 3600;
      case "min":
        return value / 60;
      default:
        return value;
    }
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs} hours ${mins} minutes ${secs} seconds`;
  };

  const calculateResult = () => {
    let baseValue1 = convertToBaseUnit(parseFloat(value1), unit1);
    let baseValue2 = convertToBaseUnit(parseFloat(value2), unit2);
    let res = 0;

    if (calculationType === "speed") {
      res = baseValue1 && baseValue2 ? baseValue1 / baseValue2 : 0;
    } else if (calculationType === "distance") {
      res = baseValue1 && baseValue2 ? baseValue1 * baseValue2 : 0;
    } else if (calculationType === "time") {
      res = baseValue1 && baseValue2 ? baseValue1 / baseValue2 : 0;
    }

    setResult(convertFromBaseUnit(res, resultUnit));
  };

  useEffect(() => {
    if (result !== "") {
      let baseResult = convertToBaseUnit(result, resultUnit);
      setResult(convertFromBaseUnit(baseResult, resultUnit));
    }
  }, [resultUnit]);

  const speed = resultUnit === "m/s" ? Math.min(result, 300) : result;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-12 p-4">
      <h1 className="text-4xl font-bold text-center dark:text-white">
        Speed Distance Time Calculator
      </h1>
      <div className="w-full md:w-4/12 border rounded-lg shadow-md p-4 bg-white dark:bg-black">
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2 dark:text-white">Calculate</label>
          <select
            value={calculationType}
            onChange={handleCalculationTypeChange}
            className="block w-full p-2 border border-gray-300 rounded outline-none dark:text-white"
          >
            <option value="speed">Speed</option>
            <option value="distance">Distance</option>
            <option value="time">Time</option>
          </select>
        </div>
        <div className="mb-4 text-center dark:text-white">
          {calculationType === "speed"
            ? "Speed = Distance/Time"
            : calculationType === "distance"
            ? "Distance = Speed * Time"
            : "Time = Distance/Speed"}
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2 dark:text-white">
            {calculationType === "speed"
              ? "Distance"
              : calculationType === "distance"
              ? "Speed"
              : "Distance"}
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={value1}
              onChange={(e) => handleValueChange(e, setValue1)}
              className="block w-full p-2 border border-gray-300 rounded outline-none dark:text-white"
            />
            <select
              value={unit1}
              onChange={(e) => handleUnitChange(e, setUnit1)}
              className="block w-16 p-2 border border-gray-300 rounded outline-none dark:text-white"
            >
              {getUnitsForType(
                calculationType === "speed"
                  ? "distance"
                  : calculationType === "distance"
                  ? "speed"
                  : "distance"
              ).map((unit) => (
                <option key={unit} value={unit}> 
                  {unit}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2 dark:text-white">
            {calculationType === "speed"
              ? "Time"
              : calculationType === "distance"
              ? "Time"
              : "Speed"}
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={value2}
              onChange={(e) => handleValueChange(e, setValue2)}
              className="block w-full p-2 border border-gray-300 rounded outline-none dark:text-white"
            />
            <select
              value={unit2}
              onChange={(e) => handleUnitChange(e, setUnit2)}
              className="block w-16 p-2 border border-gray-300 rounded outline-none dark:text-white"
            >
              {getUnitsForType(
                calculationType === "speed"
                  ? "time"
                  : calculationType === "distance"
                  ? "time"
                  : "speed"
              ).map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-4">
          <button
            onClick={calculateResult}
            className="w-full p-2 bg-black text-white font-bold rounded outline-none dark:bg-orange-500"
          >
            Calculate
          </button>
        </div>
        <div className="text-2xl font-bold text-center text-orange-500">
          {result !== "" && (
            <div className="flex flex-col items-center justify-center">
              <div className="flex gap-4 items-center justify-center">
                <div>
                  {calculationType === "time"
                    ? `Time: ${formatTime(result)}`
                    : `${
                        calculationType === "speed" ? "Speed" : "Distance"
                      }: ${result}`}
                </div>
                {calculationType !== "time" && (
                  <select
                    value={resultUnit}
                    onChange={(e) => handleUnitChange(e, setResultUnit)}
                    className="block w-16 p-1 text-base border border-gray-300 rounded outline-none"
                  >
                    {getUnitsForType(calculationType).map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              {calculationType === "speed" && (
                <div className="flex flex-col items-center mt-4">
                  <ReactSpeedometer
                    value={speed}
                    minValue={0}
                    maxValue={300}
                    segments={10}
                    width={300}
                    height={200}
                    startColor={"#33CC33"}
                    endColor={"#FF471A"}
                    needleTransitionDuration={5000}
                    needleTransition="easeElastic"
                    textColor="black"
                  />
                  <div
                    className={`text-2xl font-bold mt-4 ${
                      speed <= 80 ? "text-green-500" : speed <= 100 ? "text-yellow-500" : "text-red-500"
                    }`}
                  >
                    {speed <= 80 ? "Tu bach jayega" : speed <= 100 ? "Tu ab bhi bach skta hai Ruk Ja!" : "Ek din mar jayeg kutte ki moth log bolege mar gya..."}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
