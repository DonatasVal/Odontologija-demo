import { useMemo, useState } from "react";

export default function AdminPanel() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: "Milda Jankauskaitė",
      phone: "+370 600 11223",
      email: "milda@email.lt",
      service: "Profesionali burnos higiena",
      doctor: "Dr. Lina Vaitkūnienė",
      date: "2026-06-04",
      time: "09:00",
      comment: "Norėčiau švelnios higienos, dantys jautresni šalčiui.",
      file: "rentgenas-milda.jpg",
      status: "Nauja",
    },
    {
      id: 2,
      patient: "Tomas Petrauskas",
      phone: "+370 611 22334",
      email: "tomas@email.lt",
      service: "Pirminė konsultacija ir gydymo planas",
      doctor: "Dr. Jonas Petrauskas",
      date: "2026-06-05",
      time: "12:30",
      comment: "Domina preliminari plombavimo kaina ir gydymo planas.",
      file: "",
      status: "Patvirtinta",
    },
    {
      id: 3,
      patient: "Rasa Kazlauskienė",
      phone: "+370 622 33445",
      email: "rasa@email.lt",
      service: "Dantų šalinimas",
      doctor: "Dr. Marius Čepas",
      date: "2026-06-08",
      time: "13:00",
      comment: "Turiu rentgeno nuotrauką, skauda protinį dantį.",
      file: "rasa-panoramine.png",
      status: "Laukia patvirtinimo",
    },
  ]);

  const [statusFilter, setStatusFilter] = useState("Visi");
  const [doctorFilter, setDoctorFilter] = useState("Visi");
  const [search, setSearch] = useState("");

  const statuses = ["Visi", "Nauja", "Laukia patvirtinimo", "Patvirtinta", "Atšaukta", "Atvyko", "Neatvyko"];
  const doctors = ["Visi", ...Array.from(new Set(appointments.map((a) => a.doctor)))];

  const filteredAppointments = useMemo(() => {
    return appointments.filter((a) => {
      const query = search.trim().toLowerCase();
      return (
        (statusFilter === "Visi" || a.status === statusFilter) &&
        (doctorFilter === "Visi" || a.doctor === doctorFilter) &&
        (!query ||
          a.patient.toLowerCase().includes(query) ||
          a.phone.toLowerCase().includes(query) ||
          a.service.toLowerCase().includes(query))
      );
    });
  }, [appointments, statusFilter, doctorFilter, search]);

  const stats = {
    total: appointments.length,
    new: appointments.filter((a) => a.status === "Nauja").length,
    pending: appointments.filter((a) => a.status === "Laukia patvirtinimo").length,
    confirmed: appointments.filter((a) => a.status === "Patvirtinta").length,
  };

  function updateStatus(id, status) {
    setAppointments((current) =>
      current.map((a) => (a.id === id ? { ...a, status } : a))
    );
  }

  function remove(id) {
    if (!window.confirm("Ar tikrai pašalinti šią demo registraciją?")) return;
    setAppointments((current) => current.filter((a) => a.id !== id));
  }

  function badgeClass(status) {
    if (status === "Nauja") return "badge badge-new";
    if (status === "Laukia patvirtinimo") return "badge badge-pending";
    if (status === "Patvirtinta") return "badge badge-confirmed";
    if (status === "Atšaukta") return "badge badge-cancelled";
    return "badge badge-neutral";
  }

  const css = `
    * { box-sizing: border-box; }
    body { margin: 0; }
    .admin-page { min-height: 100vh; background:#f8fafc; color:#0f172a; font-family: Inter, Arial, sans-serif; }
    .header { background:#082f49; color:white; padding:34px 20px; }
    .wrap { width:min(1240px, calc(100% - 40px)); margin:0 auto; }
    .header-row { display:flex; justify-content:space-between; align-items:center; gap:20px; flex-wrap:wrap; }
    h1 { margin:0 0 8px; font-size:clamp(30px,4vw,46px); letter-spacing:-.045em; line-height:1; }
    .header p { margin:0; color:#cbd5e1; line-height:1.6; }
    .home-link { background:white; color:#0369a1; text-decoration:none; padding:12px 18px; border-radius:999px; font-weight:900; }
    .content { padding:30px 0 70px; }
    .stats { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-bottom:22px; }
    .stat-card { background:white; border:1px solid #e2e8f0; border-radius:22px; padding:20px; box-shadow:0 14px 40px rgba(15,23,42,.05); }
    .stat-card strong { display:block; color:#0369a1; font-size:32px; margin-bottom:8px; }
    .stat-card span { color:#64748b; font-weight:800; }
    .panel { background:white; border:1px solid #e2e8f0; border-radius:26px; box-shadow:0 18px 50px rgba(15,23,42,.06); overflow:hidden; }
    .panel-top { padding:20px; border-bottom:1px solid #e2e8f0; display:grid; grid-template-columns:1fr 220px 220px; gap:12px; }
    .input,.select { width:100%; border:1px solid #cbd5e1; border-radius:16px; padding:13px 14px; font-size:15px; background:white; color:#0f172a; }
    .table-wrap { overflow-x:auto; }
    table { width:100%; border-collapse:collapse; min-width:1040px; }
    th { text-align:left; background:#f1f5f9; color:#334155; padding:14px 16px; font-size:13px; text-transform:uppercase; letter-spacing:.04em; }
    td { padding:16px; border-top:1px solid #e2e8f0; vertical-align:top; color:#334155; line-height:1.45; }
    .patient { color:#0f172a; font-weight:900; }
    .muted { color:#64748b; font-size:13px; }
    .badge { display:inline-flex; border-radius:999px; padding:7px 11px; font-size:13px; font-weight:900; white-space:nowrap; }
    .badge-new { background:#dbeafe; color:#1d4ed8; }
    .badge-pending { background:#fef3c7; color:#92400e; }
    .badge-confirmed { background:#dcfce7; color:#166534; }
    .badge-cancelled { background:#fee2e2; color:#991b1b; }
    .badge-neutral { background:#f1f5f9; color:#334155; }
    .actions { display:flex; flex-direction:column; gap:8px; min-width:170px; }
    .status-select { border:1px solid #cbd5e1; border-radius:13px; padding:10px; background:white; color:#0f172a; font-weight:800; }
    .delete { border:0; border-radius:13px; padding:10px; background:#fee2e2; color:#991b1b; font-weight:900; cursor:pointer; }
    .file { display:inline-flex; color:#0369a1; background:#e0f2fe; padding:7px 10px; border-radius:999px; font-weight:900; font-size:13px; }
    .empty { padding:34px; text-align:center; color:#64748b; }
    .note { margin-top:18px; background:#eff6ff; border:1px solid #bfdbfe; color:#1e3a8a; border-radius:20px; padding:16px; line-height:1.6; }
    @media (max-width:920px) { .stats{grid-template-columns:1fr 1fr;} .panel-top{grid-template-columns:1fr;} }
    @media (max-width:620px) { .stats{grid-template-columns:1fr;} }
  `;

  return (
    <main className="admin-page">
      <style>{css}</style>

      <header className="header">
        <div className="wrap header-row">
          <div>
            <h1>Registracijų administravimas</h1>
            <p>
              Demo administratoriaus panelė. Vėliau čia bus realios registracijos iš Supabase.
            </p>
          </div>
          <a className="home-link" href="/">Grįžti į svetainę</a>
        </div>
      </header>

      <section className="wrap content">
        <div className="stats">
          <div className="stat-card"><strong>{stats.total}</strong><span>Visos registracijos</span></div>
          <div className="stat-card"><strong>{stats.new}</strong><span>Naujos</span></div>
          <div className="stat-card"><strong>{stats.pending}</strong><span>Laukia patvirtinimo</span></div>
          <div className="stat-card"><strong>{stats.confirmed}</strong><span>Patvirtintos</span></div>
        </div>

        <div className="panel">
          <div className="panel-top">
            <input
              className="input"
              placeholder="Ieškoti pagal pacientą, telefoną ar paslaugą..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select className="select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              {statuses.map((s) => <option key={s}>{s}</option>)}
            </select>
            <select className="select" value={doctorFilter} onChange={(e) => setDoctorFilter(e.target.value)}>
              {doctors.map((d) => <option key={d}>{d}</option>)}
            </select>
          </div>

          <div className="table-wrap">
            {filteredAppointments.length ? (
              <table>
                <thead>
                  <tr>
                    <th>Pacientas</th>
                    <th>Vizitas</th>
                    <th>Paslauga</th>
                    <th>Gydytojas</th>
                    <th>Komentaras / failas</th>
                    <th>Būsena</th>
                    <th>Veiksmai</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((a) => (
                    <tr key={a.id}>
                      <td>
                        <div className="patient">{a.patient}</div>
                        <div className="muted">{a.phone}</div>
                        <div className="muted">{a.email}</div>
                      </td>
                      <td>
                        <strong>{a.date}</strong>
                        <div className="muted">{a.time}</div>
                      </td>
                      <td>{a.service}</td>
                      <td>{a.doctor}</td>
                      <td>
                        <div>{a.comment || "Komentaro nėra."}</div>
                        {a.file ? (
                          <div style={{ marginTop: 10 }}><span className="file">📎 {a.file}</span></div>
                        ) : (
                          <div className="muted" style={{ marginTop: 10 }}>Rentgeno failas nepridėtas.</div>
                        )}
                      </td>
                      <td><span className={badgeClass(a.status)}>{a.status}</span></td>
                      <td>
                        <div className="actions">
                          <select className="status-select" value={a.status} onChange={(e) => updateStatus(a.id, e.target.value)}>
                            {statuses.filter((s) => s !== "Visi").map((s) => <option key={s}>{s}</option>)}
                          </select>
                          <button className="delete" onClick={() => remove(a.id)}>Pašalinti</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty">Pagal pasirinktus filtrus registracijų nerasta.</div>
            )}
          </div>
        </div>

        <div className="note">
          <strong>Kitas etapas:</strong> prijungti Supabase, kad čia būtų rodomos realios registracijos,
          gydytojų grafikai, užblokuoti laikai, rentgeno failai ir priminimų būsena.
        </div>
      </section>
    </main>
  );
}
