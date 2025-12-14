import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

interface Message {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
  isExpert: boolean;
  reactions: Record<string, number>;
  image?: string;
}

interface Group {
  id: string;
  name: string;
  category: string;
  members: number;
  description: string;
  icon: string;
}

export default function Community() {
  const [selectedGroup, setSelectedGroup] = useState("3-6");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      userId: "user1",
      userName: "مریم رضایی",
      userAvatar: "👩",
      content: "سلام! پسرم دقیقا این سن داره. شب‌ها خیلی نمی‌خوابه. کسی تجربه داره؟",
      timestamp: "14:30",
      isExpert: false,
      reactions: { "👍": 5, "❤️": 3 },
    },
    {
      id: "2",
      userId: "expert1",
      userName: "دکتر احمدی",
      userAvatar: "👨‍⚕️",
      content: "سلام مریم! مشکلات خواب در این سن بسیار طبیعی است. می‌تونم چند توصیه بدم:\n1. روتین ثابت قبل خواب\n2. محیط تاریک و آرام\n3. کاهش تحریک‌های الکترونیکی",
      timestamp: "14:45",
      isExpert: true,
      reactions: { "👍": 12, "❤️": 8 },
    },
    {
      id: "3",
      userId: "user2",
      userName: "فاطمه علی‌زاده",
      userAvatar: "👩",
      content: "دقیقا! ما هم همین روتین رو شروع کردیم و خیلی کمک کرد.",
      timestamp: "15:00",
      isExpert: false,
      reactions: { "👍": 3, "❤️": 2 },
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [showReactionPicker, setShowReactionPicker] = useState<string | null>(
    null
  );
  const [showReportModal, setShowReportModal] = useState<string | null>(null);

  const groups: Group[] = [
    {
      id: "0-2",
      name: "نوزادان و کودکان",
      category: "سن ۰-۲ سال",
      members: 245,
      description: "والدین نوزادان و کودکان خردسال",
      icon: "👶",
    },
    {
      id: "3-6",
      name: "پیش‌دبستانی",
      category: "سن ۳-۶ سال",
      members: 512,
      description: "والدین کودکان پیش‌��بستانی",
      icon: "🧒",
    },
    {
      id: "6-12",
      name: "دبستانی",
      category: "سن ۶-۱۲ سال",
      members: 389,
      description: "والدین کودکان دبستانی",
      icon: "👦",
    },
    {
      id: "12-18",
      name: "نوجوانان",
      category: "سن ۱۲-۱۸ سال",
      members: 267,
      description: "والدین نوجوانان",
      icon: "👨",
    },
    {
      id: "nutrition",
      name: "تغذیه و تندرستی",
      category: "موضوع",
      members: 456,
      description: "بحث درباره تغذیه سالم و سلامت کودکان",
      icon: "🥗",
    },
    {
      id: "behavior",
      name: "رفتار و نظم",
      category: "موضوع",
      members: 378,
      description: "راهنمایی درباره مدیریت رفتار و قانون‌گذاری",
      icon: "🎯",
    },
    {
      id: "anger",
      name: "کنترل خشم",
      category: "موضوع",
      members: 234,
      description: "روش‌های مقابله با خشم و ناراحتی کودکان",
      icon: "😤",
    },
  ];

  const currentGroup = groups.find((g) => g.id === selectedGroup);
  const reactions = ["👍", "❤️", "😂", "😮", "😢"];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Math.random().toString(),
      userId: "currentUser",
      userName: "شما",
      userAvatar: "😊",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isExpert: false,
      reactions: {},
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  const handleAddReaction = (messageId: string, reaction: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId) {
          const reactions = { ...msg.reactions };
          if (reactions[reaction]) {
            reactions[reaction]++;
          } else {
            reactions[reaction] = 1;
          }
          return { ...msg, reactions };
        }
        return msg;
      })
    );
    setShowReactionPicker(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-background to-teal-50 flex flex-col">
      <Header title="جامعه والدین" showBackButton={true} showNotifications={true} showSettings={true} />

      {/* Subtitle */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-2">
          <p className="text-slate-600 text-sm">گفت‌وگو و هم‌فکری در موضوعات تربیتی</p>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Groups Sidebar */}
        <div className="w-64 bg-white border-l border-gray-100 overflow-y-auto hidden md:block">
          <div className="p-4">
            <h2 className="text-lg font-bold text-slate-800 mb-4">گروه‌ها</h2>
            <div className="space-y-2">
              {groups.map((group) => (
                <button
                  key={group.id}
                  onClick={() => setSelectedGroup(group.id)}
                  className={`w-full text-right px-4 py-3 rounded-xl transition-all ${
                    selectedGroup === group.id
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-100 text-slate-700 hover:bg-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{group.icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{group.name}</p>
                      <p className="text-xs opacity-75">{group.members} عضو</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-pink-50/20">
          {/* Group Info */}
          {currentGroup && (
            <div className="bg-white border-b border-gray-100 px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{currentGroup.icon}</span>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-slate-800">
                    {currentGroup.name}
                  </h2>
                  <p className="text-slate-600 text-sm">
                    {currentGroup.members} عضو • {currentGroup.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="flex gap-3 group">
                <div className="flex-shrink-0 text-2xl">{message.userAvatar}</div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-slate-800">
                      {message.userName}
                    </span>
                    {message.isExpert && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">
                        🏆 کارشناس
                      </span>
                    )}
                    <span className="text-xs text-slate-500">
                      {message.timestamp}
                    </span>
                  </div>

                  <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <p className="text-slate-700 whitespace-pre-wrap">
                      {message.content}
                    </p>
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Message attachment"
                        className="mt-3 rounded-lg max-w-xs"
                      />
                    )}
                  </div>

                  {/* Reactions */}
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {Object.entries(message.reactions).map(([emoji, count]) => (
                      <button
                        key={emoji}
                        className="px-3 py-1 bg-white rounded-full text-sm hover:bg-gray-100 transition-colors shadow-sm"
                      >
                        {emoji} {count > 1 ? count : ""}
                      </button>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setShowReactionPicker(
                            showReactionPicker === message.id ? null : message.id
                          )
                        }
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-sm"
                      >
                        😊
                      </button>

                      {showReactionPicker === message.id && (
                        <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg p-2 flex gap-1 z-10">
                          {reactions.map((reaction) => (
                            <button
                              key={reaction}
                              onClick={() =>
                                handleAddReaction(message.id, reaction)
                              }
                              className="text-xl hover:scale-125 transition-transform"
                            >
                              {reaction}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => setShowReportModal(message.id)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-sm"
                    >
                      🚩
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="bg-white border-t border-gray-100 px-6 py-4">
            <form onSubmit={handleSendMessage} className="flex gap-3">
              <button
                type="button"
                className="p-3 text-slate-600 hover:text-slate-800 transition-colors text-lg"
              >
                📎
              </button>

              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="پیام خود را بنویسید..."
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary text-right"
              />

              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="p-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ارسال
              </button>
            </form>

            {/* Mobile Group Selector */}
            <div className="md:hidden mt-4">
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-right"
              >
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.icon} {group.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h2 className="text-xl font-bold text-slate-800 mb-4">
              گزارش پیام
            </h2>
            <p className="text-slate-600 mb-6">
              لطفاً دلیل گزارش این پیام را انتخاب کنید:
            </p>

            <div className="space-y-3 mb-6">
              {[
                "محتوای نامناسب",
                "تجاوز یا هرج‌ومرج",
                "اسپم یا تبلیغ",
                "دیگر",
              ].map((reason) => (
                <button
                  key={reason}
                  className="w-full text-right py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {reason}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowReportModal(null)}
                className="flex-1 py-2 bg-gray-200 text-slate-800 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                انصراف
              </button>
              <button
                onClick={() => {
                  setShowReportModal(null);
                  alert("گزارش شما ثبت شد. متشکریم!");
                }}
                className="flex-1 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                گزارش
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
