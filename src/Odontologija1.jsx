import { useEffect, useMemo, useState } from "react";

const SERVICES = [
  {
    id: "higiena",
    icon: "✦",
    title: "Profesionali burnos higiena",
    price: "nuo 70 €",
    duration: "45–60 min.",
    description:
      "Apnašų ir pigmentacijos pašalinimas, Air-Flow, poliravimas ir individualios burnos priežiūros rekomendacijos.",
    doctors: ["Dr. Lina Vaitkūnienė", "Dr. Monika Vaičiulytė"],
  },
  {
    id: "konsultacija",
    icon: "◎",
    title: "Konsultacija ir gydymo planas",
    price: "nuo 30 €",
    duration: "30–45 min.",
    description:
      "Išsami apžiūra, situacijos paaiškinimas, preliminarios alternatyvos ir aiškus tolimesnių veiksmų planas.",
    doctors: ["Dr. Monika Vaičiulytė", "Dr. Jonas Petrauskas"],
  },
  {
    id: "estetinis",
    icon: "◇",
    title: "Estetinis plombavimas",
    price: "nuo 90 €",
    duration: "60–120 min.",
    description:
      "Natūralios danties formos, spalvos ir funkcijos atkūrimas, išlaikant individualią šypsenos estetiką.",
    doctors: ["Dr. Jonas Petrauskas"],
  },
  {
    id: "implantacija",
    icon: "◈",
    title: "Implantologijos konsultacija",
    price: "nuo 50 €",
    duration: "45 min.",
    description:
      "Situacijos įvertinimas, rentgeno analizė ir individualaus implantologinio gydymo galimybių aptarimas.",
    doctors: ["Dr. Marius Čepas"],
  },
  {
    id: "chirurgija",
    icon: "△",
    title: "Burnos chirurgija",
    price: "nuo 80 €",
    duration: "30–90 min.",
    description:
      "Atraumatinis dantų šalinimas, chirurginės konsultacijos ir aiškios rekomendacijos po procedūros.",
    doctors: ["Dr. Marius Čepas"],
  },
  {
    id: "protezavimas",
    icon: "◌",
    title: "Protezavimo konsultacija",
    price: "nuo 40 €",
    duration: "45 min.",
    description:
      "Funkcijos, estetikos ir komforto atkūrimo galimybių aptarimas, atsižvelgiant į paciento poreikius.",
    doctors: ["Dr. Monika Vaičiulytė", "Dr. Jonas Petrauskas"],
  },
];

const DOCTORS = [
  {
    name: "Dr. Monika Vaičiulytė",
    role: "Konsultacijos ir gydymo planai",
    exp: "8 m. patirtis",
    text: "Pacientui pirmiausia reikia aiškumo, ramybės ir suprantamo gydymo plano.",
    tags: ["Gydymo planai", "Profilaktika", "Konsultacijos"],
  },
  {
    name: "Dr. Jonas Petrauskas",
    role: "Terapinis ir estetinis gydymas",
    exp: "10 m. patirtis",
    text: "Kruopštumas, natūrali estetika ir pagarbus bendravimas yra mano darbo pagrindas.",
    tags: ["Plombavimas", "Estetika", "Terapija"],
  },
  {
    name: "Dr. Lina Vaitkūnienė",
    role: "Profesionali burnos higiena",
    exp: "7 m. patirtis",
    text: "Net profilaktinis vizitas gali būti ramus, švelnus ir malonus.",
    tags: ["Higiena", "Air-Flow", "Profilaktika"],
  },
  {
    name: "Dr. Marius Čepas",
    role: "Burnos chirurgija",
    exp: "12 m. patirtis",
    text: "Chirurginiame gydyme svarbiausia tikslumas, saugumas ir aiški priežiūra po vizito.",
    tags: ["Chirurgija", "Šalinimas", "Implantologija"],
  },
];

const SLOTS = {
  "2026-06-08": ["09:00", "10:30", "13:30", "16:00"],
  "2026-06-09": ["09:30", "12:00", "14:30"],
  "2026-06-10": ["10:00", "11:30", "15:00", "17:00"],
  "2026-06-11": ["09:00", "13:00", "16:30"],
  "2026-06-12": ["10:30", "12:30", "15:30"],
  "2026-06-16": ["09:00", "11:00", "14:00", "17:30"],
  "2026-06-18": ["10:00", "13:30", "16:00"],
};

const REVIEWS = [
  {
    name: "Milda K.",
    service: "Konsultacija",
    text: "Vizito metu viskas buvo paaiškinta labai aiškiai. Gavau gydymo planą, kainas ir supratau, ką rinktis toliau.",
  },
  {
    name: "Rasa M.",
    service: "Burnos higiena",
    text: "Labai rami aplinka, malonus personalas ir profesionali higiena. Patiko, kad nereikėjo niekur skubėti.",
  },
  {
    name: "Tomas R.",
    service: "Registracija internetu",
    text: "Registracija internetu labai patogi. Užpildžiau vakare, o kitą dieną gavau patvirtinimą dėl vizito.",
  },
];

const CASES = [
  {
    title: "Estetinis atkūrimas",
    description: "Šypsenos harmonijos ir danties formos atkūrimo konceptas.",
    before: "Prieš",
    after: "Po",
  },
  {
    title: "Profesionali higiena",
    description: "Pigmentacijos ir apnašų pašalinimo vizualinis pavyzdys.",
    before: "Prieš",
    after: "Po",
  },
  {
    title: "Gydymo planas",
    description: "Aiški gydymo eiga nuo konsultacijos iki galutinio rezultato.",
    before: "Situacija",
    after: "Planas",
  },
];

const FAQS = [
  {
    q: "Ar konsultacijos metu pateikiamas gydymo planas?",
    a: "Taip. Konsultacijos metu aptariame situaciją, galimus sprendimus, gydymo eigą ir preliminarias kainas. Galutinis planas priklauso nuo individualios paciento būklės.",
  },
  {
    q: "Ar galima registruotis po darbo valandų?",
    a: "Taip. Internetinė registracija veikia visą parą, todėl pacientas gali pateikti užklausą jam patogiu metu. Administratorius registraciją patvirtina darbo metu.",
  },
  {
    q: "Ar galima pridėti rentgeno nuotrauką?",
    a: "Taip. Registracijos formoje galima pridėti turimą rentgeno nuotrauką arba kitą dokumentą, kuris padeda tiksliau įvertinti situaciją.",
  },
  {
    q: "Ar gausiu priminimą apie vizitą?",
    a: "Galima integruoti SMS ir el. pašto priminimus, kad pacientas būtų informuotas apie artėjantį vizitą iš anksto.",
  },
];

const LT_MONTHS = [
  "Sausis",
  "Vasaris",
  "Kovas",
  "Balandis",
  "Gegužė",
  "Birželis",
  "Liepa",
  "Rugpjūtis",
  "Rugsėjis",
  "Spalis",
  "Lapkritis",
  "Gruodis",
];

const LT_SHORT = ["Pr", "An", "Tr", "Kt", "Pn", "Št", "Sk"];

function Calendar({ selected, onSelect }) {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(5);

  const available = new Set(Object.keys(SLOTS));
  const key = (y, m, d) => `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const firstDow = new Date(year, month, 1).getDay();
  const offset = firstDow === 0 ? 6 : firstDow - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [...Array(offset).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  function prev() {
    if (month === 0) {
      setMonth(11);
      setYear((value) => value - 1);
    } else {
      setMonth((value) => value - 1);
    }
  }

  function next() {
    if (month === 11) {
      setMonth(0);
      setYear((value) => value + 1);
    } else {
      setMonth((value) => value + 1);
    }
  }

  return (
    <div className="calendar-card">
      <div className="calendar-head">
        <button type="button" onClick={prev} aria-label="Ankstesnis mėnuo">‹</button>
        <strong>{LT_MONTHS[month]} {year}</strong>
        <button type="button" onClick={next} aria-label="Kitas mėnuo">›</button>
      </div>

      <div className="calendar-week">
        {LT_SHORT.map((day) => <span key={day}>{day}</span>)}
      </div>

      <div className="calendar-grid">
        {cells.map((day, index) => {
          if (!day) return <span key={`empty-${index}`} />;
          const date = key(year, month, day);
          const isAvailable = available.has(date);
          const isSelected = selected === date;

          return (
            <button
              type="button"
              key={date}
              disabled={!isAvailable}
              className={`calendar-day ${isAvailable ? "available" : ""} ${isSelected ? "selected" : ""}`}
              onClick={() => onSelect(date)}
            >
              {day}
              {isAvailable && <i />}
            </button>
          );
        })}
      </div>

      <div className="calendar-legend">
        <span><b className="legend-free" /> Laisvi laikai</span>
        <span><b className="legend-selected" /> Pasirinkta</span>
      </div>
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: #f7f9f8;
  color: #142033;
  font-family: Inter, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}
button, input, textarea, select { font: inherit; }
:root {
  --ink: #142033;
  --ink-2: #21324a;
  --slate: #5f6d7d;
  --muted: #74808d;
  --white: #ffffff;
  --surface: #fbfcfb;
  --soft: #f3f6f4;
  --line: #e4ebe7;
  --green: #dfeee8;
  --green-2: #b8d4c6;
  --sand: #efe7d8;
  --sand-2: #d7c5a6;
  --blue: #0d5f8c;
  --shadow-sm: 0 10px 30px rgba(20,32,51,.06);
  --shadow-md: 0 20px 70px rgba(20,32,51,.11);
  --shadow-lg: 0 40px 110px rgba(20,32,51,.15);
  --radius-xl: 34px;
  --radius-lg: 24px;
  --radius-md: 16px;
}
.site {
  min-height: 100vh;
  background:
    radial-gradient(circle at 8% 4%, rgba(223,238,232,.9), transparent 30%),
    radial-gradient(circle at 96% 10%, rgba(239,231,216,.72), transparent 34%),
    linear-gradient(180deg, #ffffff 0%, #f7f9f8 42%, #ffffff 100%);
  overflow-x: hidden;
}
.wrap {
  width: min(1210px, calc(100% - 44px));
  margin: 0 auto;
}
.reveal {
  opacity: 0;
  transform: translateY(26px);
  transition: opacity .72s ease, transform .72s ease;
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
.header {
  position: sticky;
  top: 0;
  z-index: 80;
  background: rgba(255,255,255,.96);
  border-bottom: 1px solid rgba(228,235,231,.92);
  transition: min-height .25s ease, background .25s ease, box-shadow .25s ease, backdrop-filter .25s ease;
}
.header.scrolled {
  background: rgba(255,255,255,.74);
  backdrop-filter: blur(22px);
  box-shadow: 0 12px 42px rgba(20,32,51,.08);
}
.header-inner {
  min-height: 82px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 22px;
  transition: min-height .25s ease;
}
.header.scrolled .header-inner { min-height: 66px; }
.logo {
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
}
.logo-mark {
  width: 46px;
  height: 46px;
  border-radius: 17px;
  background: linear-gradient(145deg, var(--ink), #2c405c);
  display: grid;
  place-items: center;
  color: white;
  box-shadow: 0 14px 34px rgba(20,32,51,.2);
  transition: width .25s ease, height .25s ease, border-radius .25s ease;
}
.header.scrolled .logo-mark {
  width: 40px;
  height: 40px;
  border-radius: 14px;
}
.logo-mark span {
  width: 18px;
  height: 18px;
  position: relative;
}
.logo-mark span::before,
.logo-mark span::after {
  content: "";
  position: absolute;
  inset: 50% auto auto 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 99px;
}
.logo-mark span::before { width: 18px; height: 3px; }
.logo-mark span::after { width: 3px; height: 18px; }
.logo-title {
  color: var(--ink);
  font-size: 18px;
  line-height: 1.08;
  font-weight: 900;
  letter-spacing: -.02em;
}
.logo-sub {
  margin-top: 4px;
  color: var(--muted);
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: .1em;
}
.nav {
  display: flex;
  align-items: center;
  gap: 6px;
}
.nav button {
  border: 0;
  background: transparent;
  color: #536071;
  border-radius: 999px;
  padding: 10px 14px;
  font-weight: 800;
  font-size: 14px;
  cursor: pointer;
  transition: .18s ease;
}
.nav button:hover {
  color: var(--ink);
  background: rgba(20,32,51,.055);
}
.nav .book {
  margin-left: 6px;
  background: var(--ink);
  color: white;
  padding: 12px 22px;
  box-shadow: 0 14px 34px rgba(20,32,51,.2);
}
.nav .book:hover {
  background: var(--ink-2);
  color: white;
  transform: translateY(-1px);
}
.btn {
  border: 0;
  border-radius: 999px;
  padding: 14px 24px;
  font-weight: 900;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  text-decoration: none;
  transition: .18s ease;
}
.btn-primary {
  background: var(--ink);
  color: #fff;
  box-shadow: 0 16px 40px rgba(20,32,51,.2);
}
.btn-primary:hover {
  transform: translateY(-2px);
  background: var(--ink-2);
}
.btn-soft {
  color: var(--ink);
  background: rgba(255,255,255,.76);
  border: 1px solid var(--line);
}
.btn-soft:hover {
  background: white;
  border-color: rgba(20,32,51,.22);
  transform: translateY(-1px);
}
.btn-quiet {
  color: var(--ink);
  background: rgba(223,238,232,.75);
  border: 1px solid rgba(184,212,198,.65);
}
.btn-quiet:hover {
  transform: translateY(-1px);
  background: #d7ebe3;
}
.btn:disabled {
  opacity: .55;
  cursor: not-allowed;
  transform: none;
}
.hero {
  position: relative;
  padding: 88px 0 70px;
}
.hero::before {
  content: "";
  position: absolute;
  inset: 0 0 auto auto;
  width: 560px;
  height: 560px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(223,238,232,.82), transparent 66%);
  pointer-events: none;
}
.hero-grid {
  position: relative;
  display: grid;
  grid-template-columns: 1.02fr .98fr;
  gap: 58px;
  align-items: center;
}
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  border: 1px solid rgba(184,212,198,.72);
  background: rgba(223,238,232,.72);
  color: #426653;
  border-radius: 999px;
  padding: 9px 16px;
  font-size: 12px;
  font-weight: 950;
  letter-spacing: .09em;
  text-transform: uppercase;
}
.eyebrow::before {
  content: "";
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: #6e9c85;
}
.hero h1 {
  margin: 24px 0 20px;
  color: var(--ink);
  font-size: clamp(48px, 5.7vw, 82px);
  line-height: .97;
  letter-spacing: -.065em;
  max-width: 780px;
}
.hero h1 em {
  font-style: normal;
  color: #365a73;
}
.hero-lead {
  font-size: 18px;
  line-height: 1.78;
  color: #5f6f83;
  max-width: 610px;
  margin: 0 0 34px;
}
.hero-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 42px;
}
.hero-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}
.stat {
  background: rgba(255,255,255,.88);
  border: 1px solid rgba(228,235,231,.95);
  border-radius: 24px;
  padding: 18px 16px;
  box-shadow: var(--shadow-sm);
}
.stat strong {
  display: block;
  color: var(--ink);
  font-size: 25px;
  line-height: 1;
  margin-bottom: 6px;
  letter-spacing: -.03em;
}
.stat span {
  color: var(--muted);
  font-size: 12px;
  line-height: 1.4;
  font-weight: 850;
}
.hero-media {
  position: relative;
}
.media-shell {
  position: relative;
  min-height: 610px;
  border-radius: 42px;
  overflow: hidden;
  background: #e8efeb;
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(255,255,255,.75);
}
.media-shell img {
  width: 100%;
  height: 100%;
  min-height: 610px;
  object-fit: cover;
  display: block;
  filter: saturate(.94) contrast(1.03);
}
.media-fallback {
  width: 100%;
  min-height: 610px;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 38px;
  text-align: center;
  background:
    linear-gradient(135deg, rgba(223,238,232,.92), rgba(255,255,255,.82)),
    repeating-linear-gradient(45deg, rgba(20,32,51,.035) 0 12px, transparent 12px 24px);
  color: var(--ink);
  font-weight: 950;
}
.media-shade {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(20,32,51,.02) 0%, rgba(20,32,51,.08) 45%, rgba(20,32,51,.72) 100%),
    linear-gradient(90deg, rgba(20,32,51,.06), transparent 34%);
}
.media-caption {
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 24px;
  color: white;
  border-radius: 28px;
  padding: 24px;
  background: rgba(20,32,51,.66);
  border: 1px solid rgba(255,255,255,.16);
  backdrop-filter: blur(16px);
}
.media-caption h2 {
  margin: 0 0 7px;
  font-size: 27px;
  line-height: 1.1;
  letter-spacing: -.035em;
}
.media-caption p {
  margin: 0 0 16px;
  color: rgba(255,255,255,.75);
  line-height: 1.55;
}
.caption-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.caption-tags span {
  border-radius: 999px;
  padding: 7px 12px;
  background: rgba(255,255,255,.13);
  border: 1px solid rgba(255,255,255,.17);
  font-size: 12px;
  font-weight: 900;
}
.hero-note {
  position: absolute;
  top: 28px;
  left: -24px;
  width: 214px;
  border-radius: 26px;
  background: rgba(255,255,255,.94);
  border: 1px solid rgba(228,235,231,.95);
  box-shadow: var(--shadow-md);
  padding: 18px;
}
.hero-note small {
  color: var(--muted);
  font-weight: 950;
  text-transform: uppercase;
  letter-spacing: .07em;
  font-size: 10px;
}
.hero-note strong {
  display: block;
  margin-top: 6px;
  color: var(--ink);
  font-size: 15px;
  line-height: 1.35;
}
.trust {
  background: var(--ink);
  color: rgba(255,255,255,.82);
  padding: 18px 0;
}
.trust-row {
  display: flex;
  justify-content: center;
  gap: 0;
  flex-wrap: wrap;
}
.trust-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 25px;
  font-size: 14px;
  font-weight: 850;
}
.trust-item:not(:last-child) {
  border-right: 1px solid rgba(255,255,255,.14);
}
.section {
  padding: 92px 0;
}
.section.soft {
  background: rgba(243,246,244,.72);
}
.section.dark {
  background:
    radial-gradient(circle at 100% 0%, rgba(223,238,232,.08), transparent 36%),
    linear-gradient(180deg, #142033, #0f1928);
  color: #fff;
}
.section-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 28px;
  margin-bottom: 42px;
}
.kicker {
  color: #50785f;
  font-size: 12px;
  font-weight: 950;
  letter-spacing: .13em;
  text-transform: uppercase;
  margin-bottom: 12px;
}
.title {
  margin: 0;
  color: var(--ink);
  font-size: clamp(34px, 4vw, 56px);
  line-height: 1.04;
  letter-spacing: -.055em;
}
.title em {
  color: #365a73;
  font-style: normal;
}
.dark .title {
  color: #fff;
}
.lead {
  color: var(--muted);
  line-height: 1.75;
  font-size: 16px;
  max-width: 620px;
}
.dark .lead {
  color: rgba(255,255,255,.65);
}
.rule {
  width: 54px;
  height: 2px;
  background: #90ad9d;
  border-radius: 999px;
  margin: 18px 0 0;
}
.grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 19px;
}
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 19px;
}
.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 19px;
}
.card {
  background: rgba(255,255,255,.9);
  border: 1px solid rgba(228,235,231,.95);
  border-radius: 30px;
  padding: 28px;
  box-shadow: var(--shadow-sm);
  transition: .22s ease;
}
.card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-md);
  border-color: rgba(184,212,198,.95);
}
.feature-icon,
.service-icon {
  width: 54px;
  height: 54px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  color: #426653;
  background: rgba(223,238,232,.75);
  border: 1px solid rgba(184,212,198,.65);
  font-size: 23px;
  margin-bottom: 18px;
  font-weight: 950;
}
.card h3 {
  margin: 0 0 10px;
  color: var(--ink);
  font-size: 18px;
  line-height: 1.25;
  letter-spacing: -.02em;
}
.card p {
  margin: 0;
  color: var(--muted);
  line-height: 1.72;
  font-size: 14px;
}
.service-card {
  position: relative;
  overflow: hidden;
}
.service-card::before {
  content: "";
  position: absolute;
  inset: 0 0 auto;
  height: 4px;
  background: linear-gradient(90deg, #9fb7aa, #d7c5a6);
}
.service-meta {
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}
.price {
  font-size: 25px;
  font-weight: 900;
  color: var(--ink);
  letter-spacing: -.04em;
}
.duration {
  color: var(--muted);
  background: rgba(20,32,51,.05);
  border-radius: 999px;
  padding: 7px 11px;
  font-size: 12px;
  font-weight: 900;
}
.doctor-card {
  padding: 0;
  overflow: hidden;
}
.doctor-top {
  padding: 28px;
  background:
    radial-gradient(circle at 84% 10%, rgba(223,238,232,.9), transparent 38%),
    linear-gradient(135deg, #fff, #f5f8f6);
}
.doctor-avatar {
  width: 78px;
  height: 78px;
  border-radius: 24px;
  background: linear-gradient(145deg, var(--ink), #2c405c);
  color: white;
  display: grid;
  place-items: center;
  font-size: 22px;
  font-weight: 900;
  margin-bottom: 18px;
}
.doctor-body {
  padding: 24px 28px 28px;
}
.doctor-role {
  color: #50785f;
  font-weight: 950;
  font-size: 13px;
  margin-bottom: 6px;
}
.doctor-exp {
  color: var(--muted);
  font-size: 12px;
  font-weight: 900;
  margin-bottom: 16px;
}
.doctor-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 18px;
}
.doctor-tags span {
  background: rgba(20,32,51,.055);
  color: var(--ink);
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 11px;
  font-weight: 900;
}
.experience {
  display: grid;
  grid-template-columns: .95fr 1.05fr;
  gap: 34px;
  align-items: center;
}
.experience-panel {
  border-radius: 36px;
  padding: 34px;
  background: rgba(255,255,255,.08);
  border: 1px solid rgba(255,255,255,.14);
}
.steps {
  display: grid;
  gap: 14px;
}
.step {
  display: grid;
  grid-template-columns: 58px 1fr;
  gap: 18px;
  padding: 20px;
  border-radius: 24px;
  background: rgba(255,255,255,.07);
  border: 1px solid rgba(255,255,255,.11);
}
.step-number {
  color: #b8d4c6;
  font-size: 31px;
  font-weight: 950;
}
.step h3 {
  margin: 0 0 6px;
  color: #fff;
}
.step p {
  margin: 0;
  color: rgba(255,255,255,.64);
  line-height: 1.65;
  font-size: 14px;
}
.case-card {
  padding: 0;
  overflow: hidden;
}
.case-visual {
  height: 240px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #edf3f0;
}
.case-half {
  display: grid;
  place-items: center;
  position: relative;
  color: rgba(20,32,51,.78);
  font-weight: 950;
  letter-spacing: .08em;
  text-transform: uppercase;
  font-size: 12px;
}
.case-half.before {
  background:
    linear-gradient(135deg, rgba(239,231,216,.88), rgba(255,255,255,.82)),
    radial-gradient(circle at 40% 40%, rgba(20,32,51,.08), transparent 28%);
}
.case-half.after {
  background:
    linear-gradient(135deg, rgba(223,238,232,.92), rgba(255,255,255,.86)),
    radial-gradient(circle at 60% 40%, rgba(80,120,95,.12), transparent 28%);
}
.case-body {
  padding: 24px 28px 28px;
}
.booking-preview {
  border-radius: 36px;
  background: var(--surface);
  border: 1px solid var(--line);
  box-shadow: var(--shadow-md);
  padding: 28px;
  display: grid;
  grid-template-columns: .95fr 1.05fr;
  gap: 24px;
  align-items: start;
}
.booking-preview-card {
  border-radius: 26px;
  background: white;
  border: 1px solid var(--line);
  padding: 24px;
}
.calendar-card {
  background: #fff;
  color: var(--ink);
  border-radius: 28px;
  padding: 22px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--line);
}
.calendar-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}
.calendar-head strong {
  font-size: 18px;
}
.calendar-head button {
  width: 36px;
  height: 36px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: white;
  color: var(--ink);
  cursor: pointer;
  font-size: 18px;
  font-weight: 900;
}
.calendar-week,
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
.calendar-week span {
  text-align: center;
  color: var(--muted);
  font-size: 11px;
  font-weight: 950;
  padding-bottom: 8px;
}
.calendar-grid {
  gap: 6px;
}
.calendar-day {
  aspect-ratio: 1;
  border: 0;
  border-radius: 14px;
  background: transparent;
  color: #a0a8b2;
  cursor: not-allowed;
  position: relative;
}
.calendar-day.available {
  cursor: pointer;
  background: #e9f4f1;
  color: var(--ink);
  font-weight: 950;
}
.calendar-day.available:hover {
  transform: scale(1.05);
  background: #d8eee8;
}
.calendar-day.selected {
  background: var(--ink);
  color: white;
  box-shadow: var(--shadow-sm);
}
.calendar-day i {
  position: absolute;
  bottom: 6px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  border-radius: 999px;
  background: #6e9c85;
}
.calendar-legend {
  display: flex;
  gap: 16px;
  margin-top: 14px;
  color: var(--muted);
  font-size: 12px;
  font-weight: 800;
}
.calendar-legend span {
  display: flex;
  align-items: center;
  gap: 6px;
}
.legend-free,
.legend-selected {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  display: inline-block;
}
.legend-free {
  background: #d8eee8;
  border: 1px solid #bad9d0;
}
.legend-selected {
  background: var(--ink);
}
.times {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0 0;
}
.time {
  border: 1px solid var(--line);
  background: white;
  color: var(--ink);
  border-radius: 999px;
  padding: 10px 16px;
  cursor: pointer;
  font-weight: 900;
}
.time.active {
  background: var(--ink);
  border-color: var(--ink);
  color: white;
}
.review-card p {
  font-style: italic;
  font-size: 15px;
}
.review-stars {
  color: #d7a94c;
  letter-spacing: 2px;
  margin-bottom: 14px;
}
.review-author {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.review-avatar {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background: rgba(20,32,51,.08);
  display: grid;
  place-items: center;
  font-weight: 950;
}
.faq {
  background: rgba(255,255,255,.9);
  border: 1px solid var(--line);
  border-radius: 24px;
  overflow: hidden;
}
.faq summary {
  cursor: pointer;
  padding: 20px 22px;
  font-weight: 950;
  color: var(--ink);
  list-style: none;
  display: flex;
  justify-content: space-between;
  gap: 18px;
}
.faq summary::after {
  content: "+";
  color: #50785f;
  font-size: 22px;
  line-height: 1;
}
.faq[open] summary::after {
  content: "–";
}
.faq p {
  padding: 0 22px 20px;
  margin: 0;
  color: var(--muted);
  line-height: 1.72;
}
.contact-grid {
  display: grid;
  grid-template-columns: .85fr 1.15fr;
  gap: 28px;
  align-items: stretch;
}
.contact-card {
  background: rgba(255,255,255,.92);
  border: 1px solid var(--line);
  border-radius: 30px;
  padding: 28px;
  box-shadow: var(--shadow-sm);
}
.contact-row {
  display: flex;
  gap: 14px;
  padding: 16px 0;
  border-bottom: 1px solid var(--line);
}
.contact-row:last-child {
  border-bottom: 0;
}
.contact-icon {
  width: 42px;
  height: 42px;
  border-radius: 15px;
  background: rgba(223,238,232,.72);
  display: grid;
  place-items: center;
}
.map {
  min-height: 420px;
  border-radius: 34px;
  border: 1px solid var(--line);
  background:
    linear-gradient(135deg, rgba(223,238,232,.9), rgba(255,255,255,.82)),
    radial-gradient(circle at 25% 30%, rgba(20,32,51,.08), transparent 20%);
  display: grid;
  place-items: center;
  text-align: center;
  padding: 34px;
  color: var(--ink);
  box-shadow: var(--shadow-sm);
}
.footer {
  background: var(--ink);
  color: rgba(255,255,255,.58);
  padding: 40px 0;
}
.footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}
.footer-brand {
  color: white;
  font-weight: 900;
  font-size: 18px;
}
.footer-links {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
.footer-links a {
  color: rgba(255,255,255,.58);
  text-decoration: none;
  font-size: 13px;
  font-weight: 800;
}
.floating {
  position: fixed;
  right: 22px;
  bottom: 22px;
  z-index: 40;
}
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 120;
  background: rgba(13,22,35,.56);
  backdrop-filter: blur(10px);
  display: grid;
  place-items: center;
  padding: 22px;
  animation: fadeIn .22s ease both;
}
.modal {
  width: min(1030px, 100%);
  max-height: min(92vh, 920px);
  overflow: auto;
  border-radius: 34px;
  background: #ffffff;
  color: var(--ink);
  border: 1px solid rgba(255,255,255,.76);
  box-shadow: 0 50px 130px rgba(0,0,0,.28);
  animation: modalIn .28s cubic-bezier(.2,.8,.2,1) both;
}
.modal-head {
  position: sticky;
  top: 0;
  z-index: 3;
  background: rgba(255,255,255,.9);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--line);
  padding: 22px 26px;
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: center;
}
.modal-head h2 {
  margin: 0;
  font-size: 24px;
  letter-spacing: -.04em;
}
.close {
  width: 42px;
  height: 42px;
  border: 0;
  border-radius: 999px;
  cursor: pointer;
  background: var(--soft);
  color: var(--ink);
  font-size: 22px;
}
.modal-body {
  padding: 26px;
}
.modal-grid {
  display: grid;
  grid-template-columns: .9fr 1.1fr;
  gap: 22px;
}
.modal-card {
  border: 1px solid var(--line);
  border-radius: 28px;
  padding: 22px;
  background: var(--surface);
}
.modal-card h3 {
  margin: 0 0 14px;
  color: var(--ink);
}
.modal-option {
  width: 100%;
  text-align: left;
  border: 1px solid var(--line);
  background: #fff;
  color: var(--ink);
  border-radius: 18px;
  padding: 14px;
  margin-bottom: 9px;
  cursor: pointer;
  transition: .16s ease;
}
.modal-option:hover {
  border-color: rgba(80,120,95,.38);
  background: #f8fbf9;
}
.modal-option.active {
  border-color: #6e9c85;
  background: #e9f4f1;
}
.modal-option strong {
  display: block;
  margin-bottom: 4px;
}
.modal-option small {
  color: var(--muted);
}
.form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 18px;
}
.input,
.textarea {
  width: 100%;
  border-radius: 18px;
  border: 1px solid var(--line);
  background: #fff;
  color: var(--ink);
  padding: 14px 16px;
  outline: none;
}
.input:focus,
.textarea:focus {
  border-color: #6e9c85;
  box-shadow: 0 0 0 4px rgba(110,156,133,.12);
}
.textarea {
  grid-column: 1 / -1;
  min-height: 108px;
  resize: vertical;
  line-height: 1.55;
}
.upload {
  grid-column: 1 / -1;
  border: 1px dashed #cbd8d1;
  background: #f8fbf9;
  border-radius: 20px;
  padding: 16px;
}
.upload input {
  display: none;
}
.upload-label {
  display: inline-flex;
  background: var(--ink);
  color: white;
  border-radius: 999px;
  padding: 10px 14px;
  font-weight: 900;
  cursor: pointer;
}
.consent {
  grid-column: 1 / -1;
  display: flex;
  gap: 12px;
  color: var(--slate);
  font-size: 13px;
  line-height: 1.55;
  padding: 14px;
  border-radius: 20px;
  background: #f8fbf9;
  border: 1px solid var(--line);
}
.consent input {
  width: 18px;
  height: 18px;
  accent-color: #6e9c85;
  flex: 0 0 auto;
}
.consent a {
  color: var(--blue);
  text-decoration: none;
  font-weight: 900;
}
.data-note {
  grid-column: 1 / -1;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.6;
}
.success {
  margin-top: 18px;
  padding: 18px;
  border-radius: 20px;
  background: #e9f8ef;
  border: 1px solid #bfe3cd;
  color: #166534;
  font-weight: 800;
  line-height: 1.65;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes modalIn {
  from { opacity: 0; transform: translateY(22px) scale(.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
@media (max-width: 1080px) {
  .hero-grid,
  .experience,
  .contact-grid,
  .booking-preview,
  .modal-grid {
    grid-template-columns: 1fr;
  }
  .hero-note {
    display: none;
  }
  .grid-4 {
    grid-template-columns: repeat(2, 1fr);
  }
  .hero-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  .media-shell,
  .media-shell img,
  .media-fallback {
    min-height: 480px;
  }
}
@media (max-width: 720px) {
  .wrap {
    width: calc(100% - 30px);
  }
  .header-inner {
    min-height: 68px;
  }
  .nav button:not(.book) {
    display: none;
  }
  .logo-title {
    font-size: 16px;
  }
  .logo-sub {
    font-size: 9px;
    max-width: 190px;
  }
  .hero {
    padding: 54px 0 42px;
  }
  .hero h1 {
    font-size: clamp(42px, 12vw, 56px);
  }
  .hero-stats,
  .grid-4,
  .grid-3,
  .grid-2,
  .form {
    grid-template-columns: 1fr;
  }
  .section {
    padding: 68px 0;
  }
  .section-head {
    display: block;
  }
  .trust-item {
    border-right: 0 !important;
    padding: 8px 14px;
  }
  .media-shell,
  .media-shell img,
  .media-fallback {
    min-height: 430px;
  }
  .media-caption {
    left: 16px;
    right: 16px;
    bottom: 16px;
    padding: 18px;
  }
  .media-caption h2 {
    font-size: 23px;
  }
}
`;

export default function Odontologija1() {
  const [modalOpen, setModalOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [selectedService, setSelectedService] = useState(SERVICES[0]);
  const [selectedDoctor, setSelectedDoctor] = useState(SERVICES[0].doctors[0]);
  const [selectedDate, setSelectedDate] = useState("2026-06-08");
  const [selectedTime, setSelectedTime] = useState("09:00");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const doctorsForService = useMemo(() => selectedService.doctors, [selectedService]);
  const times = selectedDate ? SLOTS[selectedDate] || [] : [];

  useEffect(() => {
    function onScroll() {
      setHeaderScrolled(window.scrollY > 22);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === "Escape") setModalOpen(false);
    }

    if (modalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", closeOnEscape);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [modalOpen]);

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function openRegistration(service = selectedService) {
    setSelectedService(service);
    setSelectedDoctor(service.doctors[0]);
    setSubmitted(false);
    setModalOpen(true);
  }

  function chooseDate(date) {
    setSelectedDate(date);
    setSelectedTime((SLOTS[date] || [])[0] || "");
    setSubmitted(false);
  }

  function chooseService(service) {
    setSelectedService(service);
    setSelectedDoctor(service.doctors[0]);
    setSelectedDate("");
    setSelectedTime("");
    setSubmitted(false);
  }

  function submit(event) {
    event.preventDefault();
    if (!name || !phone || !selectedDate || !selectedTime || !accepted) return;
    setSubmitted(true);
  }

  function initials(nameValue) {
    const parts = nameValue.split(" ").filter(Boolean);
    return parts.slice(1, 3).map((part) => part[0]).join("").toUpperCase() || "Dr";
  }

  function formatDate(date) {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${Number(day)} ${LT_MONTHS[Number(month) - 1]} ${year}`;
  }

  return (
    <div className="site">
      <style>{CSS}</style>

      <header className={`header ${headerScrolled ? "scrolled" : ""}`}>
        <div className="wrap header-inner">
          <div className="logo" onClick={() => scrollTo("top")}>
            <div className="logo-mark"><span /></div>
            <div>
              <div className="logo-title">JŪSŲ LOGOTIPO VIETA</div>
              <div className="logo-sub">Odontologijos klinikos svetainės demonstracija</div>
            </div>
          </div>

          <nav className="nav" aria-label="Pagrindinė navigacija">
            <button type="button" onClick={() => scrollTo("services")}>Paslaugos</button>
            <button type="button" onClick={() => scrollTo("doctors")}>Specialistai</button>
            <button type="button" onClick={() => scrollTo("prices")}>Kainos</button>
            <button type="button" onClick={() => scrollTo("contact")}>Kontaktai</button>
            <button type="button" className="book" onClick={() => openRegistration()}>Registruotis vizitui</button>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="wrap hero-grid">
            <div className="reveal is-visible">
              <div className="eyebrow">Premium medicininė estetika</div>
              <h1>Rami, moderni odontologija <em>Jūsų šypsenai</em></h1>
              <p className="hero-lead">
                Švari, aiški ir pasitikėjimą kurianti klinikos svetainė: profesionalus paslaugų pristatymas, specialistų komanda ir patogi registracija internetu bet kuriuo metu.
              </p>

              <div className="hero-actions">
                <button className="btn btn-primary" type="button" onClick={() => openRegistration()}>
                  Registruotis vizitui
                </button>
                <button className="btn btn-soft" type="button" onClick={() => scrollTo("services")}>
                  Peržiūrėti paslaugas
                </button>
              </div>

              <div className="hero-stats">
                <div className="stat"><strong>24/7</strong><span>Registracija internetu</span></div>
                <div className="stat"><strong>4.9 ★</strong><span>Pacientų įvertinimas</span></div>
                <div className="stat"><strong>12+</strong><span>Metų patirties</span></div>
                <div className="stat"><strong>Aiškūs</strong><span>Gydymo planai</span></div>
              </div>
            </div>

            <div className="hero-media reveal is-visible">
              <div className="media-shell">
                <img
                  src="/klinika-hero.png"
                  alt="Modernios odontologijos klinikos aplinka"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                    const fallback = event.currentTarget.nextElementSibling;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                <div className="media-fallback">
                  Įkelkite klinikos nuotrauką į public/klinika-hero.png
                </div>
                <div className="media-shade" />
                <div className="media-caption">
                  <h2>JŪSŲ KLINIKOS PAVADINIMAS</h2>
                  <p>Odontologijos klinika · profesionali priežiūra Jūsų šypsenai</p>
                  <div className="caption-tags">
                    <span>Individualūs planai</span>
                    <span>Patyrusi komanda</span>
                    <span>Šiuolaikinė aplinka</span>
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

        <div className="trust">
          <div className="wrap trust-row">
            <div className="trust-item">✦ Profesionali komanda</div>
            <div className="trust-item">⌁ Saugūs duomenys</div>
            <div className="trust-item">◌ Patogūs mokėjimai</div>
            <div className="trust-item">◎ Aiškios kainos</div>
            <div className="trust-item">★ Aukštas įvertinimas</div>
          </div>
        </div>

        <section className="section" id="services">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <div className="kicker">Paslaugos</div>
                <h2 className="title">Aiškiai pateiktos <em>odontologijos paslaugos</em></h2>
                <div className="rule" />
              </div>
              <p className="lead">
                Švarios kortelės, subtilios ikonėlės ir aiški informacija padeda pacientui greitai suprasti, kokios paslaugos teikiamos ir nuo ko pradėti.
              </p>
            </div>

            <div className="grid-3">
              {SERVICES.map((service) => (
                <article className="card service-card reveal" key={service.id}>
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="service-meta">
                    <div className="price">{service.price}</div>
                    <div className="duration">{service.duration}</div>
                  </div>
                  <button className="btn btn-soft" style={{ width: "100%", marginTop: 18 }} onClick={() => openRegistration(service)}>
                    Registruotis
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section soft" id="prices">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <div className="kicker">Kainos</div>
                <h2 className="title">Skaidri kainodara ir <em>aiškūs planai</em></h2>
                <div className="rule" />
              </div>
              <p className="lead">
                Orientacinės kainos padeda pacientui greičiau apsispręsti. Tiksli kaina pateikiama po individualios konsultacijos.
              </p>
            </div>

            <div className="booking-preview reveal">
              <div className="booking-preview-card">
                <h3 style={{ marginTop: 0 }}>Pirmo vizito eiga</h3>
                <div className="steps">
                  {[
                    ["01", "Įsiklausymas", "Išsiaiškinami paciento lūkesčiai, nusiskundimai ir ankstesnė gydymo patirtis."],
                    ["02", "Diagnostika", "Atliekama apžiūra, įvertinama situacija ir, jei reikia, analizuojamos rentgeno nuotraukos."],
                    ["03", "Gydymo planas", "Pacientui pateikiamas aiškus planas, galimos alternatyvos ir preliminarios kainos."],
                  ].map(([number, title, text]) => (
                    <div className="step" style={{ background: "#fff", borderColor: "var(--line)" }} key={number}>
                      <div className="step-number" style={{ color: "#50785f" }}>{number}</div>
                      <div>
                        <h3 style={{ color: "var(--ink)" }}>{title}</h3>
                        <p style={{ color: "var(--muted)" }}>{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="booking-preview-card">
                <h3 style={{ marginTop: 0 }}>Interaktyvus laiko pasirinkimas</h3>
                <Calendar selected={selectedDate} onSelect={chooseDate} />
                <div className="times">
                  {(SLOTS[selectedDate] || []).map((time) => (
                    <button
                      type="button"
                      className={`time ${selectedTime === time ? "active" : ""}`}
                      key={time}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                <button className="btn btn-primary" style={{ width: "100%", marginTop: 18 }} onClick={() => openRegistration()}>
                  Užbaigti registraciją
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="doctors">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <div className="kicker">Specialistai</div>
                <h2 className="title">Komanda, kurią pacientas <em>nori pažinti</em></h2>
                <div className="rule" />
              </div>
              <p className="lead">
                Specialistų pristatymas sukuria asmeninį ryšį dar prieš pirmą vizitą. Tai vienas svarbiausių pasitikėjimo elementų medicinos svetainėse.
              </p>
            </div>

            <div className="grid-4">
              {DOCTORS.map((doctor) => (
                <article className="card doctor-card reveal" key={doctor.name}>
                  <div className="doctor-top">
                    <div className="doctor-avatar">{initials(doctor.name)}</div>
                    <h3>{doctor.name}</h3>
                    <div className="doctor-role">{doctor.role}</div>
                    <div className="doctor-exp">{doctor.exp}</div>
                  </div>
                  <div className="doctor-body">
                    <p>„{doctor.text}“</p>
                    <div className="doctor-tags">
                      {doctor.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                    <button className="btn btn-soft" style={{ width: "100%", marginTop: 20 }} onClick={() => openRegistration()}>
                      Registruotis
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section dark">
          <div className="wrap experience reveal">
            <div>
              <div className="kicker">Paciento kelias</div>
              <h2 className="title">Aiški patirtis nuo <em>pirmo kontakto</em></h2>
              <div className="rule" />
              <p className="lead" style={{ marginTop: 24 }}>
                Premium odontologijos svetainė ne tik pristato kliniką, bet ir padeda pacientui suprasti procesą: nuo registracijos iki gydymo plano.
              </p>
              <button className="btn btn-quiet" style={{ marginTop: 26 }} onClick={() => openRegistration()}>
                Registruotis pirmai konsultacijai
              </button>
            </div>

            <div className="experience-panel">
              <div className="steps">
                {[
                  ["01", "Patogi registracija", "Pacientas pasirenka paslaugą, gydytoją, datą ir laiką internetu."],
                  ["02", "Aiški informacija", "Forma surenka komentarą, kontaktus ir, jei reikia, rentgeno nuotrauką."],
                  ["03", "Administravimas", "Administratorius gauna struktūruotą užklausą ir gali patvirtinti vizitą."],
                ].map(([number, title, text]) => (
                  <div className="step" key={number}>
                    <div className="step-number">{number}</div>
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="proof">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <div className="kicker">Social proof</div>
                <h2 className="title">Atsiliepimai ir <em>Prieš / Po</em> konceptas</h2>
                <div className="rule" />
              </div>
              <p className="lead">
                Pacientų atsiliepimai, gydytojų pristatymas ir vizualūs gydymo rezultatų konceptai didina pasitikėjimą ir padeda apsispręsti.
              </p>
            </div>

            <div className="grid-3" style={{ marginBottom: 20 }}>
              {REVIEWS.map((review) => (
                <article className="card review-card reveal" key={review.name}>
                  <div className="review-stars">★★★★★</div>
                  <p>„{review.text}“</p>
                  <div className="review-author">
                    <div className="review-avatar">{review.name[0]}</div>
                    <div>
                      <strong>{review.name}</strong>
                      <div style={{ color: "var(--muted)", fontSize: 12 }}>{review.service}</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="grid-3">
              {CASES.map((item) => (
                <article className="card case-card reveal" key={item.title}>
                  <div className="case-visual">
                    <div className="case-half before">{item.before}</div>
                    <div className="case-half after">{item.after}</div>
                  </div>
                  <div className="case-body">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section soft">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <div className="kicker">Dažniausi klausimai</div>
                <h2 className="title">Atsakymai prieš <em>pirmą vizitą</em></h2>
                <div className="rule" />
              </div>
            </div>

            <div className="grid-2">
              {FAQS.map((faq) => (
                <details className="faq reveal" key={faq.q}>
                  <summary>{faq.q}</summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <div className="kicker">Kontaktai</div>
                <h2 className="title">Aiški informacija, <em>kur mus rasti</em></h2>
                <div className="rule" />
              </div>
              <p className="lead">
                Pacientui svarbiausia greitai rasti telefoną, adresą, darbo laiką ir patogų registracijos veiksmą.
              </p>
            </div>

            <div className="contact-grid">
              <div className="contact-card reveal">
                {[
                  ["📞", "Telefonas", "+370 600 00000"],
                  ["✉️", "El. paštas", "info@jusuklinika.lt"],
                  ["📍", "Adresas", "Jūsų miestas, Lietuva"],
                  ["🕐", "Darbo laikas", "I–V 08:00–19:00 · VI 09:00–14:00"],
                ].map(([icon, label, value]) => (
                  <div className="contact-row" key={label}>
                    <div className="contact-icon">{icon}</div>
                    <div>
                      <div style={{ color: "var(--muted)", fontSize: 12, fontWeight: 900, textTransform: "uppercase", letterSpacing: ".06em" }}>{label}</div>
                      <strong>{value}</strong>
                    </div>
                  </div>
                ))}
                <button className="btn btn-primary" onClick={() => openRegistration()} style={{ width: "100%", marginTop: 18 }}>
                  Registruotis vizitui
                </button>
              </div>

              <div className="map reveal">
                <div>
                  <div style={{ fontSize: 42, marginBottom: 12 }}>🗺️</div>
                  <h3 style={{ margin: 0, fontSize: 28, letterSpacing: "-.04em" }}>Google Maps integracija</h3>
                  <p style={{ color: "var(--muted)", lineHeight: 1.7, maxWidth: 420 }}>
                    Čia įterpiamas tikras klinikos žemėlapis, parkavimo informacija ir patogus maršruto atidarymas telefone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer-inner">
          <div>
            <div className="footer-brand">JŪSŲ LOGOTIPO VIETA</div>
            <div style={{ fontSize: 13, marginTop: 5 }}>Odontologijos klinikos svetainės demonstracija</div>
          </div>
          <div className="footer-links">
            <a href="/privatumas">Privatumo politika</a>
            <a href="/privatumas#slapukai">Slapukai</a>
            <a href="/privatumas#sutikimai">Duomenų sutikimai</a>
          </div>
          <span style={{ fontSize: 13 }}>© 2026</span>
        </div>
      </footer>

      <div className="floating">
        <button className="btn btn-primary" onClick={() => openRegistration()}>📅 Registruotis</button>
      </div>

      {modalOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setModalOpen(false)}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="registration-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className="modal-head">
              <div>
                <h2 id="registration-title">Registracija vizitui</h2>
                <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}>
                  Pasirinkite paslaugą, specialistą, laiką ir pateikite kontaktus.
                </div>
              </div>
              <button className="close" type="button" onClick={() => setModalOpen(false)} aria-label="Uždaryti">×</button>
            </div>

            <div className="modal-body">
              <div className="modal-grid">
                <div className="modal-card">
                  <h3>1. Paslauga</h3>
                  {SERVICES.map((service) => (
                    <button
                      type="button"
                      key={service.id}
                      className={`modal-option ${selectedService.id === service.id ? "active" : ""}`}
                      onClick={() => chooseService(service)}
                    >
                      <strong>{service.title}</strong>
                      <small>{service.price} · {service.duration}</small>
                    </button>
                  ))}

                  <div style={{ height: 1, background: "var(--line)", margin: "20px 0" }} />

                  <h3>2. Specialistas</h3>
                  {doctorsForService.map((doctor) => (
                    <button
                      type="button"
                      key={doctor}
                      className={`modal-option ${selectedDoctor === doctor ? "active" : ""}`}
                      onClick={() => setSelectedDoctor(doctor)}
                    >
                      <strong>{doctor}</strong>
                      <small>Specialistas parenkamas pagal pasirinktą paslaugą</small>
                    </button>
                  ))}
                </div>

                <div className="modal-card">
                  <h3>3. Data ir laikas</h3>
                  <Calendar selected={selectedDate} onSelect={chooseDate} />

                  {selectedDate && (
                    <>
                      <div style={{ marginTop: 18, color: "var(--muted)", fontWeight: 900, textTransform: "uppercase", fontSize: 12, letterSpacing: ".08em" }}>
                        Laisvi laikai · {formatDate(selectedDate)}
                      </div>
                      <div className="times">
                        {times.map((time) => (
                          <button
                            type="button"
                            key={time}
                            className={`time ${selectedTime === time ? "active" : ""}`}
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </button>
                        ))}
                      </div>

                      <form className="form" onSubmit={submit}>
                        <input className="input" placeholder="Vardas ir pavardė *" value={name} onChange={(event) => setName(event.target.value)} />
                        <input className="input" placeholder="Telefono numeris *" value={phone} onChange={(event) => setPhone(event.target.value)} />
                        <input className="input" placeholder="El. paštas (neprivaloma)" value={email} onChange={(event) => setEmail(event.target.value)} />
                        <input className="input" placeholder="Miestas / pastaba (neprivaloma)" />
                        <textarea
                          className="textarea"
                          placeholder="Trumpai aprašykite situaciją arba klausimą. Pvz. domina preliminari kaina, turite rentgeno nuotrauką arba norėtumėte pasikonsultuoti dėl gydymo galimybių."
                          value={message}
                          onChange={(event) => setMessage(event.target.value)}
                        />

                        <div className="upload">
                          <strong style={{ display: "block", color: "var(--ink)", marginBottom: 8 }}>Rentgeno nuotrauka, jei turite</strong>
                          <p style={{ margin: "0 0 12px", color: "var(--muted)", fontSize: 13 }}>
                            PDF, JPG arba PNG iki 10 MB. Failas padeda tiksliau įvertinti situaciją.
                          </p>
                          <label className="upload-label">
                            📎 Įkelti failą
                            <input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(event) => setFileName(event.target.files?.[0]?.name || "")}
                            />
                          </label>
                          <span style={{ marginLeft: 12, color: "var(--muted)", fontSize: 13 }}>
                            {fileName || "Failas nepasirinktas"}
                          </span>
                        </div>

                        <label className="consent">
                          <input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} />
                          <span>
                            Susipažinau su <a href="/privatumas">privatumo politika</a> ir sutinku, kad mano pateikti duomenys būtų naudojami užklausos administravimui. *
                          </span>
                        </label>

                        <p className="data-note">
                          Jūsų pateikti duomenys naudojami tik užklausos nagrinėjimui ir nėra perduodami tretiesiems asmenims be teisėto pagrindo.
                        </p>

                        <button className="btn btn-primary" type="submit" disabled={!accepted || !name || !phone || !selectedDate || !selectedTime} style={{ gridColumn: "1 / -1", padding: 16 }}>
                          Patvirtinti registraciją
                        </button>
                      </form>

                      {submitted && (
                        <div className="success">
                          Registracija gauta: <strong>{selectedService.title}</strong>, {selectedDoctor}, {formatDate(selectedDate)} {selectedTime}. Administratorius susisieks dėl patvirtinimo.
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
