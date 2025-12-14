import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

interface Notification {
  id: string;
  type: "reminder" | "warning" | "report" | "achievement";
  title: string;
  message: string;
  timestamp: string;
  icon: string;
  color: string;
  actionText?: string;
  actionUrl?: string;
  read: boolean;
  priority: "low" | "medium" | "high";
}

interface MonthlyReport {
  month: string;
  date: string;
  summary: string;
  stats: {
    label: string;
    value: string;
    trend: "up" | "down" | "stable";
  }[];
  highlights: string[];
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "reminder",
      title: "یادآوری: خواب کودک",
      message: "علی دیشب ۸ ساعت خواب داشته است. امشب ساعت ۲۱:۰۰ خواب را آغاز کنید.",
      timestamp: "امروز • ۱۴:۳۰",
      icon: "😴",
      color: "from-purple-500 to-indigo-500",
      read: false,
      priority: "high",
    },
    {
      id: "2",
      type: "reminder",
      title: "یادآوری: تمرین بدنی",
      message: "علی امروز هنوز فعالیت بدنی انجام نداده است. آن را برنامه‌ریزی کنید.",
      timestamp: "امروز • ۱۲:۱۵",
      icon: "⚽",
      color: "from-green-500 to-teal-500",
      read: false,
      priority: "medium",
    },
    {
      id: "3",
      type: "warning",
      title: "هشدار: وزن علی",
      message: "وزن علی کمتر از میانگین سن است. توصیه می‌شود تغذیه را بازبینی کنید.",
      timestamp: "دیروز • ۱۰:۰۰",
      icon: "⚠️",
      color: "from-orange-500 to-red-500",
      read: false,
      priority: "high",
    },
    {
      id: "4",
      type: "reminder",
      title: "یادآوری: واکسیناسیون",
      message: "زمان نزدیکی واکسین سالانه علی فرا رسیده است. لطفاً برای رزرو سرویس صحی تماس بگیرید.",
      timestamp: "دیروز • ۰۸:۳۰",
      icon: "💉",
      color: "from-blue-500 to-cyan-500",
      read: true,
      priority: "high",
      actionText: "رزرو سرویس صحی",
      actionUrl: "/",
    },
    {
      id: "5",
      type: "reminder",
      title: "یادآوری: مطالعه و یادگیری",
      message: "علی ۳ روز است که مطالعه نکرده است. زمان خوبی برای مطالعه است.",
      timestamp: "۲ روز پیش • ۱۶:۴۵",
      icon: "📚",
      color: "from-yellow-500 to-orange-500",
      read: true,
      priority: "medium",
    },
    {
      id: "6",
      type: "achievement",
      title: "موفقیت: افزایش تمرکز",
      message: "عالی! تمرکز علی در هفته گذشته به ۸۰% رسید. تقدیم می‌کنیم!",
      timestamp: "۳ روز پیش • ۱۹:۰۰",
      icon: "🏆",
      color: "from-pink-500 to-rose-500",
      read: true,
      priority: "low",
    },
  ]);

  const [selectedFilter, setSelectedFilter] = useState<"all" | Notification["type"]>("all");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [expandedReport, setExpandedReport] = useState<string | null>(null);

  const monthlyReports: MonthlyReport[] = [
    {
      month: "آبان ۱۴۰۳",
      date: "۱۵ آبان",
      summary:
        "علی در این ماه ��یشرفت خوبی داشته است. رشد جسمی، ذهنی و رفتاری در مسیر نرمال است.",
      stats: [
        {
          label: "رشد جسمی",
          value: "112 سم",
          trend: "up",
        },
        {
          label: "تمرکز",
          value: "75%",
          trend: "up",
        },
        {
          label: "اعتماد به نفس",
          value: "70%",
          trend: "up",
        },
        {
          label: "تعامل اجتماعی",
          value: "68%",
          trend: "stable",
        },
      ],
      highlights: [
        "افزایش قد: ۲ سانتی‌متر",
        "بهبود تمرکز: ۵%",
        "حضور مثبت در فعالیت‌های گروهی",
        "پیشرفت در مهارت‌های اجتماعی",
      ],
    },
    {
      month: "مهر ۱۴۰۳",
      date: "۱۵ مهر",
      summary:
        "ماه بسیار موفق برای علی. تمام بخش‌های رشد پیشرفت قابل توجهی داشته‌اند.",
      stats: [
        {
          label: "رشد جسمی",
          value: "110 سم",
          trend: "up",
        },
        {
          label: "تمرکز",
          value: "70%",
          trend: "up",
        },
        {
          label: "اعتماد به نفس",
          value: "65%",
          trend: "up",
        },
        {
          label: "تعامل اجتماعی",
          value: "60%",
          trend: "up",
        },
      ],
      highlights: [
        "افزایش قد: ۱.۵ سانتی‌متر",
        "بهبود تمرکز: ۳%",
        "شرکت فعال در فعالیت‌های مختلف",
      ],
    },
  ];

  const filteredNotifications = notifications.filter((notif) => {
    const matchesFilter =
      selectedFilter === "all" || notif.type === selectedFilter;
    const matchesReadStatus = !showUnreadOnly || !notif.read;
    return matchesFilter && matchesReadStatus;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return "🔴 فوری";
      case "medium":
        return "🟡 معمولی";
      case "low":
        return "🟢 کم";
      default:
        return "";
    }
  };

  const getTypeLabel = (type: Notification["type"]) => {
    switch (type) {
      case "reminder":
        return "یادآوری";
      case "warning":
        return "هشدار";
      case "report":
        return "گزارش";
      case "achievement":
        return "موفقیت";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-background to-teal-50 pb-8">
      <Header title="مرکز اعلان‌ها و گزارش‌ها" showBackButton={true} showNotifications={true} showSettings={true} />

      {/* Subtitle */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <p className="text-slate-600 text-sm mb-4">
            یادآوری‌ها، هشدارها، و گزارش‌های ماهانه پیشرفت
          </p>

          {/* Top Actions */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handleMarkAllAsRead}
              disabled={unreadCount === 0}
              className="text-primary font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              علامت‌گذاری همه به عنوان خوانده شده
            </button>
            <div className="bg-primary text-white px-4 py-2 rounded-lg font-semibold">
              {unreadCount} خبر جدید
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-md h-fit sticky top-8">
              <h2 className="text-lg font-bold text-slate-800 mb-4">فیلتر</h2>

              <div className="space-y-3 mb-6">
                {[
                  { id: "all", label: "همه اعلان‌ها" },
                  { id: "reminder", label: "یادآوری‌ها" },
                  { id: "warning", label: "هشدارها" },
                  { id: "achievement", label: "موفقیت‌ها" },
                  { id: "report", label: "گزارش‌ها" },
                ].map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() =>
                      setSelectedFilter(filter.id as "all" | Notification["type"])
                    }
                    className={`w-full text-right py-2 px-4 rounded-lg font-semibold transition-all ${
                      selectedFilter === filter.id
                        ? "bg-primary text-white shadow-md"
                        : "bg-gray-100 text-slate-700 hover:bg-gray-200"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              <label className="flex items-center gap-2 cursor-pointer p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <input
                  type="checkbox"
                  checked={showUnreadOnly}
                  onChange={(e) => setShowUnreadOnly(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="font-semibold text-slate-700">
                  فقط خوانده نشده
                </span>
              </label>
            </div>
          </div>

          {/* Notifications List */}
          <div className="lg:col-span-3">
            {/* Notifications */}
            <div className="space-y-4 mb-8">
              <h2 className="text-xl font-bold text-slate-800 mb-4">
                اعلان‌ها ({filteredNotifications.length})
              </h2>

              {filteredNotifications.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center">
                  <p className="text-4xl mb-4">📭</p>
                  <p className="text-slate-600">هیچ اعلانی موجود نیست</p>
                </div>
              ) : (
                filteredNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => handleMarkAsRead(notif.id)}
                    className={`bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all cursor-pointer border-l-4 ${
                      notif.read
                        ? "border-gray-300 opacity-75"
                        : "border-primary"
                    }`}
                  >
                    <div className="flex gap-4">
                      <div className="text-4xl flex-shrink-0">{notif.icon}</div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-slate-800">
                            {notif.title}
                          </h3>
                          <span className="text-xs px-2 py-1 bg-slate-200 text-slate-700 rounded-full">
                            {getTypeLabel(notif.type)}
                          </span>
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                            {getPriorityBadge(notif.priority)}
                          </span>
                          {!notif.read && (
                            <span className="w-3 h-3 bg-primary rounded-full ml-auto"></span>
                          )}
                        </div>

                        <p className="text-slate-700 mb-3">{notif.message}</p>

                        <div className="flex items-center justify-between">
                          <div className="text-sm text-slate-600">
                            {notif.timestamp}
                          </div>
                          {notif.actionText && (
                            <Link
                              to={notif.actionUrl || "/"}
                              className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm"
                            >
                              {notif.actionText}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Monthly Reports Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                گزارش‌های ماهانه
              </h2>

              <div className="space-y-4">
                {monthlyReports.map((report, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl shadow-md overflow-hidden"
                  >
                    {/* Report Header */}
                    <button
                      onClick={() =>
                        setExpandedReport(
                          expandedReport === report.month
                            ? null
                            : report.month
                        )
                      }
                      className="w-full px-6 py-4 hover:bg-gray-50 transition-colors flex items-center justify-between border-b border-gray-100"
                    >
                      <div className="text-right flex-1">
                        <h3 className="text-lg font-bold text-slate-800">
                          {report.month}
                        </h3>
                        <p className="text-sm text-slate-600">{report.date}</p>
                      </div>
                      <div className="text-2xl">
                        {expandedReport === report.month ? "▲" : "▼"}
                      </div>
                    </button>

                    {/* Report Content */}
                    {expandedReport === report.month && (
                      <div className="px-6 py-6 space-y-6">
                        <div>
                          <p className="text-slate-700 leading-relaxed">
                            {report.summary}
                          </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {report.stats.map((stat, statIdx) => (
                            <div
                              key={statIdx}
                              className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-4 text-center"
                            >
                              <p className="text-sm text-slate-600 mb-2">
                                {stat.label}
                              </p>
                              <p className="text-2xl font-bold text-primary mb-2">
                                {stat.value}
                              </p>
                              <p className="text-sm font-semibold">
                                {stat.trend === "up"
                                  ? "📈ارتقاء"
                                  : stat.trend === "down"
                                  ? "📉کاهش"
                                  : "➡️پایدار"}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Highlights */}
                        <div>
                          <h4 className="font-bold text-slate-800 mb-3">
                            نکات برجسته:
                          </h4>
                          <ul className="space-y-2">
                            {report.highlights.map((highlight, hIdx) => (
                              <li
                                key={hIdx}
                                className="flex gap-3 text-slate-700"
                              >
                                <span className="text-primary font-bold flex-shrink-0">
                                  ✓
                                </span>
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Report Button */}
                        <button className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
                          دانلود گزارش کامل PDF
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
