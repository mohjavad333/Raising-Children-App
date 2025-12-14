import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";

export default function ChildProfile() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const childId = searchParams.get("id");
  const [isEditMode, setIsEditMode] = useState(!!childId);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    birthDate: "",
    gender: "",
    status: "",
    interests: [] as string[],
    specialConditions: [] as string[],
    profilePhoto: null as string | null,
  });

  useEffect(() => {
    if (childId) {
      const savedChildren = JSON.parse(localStorage.getItem("childrenProfiles") || "[]");
      const childToEdit = savedChildren.find((c: { id: string }) => c.id === childId);
      if (childToEdit) {
        setFormData(childToEdit);
        setIsEditMode(true);
      } else {
        navigate("/dashboard");
      }
    }
  }, [childId, navigate]);

  const interestOptions = [
    "نقاشی",
    "موسیقی",
    "بازی‌های فکری",
    "ورزشی",
    "خواندن",
    "تناسب اندام",
  ];

  const conditionOptions = [
    "اضطراب",
    "بیش‌فعالی",
    "درون‌گرایی",
    "عدم تمایل به تعامل",
    "مشکلات خواب",
  ];

  const statusOptions = [
    "نوزاد (0-2 سال)",
    "پیش‌دبستانی (2-4 سال)",
    "دبستان (6-12 سال)",
    "نوجوان (12-18 سال)",
  ];

  const calculateAge = (birthDate: string) => {
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleConditionToggle = (condition: string) => {
    setFormData((prev) => ({
      ...prev,
      specialConditions: prev.specialConditions.includes(condition)
        ? prev.specialConditions.filter((c) => c !== condition)
        : [...prev.specialConditions, condition],
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          profilePhoto: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Get existing children profiles
    const existingChildren = JSON.parse(localStorage.getItem("childrenProfiles") || "[]");

    if (isEditMode && formData.id) {
      // Update existing child
      const updatedChildren = existingChildren.map((c: { id: string }) =>
        c.id === formData.id
          ? {
              ...formData,
              age: calculateAge(formData.birthDate),
            }
          : c
      );
      localStorage.setItem("childrenProfiles", JSON.stringify(updatedChildren));
      localStorage.setItem("childProfile", JSON.stringify({
        ...formData,
        age: calculateAge(formData.birthDate),
      }));
    } else {
      // Create new child
      const childData = {
        id: `child-${Date.now()}`,
        ...formData,
        age: calculateAge(formData.birthDate),
      };
      existingChildren.push(childData);
      localStorage.setItem("childrenProfiles", JSON.stringify(existingChildren));
      localStorage.setItem("childProfile", JSON.stringify(childData));
    }

    navigate("/dashboard");
  };

  const handleDelete = () => {
    if (!formData.id) return;

    const existingChildren = JSON.parse(localStorage.getItem("childrenProfiles") || "[]");
    const updatedChildren = existingChildren.filter((c: { id: string }) => c.id !== formData.id);
    localStorage.setItem("childrenProfiles", JSON.stringify(updatedChildren));

    // Clear current child profile if it's the one being deleted
    const currentProfile = JSON.parse(localStorage.getItem("childProfile") || "null");
    if (currentProfile?.id === formData.id) {
      localStorage.removeItem("childProfile");
    }

    navigate("/dashboard");
  };

  const isFormValid =
    formData.name.trim() &&
    formData.birthDate &&
    formData.gender &&
    formData.status;

  const age = calculateAge(formData.birthDate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-background to-teal-50 pb-8">
      <Header title={isEditMode ? "ویرایش کودک" : "تعریف کودک"} showBackButton={true} showNotifications={false} showSettings={false} />

      <div className="max-w-2xl mx-auto px-4 mt-8">

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Photo */}
            <div className="flex justify-center mb-8">
              <label className="cursor-pointer group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
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

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                نام کودک
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="نام کودک را وارد کنید"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary text-right"
              />
            </div>

            {/* Birth Date */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                تاریخ تولد {age > 0 && `(سن: ${age} سال)`}
              </label>
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => handleInputChange("birthDate", e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary text-right"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                جنسیت
              </label>
              <div className="flex gap-4">
                {["دختر", "پسر"].map((option) => (
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

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                وضعیت فعلی
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary text-right"
              >
                <option value="">انتخاب کنید...</option>
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Interests */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                علایق کودک
              </label>
              <div className="grid grid-cols-2 gap-3">
                {interestOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleInterestToggle(option)}
                    className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                      formData.interests.includes(option)
                        ? "bg-accent text-accent-foreground shadow-md"
                        : "bg-gray-100 text-slate-700 hover:bg-gray-200"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Special Conditions */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                وضعیت خاص (اختیاری)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {conditionOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleConditionToggle(option)}
                    className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                      formData.specialConditions.includes(option)
                        ? "bg-secondary text-white shadow-md"
                        : "bg-gray-100 text-slate-700 hover:bg-gray-200"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8">
              <button
                type="submit"
                disabled={!isFormValid}
                className="flex-1 py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isEditMode ? "ذخیره تغییرات" : "ایجاد داشبورد کودک"}
              </button>
              {isEditMode && (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-4 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors"
                  title="حذف کودک"
                >
                  🗑️
                </button>
              )}
            </div>

            {!isEditMode && (
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="w-full py-3 text-primary font-semibold hover:underline"
              >
                رفتن به داشبورد
              </button>
            )}
          </form>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                حذف کودک
              </h2>
              <p className="text-slate-600 mb-6">
                آیا مطمئن هستید که می‌خواهید "{formData.name}" را حذف کنید؟
                <br />
                <span className="text-red-500 font-semibold text-sm">
                  این عمل برگشت‌ناپذیر است و تمام اطلاعات حذف خواهند شد.
                </span>
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 py-3 bg-gray-200 text-slate-800 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  انصراف
                </button>
                <button
                  onClick={() => {
                    handleDelete();
                    setShowDeleteConfirm(false);
                  }}
                  className="flex-1 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors"
                >
                  حذف
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
