"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SubNavProps {
  items: { name: string; href: string }[];
}

export default function SubNav({ items }: SubNavProps) {
  const pathname = usePathname();

  return (
    <div className="sticky top-[80px] z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto no-scrollbar gap-1 md:gap-2 py-3 md:py-4 justify-start md:justify-center">
          {items.map((item) => {
            // exact match or start match for nested routes if necessary
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 md:px-6 md:py-2.5 rounded-full text-[11px] md:text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 scale-105"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
