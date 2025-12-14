import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

interface Task {
  id: string;
  title: string;
  description: string;
  timeSlot: string;
  period: "morning" | "noon" | "evening";
  completed: boolean;
  icon: string;
  duration: string;
  difficulty: "easy" | "medium" | "hard";
}

interface WeeklyStats {
  day: string;
  completed: number;
  total: number;
  percent: number;
}

export default function Planner() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "تمرین نقاشی",
      description: "کودک می‌تواند رنگ‌های مختلف و اشکال جدید را تجربه کند",
      timeSlot: "08:00",
      period: "morning",
      completed: false,
      icon: "🎨",
      duration: "20 دقیقه",
      difficulty: "easy",
    },
    {
      id: "2",
      title: "صرف‌نظر کردن از صفحات",
      description: "فاصله از نمایشگرهای الکترونیکی برای بهبود چشم‌ها",
      timeSlot: "10:00",
      period: "morning",
      completed: false,
      icon: "📵",
      duration: "۱۵ دقیقه",
      difficulty: "easy",
    },
    {
      id: "3",
      title: "صبحانه سالم",
      description: "میوه‌های تازه و پروتئین برای انرژی روز",
      timeSlot: "07:30",
      period: "morning",
      completed: true,
      icon: "🥣",
      duration: "۳۰ دقیقه",
      difficulty: "easy",
    },
    {
      id: "4",
      title: "گفت‌وگوی خانوادگی",
      description: "درباره روز و احساسات کودک صحبت کنید",
      timeSlot: "12:30",
      period: "noon",
      completed: false,
      icon: "👨‍👧‍👦",
      duration: "۱۵ دقیقه",
      difficulty: "medium",
    },
    {
      id: "5",
      title: "میوه در میان‌وعده",
      description: "سیب، نارنجی یا موز برای تغذیه سالم",
      timeSlot: "14:00",
      period: "noon",
      completed: false,
      icon: "🍎",
      duration: "۱۰ دقیقه",
      difficulty: "easy",
    },
    {
      id: "6",
      title: "فعالیت بدنی",
      description: "بازی فعال در بیرون یا بازی داخل‌خانه",
      timeSlot: "15:00",
      period: "noon",
      completed: false,
      icon: "⚽",
      duration: "۴۵ دقیقه",
      difficulty: "medium",
    },
    {
      id: "7",
      title: "کتاب خواندن",
      description: "داستان‌های آموزنده و سرگرم‌کننده",
      timeSlot: "19:30",
      period: "evening",
      completed: false,
      icon: "📚",
      duration: "۲۰ دقیقه",
      difficulty: "medium",
    },
    {
      id: "8",
      title: "آماده شدن برای خواب",
      description: "روتین آرام‌کننده قبل از خواب",
      timeSlot: "20:30",
      period: "evening",
      completed: false,
      icon: "🛏️",
      duration: "۳۰ دقیق��",
      difficulty: "easy",
    },
  ]);

  const [selectedPeriod, setSelectedPeriod] = useState<"all" | "morning" | "noon" | "evening">("all");
  const [showWeeklyStats, setShowWeeklyStats] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    timeSlot: "08:00",
    period: "morning" as "morning" | "noon" | "evening",
    icon: "✨",
    duration: "20 دقیقه",
    difficulty: "easy" as "easy" | "medium" | "hard",
  });

  const weeklyStats: WeeklyStats[] = [
    { day: "ش", completed: 5, total: 8, percent: 62 },
    { day: "ی", completed: 6, total: 8, percent: 75 },
    { day: "د", completed: 7, total: 8, percent: 87 },
    { day: "س", completed: 5, total: 8, percent: 62 },
    { day: "چ", completed: 6, total: 8, percent: 75 },
    { day: "ج", completed: 4, total: 8, percent: 50 },
    { day: "ش", completed: 3, total: 8, percent: 37 },
  ];

  const toggleTaskCompletion = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const openAddModal = () => {
    setFormData({
      title: "",
      description: "",
      timeSlot: "08:00",
      period: "morning",
      icon: "✨",
      duration: "20 دقیقه",
      difficulty: "easy",
    });
    setEditingTaskId(null);
    setShowAddModal(true);
  };

  const openEditModal = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        timeSlot: task.timeSlot,
        period: task.period,
        icon: task.icon,
        duration: task.duration,
        difficulty: task.difficulty,
      });
      setEditingTaskId(taskId);
      setShowAddModal(true);
    }
  };

  const handleSaveTask = () => {
    if (!formData.title.trim()) return;

    if (editingTaskId) {
      // Update existing task
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingTaskId
            ? {
                ...task,
                title: formData.title,
                description: formData.description,
                timeSlot: formData.timeSlot,
                period: formData.period,
                icon: formData.icon,
                duration: formData.duration,
                difficulty: formData.difficulty,
              }
            : task
        )
      );
    } else {
      // Add new task
      const newTask: Task = {
        id: Math.random().toString(),
        title: formData.title,
        description: formData.description,
        timeSlot: formData.timeSlot,
        period: formData.period,
        icon: formData.icon,
        duration: formData.duration,
        difficulty: formData.difficulty,
        completed: false,
      };
      setTasks((prev) => [...prev, newTask]);
    }

    setShowAddModal(false);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const filteredTasks =
    selectedPeriod === "all"
      ? tasks
      : tasks.filter((task) => task.period === selectedPeriod);

  const completedCount = filteredTasks.filter((t) => t.completed).length;
  const completionPercent =
    filteredTasks.length > 0
      ? Math.round((completedCount / filteredTasks.length) * 100)
      : 0;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "hard":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "آسان";
      case "medium":
        return "متوسط";
      case "hard":
        return "سخت";
      default:
        return "";
    }
  };

  const periodData = [
    {
      id: "morning",
      name: "صبح",
      emoji: "🌅",
      color: "from-orange-500 to-yellow-500",
      timeRange: "06:00 - 12:00",
    },
    {
      id: "noon",
      name: "ظهر و بعدازظهر",
      emoji: "☀️",
      color: "from-yellow-500 to-orange-500",
      timeRange: "12:00 - 18:00",
    },
    {
      id: "evening",
      name: "شام و شب",
      emoji: "🌙",
      color: "from-purple-500 to-indigo-500",
      timeRange: "18:00 - 23:00",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-background to-teal-50 pb-8">
      <Header title="برنامه‌ریز هوشمند" showBackButton={true} showNotifications={true} showSettings={true} />

      {/* Header Content */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <p className="text-slate-600 text-sm mb-4">
            برنامه روزانه شخصی‌شده برای علی
          </p>

          {/* Progress Overview */}
          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/90 text-sm mb-1">تقدم امروز</p>
                <p className="text-4xl font-bold">{completionPercent}%</p>
              </div>
              <div className="relative w-24 h-24">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="44"
                    fill="none"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="44"
                    fill="none"
                    stroke="white"
                    strokeWidth="8"
                    strokeDasharray={`${(completionPercent / 100) * 276.32} 276.32`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">{completedCount}/{filteredTasks.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        {/* Add Task Button */}
        <div className="mb-8">
          <button
            onClick={openAddModal}
            className="w-full bg-gradient-to-r from-accent to-primary text-white rounded-2xl p-4 font-bold text-lg hover:opacity-90 transition-opacity shadow-md"
          >
            ➕ اضافه کردن وظیفه جدید
          </button>
        </div>

        {/* Period Selector */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          <button
            onClick={() => setSelectedPeriod("all")}
            className={`py-3 px-4 rounded-xl font-semibold transition-all ${
              selectedPeriod === "all"
                ? "bg-primary text-white shadow-md"
                : "bg-white text-slate-700 hover:bg-gray-50 shadow-sm"
            }`}
          >
            همه وظایف
          </button>
          {periodData.map((period) => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id as any)}
              className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                selectedPeriod === period.id
                  ? "bg-primary text-white shadow-md"
                  : "bg-white text-slate-700 hover:bg-gray-50 shadow-sm"
              }`}
            >
              {period.emoji} {period.name}
            </button>
          ))}
        </div>

        {/* Tasks by Period */}
        <div className="space-y-8 mb-8">
          {periodData.map(
            (period) =>
              (selectedPeriod === "all" || selectedPeriod === period.id) && (
                <div key={period.id}>
                  <div
                    className={`bg-gradient-to-r ${period.color} rounded-2xl p-4 text-white mb-4`}
                  >
                    <h2 className="text-xl font-bold">{period.emoji} {period.name}</h2>
                    <p className="text-white/90 text-sm">{period.timeRange}</p>
                  </div>

                  <div className="space-y-3">
                    {tasks
                      .filter((task) => task.period === period.id)
                      .sort((a, b) => a.timeSlot.localeCompare(b.timeSlot))
                      .map((task) => (
                        <div
                          key={task.id}
                          onClick={() => toggleTaskCompletion(task.id)}
                          className={`bg-white rounded-2xl p-5 cursor-pointer transition-all hover:shadow-lg ${
                            task.completed
                              ? "opacity-60 border-l-4 border-green-500"
                              : "border-l-4 border-primary shadow-md"
                          }`}
                        >
                          <div className="flex gap-4 items-start">
                            <div className="text-3xl">{task.icon}</div>

                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3
                                  className={`font-bold ${
                                    task.completed
                                      ? "line-through text-slate-500"
                                      : "text-slate-800"
                                  }`}
                                >
                                  {task.title}
                                </h3>
                                <span
                                  className={`px-2 py-1 rounded-lg text-xs font-semibold ${getDifficultyColor(
                                    task.difficulty
                                  )}`}
                                >
                                  {getDifficultyLabel(task.difficulty)}
                                </span>
                              </div>
                              <p className="text-slate-600 text-sm mb-2">
                                {task.description}
                              </p>
                              <div className="flex gap-3 text-xs text-slate-600">
                                <span>⏰ {task.timeSlot}</span>
                                <span>⏱️ {task.duration}</span>
                              </div>
                            </div>

                            <div className="flex-shrink-0 flex items-center gap-2">
                              <button
                                onClick={() => openEditModal(task.id)}
                                className="p-2 text-slate-600 hover:text-primary transition-colors"
                                title="ویرایش وظیفه"
                              >
                                ✏️
                              </button>
                              <button
                                onClick={() => handleDeleteTask(task.id)}
                                className="p-2 text-slate-600 hover:text-red-500 transition-colors"
                                title="حذف وظیفه"
                              >
                                🗑️
                              </button>
                              <div
                                onClick={() => toggleTaskCompletion(task.id)}
                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                                  task.completed
                                    ? "bg-green-500 border-green-500"
                                    : "border-slate-300 hover:border-primary"
                                }`}
                              >
                                {task.completed && (
                                  <svg
                                    className="w-4 h-4 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )
          )}
        </div>

        {/* Weekly Progress */}
        <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">
              گزارش هفتگی
            </h2>
            <button
              onClick={() => setShowWeeklyStats(!showWeeklyStats)}
              className="text-primary font-semibold hover:underline"
            >
              {showWeeklyStats ? "مخفی" : "نمایش"}
            </button>
          </div>

          {showWeeklyStats && (
            <div>
              <div className="grid grid-cols-7 gap-2 mb-6">
                {weeklyStats.map((stat) => (
                  <div key={stat.day} className="text-center">
                    <p className="font-bold text-slate-800 mb-2">{stat.day}</p>
                    <div className="relative h-32 bg-gray-100 rounded-lg overflow-hidden">
                      <div
                        className="absolute bottom-0 w-full bg-gradient-to-t from-primary to-primary/50 transition-all"
                        style={{ height: `${stat.percent}%` }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold text-slate-800">
                          {stat.percent}%
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 mt-2">
                      {stat.completed}/{stat.total}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-r-4 border-primary rounded-lg p-6">
                <h3 className="font-bold text-slate-800 mb-2">📊 تحلیل هفتگی</h3>
                <p className="text-slate-700 leading-relaxed">
                  میانگین تکمیل وظایف شما در هفته: {Math.round((weeklyStats.reduce((sum, s) => sum + s.percent, 0) / 7))}%. روند خوبی دارید! برای بهتر شدن، سعی کنید روزهای ضعیف‌تر را بهبود دهید. کودک شما بهترین‌ها را انجام می‌دهد.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Tips Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-bold text-slate-800 mb-3">💡 نکته</h3>
            <p className="text-slate-600 text-sm">
              وظایف را به صورت تدریجی شروع کنید و انتظار حتمی‌گری را نگذارید
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-bold text-slate-800 mb-3">🎯 هدف</h3>
            <p className="text-slate-600 text-sm">
              هدف رسیدن به ۸۰ درصد تکمیل وظایف روزانه است
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-bold text-slate-800 mb-3">🏆 جایزه</h3>
            <p className="text-slate-600 text-sm">
              هر روز که ۸۰ درصد تکمیل کنید، ستاره کسب کنید!
            </p>
          </div>
        </div>
      </div>

      {/* Add/Edit Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <h2 className="text-xl font-bold text-slate-800 mb-4">
              {editingTaskId ? "ویرایش وظیفه" : "اضافه کردن وظیفه جدید"}
            </h2>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  عنوان وظیفه
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="نام وظیفه را وارد کنید"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary text-right"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  توضیحات
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="توضیحات وظیفه"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary text-right resize-none"
                  rows={3}
                />
              </div>

              {/* Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    ساعت
                  </label>
                  <input
                    type="time"
                    value={formData.timeSlot}
                    onChange={(e) =>
                      setFormData({ ...formData, timeSlot: e.target.value })
                    }
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    مدت زمان
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    placeholder="۲۰ دقیقه"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary text-right"
                  />
                </div>
              </div>

              {/* Period */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  بخش روز
                </label>
                <select
                  value={formData.period}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      period: e.target.value as "morning" | "noon" | "evening",
                    })
                  }
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary text-right"
                >
                  <option value="morning">🌅 صبح</option>
                  <option value="noon">☀️ ظهر و بعدازظهر</option>
                  <option value="evening">🌙 شام و شب</option>
                </select>
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  سطح دشواری
                </label>
                <select
                  value={formData.difficulty}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      difficulty: e.target.value as "easy" | "medium" | "hard",
                    })
                  }
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary text-right"
                >
                  <option value="easy">آسان</option>
                  <option value="medium">متوسط</option>
                  <option value="hard">سخت</option>
                </select>
              </div>

              {/* Icon */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  آیکون (ایموجی)
                </label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) =>
                    setFormData({ ...formData, icon: e.target.value })
                  }
                  placeholder="✨"
                  maxLength={2}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary text-center text-2xl"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2 bg-gray-200 text-slate-800 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                انصراف
              </button>
              <button
                onClick={handleSaveTask}
                className="flex-1 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                {editingTaskId ? "ذخیره تغییرات" : "اضافه کردن"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
