"use client";

import { menuItems } from "@/constants/menu";
import { Search } from "lucide-react";
import Link from "next/link";
import MobileMenu from "./mobileMenu";
import { useState } from "react";

export default function Navbar({ title }: { title: string }) {
  const [showMobileSearchInput, setShowMobileSearchInput] = useState(false);

  return (
    <div className="navbar px-0 bg-base-100 shadow-sm">
      <div className="flex-1 pl-6">
        <Link href="/" className="btn btn-outline text-xl cursor-pointer">
          {title}
        </Link>
      </div>

      <div className="hidden md:block flex-none">
        <ul className="menu menu-horizontal px-2 text-base">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`md:block pl-4 md:pr-6 ${
          showMobileSearchInput ? "block" : "hidden"
        }`}
      >
        <label className="input w-full md:w-72">
          <Search strokeWidth={1.75} className="text-base-content" />
          <input type="search" className="grow" placeholder="Search here..." />
        </label>
      </div>

      {!showMobileSearchInput && (
        <Search
          onClick={() => setShowMobileSearchInput(!showMobileSearchInput)}
          strokeWidth={1.75}
          className="text-base-content"
        />
      )}

      <div className="md:hidden">
        <MobileMenu />
      </div>
    </div>
  );
}
