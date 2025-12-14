import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";

interface ChildData {
  id: string;
  name: string;
  birthDate: string;
  gender: string;
  status: string;
  interests: string[];
  specialConditions: string[];
  profilePhoto: string | null;
  age?: number;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedChild, setSelectedChild] = useState<string | null>(null);
  const [children, setChildren] = useState<ChildData[]>([]);
  const [childProfile, setChildProfile] = useState<ChildData | null>(null);

  useEffect(() => {
    const savedChildren = localStorage.getItem("childrenProfiles");
    if (savedChildren) {
      const childrenList = JSON.parse(savedChildren) as ChildData[];
      setChildren(childrenList);
      if (selectedChild === null && childrenList.length > 0) {
        setSelectedChild(childrenList[0].id);
        setChildProfile(childrenList[0]);
      }
    } else {
      // Default children for demo
      const defaultChildren: ChildData[] = [
        {
          id: "ali",
          name: "علی",
          age: 5,
          status: "پیش‌دبستانی",
          birthDate: "",
          gender: "",
          interests: [],
          specialConditions: [],
          profilePhoto: null,
        },
        {
          id: "sara",
          name: "سارا",
          age: 3,
          status: "پیش‌دبستانی",
          birthDate: "",
          gender: "",
          interests: [],
          specialConditions: [],
          profilePhoto: null,
        },
      ];
      setChildren(defaultChildren);
      setSelectedChild(defaultChildren[0].id);
    }
  }, []);

  useEffect(() => {
    if (selectedChild && children.length > 0) {
      const child = children.find((c) => c.id === selectedChild);
      if (child) {
        setChildProfile(child);
      }
    }
  }, [selectedChild, children]);

  const currentChild = childProfile || (children.length > 0 ? children[0] : null);

  const dashboardCards = [
    {
      title: "رشد جسمی",
      icon: "📊",
      description: "وزن، قد و خواب",
      href: "/growth-notebook",
    },
    {
      title: "رشد رفتاری",
      icon: "💚",
      description: "اعتماد به نفس و رفتار",
      href: "/growth-notebook",
    },
    {
      title: "توصیه روزانه",
      icon: "✨",
      description: "۱۰ دقیقه با فرزندت کتاب بخوان",
      href: "/chat",
    },
    {
      title: "برنامه هوشمند",
      icon: "📅",
      description: "برنامه روزانه و هفتگی",
      href: "/planner",
    },
  ];

  const shortcuts = [
    { title: "چت‌بات هوشمند", icon: "💬", href: "/chat" },
    { title: "جامعه والدین", icon: "👥", href: "/community" },
    { title: "محتوا و مقالات", icon: "📚", href: "/content" },
    { title: "دفترچه رشد", icon: "📊", href: "/growth-notebook" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-background to-teal-50 pb-8">
      <Header showBackButton={false} showNotifications={true} showSettings={true} />

      {/* Header Content */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-3xl overflow-hidden border-2 border-primary/20">
                {childProfile?.profilePhoto ? (
                  <img
                    src={childProfile.profilePhoto}
                    alt={childProfile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  currentChild?.name.charAt(0)
                )}
              </div>
              <div>
                <p className="text-sm text-slate-600">سلام!</p>
                <button
                  onClick={() => navigate(`/child-profile?id=${selectedChild}`)}
                  className="text-2xl font-bold text-slate-800 hover:text-primary transition-colors text-right cursor-pointer"
                >
                  {childProfile?.name || currentChild?.name}
                </button>
                <p className="text-sm text-slate-600">
                  {childProfile?.age || currentChild?.age} سال • {childProfile?.status || currentChild?.status}
                </p>
              </div>
            </div>
          </div>

          {/* Child Selector */}
          <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
            {children.map((child) => (
              <button
                key={child.id}
                onClick={() => setSelectedChild(child.id)}
                className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${
                  selectedChild === child.id
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-100 text-slate-700 hover:bg-gray-200"
                }`}
              >
                {child.name}
              </button>
            ))}
            <Link
              to="/child-profile"
              className="px-4 py-2 rounded-full font-semibold whitespace-nowrap bg-accent text-white hover:opacity-90 transition-all"
            >
              ➕ کودک جدید
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        {/* Dashboard Cards */}
        <h2 className="text-xl font-bold text-slate-800 mb-4">رشد و پیشرفت</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {dashboardCards.map((card) => (
            <Link
              key={card.title}
              to={card.href}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
            >
              <div className="text-4xl" style={{ marginBottom: "17px" }}>{card.icon}</div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">
                {card.title}
              </h3>
              <p className="text-slate-600">{card.description}</p>
            </Link>
          ))}
        </div>

        {/* Shortcuts */}
        <h2 className="text-xl font-bold text-slate-800 mb-4">میانبرها</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {shortcuts.map((shortcut) => (
            <Link
              key={shortcut.title}
              to={shortcut.href}
              className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg hover:scale-105 transition-all text-center"
            >
              <div className="text-3xl mb-2">{shortcut.icon}</div>
              <p className="font-semibold text-slate-800 text-sm">
                {shortcut.title}
              </p>
            </Link>
          ))}
        </div>

        {/* Additional Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <Link
            to="/chat"
            className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl p-6 text-white shadow-md hover:shadow-lg transition-all"
          >
            <h3 className="text-lg font-bold mb-2">🤖 دستیار هوشمند</h3>
            <p className="text-white/90 text-sm mb-3">سؤالات تربیتی و مشاوره با هوش مصنوعی</p>
            <button className="text-white font-semibold hover:underline">
              پرسیدن ←
            </button>
          </Link>

          <Link
            to="/parent-profile"
            className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-md hover:shadow-lg transition-all"
          >
            <h3 className="text-lg font-bold mb-2">👤 پروفایل والدین</h3>
            <p className="text-white/90 text-sm mb-3">مشاهده و ویرایش اطلاعات شخصی</p>
            <button className="text-white font-semibold hover:underline">
              رفتن ←
            </button>
          </Link>

          <Link
            to="/growth-notebook"
            className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-md hover:shadow-lg transition-all"
          >
            <h3 className="text-lg font-bold mb-2">📊 دفترچه رشد</h3>
            <p className="text-white/90 text-sm mb-3">نگاه‌دارندگی از رشد و پیشرفت</p>
            <button className="text-white font-semibold hover:underline">
              مشاهده ←
            </button>
          </Link>

          <Link
            to="/notifications"
            className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-md hover:shadow-lg transition-all"
          >
            <h3 className="text-lg font-bold mb-2">🔔 اعلان‌ها و گزارش‌ها</h3>
            <p className="text-white/90 text-sm mb-3">یادآوری‌ها و گزارش‌های ماهانه</p>
            <button className="text-white font-semibold hover:underline">
              مشاهده ←
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
