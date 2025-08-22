"use client";

import { menuItems } from "@/constants/menu";
import { Hamburger, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MobileMenu() {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const handleToggleDrawer = () => setOpenMobileMenu(!openMobileMenu);

  return (
    <div className="drawer drawer-end">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={openMobileMenu}
        onChange={handleToggleDrawer}
      />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
          {openMobileMenu ? (
            <X strokeWidth={1.75} />
          ) : (
            <Hamburger strokeWidth={1.75} />
          )}
        </label>
      </div>
      <div className="drawer-side h-[calc(100%_-_64px)] top-[64px] border-t">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-100 text-base-content h-full w-full p-4 text-lg">
          {menuItems.map((item) => (
            <li key={item.name} onClick={handleToggleDrawer}>
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
