import { useEffect, useMemo, useState } from "react";

export default function Odontologija1() {
  const services = [
    {
      id: "higiena",
      icon: "✦",
      title: "Profesionali burnos higiena",
      price: "70 €",
      duration: "45–60 min.",
      description: "Apnašų ir pigmentacijos pašalinimas, Air-Flow srovė, dantų poliravimas ir individualios priežiūros rekomendacijos.",
      doctors: ["Dr. Lina Vaitkūnienė", "Dr. Monika Vaičiulytė"],
    },
    {
      id: "konsultacija",
      icon: "◎",
      title: "Konsultacija ir gydymo planas",
      price: "30 €",
      duration: "30 min.",
      description: "Apžiūra, situacijos paaiškinimas, galimų sprendimų palyginimas ir aiškus tolimesnio gydymo planas.",
      doctors: ["Dr. Jonas Petrauskas", "Dr. Monika Vaičiulytė"],
    },
    {
      id: "plombavimas",
      icon: "◇",
      title: "Terapinis gydymas / plombavimas",
      price: "nuo 60 €",
      duration: "45–90 min.",
      description: "Karieso gydymas, estetiškas plombos atkūrimas, danties formos atstatymas ir kruopštus poliravimas.",
      doctors: ["Dr. Jonas Petrauskas"],
    },
    {
      id: "chirurgija",
      icon: "△",
      title: "Burnos chirurgija",
      price: "nuo 80 €",
      duration: "30–60 min.",
      description: "Atraumatinis dantų šalinimas, chirurginės konsultacijos ir aiškios rekomendacijos po procedūros.",
      doctors: ["Dr. Marius Čepas"],
    },
  ];

  const doctors = [
    {
      name: "Dr. Jonas Petrauskas",
      role: "Terapinis gydymas",
      exp: "10 metų patirtis",
      note: "Aiškiai paaiškina gydymo eigą ir parenka pacientui tinkamiausią sprendimą.",
      tags: ["Terapija", "Estetika", "Gydymo planai"],
    },
    {
      name: "Dr. Lina Vaitkūnienė",
      role: "Burnos higiena",
      exp: "7 metų patirtis",
      note: "Švelni, kruopšti profesionali burnos higiena net jautresniems pacientams.",
      tags: ["Higiena", "Air-Flow", "Profilaktika"],
    },
    {
      name: "Dr. Marius Čepas",
      role: "Burnos chirurgija",
      exp: "12 metų patirtis",
      note: "Dantų šalinimas, chirurginės konsultacijos ir pooperacinė priežiūra.",
      tags: ["Chirurgija", "Šalinimas", "Implantologija"],
    },
    {
      name: "Dr. Monika Vaičiulytė",
      role: "Konsultacijos",
      exp: "8 metų patirtis",
      note: "Išsamūs gydymo planai, profilaktikos rekomendacijos ir paciento poreikių įvertinimas.",
      tags: ["Konsultacijos", "Planai", "Profilaktika"],
    },
  ];

  const slots = {
    "2026-06-04": ["09:00", "11:00", "14:00", "16:30"],
    "2026-06-05": ["10:00", "12:30", "15:30"],
    "2026-06-08": ["09:30", "13:00", "17:00"],
    "2026-06-10": ["10:30", "14:30", "16:00"],
    "2026-06-12": ["09:00", "11:30", "15:00"],
    "2026-06-16": ["10:00", "13:30", "17:30"],
    "2026-06-18": ["09:30", "12:00", "15:30"],
    "2026-06-22": ["11:00", "14:00", "16:00"],
    "2026-06-25": ["09:00", "13:00", "15:30"],
  };

  const reviews = [
    {
      name: "Milda K.",
      text: "Labai aiškiai paaiškino gydymo eigą ir kainą. Jaučiausi ramiai viso vizito metu.",
    },
    {
      name: "Tomas R.",
      text: "Patogi registracija internetu ir malonus, dėmesingas personalas. Viskas atrodė profesionaliai.",
    },
    {
      name: "Rasa M.",
      text: "Švari aplinka, profesionali higiena ir aiškios rekomendacijos po procedūros.",
    },
  ];

  const [view, setView] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [selectedService, setSelectedService] = useState(services[0]);
  const [selectedDoctor, setSelectedDoctor] = useState(services[0].doctors[0]);
  const [selectedDate, setSelectedDate] = useState("2026-06-04");
  const [selectedTime, setSelectedTime] = useState("09:00");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [xrayFile, setXrayFile] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const availableDoctors = useMemo(() => selectedService.doctors, [selectedService]);

  const days = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    const iso = `2026-06-${String(day).padStart(2, "0")}`;
    return { day, iso, active: Boolean(slots[iso]) };
  });

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 28);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((element, index) => {
      element.style.setProperty("--delay", `${Math.min(index * 55, 330)}ms`);
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [view]);

  function nav(nextView) {
    setView(nextView);
    setConfirmed(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function chooseService(service) {
    setSelectedService(service);
    setSelectedDoctor(service.doctors[0]);
    setSelectedDate("");
    setSelectedTime("");
    setConfirmed(false);
    setView("booking");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function chooseDate(iso) {
    if (!slots[iso]) return;
    setSelectedDate(iso);
    setSelectedTime(slots[iso][0]);
    setConfirmed(false);
  }

  function submit(e) {
    e.preventDefault();
    if (!name || !phone || !selectedDate || !selectedTime || !privacyAccepted) return;
    setConfirmed(true);
  }

  function initials(value) {
    const parts = value.split(" ").filter(Boolean);
    return parts.slice(1, 3).map((item) => item[0]).join("").toUpperCase() || "Dr";
  }

  const css = `
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { margin: 0; }
    .site {
      min-height: 100vh;
      font-family: Inter, Arial, sans-serif;
      color: #142033;
      background:
        radial-gradient(circle at 12% 0%, rgba(224,238,232,.82), transparent 30%),
        radial-gradient(circle at 96% 6%, rgba(238,231,216,.72), transparent 32%),
        linear-gradient(180deg, #ffffff 0%, #f7f9f8 48%, #ffffff 100%);
      overflow-x: hidden;
    }
    .container { width: min(1180px, calc(100% - 40px)); margin: 0 auto; }
    .header {
      position: sticky;
      top: 0;
      z-index: 50;
      background: rgba(255,255,255,.96);
      border-bottom: 1px solid rgba(225,232,228,.82);
      transition: background .28s ease, box-shadow .28s ease, border-color .28s ease;
    }
    .header.scrolled {
      background: rgba(255,255,255,.72);
      backdrop-filter: blur(22px);
      border-color: rgba(225,232,228,.56);
      box-shadow: 0 14px 42px rgba(20,32,51,.08);
    }
    .header-inner {
      height: 78px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      transition: height .28s ease;
    }
    .header.scrolled .header-inner { height: 64px; }
    .logo { display: flex; align-items: center; gap: 12px; font-weight: 950; letter-spacing: -.03em; cursor: pointer; }
    .logo-mark {
      width: 44px;
      height: 44px;
      border-radius: 16px;
      background: linear-gradient(145deg, #142033, #2a3e58);
      color: white;
      display: grid;
      place-items: center;
      box-shadow: 0 16px 36px rgba(20,32,51,.18);
      transition: width .28s ease, height .28s ease, border-radius .28s ease;
    }
    .header.scrolled .logo-mark { width: 38px; height: 38px; border-radius: 14px; }
    .logo small { display:block; color:#667085; font-weight:800; letter-spacing:0; margin-top:3px; font-size: 12px; }
    .nav { display: flex; align-items: center; gap: 8px; }
    .nav button {
      border: 0;
      background: transparent;
      padding: 10px 12px;
      border-radius: 999px;
      cursor: pointer;
      color:#3f4c5e;
      font-weight: 850;
      transition: color .18s ease, background .18s ease, transform .18s ease;
    }
    .nav button.active, .nav button:hover { background: rgba(20,32,51,.055); color: #142033; }
    .nav button:hover { transform: translateY(-1px); }
    .btn {
      border: 0;
      border-radius: 999px;
      padding: 13px 22px;
      font-weight: 950;
      cursor: pointer;
      background: #142033;
      color: white;
      box-shadow: 0 16px 34px rgba(20,32,51,.18);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: transform .18s ease, box-shadow .18s ease, background .18s ease;
    }
    .btn:hover { transform: translateY(-2px); box-shadow: 0 20px 46px rgba(20,32,51,.22); }
    .btn.secondary { background: white; color: #142033; border: 1px solid #dfe7e2; box-shadow: none; }
    .btn.soft { background: #f3f6f4; color: #142033; box-shadow: none; border: 1px solid #e1e8e4; }
    .btn.book { padding: 12px 20px; }
    .btn:disabled { opacity: .55; cursor: not-allowed; transform: none; box-shadow: none; }
    .reveal { opacity: 0; transform: translateY(24px); transition: opacity .7s ease var(--delay), transform .7s ease var(--delay); }
    .reveal.visible { opacity: 1; transform: translateY(0); }
    .page-enter { animation: pageIn .42s ease both; }
    @keyframes pageIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes floatSoft { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
    @keyframes photoIn { from { opacity: 0; transform: translateX(18px) scale(.985); } to { opacity: 1; transform: translateX(0) scale(1); } }
    .hero { padding: 88px 0 74px; overflow: hidden; }
    .hero-grid { display: grid; grid-template-columns: 1.03fr .97fr; gap: 54px; align-items: center; }
    .eyebrow {
      display: inline-flex;
      align-items:center;
      gap:8px;
      background:#e8f4ef;
      color:#426653;
      border: 1px solid #c9ddd4;
      padding: 8px 14px;
      border-radius:999px;
      font-weight:950;
      font-size:12px;
      letter-spacing: .08em;
      text-transform: uppercase;
    }
    .eyebrow::before { content:""; width: 7px; height: 7px; background: #6f9b84; border-radius: 99px; }
    h1 {
      margin: 24px 0 20px;
      font-size: clamp(38px, 5vw, 66px);
      line-height: 1.02;
      letter-spacing: -.065em;
      color:#142033;
      max-width: 720px;
    }
    h1 span { color: #365a73; }
    h2 { margin: 0; font-size: clamp(30px, 3.5vw, 46px); line-height: 1.07; letter-spacing: -.055em; color:#142033; }
    h3 { margin: 0 0 10px; color:#142033; font-size: 20px; letter-spacing: -.025em; }
    .lead { font-size: 18px; line-height: 1.75; color:#5f6d7d; max-width: 660px; }
    .actions { display:flex; gap:12px; flex-wrap:wrap; margin-top:28px; }
    .trust-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px 16px;
      margin-top: 30px;
      color: #334155;
      font-weight: 850;
    }
    .trust-row span {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      background: rgba(255,255,255,.78);
      border: 1px solid #e1e8e4;
      border-radius: 999px;
      box-shadow: 0 10px 28px rgba(20,32,51,.04);
    }
    .trust-row i { width: 7px; height: 7px; background: #7fa993; border-radius: 99px; display: inline-block; }
    .hero-media { position: relative; }
    .clinic-photo-card {
      position: relative;
      overflow: hidden;
      border-radius: 38px;
      min-height: 540px;
      background: #e8efeb;
      border: 1px solid rgba(255,255,255,.78);
      box-shadow: 0 38px 110px rgba(20,32,51,.14);
      animation: photoIn .7s ease both;
    }
    .clinic-photo { width:100%; height:540px; object-fit:cover; display:block; filter: saturate(.94) contrast(1.03); transition: transform .7s ease; }
    .clinic-photo-card:hover .clinic-photo { transform: scale(1.035); }
    .clinic-photo-card::after {
      content:"";
      position:absolute;
      inset:0;
      background: linear-gradient(180deg, rgba(20,32,51,.02) 0%, rgba(20,32,51,.08) 45%, rgba(20,32,51,.28) 100%);
      pointer-events:none;
    }
    .clinic-fallback {
      display:none;
      align-items:center;
      justify-content:center;
      min-height:540px;
      padding:40px;
      text-align:center;
      background: linear-gradient(135deg,#e8f4ef,#fff 58%,#eee7d8);
      color:#142033;
      font-weight:950;
    }
    .clinic-card-mini {
      position: absolute;
      left: 24px;
      right: 24px;
      bottom: 24px;
      z-index: 2;
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: center;
      gap: 18px;
      border-radius: 26px;
      padding: 18px 20px;
      background: rgba(255,255,255,.86);
      border: 1px solid rgba(255,255,255,.88);
      backdrop-filter: blur(18px);
      box-shadow: 0 24px 64px rgba(20,32,51,.16);
    }
    .clinic-title { font-size: 20px; font-weight: 950; letter-spacing: -.035em; color:#142033; }
    .clinic-subtitle { margin-top: 4px; color:#64748b; font-size: 13px; font-weight: 750; }
    .rating-badge { display:flex; flex-direction:column; align-items:flex-end; gap:3px; font-weight:950; color:#142033; white-space: nowrap; }
    .rating-badge small { color:#64748b; font-weight:800; }
    .hero-note {
      position: absolute;
      top: 26px;
      left: -22px;
      width: 216px;
      border-radius: 24px;
      background: rgba(255,255,255,.92);
      border: 1px solid #e1e8e4;
      box-shadow: 0 18px 54px rgba(20,32,51,.11);
      padding: 17px;
      animation: floatSoft 4.8s ease-in-out infinite;
    }
    .hero-note small { display:block; color:#64748b; font-size: 11px; font-weight: 950; text-transform: uppercase; letter-spacing: .07em; }
    .hero-note strong { display:block; margin-top:6px; line-height:1.35; }
    .section { padding:72px 0; }
    .section.soft { background: rgba(243,246,244,.72); }
    .section-head { display:flex; justify-content:space-between; align-items:end; gap:24px; margin-bottom:30px; }
    .section-head .lead { max-width: 520px; font-size: 16px; }
    .grid { display:grid; gap:18px; }
    .cards4 { grid-template-columns: repeat(4,1fr); }
    .cards3 { grid-template-columns: repeat(3,1fr); }
    .card {
      background:rgba(255,255,255,.92);
      border:1px solid #e1e8e4;
      border-radius:28px;
      padding:24px;
      box-shadow:0 16px 45px rgba(20,32,51,.05);
      transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease;
    }
    .card:hover { transform: translateY(-6px); box-shadow:0 24px 70px rgba(20,32,51,.09); border-color:#c9ddd4; }
    .icon { width:52px; height:52px; border-radius:18px; background:#e8f4ef; color:#426653; display:grid; place-items:center; font-size:24px; margin-bottom:14px; font-weight:950; border:1px solid #c9ddd4; }
    .price { color:#142033; font-size:28px; font-weight:950; margin-top:18px; letter-spacing: -.04em; }
    .small { font-size: 13px; color:#667085; }
    .muted { color:#667085; line-height:1.7; }
    .doctor-photo { width:78px; height:78px; border-radius:24px; background:linear-gradient(145deg,#142033,#2a3e58); color:white; display:grid; place-items:center; font-size:26px; font-weight:950; margin-bottom:16px; box-shadow:0 18px 44px rgba(20,32,51,.14); }
    .doctor-tags { display:flex; flex-wrap:wrap; gap:7px; margin: 14px 0 18px; }
    .doctor-tags span { border-radius:999px; background:#f3f6f4; padding:6px 10px; color:#475569; font-size:12px; font-weight:850; }
    .booking { background: transparent; min-height: calc(100vh - 76px); }
    .booking-grid { display:grid; grid-template-columns:.85fr 1.15fr; gap:24px; align-items:start; }
    .booking-panel { background:#fff; border:1px solid #e1e8e4; border-radius:30px; box-shadow:0 20px 70px rgba(20,32,51,.08); padding:24px; }
    .option { width:100%; text-align:left; border:1px solid #e1e8e4; background:#fff; color:#142033; border-radius:17px; padding:14px; margin:8px 0; cursor:pointer; transition:.18s ease; }
    .option:hover { background:#f8fbf9; border-color:#c9ddd4; transform: translateY(-1px); }
    .option.active { background:#e8f4ef; border-color:#8fb69d; box-shadow: 0 8px 22px rgba(111,155,132,.12); }
    .calendar { background:#fff; color:#142033; border-radius:28px; padding:20px; border:1px solid #e1e8e4; }
    .calendar-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; gap:12px; }
    .weekdays, .days { display:grid; grid-template-columns:repeat(7,1fr); gap:6px; text-align:center; }
    .weekdays { color:#64748b; font-weight:900; font-size:12px; margin-bottom:7px; }
    .day { aspect-ratio:1; border:0; border-radius:13px; background:#f3f6f4; color:#94a3b8; font-weight:900; cursor:not-allowed; transition:.16s ease; }
    .day.available { background:#e8f4ef; color:#142033; cursor:pointer; }
    .day.available:hover { transform: scale(1.05); background:#d9eee5; }
    .day.selected { background:#142033; color:white; }
    .times { display:flex; gap:8px; flex-wrap:wrap; margin:18px 0; }
    .time { border:1px solid #e1e8e4; background:#fff; color:#142033; border-radius:999px; padding:10px 15px; font-weight:900; cursor:pointer; }
    .time.selected { background:#142033; color:white; border-color:#142033; }
    .form { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:18px; }
    .input, .textarea { width:100%; border:1px solid #e1e8e4; border-radius:17px; padding:13px 14px; background:#fff; color:#142033; outline:none; }
    .input:focus, .textarea:focus { border-color:#8fb69d; box-shadow:0 0 0 4px rgba(111,155,132,.12); }
    .textarea { grid-column:1/-1; min-height:110px; resize:vertical; line-height:1.55; }
    .upload { grid-column:1/-1; border:1px dashed #c9d9d1; border-radius:20px; padding:16px; background:#f8fbf9; }
    .upload input { display:none; }
    .upload-row { display:flex; gap:12px; align-items:center; flex-wrap:wrap; margin:10px 0; }
    .upload-label { display:inline-flex; background:#142033; color:#fff; border-radius:999px; padding:10px 14px; font-weight:900; cursor:pointer; }
    .consent { grid-column:1/-1; display:flex; gap:12px; align-items:flex-start; background:#f8fbf9; border:1px solid #e1e8e4; border-radius:20px; padding:14px; color:#475569; line-height:1.55; font-size:14px; }
    .consent input { width:18px; height:18px; accent-color:#6f9b84; margin-top:2px; flex:0 0 auto; }
    .consent a { color:#0d5f8c; font-weight:900; text-decoration:none; }
    .data-note { grid-column:1/-1; color:#667085; font-size:12px; line-height:1.6; }
    .confirm { margin-top:18px; padding:18px; border-radius:20px; background:#e9f8ef; color:#166534; font-weight:900; border:1px solid #bfe3cd; }
    .contact-grid { display:grid; grid-template-columns:.9fr 1.1fr; gap:24px; align-items:stretch; }
    .map { min-height:360px; border-radius:30px; background:linear-gradient(135deg,#e8f4ef,#fff 58%,#eee7d8); border:1px solid #e1e8e4; display:grid; place-items:center; color:#334155; font-weight:950; box-shadow:0 16px 45px rgba(20,32,51,.05); }
    details { background:#fff; border:1px solid #e1e8e4; border-radius:22px; padding:18px; box-shadow:0 12px 36px rgba(20,32,51,.04); }
    summary { cursor:pointer; font-weight:950; color:#142033; }
    .footer { background:#142033; color:rgba(255,255,255,.64); padding:34px 0; }
    .floating { position:fixed; right:22px; bottom:22px; z-index:40; }
    @media (max-width: 1060px) {
      .hero-grid, .booking-grid, .contact-grid { grid-template-columns:1fr; }
      .cards4 { grid-template-columns:repeat(2,1fr); }
      .clinic-photo-card, .clinic-photo, .clinic-fallback { min-height:460px; height:460px; }
      .hero-note { display:none; }
    }
    @media (max-width: 720px) {
      .container { width: calc(100% - 30px); }
      .nav button:not(.book) { display:none; }
      .cards4, .cards3, .form { grid-template-columns:1fr; }
      .section-head { display:block; }
      .hero { padding:58px 0; }
      .clinic-card-mini { grid-template-columns:1fr; }
      .rating-badge { align-items:flex-start; }
      h1 { font-size: clamp(40px, 12vw, 56px); }
      .floating { right:16px; bottom:16px; }
    }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { animation:none !important; transition:none !important; scroll-behavior:auto !important; }
      .reveal { opacity:1; transform:none; }
    }
  `;

  const Home = (
    <div className="page-enter">
      <section className="hero">
        <div className="container hero-grid">
          <div className="reveal visible">
            <div className="eyebrow">Registracija internetu 24/7</div>
            <h1>Šiuolaikinė odontologija <span>ramiai ir aiškiai</span></h1>
            <p className="lead">
              Skiriame laiko išklausyti, paaiškinti ir pasiūlyti geriausią sprendimą. Aiškus gydymo planas, rami aplinka ir patogi registracija internetu.
            </p>
            <div className="actions">
              <button className="btn" onClick={() => nav("booking")}>Registruotis vizitui</button>
              <button className="btn secondary" onClick={() => nav("services")}>Peržiūrėti paslaugas</button>
            </div>
            <div className="trust-row" aria-label="Klinikos privalumai">
              <span><i /> Aiškūs gydymo planai</span>
              <span><i /> Patyrę specialistai</span>
              <span><i /> Rami klinikos aplinka</span>
              <span><i /> Registracija internetu 24/7</span>
            </div>
          </div>

          <div className="hero-media reveal visible">
            <div className="clinic-photo-card">
              <img
                src="/klinika-hero.png"
                alt="Odontologijos klinikos aplinka"
                className="clinic-photo"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                  const fallback = event.currentTarget.nextElementSibling;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
              <div className="clinic-fallback">Įkelkite klinikos nuotrauką į public/klinika-hero.png</div>
              <div className="clinic-card-mini">
                <div>
                  <div className="clinic-title">JŪSŲ KLINIKOS PAVADINIMAS</div>
                  <div className="clinic-subtitle">Odontologijos klinika · profesionali priežiūra Jūsų šypsenai</div>
                </div>
                <div className="rating-badge">
                  <span>★★★★★ 4.9</span>
                  <small>pacientų įvertinimas</small>
                </div>
              </div>
            </div>
            <div className="hero-note">
              <small>Pacientų patirtis</small>
              <strong>Aiški informacija, patogi registracija ir pagarbus bendravimas.</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <h2>Ką pacientai vertina labiausiai</h2>
              <p className="muted">Profesionali svetainė turi ne tik atrodyti gražiai, bet ir sumažinti paciento abejones.</p>
            </div>
          </div>
          <div className="grid cards4">
            {[
              ["◎", "Aiškus planas", "Po konsultacijos aptariame eigą, alternatyvas ir preliminarią kainą."],
              ["◴", "Patogi registracija", "Pacientas gali registruotis bet kuriuo metu, net po darbo valandų."],
              ["✦", "Rami aplinka", "Švarus, estetiškas dizainas kuria medicininį pasitikėjimą."],
              ["☏", "Priminimai", "Pasirūpinsime, kad apie artėjantį vizitą būtumėte informuoti iš anksto."],
            ].map(([icon, title, text]) => (
              <article className="card reveal" key={title}>
                <div className="icon">{icon}</div>
                <h3>{title}</h3>
                <p className="muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const Services = (
    <section className="section page-enter">
      <div className="container">
        <div className="section-head reveal visible">
          <div>
            <h2>Paslaugos ir kainos</h2>
            <p className="muted">Orientacinės kainos padeda pacientui geriau suprasti galimus sprendimus. Tiksli kaina priklauso nuo individualios situacijos.</p>
          </div>
        </div>
        <div className="grid cards4">
          {services.map((service) => (
            <article className="card reveal" key={service.id}>
              <div className="icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p className="muted">{service.description}</p>
              <div className="price">{service.price}</div>
              <div className="small">{service.duration}</div>
              <button className="btn soft" style={{ marginTop: 18 }} onClick={() => chooseService(service)}>Registruotis</button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );

  const Doctors = (
    <section className="section page-enter">
      <div className="container">
        <div className="section-head reveal visible">
          <div>
            <h2>Gydytojų komanda</h2>
            <p className="muted">Specialistų pristatymas kuria pasitikėjimą dar prieš pirmą vizitą.</p>
          </div>
        </div>
        <div className="grid cards4">
          {doctors.map((doctor) => (
            <article className="card reveal" key={doctor.name}>
              <div className="doctor-photo">{initials(doctor.name)}</div>
              <h3>{doctor.name}</h3>
              <strong style={{ color: "#426653" }}>{doctor.role}</strong>
              <p className="small">{doctor.exp}</p>
              <p className="muted">{doctor.note}</p>
              <div className="doctor-tags">
                {doctor.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <button className="btn soft" onClick={() => nav("booking")}>Registruotis</button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );

  const Booking = (
    <section className="section booking page-enter">
      <div className="container">
        <div className="section-head reveal visible">
          <div>
            <h2>Registracija internetu</h2>
            <p className="muted">Užpildykite registraciją per mažiau nei minutę. Administratorius patvirtins vizitą darbo metu.</p>
          </div>
        </div>
        <div className="booking-grid">
          <div className="booking-panel reveal visible">
            <h3>1. Paslauga</h3>
            {services.map((service) => (
              <button key={service.id} className={`option ${selectedService.id === service.id ? "active" : ""}`} onClick={() => chooseService(service)}>
                <strong>{service.title}</strong><br /><small>{service.price} · {service.duration}</small>
              </button>
            ))}
            <h3 style={{ marginTop: 26 }}>2. Gydytojas</h3>
            {availableDoctors.map((doctor) => (
              <button key={doctor} className={`option ${selectedDoctor === doctor ? "active" : ""}`} onClick={() => setSelectedDoctor(doctor)}>
                {doctor}
              </button>
            ))}
          </div>

          <div className="booking-panel reveal visible">
            <h3>3. Pasirinkite dieną ir laiką</h3>
            <div className="calendar">
              <div className="calendar-top">
                <strong>2026 m. birželis</strong>
                <span className="small">Žalsvos dienos turi laisvų laikų</span>
              </div>
              <div className="weekdays">
                {["Pr", "An", "Tr", "Kt", "Pn", "Št", "Sk"].map((d) => <div key={d}>{d}</div>)}
              </div>
              <div className="days">
                {days.map((d) => (
                  <button key={d.iso} className={`day ${d.active ? "available" : ""} ${selectedDate === d.iso ? "selected" : ""}`} onClick={() => chooseDate(d.iso)}>
                    {d.day}
                  </button>
                ))}
              </div>

              {selectedDate && (
                <>
                  <div className="times">
                    {slots[selectedDate].map((slot) => (
                      <button key={slot} className={`time ${selectedTime === slot ? "selected" : ""}`} onClick={() => setSelectedTime(slot)}>
                        {slot}
                      </button>
                    ))}
                  </div>
                  <form onSubmit={submit} className="form">
                    <input className="input" placeholder="Vardas ir pavardė *" value={name} onChange={(e) => setName(e.target.value)} />
                    <input className="input" placeholder="Telefono numeris *" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <input className="input" placeholder="El. paštas (neprivaloma)" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input className="input" placeholder="Miestas / pastaba (neprivaloma)" />

                    <textarea
                      className="textarea"
                      placeholder="Trumpai aprašykite savo situaciją arba klausimą. Pvz. domina preliminari kaina, turite rentgeno nuotrauką arba norėtumėte pasikonsultuoti dėl gydymo galimybių."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />

                    <div className="upload">
                      <strong>Pridėkite rentgeno nuotrauką, jei turite</strong>
                      <p className="small">Rentgeno nuotrauka gali padėti tiksliau įvertinti situaciją ir pateikti preliminarias rekomendacijas.</p>
                      <div className="upload-row">
                        <label className="upload-label">
                          Įkelti failą
                          <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setXrayFile(e.target.files?.[0]?.name || "")} />
                        </label>
                        <span className="small">{xrayFile || "Failas nepasirinktas"}</span>
                      </div>
                      <p className="small">Priimami formatai: PDF, JPG, PNG. Maksimalus failo dydis – 10 MB.</p>
                    </div>

                    <label className="consent">
                      <input type="checkbox" checked={privacyAccepted} onChange={(e) => setPrivacyAccepted(e.target.checked)} />
                      <span>
                        Susipažinau su <a href="/privatumas">privatumo politika</a> ir sutinku, kad mano pateikti duomenys būtų naudojami užklausos administravimui. *
                      </span>
                    </label>

                    <p className="data-note">Jūsų pateikti duomenys naudojami tik užklausos nagrinėjimui ir nėra perduodami tretiesiems asmenims be teisėto pagrindo.</p>

                    <button className="btn" type="submit" disabled={!privacyAccepted || !name || !phone}>Patvirtinti registraciją</button>
                  </form>
                </>
              )}

              {confirmed && <div className="confirm">Registracija gauta: {selectedService.title}, {selectedDoctor}, {selectedDate} {selectedTime}. Susisieksime dėl patvirtinimo.</div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const Contact = (
    <section className="section page-enter">
      <div className="container contact-grid">
        <div className="reveal visible">
          <h2>Kontaktai</h2>
          <p className="muted">Susisiekite telefonu arba registruokitės internetu jums patogiu metu.</p>
          <div className="card">
            <p><strong>Telefonas:</strong> +370 600 00000</p>
            <p><strong>El. paštas:</strong> info@jusuklinika.lt</p>
            <p><strong>Adresas:</strong> Vilnius, Lietuva</p>
            <p><strong>Darbo laikas:</strong> I–V 08:00–19:00, VI 09:00–14:00</p>
          </div>
        </div>
        <div className="map reveal visible">Google Maps vieta / klinikos lokacija</div>
      </div>
    </section>
  );

  return (
    <div className="site">
      <style>{css}</style>

      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="container header-inner">
          <div className="logo" onClick={() => nav("home")}>
            <div className="logo-mark">+</div>
            <div>
              JŪSŲ LOGOTIPO VIETA
              <small>Odontologijos klinikos svetainės demonstracija</small>
            </div>
          </div>
          <nav className="nav">
            <button className={view === "home" ? "active" : ""} onClick={() => nav("home")}>Pagrindinis</button>
            <button className={view === "services" ? "active" : ""} onClick={() => nav("services")}>Paslaugos</button>
            <button className={view === "doctors" ? "active" : ""} onClick={() => nav("doctors")}>Gydytojai</button>
            <button className={view === "contact" ? "active" : ""} onClick={() => nav("contact")}>Kontaktai</button>
            <button className="btn book" onClick={() => nav("booking")}>Registruotis</button>
          </nav>
        </div>
      </header>

      {view === "home" && Home}
      {view === "services" && Services}
      {view === "doctors" && Doctors}
      {view === "booking" && Booking}
      {view === "contact" && Contact}

      <section className="section soft" style={{ paddingTop: view === "home" ? 20 : 50 }}>
        <div className="container">
          <div className="section-head reveal">
            <div>
              <h2>Pacientų atsiliepimai</h2>
              <p className="muted">Socialinis pasitikėjimas yra viena svarbiausių profesionalios medicinos svetainės dalių.</p>
            </div>
          </div>
          <div className="grid cards3">
            {reviews.map((review) => (
              <article className="card reveal" key={review.name}>
                <strong style={{ color: "#d0a045", letterSpacing: 2 }}>★★★★★</strong>
                <p>„{review.text}“</p>
                <span className="small">– {review.name}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid cards3">
            <details open className="reveal">
              <summary>Ar konsultacijos metu gausiu gydymo planą?</summary>
              <p className="muted">Taip, aptarsime situaciją, galimus sprendimus ir preliminarią kainą.</p>
            </details>
            <details className="reveal">
              <summary>Kiek trunka burnos higiena?</summary>
              <p className="muted">Dažniausiai 45–60 min., priklausomai nuo burnos būklės.</p>
            </details>
            <details className="reveal">
              <summary>Ar gausiu priminimą prieš vizitą?</summary>
              <p className="muted">Pasirūpinsime, kad apie artėjantį vizitą būtumėte informuoti iš anksto.</p>
            </details>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          <span>© 2026 Jūsų klinikos pavadinimas</span>
          <span style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href="/privatumas" style={{ color: "inherit", textDecoration: "none" }}>Privatumo politika</a>
            <span>·</span>
            <a href="/privatumas#slapukai" style={{ color: "inherit", textDecoration: "none" }}>Slapukai</a>
            <span>·</span>
            <a href="/privatumas#sutikimai" style={{ color: "inherit", textDecoration: "none" }}>Duomenų sutikimai</a>
          </span>
        </div>
      </footer>

      <button className="btn floating" onClick={() => nav("booking")}>📅 Registruotis</button>
    </div>
  );
}
