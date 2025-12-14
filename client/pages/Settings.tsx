import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

interface SettingsState {
  phoneNumber: string;
  email: string;
  notifications: {
    reminders: boolean;
    achievements: boolean;
    reports: boolean;
    community: boolean;
  };
  privacy: {
    profilePublic: boolean;
    showActivity: boolean;
    allowMessages: boolean;
  };
}

type ModalType = "phone" | "password" | "email" | "delete" | null;

export default function Settings() {
  const [activeTab, setActiveTab] = useState<"general" | "privacy" | "security">("general");
  const [settings, setSettings] = useState<SettingsState>({
    phoneNumber: "09121234567",
    email: "parent@example.com",
    notifications: {
      reminders: true,
      achievements: true,
      reports: true,
      community: false,
    },
    privacy: {
      profilePublic: false,
      showActivity: true,
      allowMessages: true,
    },
  });

  const [showModal, setShowModal] = useState<ModalType>(null);
  const [verificationStep, setVerificationStep] = useState<"phone" | "otp" | "confirm">("phone");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState("");

  const handleChangePhone = () => {
    if (verificationStep === "phone") {
      if (!newPhoneNumber.trim()) return;
      setVerificationStep("otp");
    } else if (verificationStep === "otp") {
      if (otpCode.length !== 6) return;
      setVerificationStep("confirm");
    } else if (verificationStep === "confirm") {
      setSettings((prev) => ({
        ...prev,
        phoneNumber: newPhoneNumber,
      }));
      setShowModal(null);
      setVerificationStep("phone");
      setNewPhoneNumber("");
      setOtpCode("");
      alert("شماره موبایل شما با موفقیت تغییر یافت!");
    }
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("لطفاً تمام فیلدها را پر کنید");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("رمز عبور جدید و تایید آن یکسان نیستند");
      return;
    }
    if (newPassword.length < 8) {
      alert("رمز عبور باید حداقل ۸ کاراکتر باشد");
      return;
    }
    setShowModal(null);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    alert("رمز عبور شما با موفقیت تغییر یافت!");
  };

  const handleDeleteAccount = () => {
    if (deleteConfirm !== "delete") {
      alert('لطفاً "delete" را بنویسید');
      return;
    }
    alert("حساب شما حذف شد. در حال ریدایرکت...");
    // In real app, would redirect to home
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-background to-teal-50 pb-8">
      <Header title="تنظیمات و امنیت" showBackButton={true} showNotifications={false} showSettings={false} />

      {/* Subtitle */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <p className="text-slate-600 text-sm">مدیریت حساب، رمز عبور و حریم خصوصی</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-md h-fit sticky top-8">
              <div className="space-y-2">
                {[
                  { id: "general", label: "عمومی", icon: "⚙️" },
                  { id: "privacy", label: "حریم خصوصی", icon: "🔒" },
                  { id: "security", label: "امنیت", icon: "🛡️" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full text-right py-3 px-4 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                      activeTab === tab.id
                        ? "bg-primary text-white shadow-md"
                        : "bg-gray-100 text-slate-700 hover:bg-gray-200"
                    }`}
                  >
                    <span>{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* General Settings */}
            {activeTab === "general" && (
              <div className="space-y-4">
                {/* Phone Number */}
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">
                        📱 شماره موبایل
                      </h3>
                      <p className="text-slate-600 text-sm">
                        شماره موبایل ثبت شده برای حساب شما
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <button
                      onClick={() => {
                        setShowModal("phone");
                        setVerificationStep("phone");
                      }}
                      className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                    >
                      تغییر شماره
                    </button>
                    <span className="text-slate-800 font-semibold">
                      {settings.phoneNumber}
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">
                        📧 آدرس ایمیل
                      </h3>
                      <p className="text-slate-600 text-sm">
                        ایمیل ثبت شده برای حساب شما
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <button
                      onClick={() => setShowModal("email")}
                      className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                    >
                      تغییر ایمیل
                    </button>
                    <span className="text-slate-800 font-semibold">
                      {settings.email}
                    </span>
                  </div>
                </div>

                {/* Notification Settings */}
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">
                    🔔 اعلان‌ها
                  </h3>
                  <div className="space-y-3">
                    {[
                      { key: "reminders", label: "یادآوری‌ها" },
                      { key: "achievements", label: "موفقیت‌ها" },
                      { key: "reports", label: "گزارش‌های ماهانه" },
                      { key: "community", label: "فعالیت‌های جامعه" },
                    ].map((notif) => (
                      <label
                        key={notif.key}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={settings.notifications[notif.key as any]}
                          onChange={(e) =>
                            setSettings((prev) => ({
                              ...prev,
                              notifications: {
                                ...prev.notifications,
                                [notif.key]: e.target.checked,
                              },
                            }))
                          }
                          className="w-5 h-5 rounded accent-primary"
                        />
                        <span className="font-semibold text-slate-700">
                          {notif.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            {activeTab === "privacy" && (
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">
                    🔒 تنظیمات حریم خصوصی
                  </h3>
                  <div className="space-y-4">
                    <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                      <input
                        type="checkbox"
                        checked={settings.privacy.profilePublic}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            privacy: {
                              ...prev.privacy,
                              profilePublic: e.target.checked,
                            },
                          }))
                        }
                        className="w-5 h-5 rounded accent-primary"
                      />
                      <div className="text-right">
                        <p className="font-semibold text-slate-800">
                          پروفایل عمومی
                        </p>
                        <p className="text-sm text-slate-600">
                          دیگران می‌توانند پروفایل شما را ببینند
                        </p>
                      </div>
                    </label>

                    <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                      <input
                        type="checkbox"
                        checked={settings.privacy.showActivity}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            privacy: {
                              ...prev.privacy,
                              showActivity: e.target.checked,
                            },
                          }))
                        }
                        className="w-5 h-5 rounded accent-primary"
                      />
                      <div className="text-right">
                        <p className="font-semibold text-slate-800">
                          نمایش فعالیت
                        </p>
                        <p className="text-sm text-slate-600">
                          دیگران می‌توانند فعالیت شما را در جامعه ببینند
                        </p>
                      </div>
                    </label>

                    <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                      <input
                        type="checkbox"
                        checked={settings.privacy.allowMessages}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            privacy: {
                              ...prev.privacy,
                              allowMessages: e.target.checked,
                            },
                          }))
                        }
                        className="w-5 h-5 rounded accent-primary"
                      />
                      <div className="text-right">
                        <p className="font-semibold text-slate-800">
                          اجازه پیام
                        </p>
                        <p className="text-sm text-slate-600">
                          دیگران می‌توانند به شما پیام بفرستند
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                  <h4 className="font-bold text-blue-900 mb-2">📋 سیاست حفظ حریم خصوصی</h4>
                  <p className="text-sm text-blue-800 leading-relaxed mb-4">
                    اطلاعات شما محرمانه و امن است. ما هرگز اطلاعات شخصی شما را با سوم‌فروش به اشتراک نمی‌گذاریم. برای اطلاعات بیشتر، سیاست حفظ حریم خصوصی ما را بخوانید.
                  </p>
                  <button className="text-blue-900 font-semibold hover:underline">
                    خواندن سیاست کامل ←
                  </button>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <div className="space-y-4">
                {/* Password */}
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">
                        🔐 رمز عبور
                      </h3>
                      <p className="text-slate-600 text-sm">
                        تغییر رمز عبور حساب شما
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowModal("password")}
                    className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                    تغییر رمز عبور
                  </button>
                </div>

                {/* Two-Factor Auth */}
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">
                        🔑 احراز هویت دو مرحله‌ای
                      </h3>
                      <p className="text-slate-600 text-sm">
                        افزایش امنیت حساب شما
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <span className="text-green-700 font-semibold">
                      ✓ فعال
                    </span>
                  </div>
                </div>

                {/* Sessions */}
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">
                    📍 جلسات فعال
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <button className="text-red-600 font-semibold hover:underline">
                        خروج
                      </button>
                      <div>
                        <p className="font-semibold text-slate-800">
                          🖥️ Chrome on Windows
                        </p>
                        <p className="text-sm text-slate-600">
                          آخرین فعالیت: امروز
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <button className="text-red-600 font-semibold hover:underline">
                        خروج
                      </button>
                      <div>
                        <p className="font-semibold text-slate-800">
                          📱 Safari on iPhone
                        </p>
                        <p className="text-sm text-slate-600">
                          آخرین فعالیت: ۲ روز پیش
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delete Account */}
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">
                    ⚠️ حذف حساب
                  </h3>
                  <p className="text-sm text-red-800 mb-4">
                    این عمل غیرقابل بازگشت است. تمام اطلاعات شما حذف خواهد شد.
                  </p>
                  <button
                    onClick={() => setShowModal("delete")}
                    className="w-full py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    حذف حساب
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}

      {/* Change Phone Modal */}
      {showModal === "phone" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              {verificationStep === "phone"
                ? "تغییر شماره موبایل"
                : verificationStep === "otp"
                ? "تایید کد"
                : "تایید نهایی"}
            </h2>

            {verificationStep === "phone" && (
              <div className="space-y-4">
                <p className="text-slate-600">
                  شماره موبایل جدید خود را وارد کنید
                </p>
                <input
                  type="tel"
                  placeholder="09121234567"
                  value={newPhoneNumber}
                  onChange={(e) => setNewPhoneNumber(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-right"
                />
              </div>
            )}

            {verificationStep === "otp" && (
              <div className="space-y-4">
                <p className="text-slate-600">
                  کد تأیید ارسال شده به {newPhoneNumber} را وارد کنید
                </p>
                <input
                  type="text"
                  placeholder="000000"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.slice(0, 6))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-center text-2xl tracking-widest font-mono"
                  maxLength={6}
                />
              </div>
            )}

            {verificationStep === "confirm" && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800">
                    ✓ کد تأیید با موفقیت تایید شد
                  </p>
                </div>
                <p className="text-slate-600">
                  شماره موبایل شما به {newPhoneNumber} تغییر خواهد یافت
                </p>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(null)}
                className="flex-1 py-2 bg-gray-200 text-slate-800 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                انصراف
              </button>
              <button
                onClick={handleChangePhone}
                className="flex-1 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                {verificationStep === "confirm" ? "تأیید و تغییر" : "ادامه"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showModal === "password" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              تغییر رمز عبور
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  رمز عبور فعلی
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-right"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  رمز عبور جدید
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-right"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  تایید رمز عبور
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-right"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(null)}
                className="flex-1 py-2 bg-gray-200 text-slate-800 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                انصراف
              </button>
              <button
                onClick={handleChangePassword}
                className="flex-1 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                تغییر رمز
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showModal === "delete" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              حذف حساب
            </h2>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-red-900">
                ⚠️ این عمل غیرقابل بازگشت است. تمام اطلاعات و تنظیمات شما حذف خواهد شد.
              </p>
            </div>

            <p className="text-slate-600 mb-4">
              برای تأیید، لطفاً "delete" را بنویسید:
            </p>

            <input
              type="text"
              placeholder="delete"
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-600 text-right mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowModal(null);
                  setDeleteConfirm("");
                }}
                className="flex-1 py-2 bg-gray-200 text-slate-800 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                انصراف
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteConfirm !== "delete"}
                className="flex-1 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                حذف حساب
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
