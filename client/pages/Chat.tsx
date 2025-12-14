import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

interface Message {
  id: string;
  type: "user" | "ai";
  text: string;
  timestamp: Date;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      text: "سلام! من دستیار هوشمند شما هستم. می‌تونم کمک کنم تو سؤالات تربیتی، رفتا��ی و تغذیه‌ای. چی میپرسی؟",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickTopics = [
    { text: "رفتار بد کودک", emoji: "😞" },
    { text: "تغذیه و غذای کودک", emoji: "🍎" },
    { text: "مشکلات خواب", emoji: "😴" },
    { text: "رشد ذهنی", emoji: "🧠" },
    { text: "کنترل خشم و ناراحتی", emoji: "😤" },
    { text: "فعالیت بدنی", emoji: "🏃" },
  ];

  const handleQuickTopic = (topic: string) => {
    setInputValue(topic);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Math.random().toString(),
      type: "user",
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses: { [key: string]: string } = {
        "رفتار بد کودک":
          "رفتار بد کودک اغلب ریشه در تلاش برای توجه یا بروز احساسات دارد. پیشنهاد می‌کنم:\n• روابط عاطفی قوی برقرار کنید\n• حدود و قوانین روشن تعیین کنید\n• صبر و تحمل برقرار کنید\n• رفتار مثبت را تقویت کنید",
        "تغذیه و غذای کودک":
          "برای کودکان سالم، توصیه‌های غذایی:\n• میوه‌ها و سبزیجات رنگین\n• پروتئین کافی (گوشت، تخم‌مرغ، لبنیات)\n• آب سفید به جای شیرینی‌ها\n• وعده‌های منظم و کنترل‌شده",
        "مشکلات خواب":
          "برای بهبو�� خواب کودک:\n• ساعت خواب منظم تعیین کنید\n• محیط خواب تاریک و آرام باشد\n• قبل از خواب از صفحات نگاه نچشید\n• روتین آرام‌کننده قبل از خواب\n• اگر ۲ هفته بهتر نشد، درمان‌گر ببینید",
        "رشد ذهنی":
          "برای تحریک رشد ذهنی:\n• بازی‌های فکری و پازل\n• مطالعه داستان‌ها و کتاب‌ها\n• فعالیت‌های خلاق (نقاشی، موسیقی)\n• سؤالات باز و حوار\n• تشویق کنجکاوی و اکتشاف",
        "کنترل خشم و ناراحتی":
          "برای مدیریت خشم در کودکان:\n• احساسات را نام‌گذاری کنید\n• تنفس عمیق و شمارش یادگار دهید\n• فضای امن برای آرام شدن\n• نه صدای و تهدید، بلکه درک و حمایت\n• خودتان نمونه صبوری و آرامش باشید",
        "فعالیت بدنی":
          "فعالیت بدنی کودکان:\n• روزی حداقل ۶۰ دقیقه فعالیت متوسط\n• بازی‌های بیرونی و ورزش\n• دوری از نشستن طولانی مدت\n• بازی‌ه��ی گروهی برای تعامل اجتماعی\n• بدون فشار، فقط برای لذت",
      };

      const response =
        aiResponses[inputValue] ||
        "پاسخی هوشمند و شخصی‌شده برای سوال شما. لطفاً این پیام‌ها را فقط برای اطلاعات عمومی استفاده کنید و برای موارد خاص با متخصص مشورت کنید.";

      const aiMessage: Message = {
        id: Math.random().toString(),
        type: "ai",
        text: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 800);
  };

  const generateSummaryAndAnalysis = () => {
    const summaryTemplate = {
      date: new Date().toLocaleDateString("fa-IR"),
      topic: messages.length > 1 ? messages[1].text.substring(0, 50) : "گفت‌وگوی آزاد",
      summary: "خلاصه‌ای از نکات اصلی گفت‌وگو",
      analysis: "نتیجه‌گیری و توصیات بر اساس مشاوره هوش مصنوعی",
      recommendations: [
        "توصیه 1: روابط عاطفی قوی",
        "توصیه 2: حدود و قوانین روشن",
        "توصیه 3: صبر و تحمل",
      ],
      conversationId: `chat-${Date.now()}`,
    };

    return summaryTemplate;
  };

  const handleSaveConversation = () => {
    const notebookEntry = generateSummaryAndAnalysis();

    // Save to localStorage for growth notebook
    const existingEntries = JSON.parse(localStorage.getItem("growthNotebookEntries") || "[]");
    existingEntries.push(notebookEntry);
    localStorage.setItem("growthNotebookEntries", JSON.stringify(existingEntries));

    setShowSaveModal(false);
    setMessages([
      {
        id: "1",
        type: "ai",
        text: "✅ خلاصه و نتیجه‌گیری گفت‌وگو به دفترچه رشد کودک اضافه شد. می‌تونی در بخش 'دفترچه رشد' مشاهده کنی.",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-background to-teal-50 flex flex-col">
      <Header title="دستیار هوشمند" showBackButton={true} showNotifications={true} showSettings={true} />

      {/* Chat Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-2 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold">
            AI
          </div>
          <div>
            <p className="text-xs text-slate-600">آنلاین</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === "user" ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`max-w-sm lg:max-w-md px-4 py-3 rounded-2xl ${
                message.type === "user"
                  ? "bg-slate-200 text-slate-800 rounded-bl-sm"
                  : "bg-primary text-white rounded-br-sm"
              }`}
            >
              <p className="whitespace-pre-wrap text-sm leading-relaxed">
                {message.text}
              </p>
              <p
                className={`text-xs mt-1 ${
                  message.type === "user"
                    ? "text-slate-600"
                    : "text-primary-foreground/70"
                }`}
              >
                {message.timestamp.toLocaleTimeString("fa-IR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-end">
            <div className="bg-primary text-white px-4 py-3 rounded-2xl rounded-br-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Topics */}
      {messages.length <= 1 && (
        <div className="max-w-4xl w-full mx-auto px-4 py-4 border-t border-gray-100 bg-white">
          <p className="text-sm font-semibold text-slate-700 mb-3">
            موضوعات محبوب:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {quickTopics.map((topic) => (
              <button
                key={topic.text}
                onClick={() => handleQuickTopic(topic.text)}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-slate-700 rounded-lg text-sm font-semibold transition-colors text-right"
              >
                <span className="ml-1">{topic.emoji}</span>
                {topic.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t border-gray-100 max-w-4xl w-full mx-auto">
        <form onSubmit={handleSendMessage} className="p-4 flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="سؤالت رو بپرس..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary text-right disabled:opacity-50"
          />
          <button
            type="button"
            className="p-3 text-slate-600 hover:text-slate-800 transition-colors"
            title="پیام صوتی"
          >
            🎤
          </button>
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="p-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ارسال
          </button>
        </form>

        {/* Action Buttons */}
        {messages.length > 1 && (
          <div className="px-4 pb-4 flex gap-2">
            <button
              onClick={() => setShowSaveModal(true)}
              className="flex-1 py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              💾 ذخیره در دفترچه
            </button>
            <button
              onClick={() =>
                setMessages([
                  {
                    id: "1",
                    type: "ai",
                    text: "سلام! چی میپرسی؟",
                    timestamp: new Date(),
                  },
                ])
              }
              className="flex-1 py-2 bg-gray-200 text-slate-800 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              🗑️ پاک کردن
            </button>
          </div>
        )}
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              ذخیره گفت‌وگو
            </h2>
            <p className="text-slate-600 mb-6">
              خلاصه و نتیجه‌گیری این گفت‌وگو به دفترچه رشد کودک اضافه خواهد شد. می‌تونی بعدا از داده‌های ذخیره‌شده استفاده کنی.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSaveModal(false)}
                className="flex-1 py-2 bg-gray-200 text-slate-800 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                انصراف
              </button>
              <button
                onClick={handleSaveConversation}
                className="flex-1 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                ذخیره
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
