import { useMemo, useState } from "react";

/*
  ODONTOLOGIJOS KLINIKOS PREMIUM SVETAINĖS DEMO
  ------------------------------------------------
  Naudojama nuotrauka:
  public/klinika-hero.png

  Įdėjimas:
  1) Šį failą įkelkite kaip src/Odontologija1.jsx
  2) Nuotrauką įkelkite į public/klinika-hero.png
  3) npm run dev
*/

const SERVICES = [
  {
    id: "konsultacija",
    icon: "◎",
    title: "Konsultacija ir gydymo planas",
    price: "nuo 30 €",
    duration: "30–45 min.",
    desc: "Išsami apžiūra, situacijos paaiškinimas, preliminarios alternatyvos ir aiškus tolimesnių veiksmų planas.",
    doctors: ["Dr. Monika Vaičiulytė", "Dr. Jonas Petrauskas"],
  },
  {
    id: "higiena",
    icon: "✦",
    title: "Profesionali burnos higiena",
    price: "nuo 70 €",
    duration: "45–60 min.",
    desc: "Apnašų ir pigmentacijos šalinimas, Air-Flow, poliravimas ir individualios burnos priežiūros rekomendacijos.",
    doctors: ["Dr. Lina Vaitkūnienė", "Dr. Monika Vaičiulytė"],
  },
  {
    id: "estetika",
    icon: "◇",
    title: "Estetinis plombavimas",
    price: "nuo 90 €",
    duration: "60–120 min.",
    desc: "Natūralios danties formos, spalvos ir funkcijos atkūrimas, išlaikant individualią šypsenos estetiką.",
    doctors: ["Dr. Jonas Petrauskas"],
  },
  {
    id: "implantai",
    icon: "◈",
    title: "Implantologijos konsultacija",
    price: "nuo 50 €",
    duration: "45 min.",
    desc: "Situacijos įvertinimas, rentgeno analizė ir individualaus implantologinio gydymo galimybių aptarimas.",
    doctors: ["Dr. Marius Čepas"],
  },
  {
    id: "chirurgija",
    icon: "△",
    title: "Burnos chirurgija",
    price: "nuo 80 €",
    duration: "30–90 min.",
    desc: "Atraumatinis dantų šalinimas, chirurginės konsultacijos ir aiškios rekomendacijos po procedūros.",
    doctors: ["Dr. Marius Čepas"],
  },
  {
    id: "protezas",
    icon: "◌",
    title: "Protezavimo konsultacija",
    price: "nuo 40 €",
    duration: "45 min.",
    desc: "Funkcijos, estetikos ir komforto atkūrimo galimybių aptarimas, atsižvelgiant į paciento poreikius.",
    doctors: ["Dr. Monika Vaičiulytė", "Dr. Jonas Petrauskas"],
  },
];

const DOCTORS = [
  {
    name: "Dr. Monika Vaičiulytė",
    role: "Konsultacijos ir gydymo planai",
    exp: "8 m. patirtis",
    quote: "Pacientui pirmiausia reikia aiškumo, ramybės ir suprantamo gydymo plano.",
    tags: ["Gydymo planai", "Profilaktika", "Konsultacijos"],
  },
  {
    name: "Dr. Jonas Petrauskas",
    role: "Terapinis ir estetinis gydymas",
    exp: "10 m. patirtis",
    quote: "Kruopštumas, natūrali estetika ir pagarbus bendravimas yra mano darbo pagrindas.",
    tags: ["Plombavimas", "Estetika", "Terapija"],
  },
  {
    name: "Dr. Lina Vaitkūnienė",
    role: "Profesionali burnos higiena",
    exp: "7 m. patirtis",
    quote: "Net profilaktinis vizitas gali būti ramus, švelnus ir malonus.",
    tags: ["Higiena", "Air-Flow", "Profilaktika"],
  },
  {
    name: "Dr. Marius Čepas",
    role: "Burnos chirurgija",
    exp: "12 m. patirtis",
    quote: "Chirurginiame gydyme svarbiausia tikslumas, saugumas ir aiški priežiūra po vizito.",
    tags: ["Chirurgija", "Šalinimas", "Implantologija"],
  },
];

const REVIEWS = [
  {
    text: "Vizito metu viskas buvo paaiškinta labai aiškiai. Gavau gydymo planą, kainas ir supratau, ką rinktis toliau.",
    name: "Milda K.",
    service: "Konsultacija",
  },
  {
    text: "Labai rami aplinka, malonus personalas ir profesionali higiena. Patiko, kad nereikėjo niekur skubėti.",
    name: "Rasa M.",
    service: "Burnos higiena",
  },
  {
    text: "Registracija internetu labai patogi. Užpildžiau vakare, o kitą dieną gavau patvirtinimą dėl vizito.",
    name: "Tomas R.",
    service: "Registracija internetu",
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
    a: "Svetainė gali būti prijungta prie SMS ir el. pašto priminimų sistemos, kad pacientas būtų informuotas apie artėjantį vizitą iš anksto.",
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
  const [yr, setYr] = useState(2026);
  const [mo, setMo] = useState(5);

  const available = new Set(Object.keys(SLOTS));
  const key = (y, m, d) => `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const firstDow = new Date(yr, mo, 1).getDay();
  const offset = firstDow === 0 ? 6 : firstDow - 1;
  const dim = new Date(yr, mo + 1, 0).getDate();
  const cells = [...Array(offset).fill(null), ...Array.from({ length: dim }, (_, i) => i + 1)];

  function prev() {
    if (mo === 0) {
      setMo(11);
      setYr((y) => y - 1);
    } else {
      setMo((m) => m - 1);
    }
  }

  function next() {
    if (mo === 11) {
      setMo(0);
      setYr((y) => y + 1);
    } else {
      setMo((m) => m + 1);
    }
  }

  return (
    <div className="calendar-card">
      <div className="calendar-head">
        <button type="button" onClick={prev} aria-label="Ankstesnis mėnuo">‹</button>
        <strong>{LT_MONTHS[mo]} {yr}</strong>
        <button type="button" onClick={next} aria-label="Kitas mėnuo">›</button>
      </div>
      <div className="calendar-week">
        {LT_SHORT.map((day) => <span key={day}>{day}</span>)}
      </div>
      <div className="calendar-grid">
        {cells.map((day, index) => {
          if (!day) return <span key={`empty-${index}`} />;
          const date = key(yr, mo, day);
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
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&display=swap');

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: #f7f4ee;
  color: #132238;
  font-family: Inter, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}
button, input, textarea, select { font: inherit; }
:root {
  --ink: #132238;
  --ink-2: #20344f;
  --muted: #667085;
  --soft: #f7f4ee;
  --paper: #fffdf8;
  --line: #e6dfd1;
  --gold: #b58a45;
  --gold-2: #d9bd86;
  --aqua: #dff2ee;
  --sage: #9fb7aa;
  --blue: #0c5f91;
  --danger: #9f1239;
  --shadow-sm: 0 8px 26px rgba(19,34,56,.07);
  --shadow-md: 0 18px 60px rgba(19,34,56,.12);
  --shadow-lg: 0 38px 110px rgba(19,34,56,.18);
  --radius-xl: 34px;
  --radius-lg: 24px;
  --radius-md: 16px;
}
.site {
  min-height: 100vh;
  background:
    radial-gradient(circle at 10% 0%, rgba(217,189,134,.18), transparent 36%),
    radial-gradient(circle at 100% 10%, rgba(159,183,170,.18), transparent 34%),
    linear-gradient(180deg, #fffdf8 0%, #f7f4ee 44%, #fffdf8 100%);
  overflow-x: hidden;
}
.wrap {
  width: min(1210px, calc(100% - 44px));
  margin: 0 auto;
}
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255,253,248,.88);
  backdrop-filter: blur(22px);
  border-bottom: 1px solid rgba(230,223,209,.72);
}
.header-inner {
  min-height: 78px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
.logo {
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
}
.logo-mark {
  width: 46px;
  height: 46px;
  border-radius: 16px;
  background: linear-gradient(145deg, var(--ink), #1f3758);
  display: grid;
  place-items: center;
  color: white;
  box-shadow: 0 14px 34px rgba(19,34,56,.2);
}
.logo-mark span {
  width: 18px;
  height: 18px;
  display: grid;
  place-items: center;
  position: relative;
}
.logo-mark span::before,
.logo-mark span::after {
  content: "";
  position: absolute;
  background: #fff;
  border-radius: 99px;
}
.logo-mark span::before { width: 18px; height: 3px; }
.logo-mark span::after { width: 3px; height: 18px; }
.logo-title {
  font-family: "Playfair Display", serif;
  font-size: 20px;
  line-height: 1.02;
  color: var(--ink);
  font-weight: 700;
  letter-spacing: -.02em;
}
.logo-sub {
  margin-top: 3px;
  color: var(--muted);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .09em;
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
.nav button:hover,
.nav button.active {
  color: var(--ink);
  background: rgba(19,34,56,.06);
}
.nav .book {
  margin-left: 8px;
  background: var(--ink);
  color: white;
  padding: 12px 22px;
  box-shadow: 0 14px 34px rgba(19,34,56,.2);
}
.nav .book:hover { background: #20344f; color: white; transform: translateY(-1px); }
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
  box-shadow: 0 16px 40px rgba(19,34,56,.22);
}
.btn-primary:hover { transform: translateY(-2px); background: #20344f; }
.btn-gold {
  background: linear-gradient(135deg, var(--gold), #caa66a);
  color: white;
  box-shadow: 0 16px 36px rgba(181,138,69,.28);
}
.btn-gold:hover { transform: translateY(-2px); }
.btn-outline {
  color: var(--ink);
  background: rgba(255,253,248,.68);
  border: 1px solid var(--line);
}
.btn-outline:hover { border-color: var(--ink); background: #fff; transform: translateY(-1px); }
.btn:disabled {
  opacity: .55;
  cursor: not-allowed;
  transform: none;
}
.hero {
  position: relative;
  padding: 88px 0 64px;
}
.hero::before {
  content: "";
  position: absolute;
  inset: 18px auto auto 50%;
  width: 720px;
  height: 720px;
  transform: translateX(-18%);
  border-radius: 999px;
  background: radial-gradient(circle, rgba(181,138,69,.14), transparent 64%);
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
  border: 1px solid rgba(181,138,69,.24);
  background: rgba(217,189,134,.16);
  color: #85632f;
  border-radius: 999px;
  padding: 9px 16px;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: .09em;
  text-transform: uppercase;
}
.eyebrow::before {
  content: "";
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: var(--gold);
}
.hero h1 {
  font-family: "Playfair Display", serif;
  color: var(--ink);
  margin: 24px 0 20px;
  font-size: clamp(48px, 5.7vw, 84px);
  line-height: .96;
  letter-spacing: -.045em;
  max-width: 780px;
}
.hero h1 em {
  color: var(--gold);
  font-style: italic;
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
  background: rgba(255,253,248,.8);
  border: 1px solid rgba(230,223,209,.9);
  border-radius: 24px;
  padding: 18px 16px;
  box-shadow: var(--shadow-sm);
}
.stat strong {
  display: block;
  font-family: "Playfair Display", serif;
  color: var(--ink);
  font-size: 27px;
  line-height: 1;
  margin-bottom: 5px;
}
.stat span {
  color: var(--muted);
  font-size: 12px;
  line-height: 1.4;
  font-weight: 800;
}
.hero-media {
  position: relative;
}
.media-shell {
  position: relative;
  min-height: 610px;
  border-radius: 42px;
  overflow: hidden;
  background: #e9e2d7;
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(255,255,255,.55);
}
.media-shell img {
  width: 100%;
  height: 100%;
  min-height: 610px;
  object-fit: cover;
  display: block;
  filter: saturate(.94) contrast(1.04);
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
    linear-gradient(135deg, rgba(223,242,238,.9), rgba(255,253,248,.78)),
    repeating-linear-gradient(45deg, rgba(19,34,56,.03) 0 12px, transparent 12px 24px);
  color: var(--ink);
  font-weight: 900;
}
.media-shade {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(19,34,56,.02) 0%, rgba(19,34,56,.12) 46%, rgba(19,34,56,.76) 100%),
    linear-gradient(90deg, rgba(19,34,56,.06), transparent 34%);
}
.media-caption {
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 24px;
  color: white;
  border-radius: 28px;
  padding: 24px;
  background: rgba(19,34,56,.68);
  border: 1px solid rgba(255,255,255,.16);
  backdrop-filter: blur(16px);
}
.media-caption h2 {
  margin: 0 0 7px;
  font-family: "Playfair Display", serif;
  font-size: 31px;
  line-height: 1.04;
  letter-spacing: -.02em;
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
  width: 210px;
  border-radius: 26px;
  background: rgba(255,253,248,.92);
  border: 1px solid rgba(230,223,209,.9);
  box-shadow: var(--shadow-md);
  padding: 18px;
}
.hero-note small {
  color: var(--muted);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: .06em;
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
  padding: 20px 0;
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
  font-weight: 800;
}
.trust-item:not(:last-child) {
  border-right: 1px solid rgba(255,255,255,.14);
}
.section {
  padding: 92px 0;
}
.section.soft {
  background: rgba(245,240,230,.74);
}
.section.dark {
  background:
    radial-gradient(circle at 100% 0%, rgba(181,138,69,.13), transparent 36%),
    linear-gradient(180deg, #132238, #0f1c2f);
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
  color: var(--gold);
  font-size: 12px;
  font-weight: 950;
  letter-spacing: .13em;
  text-transform: uppercase;
  margin-bottom: 12px;
}
.title {
  margin: 0;
  font-family: "Playfair Display", serif;
  color: var(--ink);
  font-size: clamp(34px, 4vw, 56px);
  line-height: 1.04;
  letter-spacing: -.035em;
}
.title em {
  color: var(--gold);
  font-style: italic;
}
.dark .title { color: #fff; }
.lead {
  color: var(--muted);
  line-height: 1.75;
  font-size: 16px;
  max-width: 620px;
}
.dark .lead { color: rgba(255,255,255,.65); }
.rule {
  width: 54px;
  height: 2px;
  background: var(--gold);
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
  background: rgba(255,253,248,.82);
  border: 1px solid rgba(230,223,209,.9);
  border-radius: 30px;
  padding: 28px;
  box-shadow: var(--shadow-sm);
  transition: .22s ease;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}
.feature-icon,
.service-icon {
  width: 54px;
  height: 54px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  color: var(--gold);
  background: rgba(217,189,134,.14);
  border: 1px solid rgba(181,138,69,.18);
  font-size: 23px;
  margin-bottom: 18px;
  font-weight: 900;
}
.card h3 {
  margin: 0 0 10px;
  color: var(--ink);
  font-size: 18px;
  line-height: 1.25;
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
  background: linear-gradient(90deg, var(--gold), var(--gold-2));
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
  font-family: "Playfair Display", serif;
  font-size: 28px;
  font-weight: 700;
  color: var(--ink);
}
.duration {
  color: var(--muted);
  background: rgba(19,34,56,.05);
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
    radial-gradient(circle at 84% 10%, rgba(181,138,69,.22), transparent 38%),
    linear-gradient(135deg, #fffdf8, #f0eadf);
}
.doctor-avatar {
  width: 78px;
  height: 78px;
  border-radius: 24px;
  background: linear-gradient(145deg, var(--ink), #284261);
  color: white;
  display: grid;
  place-items: center;
  font-family: "Playfair Display", serif;
  font-size: 25px;
  font-weight: 800;
  margin-bottom: 18px;
}
.doctor-body { padding: 24px 28px 28px; }
.doctor-role {
  color: var(--gold);
  font-weight: 900;
  font-size: 13px;
  margin-bottom: 6px;
}
.doctor-exp {
  color: var(--muted);
  font-size: 12px;
  font-weight: 800;
  margin-bottom: 16px;
}
.doctor-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 18px;
}
.doctor-tags span {
  background: rgba(19,34,56,.06);
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
  font-family: "Playfair Display", serif;
  color: var(--gold-2);
  font-size: 35px;
  font-weight: 800;
}
.step h3 {
  margin: 0 0 6px;
  color: #fff;
}
.step p {
  margin: 0;
  color: rgba(255,255,255,.62);
  line-height: 1.65;
  font-size: 14px;
}
.booking {
  background:
    radial-gradient(circle at 0% 0%, rgba(217,189,134,.14), transparent 42%),
    linear-gradient(180deg, #132238, #0f1c2f);
  color: #fff;
  padding: 90px 0;
}
.booking-grid {
  display: grid;
  grid-template-columns: .92fr 1.08fr;
  gap: 26px;
  align-items: start;
}
.booking-card {
  background: rgba(255,255,255,.075);
  border: 1px solid rgba(255,255,255,.13);
  border-radius: 34px;
  padding: 28px;
  box-shadow: 0 22px 70px rgba(0,0,0,.14);
}
.booking-card h3 {
  margin: 0 0 14px;
  font-family: "Playfair Display", serif;
  font-size: 21px;
  color: #fff;
}
.option {
  width: 100%;
  text-align: left;
  border: 1px solid rgba(255,255,255,.14);
  background: rgba(255,255,255,.05);
  color: #fff;
  border-radius: 20px;
  padding: 15px 16px;
  margin-bottom: 9px;
  cursor: pointer;
  transition: .16s ease;
}
.option:hover {
  background: rgba(255,255,255,.1);
}
.option.active {
  background: rgba(181,138,69,.24);
  border-color: var(--gold);
}
.option strong { display: block; margin-bottom: 3px; }
.option small { color: rgba(255,255,255,.62); }
.sep {
  height: 1px;
  background: rgba(255,255,255,.12);
  margin: 22px 0;
}
.calendar-card {
  background: #fffdf8;
  color: var(--ink);
  border-radius: 30px;
  padding: 22px;
  box-shadow: var(--shadow-md);
}
.calendar-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}
.calendar-head strong {
  font-family: "Playfair Display", serif;
  font-size: 19px;
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
  background: var(--gold);
}
.calendar-legend {
  display: flex;
  gap: 16px;
  margin-top: 14px;
  color: var(--muted);
  font-size: 12px;
  font-weight: 800;
}
.calendar-legend span { display: flex; align-items: center; gap: 6px; }
.legend-free,
.legend-selected {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  display: inline-block;
}
.legend-free { background: #d8eee8; border: 1px solid #bad9d0; }
.legend-selected { background: var(--ink); }
.times {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0 0;
}
.time {
  border: 1px solid rgba(255,255,255,.18);
  background: rgba(255,255,255,.06);
  color: white;
  border-radius: 999px;
  padding: 10px 16px;
  cursor: pointer;
  font-weight: 900;
}
.time.active {
  background: var(--gold);
  border-color: var(--gold);
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
  border: 1px solid rgba(255,255,255,.16);
  background: rgba(255,255,255,.07);
  color: white;
  padding: 14px 16px;
  outline: none;
}
.input::placeholder,
.textarea::placeholder { color: rgba(255,255,255,.42); }
.textarea {
  grid-column: 1 / -1;
  min-height: 112px;
  resize: vertical;
  line-height: 1.55;
}
.upload {
  grid-column: 1 / -1;
  border: 1px dashed rgba(255,255,255,.22);
  background: rgba(255,255,255,.045);
  border-radius: 20px;
  padding: 16px;
}
.upload input { display: none; }
.upload-label {
  display: inline-flex;
  background: rgba(255,255,255,.12);
  border: 1px solid rgba(255,255,255,.18);
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
  color: rgba(255,255,255,.7);
  font-size: 13px;
  line-height: 1.55;
  padding: 14px;
  border-radius: 20px;
  background: rgba(255,255,255,.05);
  border: 1px solid rgba(255,255,255,.1);
}
.consent input {
  width: 18px;
  height: 18px;
  accent-color: var(--gold);
  flex: 0 0 auto;
}
.consent a {
  color: var(--gold-2);
  text-decoration: none;
  font-weight: 900;
}
.data-note {
  grid-column: 1 / -1;
  color: rgba(255,255,255,.45);
  font-size: 12px;
  line-height: 1.6;
}
.success {
  margin-top: 18px;
  padding: 18px;
  border-radius: 20px;
  background: rgba(16,185,129,.14);
  border: 1px solid rgba(16,185,129,.3);
  color: #a7f3d0;
  font-weight: 800;
  line-height: 1.65;
}
.review-card p {
  font-style: italic;
  font-size: 15px;
}
.review-stars {
  color: var(--gold);
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
  background: rgba(19,34,56,.08);
  display: grid;
  place-items: center;
  font-weight: 950;
}
.faq {
  background: rgba(255,253,248,.82);
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
  color: var(--gold);
  font-size: 22px;
  line-height: 1;
}
.faq[open] summary::after { content: "–"; }
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
  background: rgba(255,253,248,.85);
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
.contact-row:last-child { border-bottom: 0; }
.contact-icon {
  width: 42px;
  height: 42px;
  border-radius: 15px;
  background: rgba(217,189,134,.16);
  display: grid;
  place-items: center;
}
.map {
  min-height: 420px;
  border-radius: 34px;
  border: 1px solid var(--line);
  background:
    linear-gradient(135deg, rgba(223,242,238,.9), rgba(255,253,248,.82)),
    radial-gradient(circle at 25% 30%, rgba(181,138,69,.18), transparent 20%);
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
  font-family: "Playfair Display", serif;
  color: white;
  font-weight: 700;
  font-size: 20px;
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
@media (max-width: 1080px) {
  .hero-grid,
  .booking-grid,
  .experience,
  .contact-grid {
    grid-template-columns: 1fr;
  }
  .hero-note { display: none; }
  .grid-4 { grid-template-columns: repeat(2, 1fr); }
  .hero-stats { grid-template-columns: repeat(2, 1fr); }
  .media-shell,
  .media-shell img,
  .media-fallback { min-height: 480px; }
}
@media (max-width: 720px) {
  .wrap { width: calc(100% - 30px); }
  .header-inner { min-height: 68px; }
  .nav button:not(.book) { display: none; }
  .logo-title { font-size: 17px; }
  .logo-sub { font-size: 9px; max-width: 190px; }
  .hero { padding: 54px 0 42px; }
  .hero h1 { font-size: clamp(42px, 12vw, 56px); }
  .hero-stats,
  .grid-4,
  .grid-3,
  .grid-2,
  .form {
    grid-template-columns: 1fr;
  }
  .section { padding: 68px 0; }
  .section-head { display: block; }
  .trust-item { border-right: 0 !important; padding: 8px 14px; }
  .media-shell,
  .media-shell img,
  .media-fallback { min-height: 430px; }
  .media-caption { left: 16px; right: 16px; bottom: 16px; padding: 18px; }
  .media-caption h2 { font-size: 24px; }
}
`;

export default function Odontologija1() {
  const [view, setView] = useState("home");
  const [selectedService, setSelectedService] = useState(SERVICES[0]);
  const [selectedDoctor, setSelectedDoctor] = useState(SERVICES[0].doctors[0]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const doctorsForService = useMemo(() => selectedService.doctors, [selectedService]);
  const times = selectedDate ? SLOTS[selectedDate] || [] : [];

  function go(next) {
    setView(next);
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function chooseService(service) {
    setSelectedService(service);
    setSelectedDoctor(service.doctors[0]);
    setSelectedDate("");
    setSelectedTime("");
    setSubmitted(false);
    go("booking");
  }

  function chooseDate(date) {
    setSelectedDate(date);
    setSelectedTime((SLOTS[date] || [])[0] || "");
    setSubmitted(false);
  }

  function submit(event) {
    event.preventDefault();
    if (!name || !phone || !selectedDate || !selectedTime || !accepted) return;
    setSubmitted(true);
  }

  function initials(nameValue) {
    return nameValue
      .split(" ")
      .filter(Boolean)
      .slice(1, 3)
      .map((item) => item[0])
      .join("")
      .toUpperCase() || "Dr";
  }

  function formatDate(date) {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${Number(day)} ${LT_MONTHS[Number(month) - 1]} ${year}`;
  }

  const Home = (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <div className="eyebrow">Registracija internetu 24/7</div>
            <h1>Premium odontologija <em>Jūsų šypsenai</em></h1>
            <p className="hero-lead">
              Moderni odontologijos klinikos svetainė, kuri kuria pasitikėjimą, aiškiai pristato paslaugas ir leidžia pacientams registruotis bet kuriuo metu.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => go("booking")}>Registruotis vizitui</button>
              <button className="btn btn-outline" onClick={() => go("services")}>Peržiūrėti paslaugas</button>
            </div>
            <div className="hero-stats">
              <div className="stat"><strong>24/7</strong><span>Registracija internetu</span></div>
              <div className="stat"><strong>4.9 ★</strong><span>Pacientų įvertinimas</span></div>
              <div className="stat"><strong>12+</strong><span>Metų patirties</span></div>
              <div className="stat"><strong>Aiškūs</strong><span>Gydymo planai</span></div>
            </div>
          </div>

          <div className="hero-media">
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

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="kicker">Kodėl pacientai renkasi</div>
              <h2 className="title">Pasitikėjimą kurianti <em>paciento patirtis</em></h2>
              <div className="rule" />
            </div>
            <p className="lead">
              Gerai sukurta odontologijos svetainė turi ne tik atrodyti gražiai. Ji turi aiškiai atsakyti į paciento klausimus, sumažinti abejones ir palengvinti registraciją.
            </p>
          </div>

          <div className="grid-4">
            {[
              ["◎", "Aiškus gydymo planas", "Po konsultacijos pacientas supranta gydymo eigą, alternatyvas ir preliminarią kainą."],
              ["◴", "Registracija internetu", "Pacientai gali pateikti užklausą vakare, savaitgalį ar ne darbo metu."],
              ["✦", "Rami premium estetika", "Subtilus dizainas, medicininė švara ir prabangos pojūtis be perteklinės reklamos."],
              ["☏", "Mažiau skambučių", "Forma surenka reikalingą informaciją, todėl administratorei lengviau paruošti atsakymą."],
            ].map(([icon, title, text]) => (
              <article className="card" key={title}>
                <div className="feature-icon">{icon}</div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="wrap experience">
          <div>
            <div className="kicker">Pirmas vizitas</div>
            <h2 className="title">Pacientas žino, <em>ko tikėtis</em></h2>
            <div className="rule" />
            <p className="lead" style={{ marginTop: 24 }}>
              Pirmo vizito informacija mažina paciento nerimą. Aiškūs žingsniai padeda suprasti, kad klinika dirba struktūruotai ir rūpinasi paciento patirtimi.
            </p>
            <button className="btn btn-gold" style={{ marginTop: 26 }} onClick={() => go("booking")}>
              Registruotis pirmai konsultacijai
            </button>
          </div>

          <div className="experience-panel">
            <div className="steps">
              {[
                ["01", "Įsiklausymas", "Išsiaiškinami paciento lūkesčiai, nusiskundimai ir ankstesnė gydymo patirtis."],
                ["02", "Diagnostika", "Atliekama apžiūra, įvertinama situacija ir, jei reikia, analizuojamos rentgeno nuotraukos."],
                ["03", "Gydymo planas", "Pacientui pateikiamas aiškus planas, galimos alternatyvos ir preliminarios kainos."],
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

      <section className="section soft">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="kicker">Pacientų atsiliepimai</div>
              <h2 className="title">Kas kuria <em>pasitikėjimą</em></h2>
              <div className="rule" />
            </div>
            <p className="lead">
              Premium klinikos svetainėje svarbus ne tik paslaugų sąrašas, bet ir socialinis pasitikėjimas: atsiliepimai, komanda, aplinka ir aiški komunikacija.
            </p>
          </div>

          <div className="grid-3">
            {REVIEWS.map((review) => (
              <article className="card review-card" key={review.name}>
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
        </div>
      </section>
    </>
  );

  const Services = (
    <section className="section">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="kicker">Paslaugos ir kainos</div>
            <h2 className="title">Aiškiai pateiktos <em>odontologijos paslaugos</em></h2>
            <div className="rule" />
          </div>
          <p className="lead">
            Orientacinės kainos padeda pacientui greičiau apsispręsti ir sumažina pasikartojančių klausimų skaičių administracijai.
          </p>
        </div>

        <div className="grid-3">
          {SERVICES.map((service) => (
            <article className="card service-card" key={service.id}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <div className="service-meta">
                <div className="price">{service.price}</div>
                <div className="duration">{service.duration}</div>
              </div>
              <button className="btn btn-outline" style={{ width: "100%", marginTop: 18 }} onClick={() => chooseService(service)}>
                Registruotis
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );

  const Doctors = (
    <section className="section">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="kicker">Gydytojų komanda</div>
            <h2 className="title">Specialistai, kuriuos pacientas <em>nori pažinti</em></h2>
            <div className="rule" />
          </div>
          <p className="lead">
            Gydytojų pristatymas sukuria asmeninį ryšį dar prieš pirmą vizitą. Tai vienas svarbiausių pasitikėjimo elementų medicinos svetainėse.
          </p>
        </div>

        <div className="grid-4">
          {DOCTORS.map((doctor) => (
            <article className="card doctor-card" key={doctor.name}>
              <div className="doctor-top">
                <div className="doctor-avatar">{initials(doctor.name)}</div>
                <h3>{doctor.name}</h3>
                <div className="doctor-role">{doctor.role}</div>
                <div className="doctor-exp">{doctor.exp}</div>
              </div>
              <div className="doctor-body">
                <p>„{doctor.quote}“</p>
                <div className="doctor-tags">
                  {doctor.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <button className="btn btn-outline" style={{ width: "100%", marginTop: 20 }} onClick={() => go("booking")}>
                  Registruotis
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );

  const Booking = (
    <section className="booking">
      <div className="wrap">
        <div style={{ marginBottom: 38 }}>
          <div className="kicker">Registracija internetu</div>
          <h2 className="title" style={{ color: "#fff" }}>Pacientų registracija <em>24/7</em></h2>
          <p className="lead" style={{ marginTop: 14 }}>
            Forma surenka pagrindinę informaciją, paslaugą, pageidaujamą laiką, paciento komentarą ir priedus. Administratorius gauna struktūruotą užklausą.
          </p>
        </div>

        <div className="booking-grid">
          <div className="booking-card">
            <h3>1. Pasirinkite paslaugą</h3>
            {SERVICES.map((service) => (
              <button
                type="button"
                key={service.id}
                className={`option ${selectedService.id === service.id ? "active" : ""}`}
                onClick={() => {
                  setSelectedService(service);
                  setSelectedDoctor(service.doctors[0]);
                  setSelectedDate("");
                  setSelectedTime("");
                  setSubmitted(false);
                }}
              >
                <strong>{service.title}</strong>
                <small>{service.price} · {service.duration}</small>
              </button>
            ))}

            <div className="sep" />

            <h3>2. Gydytojas</h3>
            {doctorsForService.map((doctor) => (
              <button
                type="button"
                key={doctor}
                className={`option ${selectedDoctor === doctor ? "active" : ""}`}
                onClick={() => setSelectedDoctor(doctor)}
              >
                <strong>{doctor}</strong>
                <small>Galima parinkti automatiškai pagal paslaugą</small>
              </button>
            ))}
          </div>

          <div className="booking-card">
            <h3>3. Data ir laikas</h3>
            <Calendar selected={selectedDate} onSelect={chooseDate} />

            {selectedDate && (
              <>
                <div style={{ marginTop: 20, color: "rgba(255,255,255,.68)", fontWeight: 900, textTransform: "uppercase", fontSize: 12, letterSpacing: ".08em" }}>
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

                <div className="sep" />

                <h3>4. Paciento duomenys</h3>
                <form className="form" onSubmit={submit}>
                  <input className="input" placeholder="Vardas ir pavardė *" value={name} onChange={(event) => setName(event.target.value)} />
                  <input className="input" placeholder="Telefono numeris *" value={phone} onChange={(event) => setPhone(event.target.value)} />
                  <textarea
                    className="textarea"
                    placeholder="Trumpai aprašykite situaciją arba klausimą. Pvz. domina preliminari kaina, turite rentgeno nuotrauką arba norėtumėte pasikonsultuoti dėl gydymo galimybių."
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                  />
                  <div className="upload">
                    <strong style={{ display: "block", color: "rgba(255,255,255,.82)", marginBottom: 8 }}>Rentgeno nuotrauka, jei turite</strong>
                    <p style={{ margin: "0 0 12px", color: "rgba(255,255,255,.48)", fontSize: 13 }}>
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
                    <span style={{ marginLeft: 12, color: "rgba(255,255,255,.48)", fontSize: 13 }}>
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

                  <button className="btn btn-gold" type="submit" disabled={!accepted || !name || !phone || !selectedDate || !selectedTime} style={{ gridColumn: "1 / -1", padding: 16 }}>
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
    </section>
  );

  const Contact = (
    <section className="section">
      <div className="wrap">
        <div className="section-head">
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
          <div className="contact-card">
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
            <button className="btn btn-primary" onClick={() => go("booking")} style={{ width: "100%", marginTop: 18 }}>
              Registruotis vizitui
            </button>
          </div>

          <div className="map">
            <div>
              <div style={{ fontSize: 42, marginBottom: 12 }}>🗺️</div>
              <h3 style={{ margin: 0, fontFamily: '"Playfair Display", serif', fontSize: 28 }}>Google Maps integracija</h3>
              <p style={{ color: "var(--muted)", lineHeight: 1.7, maxWidth: 420 }}>
                Čia įterpiamas tikras klinikos žemėlapis, parkavimo informacija ir patogus maršruto atidarymas telefone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const Faq = (
    <section className="section soft">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="kicker">Dažniausi klausimai</div>
            <h2 className="title">Atsakymai prieš <em>pirmą vizitą</em></h2>
            <div className="rule" />
          </div>
        </div>
        <div className="grid-2">
          {FAQS.map((faq) => (
            <details className="faq" key={faq.q}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className="site">
      <style>{CSS}</style>

      <header className="header">
        <div className="wrap header-inner">
          <div className="logo" onClick={() => go("home")}>
            <div className="logo-mark"><span /></div>
            <div>
              <div className="logo-title">JŪSŲ LOGOTIPO VIETA</div>
              <div className="logo-sub">Odontologijos klinikos svetainės demonstracija</div>
            </div>
          </div>

          <nav className="nav">
            {[
              ["home", "Pagrindinis"],
              ["services", "Paslaugos"],
              ["doctors", "Gydytojai"],
              ["faq", "Klausimai"],
              ["contact", "Kontaktai"],
            ].map(([key, label]) => (
              <button key={key} className={view === key ? "active" : ""} onClick={() => go(key)}>
                {label}
              </button>
            ))}
            <button className="book" onClick={() => go("booking")}>Registruotis</button>
          </nav>
        </div>
      </header>

      {view === "home" && Home}
      {view === "services" && Services}
      {view === "doctors" && Doctors}
      {view === "booking" && Booking}
      {view === "contact" && Contact}
      {view === "faq" && Faq}

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
        <button className="btn btn-primary" onClick={() => go("booking")}>📅 Registruotis</button>
      </div>
    </div>
  );
}
