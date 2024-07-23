export default function Button({ value, onClick, isEqualButton }) {
  return (
    <div className="flex-1 px-2 py-2 justify-center flex items-center text-white text-2xl font-semibold">
      <div
        className={`rounded-full h-auto sm:h-20 w-full max-w-10 sm:max-w-prose sm:w-20 flex items-center justify-center cursor-pointer shadow-lg border-2 border-black hover:border-2 hover:border-gray-500 focus:outline-none ${isEqualButton ? "bg-orange-500" : "bg-black"}`}
        onClick={() => onClick(value)}
      >
        {value}
      </div>
    </div>
  );
}
