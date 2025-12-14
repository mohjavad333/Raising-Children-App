import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

interface Expert {
  id: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  title?: string;
  userType?: string;
  specialty?: string[];
  specialtyTitle?: string;
  bio: string;
  rating?: number;
  reviews?: number;
  avatar?: string;
  profilePhoto?: string;
  badge?: string;
  consultationPrice?: string;
  responseTime?: string;
  experience?: string;
  yearsOfExperience?: string;
  qualifications?: string[];
  certifications?: string;
  postsCount?: number;
}

export default function Experts() {
  const [selectedExpert, setSelectedExpert] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState<string>("all");
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactType, setContactType] = useState<"question" | "session">("question");
  const [allExperts, setAllExperts] = useState<Expert[]>([]);

  const staticExperts: Expert[] = [
    {
      id: "1",
      name: "دکتر احمد احمدی",
      title: "روان‌شناس کودک",
      specialty: ["رفتار", "اضطراب", "اعتماد‌به‌نفس"],
      bio: "متخصص در رشد و تربیت کودکان با بیش از ۱۵ سال تجربه",
      rating: 4.9,
      reviews: 287,
      avatar: "👨‍⚕️",
      badge: "تایید شده",
      consultationPrice: "۲۵۰,۰۰۰ تومان",
      responseTime: "معمولاً ۲ ساعت",
      experience: "۱۵+ سال",
      qualifications: [
        "دکتری روان‌شناسی کودک",
        "مدرک تحصیلی از دانشگاه تهران",
        "عضو انجمن روان‌شناسان ایران",
      ],
      postsCount: 42,
    },
    {
      id: "2",
      name: "خانم مریم حسینی",
      title: "مشاور و مربی تربیتی",
      specialty: ["تغذیه", "رشد جسمی", "سلامت کودک"],
      bio: "متخصص در تغذیه کودکان و پرورش سالم",
      rating: 4.8,
      reviews: 256,
      avatar: "👩‍⚕️",
      badge: "تایید شده",
      consultationPrice: "۱۸۰,۰۰۰ تومان",
      responseTime: "معمولاً ۱ ساعت",
      experience: "۱۲+ سال",
      qualifications: [
        "فارغ‌التحصیل تغذیه کودکان",
        "مدرک مربی‌گری والدین",
        "تخصص در تغذیه سالم",
      ],
      postsCount: 38,
    },
    {
      id: "3",
      name: "دکت�� علی موسوی",
      title: "روان‌شناس نوجوانان",
      specialty: ["نوجوانی", "مشکلات یادگیری", "اضطراب"],
      bio: "متخصص در مسائل روحی و روانی نوجوانان",
      rating: 4.7,
      reviews: 198,
      avatar: "👨‍💼",
      badge: "تایید شده",
      consultationPrice: "۲۸۰,۰۰۰ تومان",
      responseTime: "معمولاً ۳ ساعت",
      experience: "۱۳+ سال",
      qualifications: [
        "دکتری روان‌شناسی",
        "متخصص در سن نوجوانی",
        "مدرک تحصیلی از دانشگاه شریف",
      ],
      postsCount: 35,
    },
    {
      id: "4",
      name: "خانم فاطمه رحمانی",
      title: "مربی رفتاری",
      specialty: ["کنترل خشم", "نظم و انضباط", "رفتار"],
      bio: "متخصص در اصلاح رفتار و آموزش والدین",
      rating: 4.9,
      reviews: 312,
      avatar: "👩‍🏫",
      badge: "تایید شده",
      consultationPrice: "۲۰۰,۰۰۰ تومان",
      responseTime: "معمولاً ۱ ساعت",
      experience: "۱۱+ سال",
      qualifications: [
        "مدرک تربیت‌شناسی",
        "تخصص در مدیریت رفتار",
        "دوره‌های بین‌المللی",
      ],
      postsCount: 51,
    },
    {
      id: "5",
      name: "دکتر سحر کامرانی",
      title: "متخصص رشد و تحول",
      specialty: ["رشد ذهنی", "یادگیری", "خلاقیت"],
      bio: "متخصص در تحریک رشد شناختی و ذهنی کودکان",
      rating: 4.8,
      reviews: 224,
      avatar: "👩‍💻",
      badge: "تایید شده",
      consultationPrice: "۲۲۰,۰۰۰ تومان",
      responseTime: "معمولاً ۲ ساعت",
      experience: "۱۴+ سال",
      qualifications: [
        "دکتری روان‌شناسی تربیتی",
        "متخصص در یادگیری",
        "نویسنده و محقق",
      ],
      postsCount: 47,
    },
    {
      id: "6",
      name: "خانم حدیثه صحافی",
      title: "مشاور خانوادگی",
      specialty: ["روابط خانوادگی", "ارتباط والد-فرزند", "سازگاری"],
      bio: "متخصص در بهبود روابط خانوادگی و فرهنگ دارابخش",
      rating: 4.7,
      reviews: 189,
      avatar: "👩",
      badge: "تایید شده",
      consultationPrice: "۲۳۰,۰۰۰ تومان",
      responseTime: "معمولاً ۱.۵ ساعت",
      experience: "۱۰+ سال",
      qualifications: [
        "مدرک مشاوره خانوادگی",
        "تخصص در روابط انسانی",
        "دوره‌های آموزشی متعدد",
      ],
      postsCount: 43,
    },
  ];

  useEffect(() => {
    const registeredExperts = JSON.parse(localStorage.getItem("expertProfiles") || "[]");
    const convertedExperts = registeredExperts.map((expert: Expert) => ({
      id: expert.id,
      name: `${expert.firstName || ""} ${expert.lastName || ""}`.trim(),
      title: expert.userType || expert.specialtyTitle || "",
      specialty: expert.specialtyTitle ? [expert.specialtyTitle] : [],
      bio: expert.bio || "",
      rating: 4.5,
      reviews: 0,
      avatar: expert.profilePhoto || (expert.gender === "زن" ? "👩‍⚕️" : "👨‍⚕️"),
      badge: "ثبت‌شده",
      consultationPrice: "تماس برای قیمت",
      responseTime: "معمولاً 2 ساعت",
      experience: `${expert.yearsOfExperience || 0} سال تجربه`,
      qualifications: [
        expert.specialtyTitle || "",
        expert.university || "",
        expert.degree || "",
      ].filter(Boolean),
      postsCount: 0,
    }));

    setAllExperts([...staticExperts, ...convertedExperts]);
  }, []);

  const experts = allExperts.length > 0 ? allExperts : staticExperts;
  const specialties = ["all", "رفتار", "اضطراب", "تغذیه", "نوجوانی", "یادگیری"];

  const filteredExperts = experts.filter((expert) => {
    const matchesSearch =
      expert.name.includes(searchQuery) ||
      expert.title.includes(searchQuery) ||
      expert.specialty.some((s) => s.includes(searchQuery));

    const matchesSpecialty =
      filterSpecialty === "all" ||
      expert.specialty.includes(filterSpecialty);

    return matchesSearch && matchesSpecialty;
  });

  const currentExpert = selectedExpert
    ? experts.find((e) => e.id === selectedExpert)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-background to-teal-50 pb-8">
      <Header title="بخش کارشناسان" showBackButton={true} showNotifications={true} showSettings={true} />

      {/* Subtitle */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <p className="text-slate-600 text-sm mb-4">
            دسترسی به متخصصان معتبر برای راهنمایی حرفه‌ای
          </p>

          {/* Search and Filter */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="جستجو در نام، تخصص یا نام کارشناس..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary text-right"
            />

            <div className="flex gap-2 overflow-x-auto pb-2">
              {specialties.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => setFilterSpecialty(specialty)}
                  className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${
                    filterSpecialty === specialty
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-100 text-slate-700 hover:bg-gray-200"
                  }`}
                >
                  {specialty === "all" ? "همه" : specialty}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Experts List */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-slate-800 mb-4">
              {filteredExperts.length} کارشناس
            </h2>

            <div className="space-y-4">
              {filteredExperts.map((expert) => (
                <div
                  key={expert.id}
                  onClick={() => setSelectedExpert(expert.id)}
                  className={`bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all cursor-pointer border-l-4 ${
                    selectedExpert === expert.id
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                >
                  <div className="flex gap-4">
                    <div className="text-5xl flex-shrink-0">{expert.avatar}</div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-slate-800">
                          {expert.name}
                        </h3>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">
                          {expert.badge}
                        </span>
                      </div>

                      <p className="text-primary font-semibold text-sm mb-2">
                        {expert.title}
                      </p>

                      <p className="text-slate-600 text-sm mb-3">
                        {expert.bio}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {expert.specialty.map((spec) => (
                          <span
                            key={spec}
                            className="px-3 py-1 bg-accent/20 text-accent-foreground rounded-full text-xs font-semibold"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <div>
                          <p className="text-slate-600">امتیاز</p>
                          <p className="font-bold text-slate-800">
                            ⭐ {expert.rating} ({expert.reviews})
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-600">پست‌ها</p>
                          <p className="font-bold text-slate-800">
                            📝 {expert.postsCount}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-600">تجربه</p>
                          <p className="font-bold text-slate-800">
                            {expert.experience}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expert Detail */}
          {currentExpert && (
            <div className="bg-white rounded-2xl p-6 shadow-md h-fit sticky top-8">
              <div className="text-center mb-6">
                <div className="text-6xl mb-3">{currentExpert.avatar}</div>
                <h2 className="text-xl font-bold text-slate-800 mb-1">
                  {currentExpert.name}
                </h2>
                <p className="text-primary font-semibold mb-3">
                  {currentExpert.title}
                </p>

                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < Math.floor(currentExpert.rating) ? "text-yellow-400" : "text-gray-300"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  {currentExpert.rating} از {currentExpert.reviews} نظر
                </p>
              </div>

              {/* Info Cards */}
              <div className="space-y-3 mb-6">
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-3">
                  <p className="text-xs text-slate-600 mb-1">مشاوره</p>
                  <p className="font-bold text-slate-800">
                    {currentExpert.consultationPrice}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-3">
                  <p className="text-xs text-slate-600 mb-1">زمان پاسخ</p>
                  <p className="font-bold text-slate-800">
                    {currentExpert.responseTime}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-3">
                  <p className="text-xs text-slate-600 mb-1">تجربه</p>
                  <p className="font-bold text-slate-800">
                    {currentExpert.experience}
                  </p>
                </div>
              </div>

              {/* Qualifications */}
              <div className="mb-6">
                <h3 className="font-bold text-slate-800 mb-3">مدارک و صلاحیت‌ها</h3>
                <ul className="space-y-2">
                  {currentExpert.qualifications.map((qual, idx) => (
                    <li key={idx} className="flex gap-2 text-sm text-slate-700">
                      <span className="text-primary font-bold">✓</span>
                      <span>{qual}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setContactType("question");
                    setShowContactModal(true);
                  }}
                  className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
                >
                  💬 ارسال پرسش
                </button>
                <button
                  onClick={() => {
                    setContactType("session");
                    setShowContactModal(true);
                  }}
                  className="w-full py-3 bg-accent text-accent-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity"
                >
                  📅 درخواست جلسه
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && currentExpert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              {contactType === "question"
                ? "ارسال پرسش به کارشناس"
                : "درخواست جلسه مشاوره"}
            </h2>
            <p className="text-slate-600 mb-6">
              {currentExpert.name} - {currentExpert.title}
            </p>

            <form className="space-y-4">
              {contactType === "question" ? (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      موضوع پرسش
                    </label>
                    <input
                      type="text"
                      placeholder="مثلاً: مشکل خواب کودکم"
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-right"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      متن پرسش
                    </label>
                    <textarea
                      placeholder="پرسش تفصیلی خود را بنویسید..."
                      rows={4}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-right resize-none"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      تاریخ ترجیحی
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-right"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      موضوع جلسه
                    </label>
                    <input
                      type="text"
                      placeholder="درباره چه موضوعی می‌خواهید مشاوره بگیرید؟"
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-right"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      توضیحات
                    </label>
                    <textarea
                      placeholder="توضیحات کوتاه درباره وضعیت..."
                      rows={3}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-right resize-none"
                    />
                  </div>
                </>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  💡 کارشناس معمولاً {currentExpert.responseTime} پاسخ می‌دهد
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowContactModal(false)}
                  className="flex-1 py-2 bg-gray-200 text-slate-800 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  onClick={() => {
                    setShowContactModal(false);
                    alert(
                      contactType === "question"
                        ? "پرسش شما ارسال شد! کارشناس به زودی پاسخ خواهد داد."
                        : "درخواست جلسه شما ثبت شد! کارشناس برای تایید زمان با شما تماس می‌گیرد."
                    );
                  }}
                  className="flex-1 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  ارسال
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
