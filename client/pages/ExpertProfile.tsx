import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

interface ExpertFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
  profilePhoto: string | null;
  identificationNumber: string;

  // Contact Information
  mobileNumber: string;
  email: string;
  clinicNumber: string;
  workAddress: string;
  linkedinUrl: string;
  researchgateUrl: string;

  // Role & Professional Info
  userType: string;
  specialtyTitle: string;
  bio: string;

  // Education & Certifications
  university: string;
  degree: string;
  certifications: string;
  medicalLicenseNumber: string;
  documentPhoto: string | null;

  // Work Experience
  yearsOfExperience: string;
  workplaces: string;
  clinicalSpecialties: string;
  skills: string;

  // Schedule Settings
  workingDays: string[];
  workStartTime: string;
  workEndTime: string;
  breakStartTime: string;
  breakEndTime: string;
  slotDuration: string;
  holidays: string;

  // Telemedicine
  videoCall: boolean;
  voiceCall: boolean;
  chat: boolean;
}

export default function ExpertProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ExpertFormData>({
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: "",
    profilePhoto: null,
    identificationNumber: "",
    mobileNumber: "",
    email: "",
    clinicNumber: "",
    workAddress: "",
    linkedinUrl: "",
    researchgateUrl: "",
    userType: "",
    specialtyTitle: "",
    bio: "",
    university: "",
    degree: "",
    certifications: "",
    medicalLicenseNumber: "",
    documentPhoto: null,
    yearsOfExperience: "",
    workplaces: "",
    clinicalSpecialties: "",
    skills: "",
    workingDays: [],
    workStartTime: "08:00",
    workEndTime: "17:00",
    breakStartTime: "12:00",
    breakEndTime: "13:00",
    slotDuration: "15",
    holidays: "",
    videoCall: false,
    voiceCall: false,
    chat: false,
  });

  const [currentSection, setCurrentSection] = useState(0);

  const userTypes = ["پزشک عمومی", "پزشک متخصص", "پرستار", "روانشناس", "کارشناس تغذیه"];
  const degrees = ["MD", "DDS", "کارشناسی ارشد", "PhD", "دوره‌های تکمیلی"];
  const days = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه"];

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, field: "profilePhoto" | "documentPhoto") => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          [field]: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWorkingDayToggle = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      workingDays: prev.workingDays.includes(day)
        ? prev.workingDays.filter((d) => d !== day)
        : [...prev.workingDays, day],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const expertData = {
      id: `expert-${Date.now()}`,
      ...formData,
      createdAt: new Date().toISOString(),
    };
    
    const existingExperts = JSON.parse(localStorage.getItem("expertProfiles") || "[]");
    existingExperts.push(expertData);
    localStorage.setItem("expertProfiles", JSON.stringify(existingExperts));
    localStorage.setItem("currentExpert", JSON.stringify(expertData));
    
    navigate("/expert-dashboard");
  };

  const sections = [
    {
      title: "اطلاعات شخصی",
      icon: "👤",
      fields: [
        { label: "نام", key: "firstName", type: "text" },
        { label: "نام خانوادگی", key: "lastName", type: "text" },
        { label: "جنسیت", key: "gender", type: "select", options: ["مرد", "زن"] },
        { label: "تاریخ تولد", key: "birthDate", type: "date" },
        { label: "کد/شماره شناسایی", key: "identificationNumber", type: "text" },
      ],
    },
    {
      title: "اطلاعات تماس",
      icon: "📞",
      fields: [
        { label: "شماره موبایل", key: "mobileNumber", type: "tel" },
        { label: "ایمیل", key: "email", type: "email" },
        { label: "شماره تماس مطب (اختیاری)", key: "clinicNumber", type: "tel" },
        { label: "آدرس محل کار", key: "workAddress", type: "textarea" },
        { label: "LinkedIn", key: "linkedinUrl", type: "url" },
        { label: "ResearchGate", key: "researchgateUrl", type: "url" },
      ],
    },
    {
      title: "رول و تخصص",
      icon: "🏥",
      fields: [
        { label: "نوع کاربر", key: "userType", type: "select", options: userTypes },
        { label: "عنوان تخصص", key: "specialtyTitle", type: "text" },
        { label: "بیو حرفه‌ای", key: "bio", type: "textarea" },
      ],
    },
    {
      title: "اطلاعات تحصیلی",
      icon: "🎓",
      fields: [
        { label: "دانشگاه محل تحصیل", key: "university", type: "text" },
        { label: "مدرک", key: "degree", type: "select", options: degrees },
        { label: "گواهی‌نامه‌های معتبر", key: "certifications", type: "textarea" },
        { label: "شماره نظام پزشکی", key: "medicalLicenseNumber", type: "text" },
      ],
    },
    {
      title: "تجربه کاری",
      icon: "💼",
      fields: [
        { label: "سال‌های تجربه", key: "yearsOfExperience", type: "number" },
        { label: "محل‌های کاری فعلی و قبلی", key: "workplaces", type: "textarea" },
        { label: "تخصص‌های کلینیکی", key: "clinicalSpecialties", type: "textarea" },
        { label: "مهارت‌های خاص", key: "skills", type: "textarea" },
      ],
    },
    {
      title: "تنظیمات زمان‌بندی",
      icon: "⏰",
      custom: true,
    },
    {
      title: "تنظیمات ��یزیت آنلاین",
      icon: "📱",
      custom: true,
    },
  ];

  const isFormValid = formData.firstName && formData.lastName && formData.email && formData.mobileNumber;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-purple-50 pb-8">
      <Header title="ثبت نام کارشناسان" showBackButton={true} showNotifications={false} showSettings={false} />

      <div className="max-w-4xl mx-auto px-4 mt-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-slate-700">مرحله {currentSection + 1} از {sections.length}</p>
            <p className="text-sm text-slate-600">{Math.round(((currentSection + 1) / sections.length) * 100)}%</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-300"
              style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <form onSubmit={currentSection === sections.length - 1 ? handleSubmit : (e) => e.preventDefault()}>
            {/* Section Header */}
            <div className="mb-8 pb-6 border-b border-gray-200">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">
                {sections[currentSection].icon} {sections[currentSection].title}
              </h2>
            </div>

            {/* Personal Information Section */}
            {currentSection === 0 && (
              <div className="space-y-6">
                {/* Profile Photo */}
                <div className="flex justify-center mb-8">
                  <label className="cursor-pointer group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handlePhotoUpload(e, "profilePhoto")}
                      className="hidden"
                    />
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:opacity-80 transition-opacity border-4 border-gray-100">
                      {formData.profilePhoto ? (
                        <img
                          src={formData.profilePhoto}
                          alt="Profile"
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <svg
                          className="w-12 h-12 text-primary"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      )}
                    </div>
                  </label>
                </div>

                {sections[currentSection].fields?.map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      {field.label}
                    </label>
                    {field.type === "select" ? (
                      <select
                        value={formData[field.key as keyof ExpertFormData] as string}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary text-right"
                      >
                        <option value="">انتخاب کنید</option>
                        {field.options?.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        value={formData[field.key as keyof ExpertFormData] as string}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        placeholder={field.label}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary text-right"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Contact Information Section */}
            {currentSection === 1 && (
              <div className="space-y-6">
                {sections[currentSection].fields?.map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      {field.label}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        value={formData[field.key as keyof ExpertFormData] as string}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        placeholder={field.label}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary text-right resize-none"
                        rows={3}
                      />
                    ) : (
                      <input
                        type={field.type}
                        value={formData[field.key as keyof ExpertFormData] as string}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        placeholder={field.label}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary text-right"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Role & Professional Info Section */}
            {currentSection === 2 && (
              <div className="space-y-6">
                {sections[currentSection].fields?.map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      {field.label}
                    </label>
                    {field.type === "select" ? (
                      <select
                        value={formData[field.key as keyof ExpertFormData] as string}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary text-right"
                      >
                        <option value="">انتخاب کنید</option>
                        {field.options?.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : field.type === "textarea" ? (
                      <textarea
                        value={formData[field.key as keyof ExpertFormData] as string}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        placeholder={field.label}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary text-right resize-none"
                        rows={4}
                      />
                    ) : (
                      <input
                        type={field.type}
                        value={formData[field.key as keyof ExpertFormData] as string}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        placeholder={field.label}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary text-right"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Education Section */}
            {currentSection === 3 && (
              <div className="space-y-6">
                {sections[currentSection].fields?.map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      {field.label}
                    </label>
                    {field.type === "select" ? (
                      <select
                        value={formData[field.key as keyof ExpertFormData] as string}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary text-right"
                      >
                        <option value="">انتخاب کنید</option>
                        {field.options?.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : field.type === "textarea" ? (
                      <textarea
                        value={formData[field.key as keyof ExpertFormData] as string}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        placeholder={field.label}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary text-right resize-none"
                        rows={3}
                      />
                    ) : (
                      <input
                        type={field.type}
                        value={formData[field.key as keyof ExpertFormData] as string}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        placeholder={field.label}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary text-right"
                      />
                    )}
                  </div>
                ))}

                {/* Document Upload */}
                <div className="mt-6 p-4 border-2 border-dashed border-gray-300 rounded-xl">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept=".pdf,.jpeg,.jpg,.png"
                      onChange={(e) => handlePhotoUpload(e, "documentPhoto")}
                      className="hidden"
                    />
                    <div className="text-center">
                      <p className="text-sm font-semibold text-slate-700">📄 آپلود مدارک (PDF/JPEG)</p>
                      {formData.documentPhoto && (
                        <p className="text-sm text-green-600 mt-2">✓ فایل آپلود شد</p>
                      )}
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Work Experience Section */}
            {currentSection === 4 && (
              <div className="space-y-6">
                {sections[currentSection].fields?.map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      {field.label}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        value={formData[field.key as keyof ExpertFormData] as string}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        placeholder={field.label}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary text-right resize-none"
                        rows={4}
                      />
                    ) : (
                      <input
                        type={field.type}
                        value={formData[field.key as keyof ExpertFormData] as string}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        placeholder={field.label}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary text-right"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Schedule Settings Section */}
            {currentSection === 5 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">روزهای حضور</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {days.map((day) => (
                      <button
                        key={day}
                        onClick={() => handleWorkingDayToggle(day)}
                        type="button"
                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                          formData.workingDays.includes(day)
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-slate-700 hover:bg-gray-200"
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">ساعت شروع کار</label>
                    <input
                      type="time"
                      value={formData.workStartTime}
                      onChange={(e) => handleInputChange("workStartTime", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">ساعت پایان کار</label>
                    <input
                      type="time"
                      value={formData.workEndTime}
                      onChange={(e) => handleInputChange("workEndTime", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">ساعت شروع استراحت</label>
                    <input
                      type="time"
                      value={formData.breakStartTime}
                      onChange={(e) => handleInputChange("breakStartTime", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">ساعت پایان استراحت</label>
                    <input
                      type="time"
                      value={formData.breakEndTime}
                      onChange={(e) => handleInputChange("breakEndTime", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">مدت زمان slot نوبت</label>
                    <select
                      value={formData.slotDuration}
                      onChange={(e) => handleInputChange("slotDuration", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary text-right"
                    >
                      <option value="15">15 دقیقه</option>
                      <option value="20">20 دقیقه</option>
                      <option value="30">30 دقیقه</option>
                      <option value="45">45 دقیقه</option>
                      <option value="60">60 دقیقه</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">روزهای تعطیل</label>
                    <input
                      type="text"
                      value={formData.holidays}
                      onChange={(e) => handleInputChange("holidays", e.target.value)}
                      placeholder="مثلاً: تاسوعا، عاشورا"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary text-right"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Telemedicine Section */}
            {currentSection === 6 && (
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-xl p-4 mb-6">
                  <p className="text-slate-700 text-sm">نحوه‌های ویزیت آنلاین خود را انتخاب کنید:</p>
                </div>

                <div className="space-y-3">
                  {[
                    { key: "videoCall", label: "📹 تماس تصویری (ویدیو کال)", icon: "📹" },
                    { key: "voiceCall", label: "☎️ تماس صوتی (صوتی کال)", icon: "☎️" },
                    { key: "chat", label: "💬 چت (پیام متنی)", icon: "💬" },
                  ].map((option) => (
                    <button
                      key={option.key}
                      onClick={() => handleInputChange(option.key, !formData[option.key as keyof ExpertFormData])}
                      type="button"
                      className={`w-full px-4 py-4 rounded-xl border-2 transition-all text-right font-semibold ${
                        formData[option.key as keyof ExpertFormData]
                          ? "bg-primary text-white border-primary"
                          : "bg-white border-gray-200 text-slate-700 hover:border-primary"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-12 pt-8 border-t border-gray-200">
              <button
                onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                disabled={currentSection === 0}
                type="button"
                className="flex-1 py-3 bg-gray-200 text-slate-800 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                قبلی
              </button>
              {currentSection === sections.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  disabled={!isFormValid}
                  type="submit"
                  className="flex-1 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  تکمیل و ذخیره
                </button>
              ) : (
                <button
                  onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))}
                  type="button"
                  className="flex-1 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
                >
                  بعدی
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
