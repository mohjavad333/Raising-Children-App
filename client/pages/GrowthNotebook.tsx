import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

interface GrowthData {
  date: string;
  value?: number;
  note?: string;
  height?: number;
  weight?: number;
  sleepHours?: number;
}

interface CategoryData {
  physical: GrowthData[];
  mental: GrowthData[];
  emotional: GrowthData[];
  social: GrowthData[];
}

type TabType = "physical" | "mental" | "emotional" | "social";

export default function GrowthNotebook() {
  const [activeTab, setActiveTab] = useState<TabType>("physical");
  const [data, setData] = useState<CategoryData>({
    physical: [
      { date: "1403/10/15", value: 110, note: "قد: 110 سانتی متر" },
      { date: "1403/11/01", value: 112, note: "قد: 112 سانتی متر" },
      { date: "1403/11/15", value: 113, note: "قد: 113 سانتی متر" },
    ],
    mental: [
      { date: "1403/10/15", value: 70, note: "تمرکز: خوب" },
      { date: "1403/11/01", value: 75, note: "تمرکز: بسیار خوب" },
      { date: "1403/11/15", value: 80, note: "تمرکز: عالی" },
    ],
    emotional: [
      { date: "1403/10/15", value: 65, note: "اعتماد به نفس: متوسط" },
      { date: "1403/11/01", value: 70, note: "اعتماد به نفس: خوب" },
      { date: "1403/11/15", value: 78, note: "اعتماد به نفس: خوب" },
    ],
    social: [
      { date: "1403/10/15", value: 60, note: "تعامل: متوسط" },
      { date: "1403/11/01", value: 68, note: "تعامل: خوب" },
      { date: "1403/11/15", value: 75, note: "تعامل: خوب" },
    ],
  });

  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split("T")[0],
    value: 50,
    height: "",
    weight: "",
    sleepHours: "",
    note: "",
  });

  const [showAIAnalysis, setShowAIAnalysis] = useState(false);

  const tabLabels: Record<TabType, string> = {
    physical: "رشد جسمی",
    mental: "رشد ذهنی",
    emotional: "رشد احساسی",
    social: "رشد اجتماعی",
  };

  const tabDescriptions: Record<TabType, string> = {
    physical: "قد، وزن، خواب و فعالیت بدنی",
    mental: "توانایی یادگیری، تمرکز، خلاقیت",
    emotional: "اعتماد به نفس، شناخت احساسات",
    social: "مهارت‌های اجتماعی، دوستی‌ها",
  };

  const inputLabels: Record<TabType, string> = {
    physical: "قد (سانتی‌متر) / وزن (کیلوگرم) / ساعات خواب",
    mental: "سطح تمرکز (0-100)",
    emotional: "سطح اعتماد به نفس (0-100)",
    social: "سطح تعامل اجتماعی (0-100)",
  };

  const getColorForCategory = (category: TabType): string => {
    switch (category) {
      case "physical":
        return "from-blue-500 to-cyan-500";
      case "mental":
        return "from-purple-500 to-pink-500";
      case "emotional":
        return "from-red-500 to-orange-500";
      case "social":
        return "from-green-500 to-teal-500";
    }
  };

  const getEmoji = (category: TabType): string => {
    switch (category) {
      case "physical":
        return "💪";
      case "mental":
        return "🧠";
      case "emotional":
        return "💚";
      case "social":
        return "👥";
    }
  };

  const handleAddEntry = () => {
    if (activeTab === "physical") {
      if (!newEntry.height || !newEntry.weight || !newEntry.sleepHours) return;

      const heightNum = parseFloat(newEntry.height as unknown as string);
      const weightNum = parseFloat(newEntry.weight as unknown as string);
      const sleepNum = parseFloat(newEntry.sleepHours as unknown as string);

      setData((prev) => ({
        ...prev,
        physical: [
          ...prev.physical,
          {
            date: newEntry.date,
            height: heightNum,
            weight: weightNum,
            sleepHours: sleepNum,
            note: newEntry.note,
          },
        ],
      }));

      setNewEntry({
        date: new Date().toISOString().split("T")[0],
        value: 50,
        height: "",
        weight: "",
        sleepHours: "",
        note: "",
      });
    } else {
      if (newEntry.value < 0 || newEntry.value > 100) return;

      setData((prev) => ({
        ...prev,
        [activeTab]: [
          ...prev[activeTab],
          {
            date: newEntry.date,
            value: newEntry.value,
            note: newEntry.note,
          },
        ],
      }));

      setNewEntry({
        date: new Date().toISOString().split("T")[0],
        value: 50,
        height: "",
        weight: "",
        sleepHours: "",
        note: "",
      });
    }
  };

  const currentData = data[activeTab];

  // Calculate max and average based on active tab
  let maxValue = 100;
  let avgValue = 0;
  let chartPoints: Array<{ idx: number; value: number; percent: number }> = [];

  if (activeTab === "physical") {
    // For physical: use height as the primary metric for chart
    const heights = currentData
      .map((d) => d.height || 0)
      .filter((h) => h > 0);
    maxValue = Math.max(...heights, 100);
    avgValue = heights.length > 0 ? heights.reduce((a, b) => a + b, 0) / heights.length : 0;
    chartPoints = currentData.map((d, idx) => ({
      idx,
      value: d.height || 0,
      percent: ((d.height || 0) / maxValue) * 100,
    }));
  } else {
    maxValue = Math.max(...currentData.map((d) => d.value || 0), 100);
    avgValue =
      currentData.reduce((sum, d) => sum + (d.value || 0), 0) / (currentData.length || 1);
    chartPoints = currentData.map((d, idx) => ({
      idx,
      value: d.value || 0,
      percent: ((d.value || 0) / maxValue) * 100,
    }));
  }

  const aiAnalysis: Record<TabType, string> = {
    physical:
      "📊 بر اساس داده‌ها: رشد جسمی کودک در مسیر نرمال است. قد از میانگین سن کمی بیشتر است. توصیه: فعالیت بدنی روزانه ۶۰ دقیقه و تغذیه متعادل.",
    mental:
      "🧠 تمرکز کودک رو به بهبود است. پیشرفت از ۷۰ به ۸۰ نشان‌دهنده تقویت مهارت‌های یادگیری است. توصیه: بازی‌های فکری ۱۵-۲۰ دقیقه روزی.",
    emotional:
      "💚 اعتماد به نفس کودک افزایش یافته است. این روند مثبت حاکی از پذیرش و تشویق مناسب است. توصیه: ادامه تعریف و تشویق دائمی.",
    social:
      "👥 مهارت‌های اجتماعی در حال بهبود است. کودک رفتار اجتماعی‌تری نشان می‌دهد. توصیه: فرصت‌های تعامل گروهی و بازی‌های جمعی.",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-background to-teal-50 pb-8">
      <Header title="دفترچه رشد" showBackButton={true} showNotifications={true} showSettings={true} />

      {/* Content Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <p className="text-slate-600 text-sm">
            رشد و پیشرفت علی را رصد کنید
          </p>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {(["physical", "mental", "emotional", "social"] as TabType[]).map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
                    activeTab === tab
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-100 text-slate-700 hover:bg-gray-200"
                  }`}
                >
                  {getEmoji(tab)} {tabLabels[tab]}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        {/* Category Info Card */}
        <div
          className={`bg-gradient-to-r ${getColorForCategory(
            activeTab
          )} rounded-2xl p-6 text-white mb-8`}
        >
          <h2 className="text-2xl font-bold mb-2">{tabLabels[activeTab]}</h2>
          <p className="text-white/90">{tabDescriptions[activeTab]}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {activeTab === "physical" ? (
            <>
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <p className="text-slate-600 text-sm mb-1">میانگین قد</p>
                <p className="text-3xl font-bold text-slate-800">
                  {Math.round(avgValue)} سم
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <p className="text-slate-600 text-sm mb-1">آخرین ثبت قد</p>
                <p className="text-3xl font-bold text-primary">
                  {currentData[currentData.length - 1]?.height} سم
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <p className="text-slate-600 text-sm mb-1">تعداد ثبت</p>
                <p className="text-3xl font-bold text-accent">
                  {currentData.length}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <p className="text-slate-600 text-sm mb-1">میانگین</p>
                <p className="text-3xl font-bold text-slate-800">
                  {Math.round(avgValue)}
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <p className="text-slate-600 text-sm mb-1">آخرین ثبت</p>
                <p className="text-3xl font-bold text-primary">
                  {currentData[currentData.length - 1]?.value}
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <p className="text-slate-600 text-sm mb-1">تعداد ثبت</p>
                <p className="text-3xl font-bold text-accent">
                  {currentData.length}
                </p>
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-bold text-slate-800 mb-6">
              {activeTab === "physical" ? "نمودار پیشرفت قد" : "نمودار پیشرفت"}
            </h3>

            {/* Simple Bar Chart */}
            <div className="mb-8">
              <div className="flex items-end gap-3 h-64">
                {chartPoints.map((point) => (
                  <div
                    key={point.idx}
                    className="flex-1 flex flex-col items-center gap-2"
                  >
                    <div
                      className="w-full bg-gradient-to-t from-primary to-primary/50 rounded-t-lg transition-all hover:opacity-80 cursor-pointer group relative"
                      style={{ height: `${point.percent}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        {point.value}
                      </div>
                    </div>
                    <span className="text-xs text-slate-600 text-center">
                      {currentData[point.idx].date.split("/")[2]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Data List */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-slate-700 mb-3">
                سابقه ثبت‌ها:
              </h4>
              {currentData.map((entry, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    {activeTab === "physical" ? (
                      <>
                        <p className="font-semibold text-slate-800">
                          قد: {entry.height} سم | وزن: {entry.weight} کیلوگرم | خواب: {entry.sleepHours} ساعت
                        </p>
                        {entry.note && (
                          <p className="text-sm text-slate-600">{entry.note}</p>
                        )}
                      </>
                    ) : (
                      <>
                        <p className="font-semibold text-slate-800">
                          {entry.value}
                        </p>
                        {entry.note && (
                          <p className="text-sm text-slate-600">{entry.note}</p>
                        )}
                      </>
                    )}
                  </div>
                  <span className="text-sm text-slate-600">{entry.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <div className="bg-white rounded-2xl p-6 shadow-md h-fit">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              ثبت داده جدید
            </h3>

            <div className="space-y-4">
              {/* Date Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  تاریخ
                </label>
                <input
                  type="date"
                  value={newEntry.date}
                  onChange={(e) =>
                    setNewEntry((prev) => ({
                      ...prev,
                      date: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-right"
                />
              </div>

              {/* Physical Category: Text Inputs for Height, Weight, Sleep */}
              {activeTab === "physical" && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      قد (سانتی‌متر)
                    </label>
                    <input
                      type="number"
                      value={newEntry.height}
                      onChange={(e) =>
                        setNewEntry((prev) => ({
                          ...prev,
                          height: e.target.value,
                        }))
                      }
                      placeholder="مثلاً: 110"
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-right"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      وزن (کیلوگرم)
                    </label>
                    <input
                      type="number"
                      value={newEntry.weight}
                      onChange={(e) =>
                        setNewEntry((prev) => ({
                          ...prev,
                          weight: e.target.value,
                        }))
                      }
                      placeholder="مثلاً: 20"
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-right"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      ساعات خواب
                    </label>
                    <input
                      type="number"
                      value={newEntry.sleepHours}
                      onChange={(e) =>
                        setNewEntry((prev) => ({
                          ...prev,
                          sleepHours: e.target.value,
                        }))
                      }
                      placeholder="مثلاً: 8"
                      step="0.5"
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-right"
                    />
                  </div>
                </div>
              )}

              {/* Other Categories: Range Slider */}
              {activeTab !== "physical" && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {inputLabels[activeTab]}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={newEntry.value}
                    onChange={(e) =>
                      setNewEntry((prev) => ({
                        ...prev,
                        value: parseInt(e.target.value),
                      }))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to left, var(--primary) 0%, var(--primary) ${newEntry.value}%, #e5e7eb ${newEntry.value}%, #e5e7eb 100%)`,
                    }}
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-slate-600">۰</span>
                    <span className="text-lg font-bold text-primary">
                      {newEntry.value}
                    </span>
                    <span className="text-xs text-slate-600">۱۰۰</span>
                  </div>
                </div>
              )}

              {/* Note Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  یادداشت
                </label>
                <textarea
                  value={newEntry.note}
                  onChange={(e) =>
                    setNewEntry((prev) => ({
                      ...prev,
                      note: e.target.value,
                    }))
                  }
                  placeholder="یک یادداشت اختیاری بنویسید..."
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-right resize-none"
                  rows={3}
                />
              </div>

              {/* Add Button */}
              <button
                onClick={handleAddEntry}
                className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                + اضافه کردن
              </button>
            </div>
          </div>
        </div>

        {/* AI Analysis Section */}
        <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-slate-800">
              تحلیل هوش مصنوعی
            </h3>
            <button
              onClick={() => setShowAIAnalysis(!showAIAnalysis)}
              className="text-primary font-semibold hover:underline"
            >
              {showAIAnalysis ? "مخفی" : "مشاهده"}
            </button>
          </div>

          {showAIAnalysis && (
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-r-4 border-primary rounded-lg p-6">
              <p className="text-slate-800 leading-relaxed">
                {aiAnalysis[activeTab]}
              </p>
              <p className="text-sm text-slate-600 mt-4">
                💡 این تحلیل بر اساس داده‌های وارد‌شده و معیارهای رشد نرمال تهیه شده است.
              </p>
            </div>
          )}
        </div>

        {/* Notes Section */}
        <div className="bg-white rounded-2xl p-8 shadow-md">
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            نکات مهم
          </h3>
          <ul className="space-y-3 text-slate-700">
            <li className="flex gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>
                داده‌ها را به‌طور منظم ثبت کنید تا نمودار دقیق‌تر شود
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>
                یادداشت‌های مختصر درباره شرایط و تغییرات رفتاری بنویسید
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">✓</span>
              <span>
                این اطلاعات کاملا محرمانه است و فقط برای والد قابل دسترسی
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
