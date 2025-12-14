import { useLocation, Link } from "react-router-dom";

export default function Placeholder() {
  const location = useLocation();
  const pageName = location.pathname.slice(1).replace(/-/g, " ");

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-background to-teal-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">🚀</div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2 capitalize">
          {pageName}
        </h1>
        <p className="text-slate-600 mb-8">
          این بخش در حال توسعه است. لطفاً برای مزیدی منتظر باشید!
        </p>
        <Link
          to="/dashboard"
          className="inline-block py-3 px-8 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
        >
          بازگشت به داشبورد
        </Link>
      </div>
    </div>
  );
}
