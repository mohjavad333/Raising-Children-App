import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

interface ContentItem {
  id: string;
  type: "article" | "video" | "podcast";
  title: string;
  category: string;
  ageGroup: string;
  duration?: string;
  image?: string;
  summary: string;
  keyPoints: string[];
  author: string;
  rating: number;
  reviews: number;
  isFavorite: boolean;
  recommendation?: string;
  views: number;
}

type FilterType = "all" | "article" | "video" | "podcast";

export default function Content() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("all");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const contentItems: ContentItem[] = [
    {
      id: "1",
      type: "article",
      title: "۱۰ راه برای بهبود خواب کودک شما",
      category: "خواب و استراحت",
      ageGroup: "3-6",
      summary:
        "راهنمای کامل برای درک و بهبود الگوهای خواب کودکان پیش‌دبستانی",
      keyPoints: [
        "روتین شام منظم",
        "محیط تاریک و آرام",
        "کاهش تحریک‌های الکترونیکی",
        "تقویت فعالیت بدنی روزانه",
      ],
      author: "دکتر احمدی",
      rating: 4.8,
      reviews: 234,
      isFavorite: false,
      views: 1250,
      recommendation:
        "برای والدین کودکان ۳-۶ سال که مشکل خواب دارند",
    },
    {
      id: "2",
      type: "video",
      title: "روش‌های تحریک رشد ذهنی کودکان",
      category: "رشد ذهنی",
      ageGroup: "2-5",
      duration: "۲۳ دقیقه",
      summary: "ویدیوی آموزشی درباره بازی‌های فکری و فعالیت‌های خلاق",
      keyPoints: [
        "بازی‌های حسی",
        "فعالیت‌های تخیلی",
        "حل مسئله و منطق",
        "خلاقیت و نوآوری",
      ],
      author: "دکتر سحر کامرانی",
      rating: 4.9,
      reviews: 567,
      isFavorite: false,
      views: 3420,
      recommendation: "برای والدینی که می‌خواهند کودک خود را تحریک کنند",
    },
    {
      id: "3",
      type: "podcast",
      title: "پادکست تربیت فرزند: کنترل خشم",
      category: "رفتار و هیجانات",
      ageGroup: "4-12",
      duration: "۳۲ دقیقه",
      summary:
        "بحث عمیق درباره کنترل خشم در کودکان و روش‌های مقابله والدین",
      keyPoints: [
        "درک علل خشم کودکان",
        "تکنیک‌های آرام‌سازی",
        "مدل‌سازی رفتار مثبت",
        "ارتباط موثر",
      ],
      author: "خانم فاطمه رحمانی",
      rating: 4.7,
      reviews: 345,
      isFavorite: false,
      views: 2100,
      recommendation: "برای والدین که با تحدیات رفتاری کودک روبه رو هستند",
    },
    {
      id: "4",
      type: "article",
      title: "تغذیه سالم برای کودکان پیش‌دبستانی",
      category: "تغذیه",
      ageGroup: "2-6",
      summary: "راهنمای غذاهای سالم، متعادل و خوشمزه برای کودکان",
      keyPoints: [
        "گروه‌های غذایی ضروری",
        "اندازه پرتقال مناسب برای کودکان",
        "غذاهای محتاط‌کننده",
        "تشویق به غذاخوری سالم",
      ],
      author: "خانم مریم حسینی",
      rating: 4.6,
      reviews: 412,
      isFavorite: false,
      views: 1890,
      recommendation: "برای تغذیه مناسب کودکان خردسال",
    },
    {
      id: "5",
      type: "video",
      title: "مهارت‌های اجتماعی کودکان",
      category: "توسعه اجتماعی",
      ageGroup: "3-8",
      duration: "۱۹ دقیقه",
      summary: "نحوه آموزش دوستی‌ها، سازگاری و مهارت‌های اجتماعی",
      keyPoints: [
        "فناوری دوستی",
        "حل تعارضات",
        "همدلی و درک احساسات",
        "بازی گروهی",
      ],
      author: "دکتر علی موسوی",
      rating: 4.8,
      reviews: 523,
      isFavorite: false,
      views: 2756,
      recommendation: "برای کودکان درون‌گرا یا کم‌تعامل",
    },
    {
      id: "6",
      type: "podcast",
      title: "والدین هوشمند: تعادل کار و خانواده",
      category: "خانوادگی",
      ageGroup: "all",
      duration: "۲۸ دقیقه",
      summary:
        "مصاحبه با والدین موفق درباره چگونگی توازن بین شغل و فرزند‌پروری",
      keyPoints: [
        "مدیریت زمان",
        "اولویت‌بندی",
        "خودمراقبتی",
        "کمک و حمایت",
      ],
      author: "خانم حدیثه صحافی",
      rating: 4.5,
      reviews: 289,
      isFavorite: false,
      views: 1567,
      recommendation: "برای والدینی که با فشار کار روبه رو هستند",
    },
  ];

  const categories = [
    "خواب و استراحت",
    "رشد ذهنی",
    "رفتار و هیجانات",
    "تغذیه",
    "توسعه اجتماعی",
    "خانوادگی",
  ];

  const ageGroups = ["all", "0-2", "2-5", "3-6", "6-12", "12-18"];

  const filteredContent = contentItems.filter((item) => {
    const matchesType = selectedFilter === "all" || item.type === selectedFilter;
    const matchesAgeGroup =
      selectedAgeGroup === "all" ||
      item.ageGroup === "all" ||
      item.ageGroup.includes(selectedAgeGroup);
    const matchesSearch =
      item.title.includes(searchQuery) ||
      item.category.includes(searchQuery) ||
      item.author.includes(searchQuery);

    return matchesType && matchesAgeGroup && matchesSearch;
  });

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const getTypeIcon = (type: FilterType) => {
    switch (type) {
      case "article":
        return "📄";
      case "video":
        return "🎥";
      case "podcast":
        return "🎙️";
      default:
        return "📚";
    }
  };

  const getTypeLabel = (type: FilterType) => {
    switch (type) {
      case "article":
        return "مقاله";
      case "video":
        return "ویدیو";
      case "podcast":
        return "پادکست";
      default:
        return "محتوا";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-background to-teal-50 pb-8">
      <Header title="مرکز یادگیری والدین" showBackButton={true} showNotifications={true} showSettings={true} />

      {/* Subtitle */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <p className="text-slate-600 text-sm mb-4">
            مقالات، ویدیوها و پادکست‌های معتبر برای تربیت بهتر
          </p>

          {/* Search */}
          <input
            type="text"
            placeholder="جستجو در مقالات، ویدیوها و پادکست‌ها..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary text-right mb-4"
          />

          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { id: "all", label: "همه محتوا" },
              { id: "article", label: "📄 مقالات" },
              { id: "video", label: "🎥 ویدیوها" },
              { id: "podcast", label: "🎙️ پادکست‌ها" },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id as FilterType)}
                className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${
                  selectedFilter === filter.id
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-100 text-slate-700 hover:bg-gray-200"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-md h-fit sticky top-8">
              <h2 className="text-lg font-bold text-slate-800 mb-4">فیلتر</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-700 mb-3">گروه سنی</h3>
                  <div className="space-y-2">
                    {ageGroups.map((age) => (
                      <button
                        key={age}
                        onClick={() => setSelectedAgeGroup(age)}
                        className={`w-full text-right py-2 px-3 rounded-lg transition-all ${
                          selectedAgeGroup === age
                            ? "bg-primary text-white shadow-md"
                            : "bg-gray-100 text-slate-700 hover:bg-gray-200"
                        }`}
                      >
                        {age === "all" ? "همه" : `${age} سال`}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold text-slate-700 mb-3">دسته‌بندی</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSearchQuery(category);
                            }
                          }}
                        />
                        <span className="text-sm text-slate-700">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-3">
            <h2 className="text-xl font-bold text-slate-800 mb-4">
              {filteredContent.length} محتوا
            </h2>

            {filteredContent.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center">
                <p className="text-4xl mb-4">🔍</p>
                <p className="text-slate-600">محتوایی برای این جستجو پیدا نشد</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredContent.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all overflow-hidden"
                  >
                    {/* Card Header */}
                    <button
                      onClick={() =>
                        setExpandedContent(
                          expandedContent === item.id ? null : item.id
                        )
                      }
                      className="w-full px-6 py-5 hover:bg-gray-50 transition-colors flex items-center justify-between"
                    >
                      <div className="text-right flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">
                            {getTypeIcon(item.type as FilterType)}
                          </span>
                          <h3 className="text-lg font-bold text-slate-800">
                            {item.title}
                          </h3>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-semibold">
                            {item.category}
                          </span>
                          <span className="px-2 py-1 bg-accent/10 text-accent-foreground rounded text-xs font-semibold">
                            {item.ageGroup === "all"
                              ? "تمام سنین"
                              : `${item.ageGroup} سال`}
                          </span>
                          {item.duration && (
                            <span className="px-2 py-1 bg-gray-100 text-slate-700 rounded text-xs font-semibold">
                              ⏱️ {item.duration}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 text-right">
                          {item.summary}
                        </p>
                      </div>

                      <div className="flex flex-col items-center gap-2 mx-4">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400">⭐</span>
                          <span className="font-semibold text-slate-800">
                            {item.rating}
                          </span>
                        </div>
                        <span className="text-xs text-slate-600">
                          {item.reviews} نظر
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(item.id);
                          }}
                          className={`text-2xl transition-transform ${
                            favorites.has(item.id)
                              ? "text-red-500 scale-110"
                              : "text-gray-400"
                          }`}
                        >
                          ❤️
                        </button>
                      </div>

                      <div className="text-2xl">
                        {expandedContent === item.id ? "▲" : "▼"}
                      </div>
                    </button>

                    {/* Expanded Content */}
                    {expandedContent === item.id && (
                      <div className="px-6 py-6 border-t border-gray-100 space-y-4">
                        {/* AI Summary */}
                        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4">
                          <h4 className="font-bold text-slate-800 mb-2">
                            📝 خلاصه هوش مصنوعی
                          </h4>
                          <p className="text-slate-700 text-sm">
                            {item.summary}
                          </p>
                        </div>

                        {/* Key Points */}
                        <div>
                          <h4 className="font-bold text-slate-800 mb-3">
                            🎯 نکات کلیدی:
                          </h4>
                          <ul className="grid grid-cols-2 gap-2">
                            {item.keyPoints.map((point, idx) => (
                              <li key={idx} className="flex gap-2 text-sm">
                                <span className="text-primary font-bold flex-shrink-0">
                                  ✓
                                </span>
                                <span className="text-slate-700">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Author & Stats */}
                        <div className="flex gap-4 text-sm">
                          <div>
                            <p className="text-slate-600">نویسنده</p>
                            <p className="font-semibold text-slate-800">
                              {item.author}
                            </p>
                          </div>
                          <div>
                            <p className="text-slate-600">بازدیدها</p>
                            <p className="font-semibold text-slate-800">
                              {item.views.toLocaleString("fa-IR")}
                            </p>
                          </div>
                        </div>

                        {/* Recommendation */}
                        {item.recommendation && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-sm text-blue-900">
                              💡 <span className="font-semibold">توصیه:</span>{" "}
                              {item.recommendation}
                            </p>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4">
                          <button className="flex-1 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                            مطالعه / تماشا / گوش دادن
                          </button>
                          <button className="flex-1 py-2 bg-gray-200 text-slate-800 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                            اشتراک‌گذاری
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
