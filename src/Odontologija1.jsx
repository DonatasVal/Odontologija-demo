import { useMemo, useState } from "react";

// ── Duomenys ─────────────────────────────────────────────────
const SERVICES = [
  { id: "higiena",      icon: "✦", title: "Profesionali burnos higiena",         price: "70 €",     duration: "45–60 min.", desc: "Apnašų ir pigmentacijos pašalinimas, Air-Flow srovė ir dantų poliravimas.", doctors: ["Dr. Lina Vaitkūnienė","Dr. Monika Vaičiulytė"] },
  { id: "konsultacija", icon: "◎", title: "Pirminė konsultacija ir gydymo planas", price: "30 €",   duration: "30 min.",    desc: "Apžiūra, situacijos paaiškinimas ir aiškus tolimesnio gydymo planas.",      doctors: ["Dr. Jonas Petrauskas","Dr. Monika Vaičiulytė"] },
  { id: "plombavimas",  icon: "◈", title: "Terapinis gydymas / plombavimas",      price: "nuo 60 €", duration: "45–90 min.", desc: "Karieso gydymas, estetiškas plombos atkūrimas ir poliravimas.",             doctors: ["Dr. Jonas Petrauskas"] },
  { id: "chirurgija",   icon: "◇", title: "Dantų šalinimas",                      price: "nuo 80 €", duration: "30–60 min.", desc: "Atraumatinis dantų šalinimas ir aiškios rekomendacijos po procedūros.",     doctors: ["Dr. Marius Čepas"] },
];

const DOCTORS = [
  { name: "Dr. Jonas Petrauskas",  role: "Terapinis gydymas",  exp: "10 m. patirtis", note: "Aiškiai paaiškina gydymo eigą ir parenka tinkamiausią sprendimą." },
  { name: "Dr. Lina Vaitkūnienė", role: "Burnos higiena",     exp: "7 m. patirtis",  note: "Švelni, kruopšti profesionali burnos higiena net jautresniems pacientams." },
  { name: "Dr. Marius Čepas",     role: "Burnos chirurgija",  exp: "12 m. patirtis", note: "Dantų šalinimas, chirurginės konsultacijos ir pooperacinė priežiūra." },
  { name: "Dr. Monika Vaičiulytė",role: "Konsultacijos",      exp: "8 m. patirtis",  note: "Išsamūs gydymo planai, profilaktikos rekomendacijos ir paciento poreikių įvertinimas." },
];

const SLOTS = {
  "2026-06-08": ["09:00","11:00","14:00","16:30"],
  "2026-06-09": ["10:00","12:30","15:30"],
  "2026-06-10": ["09:30","13:00","17:00"],
  "2026-06-11": ["10:30","14:30","16:00"],
  "2026-06-12": ["09:00","11:30","15:00"],
  "2026-06-15": ["10:00","13:30","17:30"],
  "2026-06-16": ["09:30","12:00","15:30"],
  "2026-06-17": ["11:00","14:00","16:00"],
  "2026-06-18": ["09:00","13:00","15:30"],
  "2026-06-19": ["10:30","14:30"],
};

const REVIEWS = [
  { stars: 5, text: "Labai aiškiai paaiškino gydymo eigą ir kainą. Jaučiausi ramiai viso vizito metu.", name: "Milda K.", date: "prieš 2 sav." },
  { stars: 5, text: "Patogi registracija internetu ir malonus, dėmesingas personalas. Rekomenduoju.", name: "Tomas R.", date: "prieš 1 mėn." },
  { stars: 5, text: "Švari aplinka, profesionali higiena ir aiškios rekomendacijos po procedūros.", name: "Rasa M.", date: "prieš 3 sav." },
];

const FAQS = [
  { q: "Ar konsultacijos metu gausiu gydymo planą?", a: "Taip — aptarsime situaciją, galimus sprendimus ir preliminarią kainą be jokių įsipareigojimų." },
  { q: "Kiek trunka burnos higiena?", a: "Dažniausiai 45–60 min., priklausomai nuo burnos būklės ir naudojamų metodų." },
  { q: "Ar gausiu priminimą prieš vizitą?", a: "Taip. Automatinis priminimas išsiunčiamas SMS ir el. paštu likus 24 val. iki vizito." },
  { q: "Kokios mokėjimo galimybės?", a: "Mokame grynaisiais, banko kortele. Taip pat galima išsimokėjimas 0% palūkanomis per bankus." },
  { q: "Ar priimate vaikus?", a: "Taip — gydome pacientus nuo 6 metų. Suaugusio lydėjimas būtinas iki 16 metų." },
  { q: "Kaip atšaukti ar perkelti vizitą?", a: "Skambinkite telefonu arba rašykite el. paštu likus bent 24 val. — be jokių papildomų mokesčių." },
];

const LT_MONTHS = ["Sausis","Vasaris","Kovas","Balandis","Gegužė","Birželis","Liepa","Rugpjūtis","Rugsėjis","Spalis","Lapkritis","Gruodis"];
const LT_SHORT  = ["Pr","An","Tr","Kt","Pn","Št","Sk"];

// ── Kalendoriaus komponentas ─────────────────────────────────
function Calendar({ selected, onSelect }) {
  const today = new Date(); today.setHours(0,0,0,0);
  const [yr, setYr] = useState(today.getFullYear());
  const [mo, setMo] = useState(today.getMonth());

  const available = new Set(Object.keys(SLOTS));
  const key = (y,m,d) => `${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
  const firstDow = new Date(yr,mo,1).getDay();
  const offset   = firstDow === 0 ? 6 : firstDow - 1;
  const dim      = new Date(yr,mo+1,0).getDate();
  const cells    = [...Array(offset).fill(null), ...Array.from({length:dim},(_,i)=>i+1)];

  const prev = () => mo===0 ? (setMo(11),setYr(y=>y-1)) : setMo(m=>m-1);
  const next = () => mo===11? (setMo(0), setYr(y=>y+1)) : setMo(m=>m+1);
  const canPrev = new Date(yr,mo-1,1) >= new Date(today.getFullYear(),today.getMonth(),1);

  return (
    <div className="cal">
      <div className="cal-hd">
        <button className="cal-arr" onClick={prev} disabled={!canPrev}>‹</button>
        <span className="cal-lbl">{LT_MONTHS[mo]} {yr}</span>
        <button className="cal-arr" onClick={next}>›</button>
      </div>
      <div className="cal-dow">{LT_SHORT.map(d=><span key={d}>{d}</span>)}</div>
      <div className="cal-cells">
        {cells.map((d,i)=>{
          if(!d) return <span key={`e${i}`} />;
          const k   = key(yr,mo,d);
          const dt  = new Date(yr,mo,d);
          const past= dt<today;
          const avl = available.has(k) && !past;
          const sel = selected===k;
          const now = dt.getTime()===today.getTime();
          return (
            <button key={k}
              className={`cal-d${avl?" avl":""}${sel?" sel":""}${past?" past":""}${now&&!past?" now":""}`}
              disabled={!avl} onClick={()=>onSelect(k)}>
              {d}
              {avl && <i/>}
            </button>
          );
        })}
      </div>
      <div className="cal-leg">
        <span><b className="dot-avl"/>Laisva</span>
        <span><b className="dot-sel"/>Pasirinkta</span>
        <span><b className="dot-pas"/>Užimta</span>
      </div>
    </div>
  );
}

// ── CSS ──────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap');

*{box-sizing:border-box;margin:0;padding:0}
:root{
  --cream:#FAFAF7; --cream2:#F5F4EF; --cream3:#EDECE5;
  --navy:#0D1F35;  --navy2:#162940; --navy3:#1E3A52;
  --gold:#B8955A;  --gold2:#D4AE72; --gold3:#F2DEBB;
  --blue:#1B6CA8;  --blue2:#2480C2; --blue3:#E0EEF8;
  --text:#1A1A2E;  --muted:#6B7280; --border:#E4E2D8;
  --white:#FFFFFF;
  --r-sm:12px; --r-md:20px; --r-lg:28px; --r-xl:36px;
  --sh-sm:0 2px 12px rgba(13,31,53,.06);
  --sh-md:0 8px 32px rgba(13,31,53,.10);
  --sh-lg:0 20px 60px rgba(13,31,53,.14);
  --sh-xl:0 40px 100px rgba(13,31,53,.18);
}
html{scroll-behavior:smooth}
body{font-family:'Inter',sans-serif;color:var(--text);background:var(--cream);-webkit-font-smoothing:antialiased}

/* ── LAYOUT ─────────────────────────────────────────────── */
.site{min-height:100vh;overflow-x:hidden}
.wrap{width:min(1200px,calc(100% - 48px));margin:0 auto}

/* ── HEADER ─────────────────────────────────────────────── */
.hdr{position:sticky;top:0;z-index:100;background:rgba(250,250,247,.95);backdrop-filter:blur(20px);border-bottom:1px solid var(--border)}
.hdr-in{height:72px;display:flex;justify-content:space-between;align-items:center;gap:20px}
.logo{display:flex;align-items:center;gap:14px;text-decoration:none;color:var(--navy)}
.logo-mark{width:42px;height:42px;border-radius:14px;background:var(--navy);display:flex;align-items:center;justify-content:center}
.logo-mark svg{width:20px;height:20px}
.logo-name{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:var(--navy);letter-spacing:-.02em}
.logo-sub{font-size:11px;color:var(--muted);font-weight:500;letter-spacing:.04em;text-transform:uppercase;margin-top:1px}
.nav-links{display:flex;align-items:center;gap:4px}
.nav-links button{border:none;background:transparent;padding:9px 14px;border-radius:999px;cursor:pointer;font-family:'Inter',sans-serif;font-weight:500;font-size:14px;color:var(--muted);transition:all .15s}
.nav-links button:hover,.nav-links button.on{background:var(--cream2);color:var(--navy)}
.nav-book{border:none;border-radius:999px;padding:11px 24px;background:var(--navy);color:var(--white);font-family:'Inter',sans-serif;font-weight:600;font-size:14px;cursor:pointer;box-shadow:0 4px 20px rgba(13,31,53,.25);transition:all .2s}
.nav-book:hover{background:var(--navy2);transform:translateY(-1px);box-shadow:0 8px 28px rgba(13,31,53,.30)}

/* ── BUTTONS ─────────────────────────────────────────────── */
.btn{border:none;border-radius:999px;padding:14px 28px;font-family:'Inter',sans-serif;font-weight:600;font-size:15px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:8px;transition:all .2s}
.btn-primary{background:var(--navy);color:var(--white);box-shadow:0 8px 28px rgba(13,31,53,.25)}
.btn-primary:hover{background:var(--navy2);transform:translateY(-2px);box-shadow:0 14px 36px rgba(13,31,53,.30)}
.btn-primary:disabled{background:var(--muted);box-shadow:none;transform:none;cursor:not-allowed}
.btn-outline{background:transparent;color:var(--navy);border:1.5px solid var(--border)}
.btn-outline:hover{border-color:var(--navy);background:var(--cream2)}
.btn-gold{background:var(--gold);color:var(--white);box-shadow:0 8px 24px rgba(184,149,90,.30)}
.btn-gold:hover{background:var(--gold2);transform:translateY(-1px)}
.btn-soft{background:var(--cream2);color:var(--navy);border:1px solid var(--border)}
.btn-soft:hover{background:var(--cream3);border-color:var(--navy)}

/* ── HERO ────────────────────────────────────────────────── */
.hero{padding:100px 0 80px;position:relative;overflow:hidden;background:linear-gradient(160deg,var(--cream) 0%,var(--cream2) 60%,var(--cream3) 100%)}
.hero::before{content:'';position:absolute;top:-300px;right:-200px;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(184,149,90,.07) 0%,transparent 65%);pointer-events:none}
.hero::after{content:'';position:absolute;bottom:-100px;left:-100px;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(27,108,168,.05) 0%,transparent 65%);pointer-events:none}
.hero-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:60px;align-items:center}
.hero-eyebrow{display:inline-flex;align-items:center;gap:8px;background:var(--gold3);color:var(--gold);border-radius:999px;padding:8px 18px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:24px}
.hero-eyebrow::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--gold);flex-shrink:0}
.hero h1{font-family:'Playfair Display',serif;font-size:clamp(44px,5.5vw,76px);line-height:1.02;letter-spacing:-.03em;color:var(--navy);margin-bottom:22px}
.hero h1 em{font-style:italic;color:var(--gold)}
.hero-lead{font-size:18px;line-height:1.75;color:var(--muted);max-width:520px;margin-bottom:36px;font-weight:400}
.hero-actions{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:48px}
.hero-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.hstat{background:var(--white);border:1px solid var(--border);border-radius:var(--r-lg);padding:20px;box-shadow:var(--sh-sm)}
.hstat-val{font-family:'Playfair Display',serif;font-size:28px;font-weight:700;color:var(--navy);line-height:1;margin-bottom:4px}
.hstat-lbl{font-size:12px;color:var(--muted);font-weight:500;line-height:1.4}

/* ── HERO CARD ───────────────────────────────────────────── */
.hero-visual{position:relative}
.photo-card{border-radius:var(--r-xl);overflow:hidden;background:var(--cream3);box-shadow:var(--sh-xl);position:relative;aspect-ratio:.78/1}
.photo-card img{width:100%;height:100%;object-fit:cover;display:block}
.photo-placeholder{width:100%;height:100%;min-height:560px;background:linear-gradient(160deg,#D5E8F5 0%,#B8D4EA 50%,#9DC0E0 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px}
.photo-placeholder svg{opacity:.25}
.photo-placeholder span{font-size:13px;font-weight:600;color:var(--navy);opacity:.4;letter-spacing:.06em;text-transform:uppercase}
.photo-overlay{position:absolute;left:20px;right:20px;bottom:20px;z-index:2;padding:22px 24px;border-radius:var(--r-lg);background:rgba(13,31,53,.72);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.14);color:var(--white)}
.photo-clinic{font-family:'Playfair Display',serif;font-size:26px;font-weight:700;letter-spacing:-.02em;margin-bottom:5px}
.photo-sub{font-size:13px;opacity:.75;font-weight:500;margin-bottom:14px}
.photo-tags{display:flex;gap:8px;flex-wrap:wrap}
.photo-tags span{background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.2);border-radius:999px;padding:6px 12px;font-size:12px;font-weight:600}
.hero-badge{position:absolute;top:24px;right:-16px;background:var(--white);border-radius:var(--r-md);padding:14px 18px;box-shadow:var(--sh-md);display:flex;align-items:center;gap:12px;z-index:3}
.hero-badge-icon{width:38px;height:38px;border-radius:12px;background:var(--gold3);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
.hero-badge-val{font-weight:700;font-size:15px;color:var(--navy);line-height:1.2}
.hero-badge-sub{font-size:11px;color:var(--muted);font-weight:500}

/* ── TRUST BAR ───────────────────────────────────────────── */
.trust-bar{background:var(--navy);padding:20px 0}
.trust-items{display:flex;align-items:center;justify-content:center;gap:0;flex-wrap:wrap}
.trust-item{display:flex;align-items:center;gap:10px;padding:8px 28px;color:rgba(255,255,255,.8);font-size:14px;font-weight:500}
.trust-item:not(:last-child){border-right:1px solid rgba(255,255,255,.15)}
.trust-icon{font-size:18px;opacity:.9}

/* ── SECTIONS ────────────────────────────────────────────── */
.sec{padding:88px 0}
.sec-bg{background:var(--cream2)}
.sec-dark{background:var(--navy);color:var(--white)}
.sec-label{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);margin-bottom:10px}
.sec-title{font-family:'Playfair Display',serif;font-size:clamp(32px,4vw,52px);color:var(--navy);line-height:1.08;letter-spacing:-.02em;margin-bottom:16px}
.sec-title em{font-style:italic;color:var(--gold)}
.sec-dark .sec-title{color:var(--white)}
.sec-subtitle{font-size:17px;color:var(--muted);line-height:1.7;max-width:560px;margin-bottom:48px}
.sec-dark .sec-subtitle{color:rgba(255,255,255,.65)}
.sec-hd{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;margin-bottom:40px;flex-wrap:wrap}
.divider{width:48px;height:2px;background:var(--gold);border-radius:2px;margin:16px 0 24px}

/* ── CARDS ───────────────────────────────────────────────── */
.card{background:var(--white);border:1px solid var(--border);border-radius:var(--r-xl);padding:28px;box-shadow:var(--sh-sm);transition:transform .2s,box-shadow .2s}
.card:hover{transform:translateY(-4px);box-shadow:var(--sh-lg)}
.card-dark{background:rgba(255,255,255,.07);border-color:rgba(255,255,255,.12);color:var(--white)}
.grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.grid-2{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}

/* ── FEATURES ────────────────────────────────────────────── */
.feat-icon{width:52px;height:52px;border-radius:var(--r-sm);background:var(--cream2);color:var(--gold);display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:18px;border:1px solid var(--border)}
.feat-title{font-weight:700;font-size:16px;color:var(--navy);margin-bottom:8px}
.feat-desc{font-size:14px;color:var(--muted);line-height:1.65}

/* ── SERVICES ────────────────────────────────────────────── */
.svc-accent{height:3px;border-radius:3px 3px 0 0;background:var(--gold);margin:-28px -28px 24px;border-radius:var(--r-xl) var(--r-xl) 0 0}
.svc-icon{font-size:20px;color:var(--gold);margin-bottom:12px;font-weight:700}
.svc-title{font-weight:700;font-size:16px;color:var(--navy);margin-bottom:8px}
.svc-desc{font-size:14px;color:var(--muted);line-height:1.65;margin-bottom:20px}
.svc-footer{display:flex;align-items:center;justify-content:space-between;padding-top:16px;border-top:1px solid var(--border)}
.svc-price{font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:var(--navy)}
.svc-dur{font-size:12px;color:var(--muted);background:var(--cream2);padding:5px 12px;border-radius:999px;font-weight:500}

/* ── DOCTORS ─────────────────────────────────────────────── */
.doc-avatar{width:72px;height:72px;border-radius:var(--r-md);background:linear-gradient(135deg,var(--navy),var(--navy3));color:var(--white);display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-size:24px;font-weight:700;margin-bottom:18px;box-shadow:var(--sh-sm)}
.doc-name{font-weight:700;font-size:16px;color:var(--navy);margin-bottom:4px}
.doc-role{font-size:13px;color:var(--gold);font-weight:600;margin-bottom:4px}
.doc-exp{font-size:12px;color:var(--muted);margin-bottom:12px}
.doc-note{font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:20px}

/* ── FIRST VISIT ─────────────────────────────────────────── */
.fv-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:40px}
.fv-step{position:relative;padding:28px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:var(--r-xl)}
.fv-num{font-family:'Playfair Display',serif;font-size:56px;font-weight:700;color:rgba(255,255,255,.08);line-height:1;margin-bottom:-8px}
.fv-title{font-weight:700;font-size:16px;color:var(--white);margin-bottom:8px}
.fv-desc{font-size:14px;color:rgba(255,255,255,.6);line-height:1.65}
.fv-info{display:flex;gap:16px;flex-wrap:wrap}
.fv-chip{display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);border-radius:var(--r-md);padding:14px 18px}
.fv-chip-icon{font-size:20px}
.fv-chip-lbl{font-size:12px;color:rgba(255,255,255,.55);font-weight:500}
.fv-chip-val{font-size:15px;font-weight:700;color:var(--white)}

/* ── REVIEWS ─────────────────────────────────────────────── */
.rev-stars{color:var(--gold);font-size:15px;letter-spacing:2px;margin-bottom:14px}
.rev-text{font-size:15px;color:var(--muted);line-height:1.7;margin-bottom:16px;font-style:italic}
.rev-text::before{content:'"';font-family:'Playfair Display',serif;font-size:36px;color:var(--gold3);line-height:0;vertical-align:-12px;margin-right:4px}
.rev-author{display:flex;align-items:center;gap:10px}
.rev-avatar{width:36px;height:36px;border-radius:50%;background:var(--cream3);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;color:var(--navy);border:1.5px solid var(--border)}
.rev-name{font-weight:600;font-size:14px;color:var(--navy)}
.rev-date{font-size:12px;color:var(--muted)}
.rev-summary{display:flex;align-items:center;gap:20px;padding:24px 28px;background:var(--navy);border-radius:var(--r-xl);margin-bottom:28px;color:var(--white);flex-wrap:wrap}
.rev-big{font-family:'Playfair Display',serif;font-size:48px;font-weight:700;color:var(--gold);line-height:1}
.rev-info{font-size:14px;color:rgba(255,255,255,.65);line-height:1.6}

/* ── PAYMENTS ────────────────────────────────────────────── */
.pay-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.pay-card{background:var(--white);border:1px solid var(--border);border-radius:var(--r-lg);padding:22px;text-align:center;box-shadow:var(--sh-sm)}
.pay-icon{font-size:28px;margin-bottom:12px}
.pay-title{font-weight:700;font-size:15px;color:var(--navy);margin-bottom:6px}
.pay-desc{font-size:13px;color:var(--muted);line-height:1.55}

/* ── BOOKING ─────────────────────────────────────────────── */
.booking{background:var(--navy);padding:80px 0;color:var(--white)}
.bk-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:28px;align-items:start}
.bk-card{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:var(--r-xl);padding:28px;color:var(--white)}
.bk-card h3{font-family:'Playfair Display',serif;font-size:18px;color:var(--white);margin-bottom:14px;font-weight:600}
.bk-option{width:100%;text-align:left;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.05);color:var(--white);border-radius:var(--r-md);padding:14px 16px;margin-bottom:8px;cursor:pointer;transition:all .15s;font-family:'Inter',sans-serif;font-size:14px}
.bk-option:hover{background:rgba(255,255,255,.10);border-color:rgba(255,255,255,.25)}
.bk-option.on{background:rgba(184,149,90,.2);border-color:var(--gold);color:var(--white)}
.bk-sep{height:1px;background:rgba(255,255,255,.1);margin:20px 0}

/* ── CALENDAR ────────────────────────────────────────────── */
.cal{background:var(--white);color:var(--text);border-radius:var(--r-xl);padding:22px;box-shadow:var(--sh-md)}
.cal-hd{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}
.cal-lbl{font-family:'Playfair Display',serif;font-size:17px;font-weight:700;color:var(--navy)}
.cal-arr{width:34px;height:34px;border-radius:50%;border:1.5px solid var(--border);background:var(--white);font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--navy);transition:all .15s}
.cal-arr:hover:not(:disabled){border-color:var(--navy);background:var(--cream2)}
.cal-arr:disabled{opacity:.3;cursor:not-allowed}
.cal-dow{display:grid;grid-template-columns:repeat(7,1fr);margin-bottom:8px}
.cal-dow span{text-align:center;font-size:11px;font-weight:700;color:var(--muted);padding:4px 0;letter-spacing:.05em}
.cal-cells{display:grid;grid-template-columns:repeat(7,1fr);gap:5px}
.cal-d{aspect-ratio:1;border-radius:var(--r-sm);border:none;background:transparent;font-family:'Inter',sans-serif;font-size:13px;font-weight:500;color:var(--muted);cursor:not-allowed;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;transition:all .15s}
.cal-d.avl{background:var(--blue3);color:var(--navy);font-weight:700;cursor:pointer;box-shadow:var(--sh-sm)}
.cal-d.avl:hover{background:rgba(27,108,168,.2);transform:scale(1.1)}
.cal-d.sel{background:var(--navy)!important;color:var(--white)!important;box-shadow:var(--sh-md);transform:scale(1.1)}
.cal-d.past{opacity:.3}
.cal-d.now::after{content:'';position:absolute;bottom:4px;width:4px;height:4px;border-radius:50%;background:var(--gold)}
.cal-d.sel.now::after{background:rgba(255,255,255,.6)}
.cal-d i{position:absolute;bottom:4px;width:4px;height:4px;border-radius:50%;background:var(--blue);font-style:normal}
.cal-d.sel i{background:rgba(255,255,255,.5)}
.cal-leg{display:flex;gap:16px;margin-top:14px;flex-wrap:wrap}
.cal-leg span{display:flex;align-items:center;gap:6px;font-size:11px;color:var(--muted);font-weight:500}
.dot-avl,.dot-sel,.dot-pas{width:10px;height:10px;border-radius:50%;display:inline-block;flex-shrink:0}
.dot-avl{background:var(--blue)}
.dot-sel{background:var(--navy)}
.dot-pas{background:var(--border)}

/* ── TIMES ───────────────────────────────────────────────── */
.times{display:flex;flex-wrap:wrap;gap:8px;margin:16px 0}
.time-btn{border:1.5px solid rgba(255,255,255,.2);background:rgba(255,255,255,.06);color:var(--white);border-radius:999px;padding:9px 16px;cursor:pointer;font-family:'Inter',sans-serif;font-weight:600;font-size:13px;transition:all .15s}
.time-btn:hover{border-color:var(--gold);background:rgba(184,149,90,.15)}
.time-btn.on{background:var(--gold);border-color:var(--gold);color:var(--white);box-shadow:0 4px 14px rgba(184,149,90,.35)}

/* ── FORM ────────────────────────────────────────────────── */
.form{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:16px}
.input,.textarea{width:100%;padding:13px 16px;border-radius:var(--r-md);border:1.5px solid rgba(255,255,255,.18);background:rgba(255,255,255,.07);color:var(--white);font-family:'Inter',sans-serif;font-size:14px;transition:border-color .15s}
.input::placeholder,.textarea::placeholder{color:rgba(255,255,255,.35)}
.input:focus,.textarea:focus{outline:none;border-color:var(--gold)}
.textarea{grid-column:1/-1;min-height:100px;resize:vertical;line-height:1.55}
.upload{grid-column:1/-1;border:1.5px dashed rgba(255,255,255,.2);background:rgba(255,255,255,.04);border-radius:var(--r-md);padding:16px}
.upload input{display:none}
.upload-lbl{display:inline-flex;align-items:center;gap:8px;border-radius:999px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);color:var(--white);padding:10px 16px;font-weight:600;font-size:13px;cursor:pointer;transition:all .15s}
.upload-lbl:hover{background:rgba(255,255,255,.15)}
.consent{grid-column:1/-1;display:flex;gap:12px;align-items:flex-start;padding:14px;border-radius:var(--r-md);background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.7);line-height:1.55;font-size:13px}
.consent input{width:18px;height:18px;margin-top:2px;accent-color:var(--gold);flex:0 0 auto}
.consent a{color:var(--gold);text-decoration:none;font-weight:600}
.data-note{grid-column:1/-1;font-size:12px;color:rgba(255,255,255,.4);line-height:1.6}
.confirm-box{margin-top:16px;padding:18px;border-radius:var(--r-md);background:rgba(16,185,129,.15);border:1px solid rgba(16,185,129,.3);color:#6EE7B7;font-weight:600;line-height:1.6}
.confirm-icon{font-size:24px;margin-bottom:8px}

/* ── FAQ ─────────────────────────────────────────────────── */
.faq-item{background:var(--white);border:1px solid var(--border);border-radius:var(--r-lg);overflow:hidden;margin-bottom:10px;transition:box-shadow .2s}
.faq-item:hover{box-shadow:var(--sh-sm)}
.faq-item summary{font-weight:600;font-size:15px;cursor:pointer;padding:18px 22px;color:var(--navy);list-style:none;display:flex;justify-content:space-between;align-items:center}
.faq-item summary::after{content:'＋';font-size:18px;color:var(--gold);flex-shrink:0}
.faq-item[open] summary::after{content:'－'}
.faq-body{padding:0 22px 18px;font-size:14px;color:var(--muted);line-height:1.7}

/* ── CONTACT ─────────────────────────────────────────────── */
.contact-grid{display:grid;grid-template-columns:1fr 1.4fr;gap:28px;align-items:start}
.contact-info{display:flex;flex-direction:column;gap:12px;margin-bottom:24px}
.cinfo-row{display:flex;align-items:flex-start;gap:14px;padding:16px;background:var(--white);border:1px solid var(--border);border-radius:var(--r-md)}
.cinfo-icon{width:38px;height:38px;border-radius:10px;background:var(--cream2);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
.cinfo-lbl{font-size:12px;color:var(--muted);font-weight:500;margin-bottom:2px}
.cinfo-val{font-size:14px;font-weight:600;color:var(--navy)}
.map-placeholder{min-height:360px;border-radius:var(--r-xl);background:linear-gradient(135deg,var(--blue3) 0%,var(--cream3) 100%);border:1px solid var(--border);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;color:var(--navy);font-weight:700;font-size:15px}

/* ── FOOTER ──────────────────────────────────────────────── */
.footer{background:var(--navy);padding:40px 0;color:rgba(255,255,255,.55)}
.footer-in{display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap}
.footer-logo{font-family:'Playfair Display',serif;font-size:18px;color:var(--white);font-weight:700}
.footer-links{display:flex;gap:24px;flex-wrap:wrap}
.footer-links a{color:rgba(255,255,255,.45);text-decoration:none;font-size:13px;font-weight:500;transition:color .15s}
.footer-links a:hover{color:rgba(255,255,255,.85)}

/* ── FLOATING ────────────────────────────────────────────── */
.floating{position:fixed;right:22px;bottom:22px;z-index:100}

/* ── MOBILE ──────────────────────────────────────────────── */
@media(max-width:1060px){
  .hero-grid,.bk-grid,.contact-grid{grid-template-columns:1fr}
  .grid-4{grid-template-columns:repeat(2,1fr)}
  .hero-stats,.fv-steps,.pay-grid{grid-template-columns:repeat(2,1fr)}
  .hero-badge{display:none}
  .hero{padding:80px 0 60px}
}
@media(max-width:640px){
  .nav-links button:not(.active){display:none}
  .grid-4,.grid-3,.grid-2,.hero-stats,.fv-steps,.pay-grid{grid-template-columns:1fr}
  .form{grid-template-columns:1fr}
  .wrap{width:calc(100% - 32px)}
  .trust-item{border-right:none;padding:8px 16px}
}
`;

// ── Komponentas ──────────────────────────────────────────────
export default function Odontologija1() {
  const [view, setView]                 = useState("home");
  const [selSvc, setSelSvc]             = useState(SERVICES[0]);
  const [selDoc, setSelDoc]             = useState(SERVICES[0].doctors[0]);
  const [selDate, setSelDate]           = useState("");
  const [selTime, setSelTime]           = useState("");
  const [name, setName]                 = useState("");
  const [phone, setPhone]               = useState("");
  const [msg, setMsg]                   = useState("");
  const [xray, setXray]                 = useState("");
  const [agreed, setAgreed]             = useState(false);
  const [done, setDone]                 = useState(false);
  const [openFaq, setOpenFaq]           = useState(null);

  const availDocs = useMemo(() => selSvc.doctors, [selSvc]);
  const availTimes = selDate ? SLOTS[selDate] || [] : [];

  const go = v => { setView(v); window.scrollTo({top:0,behavior:"smooth"}); };
  const pickSvc = s => { setSelSvc(s); setSelDoc(s.doctors[0]); setSelDate(""); setSelTime(""); setDone(false); go("booking"); };
  const pickDate = d => { if(!SLOTS[d]) return; setSelDate(d); setSelTime(SLOTS[d][0]); setDone(false); };
  const onSubmit = e => { e.preventDefault(); if(name&&phone&&selDate&&selTime&&agreed) setDone(true); };

  const initials = name => {
    const parts = name.split(" ");
    return ((parts[0]?.[0]||"")+(parts[1]?.[0]||"")).toUpperCase()||"D";
  };

  const fmtDate = d => {
    if(!d) return "";
    const [y,m,day] = d.split("-");
    return `${day} ${LT_MONTHS[parseInt(m)-1]} ${y}`;
  };

  // ── Puslapiai ──────────────────────────────────────────────
  const Home = (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <div className="hero-eyebrow">Registracija internetu 24/7</div>
            <h1>Odontologija be<br/><em>streso</em> ir skubėjimo</h1>
            <p className="hero-lead">Skiriame laiko išklausyti, paaiškinti ir pasiūlyti geriausią sprendimą. Konsultacijos, higiena, terapinis gydymas ir chirurgija — vienoje vietoje.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={()=>go("booking")}>Registruotis vizitui</button>
              <button className="btn btn-outline" onClick={()=>go("services")}>Peržiūrėti kainas</button>
            </div>
            <div className="hero-stats">
              {[["24/7","Registracija internetu"],["4.9 ★","Pacientų įvertinimas"],["12+","Metų patirties"],["1 200+","Patenkintų pacientų"]].map(([v,l])=>(
                <div className="hstat" key={l}><div className="hstat-val">{v}</div><div className="hstat-lbl">{l}</div></div>
              ))}
            </div>
          </div>
          <div className="hero-visual">
            <div className="photo-card">
              <div className="photo-placeholder">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <rect x="8" y="16" width="48" height="36" rx="4" stroke="#0D1F35" strokeWidth="2.5"/>
                  <circle cx="24" cy="28" r="6" stroke="#0D1F35" strokeWidth="2.5"/>
                  <path d="M8 44 L20 32 L30 40 L40 30 L56 44" stroke="#0D1F35" strokeWidth="2.5"/>
                </svg>
                <span>Klinikos nuotrauka</span>
              </div>
              <div className="photo-overlay">
                <div className="photo-clinic">JŪSŲ KLINIKOS PAVADINIMAS</div>
                <div className="photo-sub">Odontologijos klinika · Jūsų miestas</div>
                <div className="photo-tags">
                  <span>Individualūs planai</span><span>Patyrę specialistai</span><span>24/7 registracija</span>
                </div>
              </div>
            </div>
            <div className="hero-badge">
              <div className="hero-badge-icon">📅</div>
              <div>
                <div className="hero-badge-val">Artimiausia vieta</div>
                <div className="hero-badge-sub">šiandien 14:00 val.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="trust-bar">
        <div className="wrap">
          <div className="trust-items">
            {[["🏆","Licencijuota klinika"],["🔒","Saugūs duomenys"],["💳","Išsimokėjimas 0%"],["🇱🇹","Sodros kompensacijos"],["⭐","4.9 Google atsiliepimai"]].map(([ic,lb])=>(
              <div className="trust-item" key={lb}><span className="trust-icon">{ic}</span><span>{lb}</span></div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-label">Kodėl pacientai renkasi mus</div>
          <div className="sec-title">Ką vertinate labiausiai</div>
          <div className="divider"/>
          <div className="grid-4">
            {[
              ["◎","Aiškus gydymo planas","Po konsultacijos aptariame visas galimybes, alternatyvas ir preliminarią kainą — be staigmenų."],
              ["◴","Patogi registracija","Pasirinkite paslaugą, gydytoją, dieną ir laiką kalendoriuje. Be skambučių ir laukimo."],
              ["✦","Rami aplinka","Dėmesys jūsų komfortui. Aiškūs paaiškinimai kiekviename žingsnyje."],
              ["☏","Priminimai SMS","Automatinis SMS priminimas likus 24 val. Niekada nepraleiskite vizito."],
            ].map(([ic,t,d])=>(
              <div className="card" key={t}>
                <div className="feat-icon">{ic}</div>
                <div className="feat-title">{t}</div>
                <div className="feat-desc">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="sec sec-bg">
        <div className="wrap">
          <div className="sec-hd">
            <div>
              <div className="sec-label">Pacientų atsiliepimai</div>
              <div className="sec-title">Ką sako mūsų pacientai</div>
            </div>
            <div className="rev-summary">
              <div className="rev-big">4.9</div>
              <div className="rev-info">Iš 5.0<br/><b style={{color:"var(--gold)"}}>★★★★★</b><br/>142 atsiliepimai</div>
            </div>
          </div>
          <div className="grid-3">
            {REVIEWS.map((r,i)=>(
              <div className="card" key={i}>
                <div className="rev-stars">{"★".repeat(r.stars)}</div>
                <div className="rev-text">{r.text}</div>
                <div className="rev-author">
                  <div className="rev-avatar">{r.name[0]}</div>
                  <div><div className="rev-name">{r.name}</div><div className="rev-date">{r.date} · Google</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-label">Dažniausi klausimai</div>
          <div className="sec-title">Turite klausimų?</div>
          <div className="divider" style={{marginBottom:36}}/>
          <div className="grid-2">
            {FAQS.map((f,i)=>(
              <details className="faq-item" key={i}>
                <summary>{f.q}</summary>
                <div className="faq-body">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  const Services = (
    <section className="sec">
      <div className="wrap">
        <div className="sec-label">Paslaugos ir kainos</div>
        <div className="sec-title">Orientacinės kainos<br/><em>be paslėptų mokesčių</em></div>
        <div className="divider"/>
        <p style={{fontSize:16,color:"var(--muted)",marginBottom:40,maxWidth:560}}>Tiksli kaina priklauso nuo individualios situacijos. Detalų planą ir kainą gausite po konsultacijos.</p>
        <div className="grid-4">
          {SERVICES.map(s=>(
            <article className="card" key={s.id}>
              <div className="svc-accent"/>
              <div className="svc-icon">{s.icon}</div>
              <div className="svc-title">{s.title}</div>
              <div className="svc-desc">{s.desc}</div>
              <div className="svc-footer">
                <div className="svc-price">{s.price}</div>
                <div className="svc-dur">{s.duration}</div>
              </div>
              <button className="btn btn-soft" style={{marginTop:18,width:"100%"}} onClick={()=>pickSvc(s)}>Registruotis</button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );

  const Doctors = (
    <section className="sec">
      <div className="wrap">
        <div className="sec-label">Mūsų komanda</div>
        <div className="sec-title">Pasirinkite <em>savo specialistą</em></div>
        <div className="divider"/>
        <div className="grid-4">
          {DOCTORS.map(d=>(
            <article className="card" key={d.name}>
              <div className="doc-avatar">{initials(d.name)}</div>
              <div className="doc-name">{d.name}</div>
              <div className="doc-role">{d.role}</div>
              <div className="doc-exp">{d.exp}</div>
              <div className="doc-note">{d.note}</div>
              <button className="btn btn-soft" style={{width:"100%"}} onClick={()=>go("booking")}>Registruotis</button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );

  const FirstVisit = (
    <section className="sec sec-dark">
      <div className="wrap">
        <div className="sec-label" style={{color:"var(--gold)"}}>Pirmas vizitas</div>
        <div className="sec-title" style={{color:"var(--white)"}}>Ką jūs gausite <em>pirmą kartą</em></div>
        <div className="divider"/>
        <div className="fv-steps">
          {[
            ["01","Atvykstate","Jus pasitinkame, supažindiname su klinika ir komanda. Be skubėjimo."],
            ["02","Pilna apžiūra","Burnos būklės įvertinimas, rentgeno analizė jei reikia, situacijos paaiškinimas."],
            ["03","Gydymo planas","Aiškus tolimesnio gydymo planas su kainomis. Be jokių įsipareigojimų."],
          ].map(([n,t,d])=>(
            <div className="fv-step" key={n}>
              <div className="fv-num">{n}</div>
              <div className="fv-title">{t}</div>
              <div className="fv-desc">{d}</div>
            </div>
          ))}
        </div>
        <div className="fv-info">
          {[["⏱","Trukmė","~45 min."],["💰","Kaina","nuo 30 €"],["📍","Vieta","Jūsų miestas"],["📞","Registracija","24/7 internetu"]].map(([ic,lb,vl])=>(
            <div className="fv-chip" key={lb}>
              <span className="fv-chip-icon">{ic}</span>
              <div><div className="fv-chip-lbl">{lb}</div><div className="fv-chip-val">{vl}</div></div>
            </div>
          ))}
        </div>
        <div style={{marginTop:32}}>
          <button className="btn btn-gold" onClick={()=>go("booking")}>Registruotis pirmam vizitui</button>
        </div>
      </div>
    </section>
  );

  const Payments = (
    <section className="sec sec-bg">
      <div className="wrap">
        <div className="sec-label">Mokėjimai ir kompensacijos</div>
        <div className="sec-title">Lanksčios <em>mokėjimo galimybės</em></div>
        <div className="divider"/>
        <div className="pay-grid">
          {[
            ["🏛️","Sodros kompensacijos","Dalis odontologijos paslaugų kompensuojama per Sodros sąrašą. Padedame sutvarkyti dokumentus."],
            ["💳","Išsimokėjimas 0%","Gydykitės dabar, mokėkite dalimis. Išsimokėjimas be palūkanų iki 12 mėnesių per Swedbank ir SEB."],
            ["💵","Mokėjimas kortele","Priimame visas korteles ir grynuosius. Sąskaita faktūra juridiniams asmenims."],
          ].map(([ic,t,d])=>(
            <div className="pay-card" key={t}>
              <div className="pay-icon">{ic}</div>
              <div className="pay-title">{t}</div>
              <div className="pay-desc">{d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const Booking = (
    <section className="booking">
      <div className="wrap">
        <div style={{marginBottom:36}}>
          <div className="sec-label" style={{color:"var(--gold)"}}>Rezervacija internetu</div>
          <div className="sec-title" style={{color:"var(--white)"}}>Registracija vizitui</div>
          <p style={{fontSize:16,color:"rgba(255,255,255,.6)",marginTop:8}}>Užpildykite per mažiau nei minutę. Administratorius patvirtins darbo metu.</p>
        </div>
        <div className="bk-grid">

          {/* Kairė: paslauga + gydytojas */}
          <div className="bk-card">
            <h3>1. Paslauga</h3>
            {SERVICES.map(s=>(
              <button key={s.id} className={`bk-option ${selSvc.id===s.id?"on":""}`} onClick={()=>pickSvc(s)}>
                <strong>{s.title}</strong><br/><small style={{opacity:.7}}>{s.price} · {s.duration}</small>
              </button>
            ))}
            <div className="bk-sep"/>
            <h3>2. Gydytojas</h3>
            {availDocs.map(d=>(
              <button key={d} className={`bk-option ${selDoc===d?"on":""}`} onClick={()=>setSelDoc(d)}>{d}</button>
            ))}
          </div>

          {/* Dešinė: kalendorius + forma */}
          <div className="bk-card">
            <h3>3. Data ir laikas</h3>
            <Calendar selected={selDate} onSelect={pickDate}/>

            {selDate && (<>
              <div style={{marginTop:16,marginBottom:8,fontSize:13,fontWeight:600,color:"rgba(255,255,255,.7)",letterSpacing:".04em",textTransform:"uppercase"}}>
                Laisvi laikai — {fmtDate(selDate)}
              </div>
              <div className="times">
                {availTimes.map(t=>(
                  <button key={t} className={`time-btn ${selTime===t?"on":""}`} onClick={()=>setSelTime(t)}>{t}</button>
                ))}
              </div>

              <div className="bk-sep"/>
              <h3>4. Jūsų duomenys</h3>
              <form onSubmit={onSubmit} className="form">
                <input className="input" placeholder="Vardas ir pavardė *" value={name} onChange={e=>setName(e.target.value)}/>
                <input className="input" placeholder="Telefono numeris *" value={phone} onChange={e=>setPhone(e.target.value)}/>
                <textarea className="textarea" placeholder="Aprašykite situaciją arba klausimą (neprivaloma)..." value={msg} onChange={e=>setMsg(e.target.value)}/>
                <div className="upload">
                  <strong style={{fontSize:13,color:"rgba(255,255,255,.8)"}}>Rentgeno nuotrauka (neprivaloma)</strong>
                  <p style={{fontSize:12,color:"rgba(255,255,255,.45)",margin:"6px 0 10px"}}>PDF, JPG arba PNG iki 10 MB.</p>
                  <div style={{display:"flex",alignItems:"center",gap:12}}>
                    <label className="upload-lbl">📎 Įkelti failą<input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e=>setXray(e.target.files?.[0]?.name||"")}/></label>
                    <span style={{fontSize:13,color:"rgba(255,255,255,.4)"}}>{xray||"Nepasirinkta"}</span>
                  </div>
                </div>
                <label className="consent">
                  <input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)}/>
                  <span>Susipažinau su <a href="/privatumas">privatumo politika</a> ir sutinku, kad duomenys būtų naudojami užklausos administravimui. *</span>
                </label>
                <p className="data-note">Jūsų duomenys naudojami tik šios užklausos nagrinėjimui ir nėra perduodami tretiesiems asmenims.</p>
                <button className="btn btn-gold" type="submit" disabled={!agreed||!name||!phone} style={{gridColumn:"1/-1",width:"100%",padding:"16px"}}>
                  Patvirtinti registraciją
                </button>
              </form>
              {done && (
                <div className="confirm-box">
                  <div className="confirm-icon">✓</div>
                  Registracija gauta: <strong>{selSvc.title}</strong>, {selDoc}, {fmtDate(selDate)} {selTime}. Susisieksime dėl patvirtinimo darbo metu.
                </div>
              )}
            </>)}
          </div>
        </div>
      </div>
    </section>
  );

  const Contact = (
    <section className="sec">
      <div className="wrap">
        <div className="sec-label">Kontaktai ir lokacija</div>
        <div className="sec-title">Kaip mus <em>rasti</em></div>
        <div className="divider"/>
        <div className="contact-grid">
          <div>
            <div className="contact-info">
              {[
                ["📞","Telefonas","+370 600 00000"],
                ["✉️","El. paštas","info@dentacare.lt"],
                ["📍","Adresas","Vilnius, Lietuva"],
                ["🕐","Darbo laikas","I–V 08:00–19:00 · Š 09:00–14:00"],
                ["💬","WhatsApp","Rašykite bet kuriuo metu"],
              ].map(([ic,lb,vl])=>(
                <div className="cinfo-row" key={lb}>
                  <div className="cinfo-icon">{ic}</div>
                  <div><div className="cinfo-lbl">{lb}</div><div className="cinfo-val">{vl}</div></div>
                </div>
              ))}
            </div>
            <button className="btn btn-primary" onClick={()=>go("booking")}>Registruotis vizitui</button>
          </div>
          <div className="map-placeholder">
            <span style={{fontSize:32}}>🗺️</span>
            <span>Google Maps — klinikos lokacija</span>
            <span style={{fontSize:13,fontWeight:400,color:"var(--muted)"}}>Žemėlapis integruojamas su tikru adresu</span>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="site">
      <style>{CSS}</style>

      {/* HEADER */}
      <header className="hdr">
        <div className="wrap hdr-in">
          <div className="logo" onClick={()=>go("home")} style={{cursor:"pointer"}}>
            <div className="logo-mark">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 3C8 3 5 6 5 10c0 5 7 11 7 11s7-6 7-11c0-4-3-7-7-7z" fill="white" opacity=".9"/>
                <path d="M12 8v4M10 10h4" stroke="var(--navy)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <div className="logo-name">JŪSŲ KLINIKA</div>
              <div className="logo-sub">Odontologijos klinika</div>
            </div>
          </div>
          <nav className="nav-links">
            {[["home","Pagrindinis"],["services","Paslaugos"],["doctors","Gydytojai"],["first-visit","Pirmas vizitas"],["contact","Kontaktai"]].map(([v,l])=>(
              <button key={v} className={view===v?"on":""} onClick={()=>go(v)}>{l}</button>
            ))}
            <button className="nav-book" onClick={()=>go("booking")}>Registruotis</button>
          </nav>
        </div>
      </header>

      {/* PUSLAPIAI */}
      {view==="home"        && <>{Home}{FirstVisit}{Payments}</>}
      {view==="services"    && Services}
      {view==="doctors"     && Doctors}
      {view==="first-visit" && FirstVisit}
      {view==="booking"     && Booking}
      {view==="contact"     && Contact}

      {/* FOOTER */}
      <footer className="footer">
        <div className="wrap footer-in">
          <div className="footer-logo">JŪSŲ KLINIKA</div>
          <div className="footer-links">
            <a href="/privatumas">Privatumo politika</a>
            <a href="/privatumas#slapukai">Slapukai</a>
            <a href="/privatumas#sutikimai">Duomenų sutikimai</a>
          </div>
          <span style={{fontSize:13}}>© 2026 Odontologijos klinika</span>
        </div>
      </footer>

      {/* FLOATING */}
      <div className="floating">
        <button className="btn btn-primary" onClick={()=>go("booking")}>📅 Registruotis</button>
      </div>
    </div>
  );
}
