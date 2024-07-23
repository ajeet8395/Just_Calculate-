"use client";
import Link from "next/link";

export default function Card({ title, link }) {
  return (
    <Link href={link}>
      <div className="bg-gray-100 shadow hover:shadow-lg cursor-pointer p-4 rounded-md col-span-1 dark:shadow-orange-500 transition-shadow">
        <h1 className="text-base text-center">{title}</h1>
      </div>
    </Link>
  );
}
