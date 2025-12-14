import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";

interface ExpertData {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
  profilePhoto: string | null;
  identificationNumber: string;
  mobileNumber: string;
  email: string;
  clinicNumber: string;
  workAddress: string;
  linkedinUrl: string;
  researchgateUrl: string;
  userType: string;
  specialtyTitle: string;
  bio: string;
  university: string;
  degree: string;
  certifications: string;
  medicalLicenseNumber: string;
  documentPhoto: string | null;
  yearsOfExperience: string;
  workplaces: string;
  clinicalSpecialties: string;
  skills: string;
  workingDays: string[];
  workStartTime: string;
  workEndTime: string;
  breakStartTime: string;
  breakEndTime: string;
  slotDuration: string;
  holidays: string;
  videoCall: boolean;
  voiceCall: boolean;
  chat: boolean;
  createdAt: string;
}

export default function ExpertDashboard() {
  const navigate = useNavigate();
  const [expert, setExpert] = useState<ExpertData | null>(null);
  const [showSessionModal, setShowSessionModal] = useState(false);

  useEffect(() => {
    const currentExpert = localStorage.getItem("currentExpert");
    if (currentExpert) {
      try {
        setExpert(JSON.parse(currentExpert));
      } catch (error) {
        navigate("/expert-profile");
      }
    } else {
      navigate("/expert-profile");
    }
  }, [navigate]);

  if (!expert) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        در حال بارگذاری...
      </div>
    );
  }

  const stats = [
    {
      label: "کل پذیرش‌ها",
      value: "۰",
      icon: "👥",
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "امتیاز",
      value: "۰",
      icon: "⭐",
      color: "from-yellow-500 to-orange-500",
    },
    {
      label: "ساعات کاری",
      value: expert.workingDays.length,
      icon: "📅",
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "ویزیت‌های آنلاین",
      value: "۰",
      icon: "📱",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const telemedicineOptions = [
    { key: "videoCall", label: "📹 تماس تصویری", active: expert.videoCall },
    { key: "voiceCall", label: "☎️ تماس صوتی", active: expert.voiceCall },
    { key: "chat", label: "💬 چت", active: expert.chat },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-purple-50 pb-8">
      <Header
        showBackButton={false}
        showNotifications={true}
        showSettings={true}
      />

      {/* Profile Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-start gap-6">
            {/* Profile Photo */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex-shrink-0 overflow-hidden border-4 border-primary/20">
              {expert.profilePhoto ? (
                <img
                  src={expert.profilePhoto}
                  alt={expert.firstName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl">
                  {expert.firstName.charAt(0)}
                  {expert.lastName.charAt(0)}
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-slate-800">
                  {expert.firstName} {expert.lastName}
                </h1>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                  ✓ تایید شده
                </span>
              </div>
              <p className="text-lg text-slate-600 mb-1">{expert.userType}</p>
              <p className="text-slate-600 mb-3">{expert.specialtyTitle}</p>
              <p className="text-sm text-slate-600 max-w-md">{expert.bio}</p>
            </div>

            {/* Action Button */}
            <Link
              to="/expert-profile"
              className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
              ✏️ ویرایش پروفایل
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        {/* Statistics Cards */}
        <h2 className="text-2xl font-bold text-slate-800 mb-4">آمار و تحلیل</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white shadow-md`}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className="text-sm opacity-90 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              📞 اطلاعات تماس
            </h3>
            <div className="space-y-3 text-right">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">ایمیل:</span>
                <span className="font-semibold text-slate-800">
                  {expert.email}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">موبایل:</span>
                <span className="font-semibold text-slate-800">
                  {expert.mobileNumber}
                </span>
              </div>
              {expert.clinicNumber && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">مطب:</span>
                  <span className="font-semibold text-slate-800">
                    {expert.clinicNumber}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-slate-600">آدرس:</span>
                <span className="font-semibold text-slate-800 text-left max-w-xs">
                  {expert.workAddress}
                </span>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              🏫 اطلاعات تحصیلی
            </h3>
            <div className="space-y-3 text-right">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">دانشگاه:</span>
                <span className="font-semibold text-slate-800">
                  {expert.university}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">مدرک:</span>
                <span className="font-semibold text-slate-800">
                  {expert.degree}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">تجربه:</span>
                <span className="font-semibold text-slate-800">
                  {expert.yearsOfExperience} سال
                </span>
              </div>
              {expert.medicalLicenseNumber && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">شماره نظام:</span>
                  <span className="font-semibold text-slate-800">
                    {expert.medicalLicenseNumber}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Schedule Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              ⏰ ساعات کاری
            </h3>
            <div className="space-y-3 text-right">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">ساعت کار:</span>
                <span className="font-semibold text-slate-800">
                  {expert.workStartTime} - {expert.workEndTime}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">استراحت:</span>
                <span className="font-semibold text-slate-800">
                  {expert.breakStartTime} - {expert.breakEndTime}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">مدت نوبت:</span>
                <span className="font-semibold text-slate-800">
                  {expert.slotDuration} دقیقه
                </span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-slate-800 mb-3 text-sm">
                روزهای حضور
              </h4>
              <div className="flex flex-wrap gap-2 justify-end">
                {expert.workingDays.map((day) => (
                  <span
                    key={day}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold"
                  >
                    {day}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Telemedicine Information */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              📱 ویزیت آنلاین
            </h3>
            <div className="space-y-3">
              {telemedicineOptions.map((option) => (
                <div
                  key={option.key}
                  className={`px-4 py-3 rounded-lg text-right font-semibold ${
                    option.active
                      ? "bg-green-100 text-green-800 border-2 border-green-300"
                      : "bg-gray-100 text-slate-500 border-2 border-gray-200 line-through"
                  }`}
                >
                  {option.label} {option.active && "✓"}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills and Specialties */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-8">
          <h3 className="text-lg font-bold text-slate-800 mb-4">
            💼 مهارت‌ها و تخصص‌ها
          </h3>
          <div className="space-y-4 text-right">
            {expert.clinicalSpecialties && (
              <div>
                <h4 className="font-semibold text-slate-700 mb-2">
                  تخصص‌های کلینیکی:
                </h4>
                <p className="text-slate-600 whitespace-pre-wrap">
                  {expert.clinicalSpecialties}
                </p>
              </div>
            )}
            {expert.skills && (
              <div>
                <h4 className="font-semibold text-slate-700 mb-2">
                  مهارت‌های خاص:
                </h4>
                <p className="text-slate-600 whitespace-pre-wrap">
                  {expert.skills}
                </p>
              </div>
            )}
            {expert.workplaces && (
              <div>
                <h4 className="font-semibold text-slate-700 mb-2">
                  محل‌های کاری:
                </h4>
                <p className="text-slate-600 whitespace-pre-wrap">
                  {expert.workplaces}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Social Links */}
        {(expert.linkedinUrl || expert.researchgateUrl) && (
          <div className="bg-white rounded-2xl p-6 shadow-md mb-8">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              🔗 شبکه‌های اجتماعی
            </h3>
            <div className="flex gap-4 justify-end">
              {expert.linkedinUrl && (
                <a
                  href={expert.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-semibold hover:bg-blue-200 transition-colors"
                >
                  💼 LinkedIn
                </a>
              )}
              {expert.researchgateUrl && (
                <a
                  href={expert.researchgateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-semibold hover:bg-green-200 transition-colors"
                >
                  📊 ResearchGate
                </a>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setShowSessionModal(true)}
            className="bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all"
          >
            <h3 className="text-lg font-bold mb-2">📝 شروع جلسه جدید</h3>
            <p className="text-sm opacity-90 mb-3">ثبت جلسه مشاوره</p>
            <span className="font-semibold">ایجاد ←</span>
          </button>

          <Link
            to="/experts"
            className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all"
          >
            <h3 className="text-lg font-bold mb-2">👥 بخش کارشناسان</h3>
            <p className="text-sm opacity-90 mb-3">نمایش در لیست کارشناسان</p>
            <span className="font-semibold">مشاهده ←</span>
          </Link>

          <Link
            to="/dashboard"
            className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all"
          >
            <h3 className="text-lg font-bold mb-2">🏠 بازگشت به داشبورد</h3>
            <p className="text-sm opacity-90 mb-3">صفحه اصلی والدین</p>
            <span className="font-semibold">رفتن ←</span>
          </Link>
        </div>
      </div>

      {/* Session Modal */}
      {showSessionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              📝 جلسه جدید
            </h2>
            <p className="text-slate-600 mb-6">
              این قابلیت به‌زودی فعال خواهد شد.
            </p>
            <button
              onClick={() => setShowSessionModal(false)}
              className="w-full py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              بستن
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
