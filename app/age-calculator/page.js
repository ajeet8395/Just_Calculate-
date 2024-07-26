"use client";
import { useState } from "react";

export default function AgeCalculator() {
  const [dob, setDob] = useState(new Date());
  const [doa, setDoa] = useState(new Date());
  const [result, setResult] = useState("");

  const calculateAge = () => {
    const diffTime = Math.abs(doa - dob);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffSeconds = Math.floor(diffTime / 1000);

    const birthDate = new Date(dob);
    const otherDate = new Date(doa);

    let years = otherDate.getFullYear() - birthDate.getFullYear();
    let months = otherDate.getMonth() - birthDate.getMonth();
    let days = otherDate.getDate() - birthDate.getDate();

    if (days < 0) {
      months -= 1;
      days += new Date(
        otherDate.getFullYear(),
        otherDate.getMonth(),
        0
      ).getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    setResult(
      `Age: ${years} years, ${months} months, ${days} days\nor ${diffDays} days\nor ${diffHours} hours\nor ${diffMinutes} minutes\nor ${diffSeconds} seconds\nor ${diffTime} milliseconds`
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-12 p-4">
      <h1 className="text-4xl font-bold text-center dark:text-white">
        Age Calculator
      </h1>
      <div className="w-full md:w-4/12 border rounded-lg shadow-md p-4 bg-white dark:bg-black flex flex-col gap-6">
        <div className="flex gap-8 justify-end w-9/12 mx-auto">
          <label className="block text-lg font-semibold dark:text-white break-keep">
            Date of Birth
          </label>
          <input
            type="date"
            value={
              dob.getFullYear().toString() +
              "-" +
              (dob.getMonth() + 1).toString().padStart(2, "0") +
              "-" +
              dob.getDate().toString().padStart(2, "0")
            }
            onChange={(e) => {
              setDob(new Date(e.target.value));
            }}
            className="dark:text-white px-2 md:px-4 rounded"
          ></input>
        </div>
        <div className="flex gap-8 justify-end w-9/12 mx-auto">
          <label className="block text-lg font-semibold dark:text-white">
            Age at the Date of
          </label>
          <input
            type="date"
            value={
              doa.getFullYear().toString() +
              "-" +
              (doa.getMonth() + 1).toString().padStart(2, "0") +
              "-" +
              doa.getDate().toString().padStart(2, "0")
            }
            onChange={(e) => {
              setDoa(new Date(e.target.value));
            }}
            className="dark:text-white px-2 md:px-4 rounded"
          ></input>
        </div>
        <button
          onClick={calculateAge}
          className="w-full p-2 bg-black text-white font-bold rounded outline-none dark:bg-orange-500"
        >
          Calculate
        </button>
        {result !== "" && (
          <div className="text-lg font-semibold dark:text-white text-center mt-6 whitespace-pre-line">
            {result}
          </div>
        )}
      </div>
    </main>
  );
}
