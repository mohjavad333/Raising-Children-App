import { useState } from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  showNotifications?: boolean;
  showSettings?: boolean;
}

export default function Header({
  title,
  showBackButton = true,
  showNotifications = true,
  showSettings = true,
}: HeaderProps) {
  const [showMenu, setShowMenu] = useState(false);
  const isExpert = !!localStorage.getItem("currentExpert");

  const baseMenuItems = [
    { label: "🏠 داشبورد", href: "/dashboard" },
    { label: "💬 چت‌بات هوشمند", href: "/chat" },
    { label: "📊 دفترچه رشد", href: "/growth-notebook" },
    { label: "📅 برنامه هوشمند", href: "/planner" },
    { label: "👥 جامعه والدین", href: "/community" },
    { label: "🏆 بخش کارشناسان", href: "/experts" },
    { label: "🔔 اعلان‌ها و گزارش‌ها", href: "/notifications" },
    { label: "📚 مرکز یادگیری", href: "/content" },
    { label: "👤 پروفایل والدین", href: "/parent-profile" },
    { label: "👧 پروفایل کودک", href: "/child-profile" },
  ];

  const expertMenuItems = [
    { label: "💼 ثبت نام کارشناسان", href: "/expert-profile" },
  ];

  const menuItems = [
    ...baseMenuItems,
    ...expertMenuItems,
    { label: "⚙️ تنظیمات و امنیت", href: "/settings" },
  ];

  return (
    <>
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Left Side - Back Button (if needed) */}
          <div className="w-12">
            {showBackButton && (
              <Link
                to="/dashboard"
                className="text-slate-600 hover:text-slate-800 transition-colors text-xl"
              >
                ←
              </Link>
            )}
          </div>

          {/* Center - Title */}
          {title && (
            <h1 className="text-2xl font-bold text-slate-800 flex-1 text-center">
              {title}
            </h1>
          )}

          {/* Right Side - Icons */}
          <div className="flex items-center gap-2 justify-end">
            {showNotifications && (
              <Link
                to="/notifications"
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="اعلان‌ها"
              >
                <svg
                  className="w-6 h-6 text-slate-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
              </Link>
            )}

            {showSettings && (
              <Link
                to="/settings"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="تنظیمات"
              >
                <svg
                  className="w-6 h-6 text-slate-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </Link>
            )}

            {/* Hamburger Menu */}
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
              title="منو"
            >
              <svg
                className="w-6 h-6 text-slate-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Hamburger Menu Dropdown */}
      {showMenu && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setShowMenu(false)}
        >
          <div
            className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg overflow-y-auto z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-4">منو</h2>
              <div className="space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setShowMenu(false)}
                    className="block w-full text-right py-3 px-4 rounded-lg hover:bg-primary hover:text-white transition-colors font-semibold text-slate-700"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
