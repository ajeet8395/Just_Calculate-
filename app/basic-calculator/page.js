"use client";
import { useState, useEffect, useRef } from "react";
import { evaluate } from "mathjs";
import Button from "@/components/button";

export default function BasicCalculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const inputRef = useRef(null);

  const handleButtonClick = (value) => {
    if (value === "=") {
      try {
        setResult(evaluate(input));
      } catch (error) {
        setResult("Error");
      }
    } else if (value === "C") {
      setInput("");
      setResult("");
    } else {
      setInput(input + value);

      //! these are three method for moving leftside of input So, that current entered value will show
      //* Method 1st using setTimeOut
      // setTimeout(() => {
      //   if (inputRef.current) {
      //     inputRef.current.scrollLeft = inputRef.current.scrollWidth; 
      //   }
      // }, 0);

      //* Method 2nd using requestAnimationFrame
      // if (inputRef.current) {
      //   requestAnimationFrame(() => {
      //     inputRef.current.scrollLeft = inputRef.current.scrollWidth;
      //   });
      // }
    }
  };

  //* Method 3rd using useEffect
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollLeft = inputRef.current.scrollWidth;
    }
  }, [input]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center  gap-14 p-4">
      <h1 className="text-4xl font-bold text-center dark:text-white">Basic Calculator</h1>
      <div className="w-full max-w-[384px] shadow-lg rounded-2xl shadow-orange-500">
        <div className="bg-[#000000de] text-white rounded-t-2xl text-right text-3xl h-36 p-5 pt-6 flex flex-col gap-4 overflow-hidden">
          <div ref={inputRef} className="overflow-x-auto whitespace-nowrap overscroll">{input}</div>
          <div className="overflow-x-auto overscroll">
            <span className="text-orange-500">{result}</span>
          </div>
        </div>
        <div className="flex items-stretch bg-black h-24">
          {["%", "(", ")", "/"].map((value) => (
            <Button key={value} value={value} onClick={handleButtonClick} />
          ))}
        </div>
        <div className="flex items-stretch bg-black h-24">
          {["7", "8", "9", "*"].map((value) => (
            <Button key={value} value={value} onClick={handleButtonClick} />
          ))}
        </div>
        <div className="flex items-stretch bg-black h-24">
          {["4", "5", "6", "-"].map((value) => (
            <Button key={value} value={value} onClick={handleButtonClick} />
          ))}
        </div>
        <div className="flex items-stretch bg-black h-24">
          {["1", "2", "3", "+"].map((value) => (
            <Button key={value} value={value} onClick={handleButtonClick} />
          ))}
        </div>
        <div className="flex items-stretch bg-black h-24 rounded-b-2xl">
          {["C", "0", ".", "="].map((value) => (
            <Button key={value} value={value} onClick={handleButtonClick} isEqualButton={value == "="}/>
          ))}
        </div>
      </div>
    </main>
  );
}
