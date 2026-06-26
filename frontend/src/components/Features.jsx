import { Motorbike, ShieldCheck, Clock, Heart } from "lucide-react";

const featuresData = [
  {
    Icon: Motorbike,
    title: "توصيل فائق السرعة",
    desc: "نضمن وصول طعامك ساخناً وطازجاً كما لو كنت داخل المطعم.",
    size: "lg:col-span-2", // هذا الكرت سيكون عريضاً ومميزاً
    bg: "from-orange-500/20 to-amber-500/10 border-orange-500/30",
    iconColor: "text-orange-300",
  },
  {
    Icon: ShieldCheck,
    title: "أعلى معايير الجودة",
    desc: "لحوم طازجة وخضار قطف اليوم.",
    size: "lg:col-span-1",
    bg: "from-amber-500/20 to-orange-500/10 border-amber-500/30",
    iconColor: "text-amber-300",
  },
  {
    Icon: Clock,
    title: "خدمة على مدار الساعة",
    desc: "جوع آخر الليل؟ مطبخنا يعمل لأجلك دائماً.",
    size: "lg:col-span-1",
    bg: "from-red-500/20 to-orange-500/10 border-red-500/30",
    iconColor: "text-orange-300",
  },
  {
    Icon: Heart,
    title: "صُنع بحب وشغف",
    desc: "أشهر الطهاة يشرفون على تتبيل وإعداد وجبتك لتناسب ذوقك الرفيع.",
    size: "lg:col-span-2", // كرت عريض آخر للتوازن البصري
    bg: "from-rose-500/20 to-orange-500/10 border-rose-500/30",
    iconColor: "text-rose-300",
  },
];

const Features = () => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-r from-red-700 via-orange-600 to-yellow-700 text-white py-24 sm:px-10">
      <div className="absolute inset-0 bg-black/25 backdrop-blur-sm pointer-events-none"></div>
      <div className="relative z-10 max-w-7xl mx-auto bg-white/10 backdrop-blur-xl rounded-[40px] border border-white/10 shadow-2xl p-6 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        {/* القسم الأول: العنوان الجاذب (يأخذ 1/3 المساحة) */}
        <div className="space-y-6 lg:text-right text-center bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl">
          <span className="text-sm font-semibold uppercase tracking-widest text-orange-500 px-3 py-1 bg-orange-500/10 rounded-full border border-orange-500/20">
            سر تميزنا
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
            لسنا مجرد مطعم، <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-orange-700 to-amber-500">
              بل تجربة تذوق.
            </span>
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
            نجمع لك بين سرعة الخدمة العصريّة، وفخامة المذاق الأصيل لنقدم لك
            تجربة استثنائية في كل طلب.
          </p>
          <div className="pt-4 hidden lg:block">
            <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-neutral-950 font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-105 transition-all duration-300">
              اكتشف قائمتنا الآن
            </button>
          </div>
        </div>

        {/* القسم الثاني: شبكة الميزات غير المتناظرة (تأخذ 2/3 المساحة) */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {featuresData.map((item) => (
            <div
              key={item.title}
              className={`group relative overflow-hidden bg-gradient-to-br ${item.bg} border border-white/10 rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_35px_120px_-40px_rgba(0,0,0,0.6)] ${item.size}`}
            >
              {/* إضاءة خلفية خفيفة تظهر عند الـ Hover خلف الأيقونة */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                <div
                  className={`p-3 rounded-2xl bg-neutral-900/80 border border-white/10 ${item.iconColor} shadow-xl shadow-black/30 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                >
                  <item.Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-orange-300 transition-colors duration-300">
                  {item.title}
                </h3>
              </div>

              <p className="text-neutral-200 text-sm sm:text-base leading-relaxed group-hover:text-white transition-colors duration-300">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
