import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ParentProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    occupation: "",
    childrenCount: "1",
    purpose: [] as string[],
  });

  const purposeOptions = [
    "رشد رفتاری",
    "کنترل خشم",
    "بهبود رابطه با کودک",
    "برنامه‌ریزی تربیتی",
    "تغذیه سالم",
    "رشد ذهنی",
  ];

  const handleInputChange = (
    field: string,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePurposeToggle = (purpose: string) => {
    setFormData((prev) => ({
      ...prev,
      purpose: prev.purpose.includes(purpose)
        ? prev.purpose.filter((p) => p !== purpose)
        : [...prev.purpose, purpose],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, save the data to database
    // For now, just navigate to child profile
    navigate("/child-profile");
  };

  const isFormValid =
    formData.firstName.trim() &&
    formData.lastName.trim() &&
    formData.occupation.trim() &&
    formData.purpose.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-background to-teal-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            تنظیم پروفایل والدین
          </h1>
          <p className="text-slate-600">
            اطلاعات شخصی و هدف تربیتی خود را وارد کنید
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  نام
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="نام شما"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary text-right"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  نام خانوادگی
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="نام خانوادگی"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary text-right"
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                جنسیت (اختیاری)
              </label>
              <div className="flex gap-4">
                {["زن", "مرد"].map((option) => (
                  <label key={option} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value={option}
                      checked={formData.gender === option}
                      onChange={(e) => handleInputChange("gender", e.target.value)}
                      className="ml-2"
                    />
                    <span className="text-slate-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Occupation */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                شغل
              </label>
              <input
                type="text"
                value={formData.occupation}
                onChange={(e) => handleInputChange("occupation", e.target.value)}
                placeholder="شغل خود را وارد کنید"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary text-right"
              />
            </div>

            {/* Number of Children */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                تعداد فرزندان
              </label>
              <select
                value={formData.childrenCount}
                onChange={(e) => handleInputChange("childrenCount", e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary text-right"
              >
                {[1, 2, 3, 4, 5, "۶+"].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            {/* Purpose */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                هدف از استفاده از اپ
              </label>
              <div className="grid grid-cols-2 gap-3">
                {purposeOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handlePurposeToggle(option)}
                    className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                      formData.purpose.includes(option)
                        ? "bg-primary text-white shadow-md"
                        : "bg-gray-100 text-slate-700 hover:bg-gray-200"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid}
              className="w-full py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-8"
            >
              ادامه: تعریف کودک
            </button>

            {/* Skip for now */}
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="w-full py-3 text-primary font-semibold hover:underline"
            >
              رفتن به داشبورد
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
