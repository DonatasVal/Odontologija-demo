import { useMemo, useState } from "react";

export default function Odontologija1() {
  const services = [
    {
      id: "higiena",
      title: "Profesionali burnos higiena",
      price: "70 €",
      duration: "45–60 min.",
      description: "Apnašų ir pigmentacijos pašalinimas, Air-Flow srovė ir dantų poliravimas.",
      doctors: ["Dr. Lina Vaitkūnienė", "Dr. Monika Vaičiulytė"],
    },
    {
      id: "konsultacija",
      title: "Pirminė konsultacija ir gydymo planas",
      price: "30 €",
      duration: "30 min.",
      description: "Apžiūra, situacijos paaiškinimas ir aiškus tolimesnio gydymo planas.",
      doctors: ["Dr. Jonas Petrauskas", "Dr. Monika Vaičiulytė"],
    },
    {
      id: "plombavimas",
      title: "Terapinis gydymas / plombavimas",
      price: "nuo 60 €",
      duration: "45–90 min.",
      description: "Karieso gydymas, estetiškas plombos atkūrimas ir poliravimas.",
      doctors: ["Dr. Jonas Petrauskas"],
    },
    {
      id: "chirurgija",
      title: "Dantų šalinimas",
      price: "nuo 80 €",
      duration: "30–60 min.",
      description: "Atraumatinis dantų šalinimas ir aiškios rekomendacijos po procedūros.",
      doctors: ["Dr. Marius Čepas"],
    },
  ];

  const doctors = [
    {
      name: "Dr. Jonas Petrauskas",
      role: "Terapinis gydymas",
      exp: "10 metų patirtis",
      note: "Aiškiai paaiškina gydymo eigą ir parenka pacientui tinkamiausią sprendimą.",
    },
    {
      name: "Dr. Lina Vaitkūnienė",
      role: "Burnos higiena",
      exp: "7 metų patirtis",
      note: "Švelni, kruopšti profesionali burnos higiena net jautresniems pacientams.",
    },
    {
      name: "Dr. Marius Čepas",
      role: "Burnos chirurgija",
      exp: "12 metų patirtis",
      note: "Dantų šalinimas, chirurginės konsultacijos ir pooperacinė priežiūra.",
    },
    {
      name: "Dr. Monika Vaičiulytė",
      role: "Konsultacijos",
      exp: "8 metų patirtis",
      note: "Išsamūs gydymo planai, profilaktikos rekomendacijos ir paciento poreikių įvertinimas.",
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

  const [view, setView] = useState("home");
  const [selectedService, setSelectedService] = useState(services[0]);
  const [selectedDoctor, setSelectedDoctor] = useState(services[0].doctors[0]);
  const [selectedDate, setSelectedDate] = useState("2026-06-04");
  const [selectedTime, setSelectedTime] = useState("09:00");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
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

  function nav(nextView) {
    setView(nextView);
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

  const css = `
    * { box-sizing: border-box; }
    body { margin: 0; }
    .site { min-height: 100vh; font-family: Inter, Arial, sans-serif; color: #0f172a; background: #f8fafc; }
    .container { width: min(1180px, calc(100% - 40px)); margin: 0 auto; }
    .header { position: sticky; top: 0; z-index: 50; background: rgba(255,255,255,.92); backdrop-filter: blur(16px); border-bottom: 1px solid #e2e8f0; }
    .header-inner { height: 76px; display: flex; justify-content: space-between; align-items: center; gap: 20px; }
    .logo { display: flex; align-items: center; gap: 12px; font-weight: 900; letter-spacing: -.03em; }
    .logo-mark { width: 44px; height: 44px; border-radius: 15px; background: linear-gradient(135deg,#0369a1,#14b8a6); color: white; display: grid; place-items: center; }
    .logo small { display:block; color:#64748b; font-weight:700; letter-spacing:0; margin-top:2px; }
    .nav { display: flex; align-items: center; gap: 10px; }
    .nav button { border: 0; background: transparent; padding: 10px 12px; border-radius: 999px; cursor: pointer; color:#334155; font-weight: 800; }
    .nav button.active, .nav button:hover { background: #e0f2fe; color: #0369a1; }
    .btn { border: 0; border-radius: 999px; padding: 13px 22px; font-weight: 900; cursor: pointer; background: #0369a1; color: white; box-shadow: 0 16px 35px rgba(3,105,161,.18); text-decoration: none; display: inline-flex; align-items: center; justify-content: center; gap: 8px; }
    .btn.secondary { background: white; color: #0369a1; border: 1px solid #bae6fd; box-shadow: none; }
    .btn.soft { background: #f1f5f9; color: #0f172a; box-shadow: none; border: 1px solid #e2e8f0; }
    .btn:disabled { opacity: .55; cursor: not-allowed; }
    .hero { padding: 94px 0 72px; background: radial-gradient(circle at 78% 10%, #bae6fd 0, transparent 32%), linear-gradient(180deg,#eff6ff 0,#fff 90%); overflow: hidden; }
    .hero-grid { display: grid; grid-template-columns: 1.05fr .95fr; gap: 44px; align-items: center; }
    .eyebrow { display: inline-flex; align-items:center; gap:8px; background:#e0f2fe; color:#075985; padding: 8px 14px; border-radius:999px; font-weight:900; font-size:13px; }
    h1 { margin: 22px 0 18px; font-size: clamp(40px, 5vw, 72px); line-height: .96; letter-spacing: -.06em; color:#082f49; }
    h2 { margin: 0; font-size: clamp(30px, 3.6vw, 48px); line-height: 1.05; letter-spacing: -.045em; color:#082f49; }
    h3 { margin: 0 0 10px; color:#0f172a; font-size: 20px; }
    .lead { font-size: 19px; line-height: 1.7; color:#475569; max-width: 680px; }
    .actions { display:flex; gap:12px; flex-wrap:wrap; margin-top:28px; }
    .stats { display:grid; grid-template-columns: repeat(4,1fr); gap:14px; margin-top:32px; }
    .stat { background:#fff; border:1px solid #e2e8f0; border-radius:22px; padding:18px; box-shadow:0 14px 40px rgba(15,23,42,.05); }
    .stat strong { display:block; font-size:24px; color:#0369a1; }
    .muted { color:#64748b; line-height:1.7; }
    .visual { background:#fff; border:1px solid #e2e8f0; border-radius:36px; padding:20px; box-shadow:0 34px 90px rgba(15,23,42,.12); }
    .visual-inner { min-height:390px; border-radius:28px; background:linear-gradient(135deg,#dbeafe,#fff 55%,#ccfbf1); padding:28px; display:flex; flex-direction:column; justify-content:space-between; }
    .clinic-photo-card { position: relative; overflow: hidden; border-radius: 32px; height: 100%; min-height: 520px; }
    .clinic-photo { width:100%; height:100%; object-fit:cover; display:block; }
    .clinic-overlay { position:absolute; left:0; right:0; bottom:0; padding:32px; background:linear-gradient(to top, rgba(15,23,42,.85), rgba(15,23,42,0)); color:white; }
    .clinic-title { font-size:32px; font-weight:900; letter-spacing:-.03em; }
    .clinic-subtitle { margin-top:8px; opacity:.9; }
    .doctor-pill { display:inline-flex; align-items:center; gap:12px; background:rgba(255,255,255,.9); border:1px solid #e2e8f0; border-radius:18px; padding:14px; }
    .avatar { width:48px; height:48px; border-radius:50%; background:#0369a1; color:white; display:grid; place-items:center; font-weight:900; }
    .section { padding:72px 0; }
    .section-head { display:flex; justify-content:space-between; align-items:end; gap:24px; margin-bottom:28px; }
    .grid { display:grid; gap:18px; }
    .cards4 { grid-template-columns: repeat(4,1fr); }
    .cards3 { grid-template-columns: repeat(3,1fr); }
    .card { background:#fff; border:1px solid #e2e8f0; border-radius:26px; padding:24px; box-shadow:0 16px 45px rgba(15,23,42,.05); }
    .icon { width:52px; height:52px; border-radius:18px; background:#e0f2fe; color:#0369a1; display:grid; place-items:center; font-size:24px; margin-bottom:14px; }
    .price { color:#0369a1; font-size:30px; font-weight:950; margin-top:18px; }
    .small { font-size: 13px; color:#64748b; }
    .doctor-photo { width:78px; height:78px; border-radius:24px; background:linear-gradient(135deg,#0369a1,#14b8a6); color:white; display:grid; place-items:center; font-size:28px; font-weight:950; margin-bottom:16px; }
    .booking { background:#082f49; color:#fff; min-height: calc(100vh - 76px); }
    .booking h2, .booking h3 { color:#fff; }
    .booking .muted { color:#cbd5e1; }
    .booking-grid { display:grid; grid-template-columns:.85fr 1.15fr; gap:24px; align-items:start; }
    .booking .card { background:rgba(255,255,255,.08); border-color:rgba(255,255,255,.16); color:white; }
    .option { width:100%; text-align:left; border:1px solid rgba(255,255,255,.16); background:rgba(255,255,255,.06); color:#fff; border-radius:17px; padding:14px; margin:8px 0; cursor:pointer; }
    .option.active { background:#0ea5e9; border-color:#7dd3fc; }
    .calendar { background:#fff; color:#0f172a; border-radius:28px; padding:20px; }
    .calendar-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; gap:12px; }
    .weekdays, .days { display:grid; grid-template-columns:repeat(7,1fr); gap:8px; }
    .weekdays div { text-align:center; color:#64748b; font-size:12px; font-weight:900; }
    .day { height:45px; border:1px solid #e2e8f0; border-radius:15px; background:#f8fafc; cursor:default; }
    .day.available { background:#e0f2fe; color:#0369a1; font-weight:950; cursor:pointer; }
    .day.selected { background:#0369a1; color:white; border-color:#0369a1; }
    .times { display:flex; flex-wrap:wrap; gap:10px; margin-top:18px; }
    .time { border:1px solid #bae6fd; background:white; color:#0369a1; border-radius:999px; padding:10px 15px; cursor:pointer; font-weight:900; }
    .time.selected { background:#0369a1; color:white; }
    .form { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:18px; }
    .input, .textarea { width:100%; padding:14px 16px; border-radius:16px; border:1px solid #cbd5e1; font-size:15px; font-family: inherit; }
    .textarea { grid-column: 1 / -1; min-height: 122px; resize: vertical; line-height: 1.55; }
    .upload { grid-column: 1 / -1; border: 1px dashed #93c5fd; background: #f8fafc; border-radius: 18px; padding: 16px; }
    .upload-row { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
    .upload input { display: none; }
    .upload-label { display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; background: #0369a1; color: white; padding: 11px 16px; font-weight: 900; cursor: pointer; }
    .consent { grid-column: 1 / -1; display: flex; gap: 12px; align-items: flex-start; padding: 14px; border-radius: 18px; background: #f8fafc; border: 1px solid #e2e8f0; color: #334155; line-height: 1.55; }
    .consent input { width: 20px; height: 20px; margin-top: 3px; accent-color: #0369a1; flex: 0 0 auto; }
    .consent a { color: #0369a1; font-weight: 900; text-decoration: none; }
    .data-note { grid-column: 1 / -1; color: #64748b; font-size: 13px; line-height: 1.55; margin-top: -4px; }
    .confirm { margin-top:16px; padding:16px; border-radius:18px; background:#10b981; color:white; font-weight:900; line-height:1.5; }
    details { background:white; border:1px solid #e2e8f0; border-radius:20px; padding:18px; }
    summary { font-weight:900; cursor:pointer; }
    .contact-grid { display:grid; grid-template-columns:1fr 1fr; gap:24px; }
    .map { min-height:280px; border-radius:28px; background:linear-gradient(135deg,#dbeafe,#f8fafc); border:1px solid #e2e8f0; display:grid; place-items:center; color:#0369a1; font-weight:950; }
    .footer { padding:28px 0; background:#020617; color:#cbd5e1; }
    .footer a:hover { color: white !important; }
    .floating { position:fixed; right:20px; bottom:20px; z-index:60; }
    @media (max-width: 960px) {
      .nav button:not(.book) { display:none; }
      .hero-grid, .booking-grid, .contact-grid { grid-template-columns:1fr; }
      .cards4, .cards3, .stats { grid-template-columns:1fr; }
      .form { grid-template-columns:1fr; }
      .hero { padding:64px 0; }
    }
  `;

  const Home = (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">● Registracija internetu 24/7</span>
            <h1>Odontologija be streso ir skubėjimo</h1>
            <p className="lead">
              Skiriame laiko išklausyti, paaiškinti ir pasiūlyti geriausią sprendimą.
              Konsultacijos, burnos higiena, terapinis gydymas ir chirurgija vienoje vietoje.
            </p>
            <div className="actions">
              <button className="btn" onClick={() => nav("booking")}>Registruotis vizitui</button>
              <button className="btn secondary" onClick={() => nav("services")}>Peržiūrėti kainas</button>
            </div>
            <div className="stats">
              <div className="stat"><strong>24/7</strong><span>registracija internetu</span></div>
              <div className="stat"><strong>4.9</strong><span>pacientų įvertinimas</span></div>
              <div className="stat"><strong>12+</strong><span>metų patirties</span></div>
              <div className="stat"><strong>Individualūs</strong><span>gydymo planai</span></div>
            </div>
          </div>
          <div className="visual">
            <div className="clinic-photo-card">
              <img
                src="https://images.unsplash.com/photo-1588776814546-ec7e6d0b8b6f?auto=format&fit=crop&w=1200&q=80"
                alt="Jūsų klinikos nuotrauka"
                className="clinic-photo"
              />
              <div className="clinic-overlay">
                <div className="clinic-title">JŪSŲ KLINIKOS PAVADINIMAS</div>
                <div className="clinic-subtitle">Odontologijos klinika</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Ką pacientai vertina labiausiai</h2>
              <p className="muted">Profesionalumas, aiškumas ir patogi registracija be papildomų skambučių.</p>
            </div>
          </div>
          <div className="grid cards4">
            <div className="card"><div className="icon">✓</div><h3>Aiškus planas</h3><p className="muted">Po konsultacijos aptariame eigą, alternatyvas ir preliminarią kainą.</p></div>
            <div className="card"><div className="icon">◴</div><h3>Patogi registracija</h3><p className="muted">Pasirinkite paslaugą, gydytoją, dieną ir laiką mėnesio kalendoriuje.</p></div>
            <div className="card"><div className="icon">✦</div><h3>Rami aplinka</h3><p className="muted">Dėmesys komfortui, aiškūs paaiškinimai ir pagarbus bendravimas.</p></div>
            <div className="card"><div className="icon">☏</div><h3>Priminimai apie vizitą</h3><p className="muted">Pasirūpinsime, kad apie artėjantį vizitą būtumėte informuoti iš anksto.</p></div>
          </div>
        </div>
      </section>
    </>
  );

  const Services = (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <h2>Paslaugos ir kainos</h2>
            <p className="muted">Orientacinės kainos pateikiamos iš anksto. Tiksli kaina priklauso nuo individualios situacijos.</p>
          </div>
        </div>
        <div className="grid cards4">
          {services.map((service) => (
            <article className="card" key={service.id}>
              <div className="icon">🦷</div>
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
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <h2>Gydytojų komanda</h2>
            <p className="muted">Pasirinkite specialistą pagal paslaugą arba registruokitės konsultacijai.</p>
          </div>
        </div>
        <div className="grid cards4">
          {doctors.map((doctor) => (
            <article className="card" key={doctor.name}>
              <div className="doctor-photo">{doctor.name.split(" ")[1]?.[0] || "D"}</div>
              <h3>{doctor.name}</h3>
              <strong style={{ color: "#0369a1" }}>{doctor.role}</strong>
              <p className="small">{doctor.exp}</p>
              <p className="muted">{doctor.note}</p>
              <button className="btn soft" onClick={() => nav("booking")}>Registruotis</button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );

  const Booking = (
    <section className="section booking">
      <div className="container">
        <div className="section-head">
          <div>
            <h2>Registracija internetu</h2>
            <p className="muted">Užpildykite registraciją per mažiau nei minutę. Administratorius patvirtins vizitą darbo metu.</p>
          </div>
        </div>
        <div className="booking-grid">
          <div className="card">
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

          <div className="card">
            <h3>3. Pasirinkite dieną ir laiką</h3>
            <div className="calendar">
              <div className="calendar-top">
                <strong>2026 m. birželis</strong>
                <span className="small">Mėlynos dienos turi laisvų laikų</span>
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

                    <textarea
                      className="textarea"
                      placeholder="Trumpai aprašykite savo situaciją arba klausimą. Pvz. domina preliminari kaina, turite rentgeno nuotrauką arba norėtumėte pasikonsultuoti dėl gydymo galimybių."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />

                    <div className="upload">
                      <strong>Pridėkite rentgeno nuotrauką, jei turite</strong>
                      <p className="small">
                        Rentgeno nuotrauka gali padėti tiksliau įvertinti situaciją ir pateikti preliminarias rekomendacijas.
                      </p>
                      <div className="upload-row">
                        <label className="upload-label">
                          Įkelti failą
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => setXrayFile(e.target.files?.[0]?.name || "")}
                          />
                        </label>
                        <span className="small">{xrayFile || "Failas nepasirinktas"}</span>
                      </div>
                      <p className="small">Priimami formatai: PDF, JPG, PNG. Maksimalus failo dydis – 10 MB.</p>
                    </div>

                    <label className="consent">
                      <input
                        type="checkbox"
                        checked={privacyAccepted}
                        onChange={(e) => setPrivacyAccepted(e.target.checked)}
                      />
                      <span>
                        Susipažinau su <a href="/privatumas">privatumo politika</a> ir sutinku, kad mano pateikti duomenys būtų naudojami užklausos administravimui. *
                      </span>
                    </label>

                    <p className="data-note">
                      Jūsų pateikti duomenys naudojami tik užklausos nagrinėjimui ir nėra perduodami tretiesiems asmenims be teisėto pagrindo.
                    </p>

                    <button className="btn" type="submit" disabled={!privacyAccepted}>
                      Patvirtinti registraciją
                    </button>
                  </form>
                </>
              )}

              {confirmed && (
                <div className="confirm">
                  Registracija gauta: {selectedService.title}, {selectedDoctor}, {selectedDate} {selectedTime}. Susisieksime dėl patvirtinimo.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const Contact = (
    <section className="section">
      <div className="container contact-grid">
        <div>
          <h2>Kontaktai</h2>
          <p className="muted">Susisiekite telefonu arba registruokitės internetu jums patogiu metu.</p>
          <div className="card">
            <p><strong>Telefonas:</strong> +370 600 00000</p>
            <p><strong>El. paštas:</strong> info@dentacare.lt</p>
            <p><strong>Adresas:</strong> Vilnius, Lietuva</p>
            <p><strong>Darbo laikas:</strong> I–V 08:00–19:00, VI 09:00–14:00</p>
          </div>
        </div>
        <div className="map">Google Maps vieta / klinikos lokacija</div>
      </div>
    </section>
  );

  return (
    <div className="site">
      <style>{css}</style>

      <header className="header">
        <div className="container header-inner">
          <div className="logo">
            <div className="logo-mark">D</div>
            <div>
              DentaCare Klinika
              <small>Odontologija be streso</small>
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

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <div className="grid cards3">
            <article className="card">
              <strong style={{ color: "#0369a1" }}>★★★★★</strong>
              <p>Labai aiškiai paaiškino gydymo eigą ir kainą. Jaučiausi ramiai.</p>
              <span className="small">– Milda</span>
            </article>
            <article className="card">
              <strong style={{ color: "#0369a1" }}>★★★★★</strong>
              <p>Patogi registracija internetu ir malonus personalas.</p>
              <span className="small">– Tomas</span>
            </article>
            <article className="card">
              <strong style={{ color: "#0369a1" }}>★★★★★</strong>
              <p>Švari aplinka, profesionali higiena ir aiškios rekomendacijos.</p>
              <span className="small">– Rasa</span>
            </article>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid cards3">
            <details open>
              <summary>Ar konsultacijos metu gausiu gydymo planą?</summary>
              <p className="muted">Taip, aptarsime situaciją, galimus sprendimus ir preliminarią kainą.</p>
            </details>
            <details>
              <summary>Kiek trunka burnos higiena?</summary>
              <p className="muted">Dažniausiai 45–60 min., priklausomai nuo burnos būklės.</p>
            </details>
            <details>
              <summary>Ar gausiu priminimą prieš vizitą?</summary>
              <p className="muted">Pasirūpinsime, kad apie artėjantį vizitą būtumėte informuoti iš anksto.</p>
            </details>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <span>© 2026 DentaCare Klinika</span>
          <span style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href="/privatumas" style={{ color: "inherit", textDecoration: "none" }}>
              Privatumo politika
            </a>
            <span>·</span>
            <a href="/privatumas#slapukai" style={{ color: "inherit", textDecoration: "none" }}>
              Slapukai
            </a>
            <span>·</span>
            <a href="/privatumas#sutikimai" style={{ color: "inherit", textDecoration: "none" }}>
              Duomenų sutikimai
            </a>
          </span>
        </div>
      </footer>

      <button className="btn floating" onClick={() => nav("booking")}>📅 Registruotis</button>
    </div>
  );
}