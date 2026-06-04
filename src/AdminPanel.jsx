import { useMemo, useState } from "react";

export default function AdminPanel() {
  const doctors = [
    "Dr. Jonas Petrauskas",
    "Dr. Lina Vaitkūnienė",
    "Dr. Marius Čepas",
    "Dr. Monika Vaičiulytė",
  ];

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
      duration: 60,
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
      duration: 30,
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
      duration: 60,
      comment: "Turiu rentgeno nuotrauką, skauda protinį dantį.",
      file: "rasa-panoramine.png",
      status: "Laukia patvirtinimo",
    },
    {
      id: 4,
      patient: "Eglė Rimkutė",
      phone: "+370 633 44556",
      email: "egle@email.lt",
      service: "Terapinis gydymas / plombavimas",
      doctor: "Dr. Jonas Petrauskas",
      date: "2026-06-04",
      time: "10:00",
      duration: 60,
      comment: "Nulūžo seno plombavimo kraštas.",
      file: "",
      status: "Nauja",
    },
  ]);

  const [blockedTimes, setBlockedTimes] = useState([
    {
      id: 1,
      doctor: "Dr. Jonas Petrauskas",
      date: "2026-06-04",
      time: "13:00",
      reason: "Pietų pertrauka",
    },
  ]);

  const [selectedDate, setSelectedDate] = useState("2026-06-04");
  const [selectedDoctor, setSelectedDoctor] = useState("Visi gydytojai");
  const [statusFilter, setStatusFilter] = useState("Visos būsenos");
  const [search, setSearch] = useState("");

  const statuses = [
    "Visos būsenos",
    "Nauja",
    "Laukia patvirtinimo",
    "Patvirtinta",
    "Atšaukta",
    "Atvyko",
    "Neatvyko",
  ];

  const timeSlots = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
  ];

  const visibleAppointments = useMemo(() => {
    const query = search.trim().toLowerCase();

    return appointments
      .filter((appointment) => appointment.date === selectedDate)
      .filter((appointment) => selectedDoctor === "Visi gydytojai" || appointment.doctor === selectedDoctor)
      .filter((appointment) => statusFilter === "Visos būsenos" || appointment.status === statusFilter)
      .filter((appointment) => {
        if (!query) return true;
        return (
          appointment.patient.toLowerCase().includes(query) ||
          appointment.phone.toLowerCase().includes(query) ||
          appointment.service.toLowerCase().includes(query) ||
          appointment.doctor.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => a.time.localeCompare(b.time));
  }, [appointments, selectedDate, selectedDoctor, statusFilter, search]);

  const stats = {
    dayTotal: visibleAppointments.length,
    newItems: visibleAppointments.filter((a) => a.status === "Nauja").length,
    confirmed: visibleAppointments.filter((a) => a.status === "Patvirtinta").length,
    blocked: blockedTimes.filter(
      (b) => b.date === selectedDate && (selectedDoctor === "Visi gydytojai" || b.doctor === selectedDoctor)
    ).length,
  };

  function updateStatus(id, status) {
    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === id ? { ...appointment, status } : appointment
      )
    );
  }

  function moveAppointment(id, nextDate, nextTime, nextDoctor) {
    const hasConflict = appointments.some(
      (appointment) =>
        appointment.id !== id &&
        appointment.date === nextDate &&
        appointment.time === nextTime &&
        appointment.doctor === nextDoctor &&
        appointment.status !== "Atšaukta"
    );

    const isBlocked = blockedTimes.some(
      (block) => block.date === nextDate && block.time === nextTime && block.doctor === nextDoctor
    );

    if (hasConflict) {
      alert("Šis laikas jau užimtas pasirinktam gydytojui.");
      return;
    }

    if (isBlocked) {
      alert("Šis laikas pažymėtas kaip nedarbo / blokuotas laikas.");
      return;
    }

    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === id
          ? { ...appointment, date: nextDate, time: nextTime, doctor: nextDoctor }
          : appointment
      )
    );
  }

  function removeAppointment(id) {
    if (!window.confirm("Ar tikrai norite pašalinti šią demo registraciją?")) return;
    setAppointments((current) => current.filter((appointment) => appointment.id !== id));
  }

  function blockTime(doctor, date, time) {
    const reason = window.prompt("Įveskite priežastį, kodėl šis laikas blokuojamas:", "Gydytojas nedirba");
    if (!reason) return;

    const exists = blockedTimes.some(
      (block) => block.doctor === doctor && block.date === date && block.time === time
    );

    if (exists) {
      alert("Šis laikas jau pažymėtas kaip blokuotas.");
      return;
    }

    setBlockedTimes((current) => [
      ...current,
      {
        id: Date.now(),
        doctor,
        date,
        time,
        reason,
      },
    ]);
  }

  function unblockTime(id) {
    setBlockedTimes((current) => current.filter((block) => block.id !== id));
  }

  function blockDoctorDay(doctor) {
    if (doctor === "Visi gydytojai") {
      alert("Pirmiausia pasirinkite konkretų gydytoją.");
      return;
    }

    if (!window.confirm(`${doctor}: pažymėti visą ${selectedDate} dieną kaip nedarbo dieną?`)) return;

    const newBlocks = timeSlots
      .filter((time) => !blockedTimes.some((block) => block.doctor === doctor && block.date === selectedDate && block.time === time))
      .map((time) => ({
        id: Date.now() + Math.random(),
        doctor,
        date: selectedDate,
        time,
        reason: "Gydytojas nedirba",
      }));

    setBlockedTimes((current) => [...current, ...newBlocks]);
  }

  function getSlotData(doctor, time) {
    const appointment = appointments.find(
      (item) =>
        item.doctor === doctor &&
        item.date === selectedDate &&
        item.time === time &&
        item.status !== "Atšaukta"
    );

    const blocked = blockedTimes.find(
      (item) => item.doctor === doctor && item.date === selectedDate && item.time === time
    );

    return { appointment, blocked };
  }

  function statusClass(status) {
    if (status === "Nauja") return "badge blue";
    if (status === "Laukia patvirtinimo") return "badge amber";
    if (status === "Patvirtinta") return "badge green";
    if (status === "Atšaukta") return "badge red";
    return "badge neutral";
  }

  const doctorsForAgenda = selectedDoctor === "Visi gydytojai" ? doctors : [selectedDoctor];

  const css = `
    * { box-sizing: border-box; }
    body { margin: 0; }
    .admin-page {
      min-height: 100vh;
      background: #f8fafc;
      color: #0f172a;
      font-family: Inter, Arial, sans-serif;
    }
    .admin-header {
      background: #082f49;
      color: white;
      padding: 34px 20px;
    }
    .wrap {
      width: min(1320px, calc(100% - 40px));
      margin: 0 auto;
    }
    .header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      flex-wrap: wrap;
    }
    h1 {
      margin: 0 0 8px;
      font-size: clamp(30px, 4vw, 46px);
      letter-spacing: -0.045em;
      line-height: 1;
    }
    .admin-header p {
      margin: 0;
      color: #cbd5e1;
      line-height: 1.6;
    }
    .home-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 999px;
      background: white;
      color: #0369a1;
      text-decoration: none;
      padding: 12px 18px;
      font-weight: 900;
    }
    .content {
      padding: 30px 0 70px;
    }
    .filters {
      display: grid;
      grid-template-columns: 190px 240px 220px 1fr auto;
      gap: 12px;
      margin-bottom: 18px;
      align-items: center;
    }
    .input,
    .select {
      width: 100%;
      border: 1px solid #cbd5e1;
      border-radius: 16px;
      padding: 13px 14px;
      font-size: 15px;
      background: white;
      color: #0f172a;
    }
    .button {
      border: 0;
      border-radius: 999px;
      padding: 13px 17px;
      background: #0369a1;
      color: white;
      font-weight: 900;
      cursor: pointer;
      white-space: nowrap;
    }
    .button.light {
      background: #e0f2fe;
      color: #0369a1;
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 14px;
      margin-bottom: 22px;
    }
    .stat-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 22px;
      padding: 18px;
      box-shadow: 0 14px 40px rgba(15,23,42,.05);
    }
    .stat-card strong {
      display: block;
      color: #0369a1;
      font-size: 30px;
      line-height: 1;
      margin-bottom: 8px;
    }
    .stat-card span {
      color: #64748b;
      font-weight: 800;
    }
    .layout {
      display: grid;
      grid-template-columns: 1.15fr .85fr;
      gap: 20px;
      align-items: start;
    }
    .panel {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 26px;
      box-shadow: 0 18px 50px rgba(15,23,42,.06);
      overflow: hidden;
    }
    .panel-title {
      padding: 18px 20px;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 14px;
      flex-wrap: wrap;
    }
    .panel-title h2 {
      margin: 0;
      font-size: 22px;
      letter-spacing: -.03em;
      color: #082f49;
    }
    .panel-title p {
      margin: 4px 0 0;
      color: #64748b;
      font-size: 14px;
    }
    .agenda {
      overflow-x: auto;
    }
    .agenda-grid {
      min-width: 720px;
      display: grid;
      grid-template-columns: 88px repeat(var(--doctor-count), minmax(220px, 1fr));
    }
    .agenda-head {
      background: #f1f5f9;
      color: #334155;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: .04em;
      font-weight: 900;
      padding: 13px;
      border-bottom: 1px solid #e2e8f0;
      border-right: 1px solid #e2e8f0;
    }
    .time-cell {
      background: #f8fafc;
      color: #64748b;
      font-weight: 900;
      padding: 14px 12px;
      border-bottom: 1px solid #e2e8f0;
      border-right: 1px solid #e2e8f0;
      min-height: 86px;
    }
    .slot {
      min-height: 86px;
      padding: 10px;
      border-bottom: 1px solid #e2e8f0;
      border-right: 1px solid #e2e8f0;
      background: white;
    }
    .slot.free {
      background: #ffffff;
    }
    .slot.blocked {
      background: #fff7ed;
    }
    .appointment-card {
      border-radius: 16px;
      padding: 12px;
      background: #e0f2fe;
      border: 1px solid #bae6fd;
      color: #0f172a;
    }
    .appointment-card strong {
      display: block;
      margin-bottom: 4px;
    }
    .blocked-card {
      border-radius: 16px;
      padding: 12px;
      background: #fed7aa;
      border: 1px solid #fdba74;
      color: #7c2d12;
      font-weight: 900;
    }
    .free-actions {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      align-items: center;
      color: #94a3b8;
      font-size: 13px;
      height: 100%;
    }
    .small-btn {
      border: 0;
      border-radius: 999px;
      padding: 8px 10px;
      background: #f1f5f9;
      color: #334155;
      font-weight: 900;
      cursor: pointer;
      font-size: 12px;
      white-space: nowrap;
    }
    .small-btn.red {
      background: #fee2e2;
      color: #991b1b;
    }
    .small-btn.blue {
      background: #0369a1;
      color: white;
    }
    .list {
      display: grid;
      gap: 12px;
      padding: 16px;
    }
    .visit {
      border: 1px solid #e2e8f0;
      border-radius: 20px;
      padding: 15px;
      background: white;
    }
    .visit-top {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      align-items: flex-start;
      margin-bottom: 10px;
    }
    .visit-name {
      font-weight: 950;
      color: #0f172a;
    }
    .muted {
      color: #64748b;
      font-size: 13px;
      line-height: 1.5;
    }
    .badge {
      display: inline-flex;
      border-radius: 999px;
      padding: 7px 10px;
      font-size: 12px;
      font-weight: 900;
      white-space: nowrap;
    }
    .badge.blue { background: #dbeafe; color: #1d4ed8; }
    .badge.amber { background: #fef3c7; color: #92400e; }
    .badge.green { background: #dcfce7; color: #166534; }
    .badge.red { background: #fee2e2; color: #991b1b; }
    .badge.neutral { background: #f1f5f9; color: #334155; }
    .visit-controls {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-top: 12px;
    }
    .visit-controls .select,
    .visit-controls .input {
      padding: 10px;
      border-radius: 12px;
      font-size: 13px;
    }
    .file {
      display: inline-flex;
      color: #0369a1;
      background: #e0f2fe;
      padding: 6px 9px;
      border-radius: 999px;
      font-weight: 900;
      font-size: 12px;
      margin-top: 8px;
    }
    .empty {
      padding: 30px;
      text-align: center;
      color: #64748b;
    }
    .note {
      margin-top: 18px;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      color: #1e3a8a;
      border-radius: 20px;
      padding: 16px;
      line-height: 1.6;
    }
    @media (max-width: 1100px) {
      .layout { grid-template-columns: 1fr; }
      .filters { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 680px) {
      .filters, .stats { grid-template-columns: 1fr; }
      .visit-controls { grid-template-columns: 1fr; }
    }
  `;

  return (
    <main className="admin-page">
      <style>{css}</style>

      <header className="admin-header">
        <div className="wrap header-row">
          <div>
            <h1>Registracijų administravimas</h1>
            <p>
              Darbotvarkė pagal datą ir gydytoją, vizitų statusai, perkėlimas ir gydytojo nedarbo laikai.
            </p>
          </div>
          <a className="home-link" href="/">
            Grįžti į svetainę
          </a>
        </div>
      </header>

      <section className="wrap content">
        <div className="filters">
          <input
            className="input"
            type="date"
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
          />

          <select
            className="select"
            value={selectedDoctor}
            onChange={(event) => setSelectedDoctor(event.target.value)}
          >
            <option>Visi gydytojai</option>
            {doctors.map((doctor) => (
              <option key={doctor}>{doctor}</option>
            ))}
          </select>

          <select
            className="select"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            {statuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>

          <input
            className="input"
            placeholder="Ieškoti pagal pacientą, telefoną, paslaugą..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <button className="button light" onClick={() => blockDoctorDay(selectedDoctor)}>
            Pažymėti gydytoją kaip nedirbantį
          </button>
        </div>

        <div className="stats">
          <div className="stat-card">
            <strong>{stats.dayTotal}</strong>
            <span>Vizitai pagal filtrą</span>
          </div>
          <div className="stat-card">
            <strong>{stats.newItems}</strong>
            <span>Naujos registracijos</span>
          </div>
          <div className="stat-card">
            <strong>{stats.confirmed}</strong>
            <span>Patvirtinti vizitai</span>
          </div>
          <div className="stat-card">
            <strong>{stats.blocked}</strong>
            <span>Blokuoti laikai</span>
          </div>
        </div>

        <div className="layout">
          <section className="panel">
            <div className="panel-title">
              <div>
                <h2>Dienos darbotvarkė</h2>
                <p>{selectedDate} · {selectedDoctor}</p>
              </div>
            </div>

            <div className="agenda">
              <div
                className="agenda-grid"
                style={{ "--doctor-count": doctorsForAgenda.length }}
              >
                <div className="agenda-head">Laikas</div>
                {doctorsForAgenda.map((doctor) => (
                  <div className="agenda-head" key={doctor}>
                    {doctor}
                  </div>
                ))}

                {timeSlots.map((time) => (
                  <>
                    <div className="time-cell" key={`time-${time}`}>
                      {time}
                    </div>

                    {doctorsForAgenda.map((doctor) => {
                      const { appointment, blocked } = getSlotData(doctor, time);

                      if (appointment) {
                        return (
                          <div className="slot" key={`${doctor}-${time}`}>
                            <div className="appointment-card">
                              <strong>{appointment.patient}</strong>
                              <div className="muted">{appointment.service}</div>
                              <div className="muted">{appointment.phone}</div>
                              <div style={{ marginTop: 8 }}>
                                <span className={statusClass(appointment.status)}>
                                  {appointment.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }

                      if (blocked) {
                        return (
                          <div className="slot blocked" key={`${doctor}-${time}`}>
                            <div className="blocked-card">
                              {blocked.reason}
                              <div style={{ marginTop: 8 }}>
                                <button
                                  className="small-btn red"
                                  onClick={() => unblockTime(blocked.id)}
                                >
                                  Atlaisvinti
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div className="slot free" key={`${doctor}-${time}`}>
                          <div className="free-actions">
                            <span>Laisva</span>
                            <button
                              className="small-btn"
                              onClick={() => blockTime(doctor, selectedDate, time)}
                            >
                              Blokuoti
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ))}
              </div>
            </div>
          </section>

          <aside className="panel">
            <div className="panel-title">
              <div>
                <h2>Vizitų sąrašas</h2>
                <p>Filtruotos registracijos pagal pasirinktą dieną ir gydytoją.</p>
              </div>
            </div>

            {visibleAppointments.length ? (
              <div className="list">
                {visibleAppointments.map((appointment) => (
                  <article className="visit" key={appointment.id}>
                    <div className="visit-top">
                      <div>
                        <div className="visit-name">{appointment.patient}</div>
                        <div className="muted">
                          {appointment.date} · {appointment.time} · {appointment.doctor}
                        </div>
                        <div className="muted">{appointment.phone} · {appointment.email}</div>
                      </div>
                      <span className={statusClass(appointment.status)}>
                        {appointment.status}
                      </span>
                    </div>

                    <strong>{appointment.service}</strong>
                    <p className="muted">{appointment.comment || "Komentaro nėra."}</p>

                    {appointment.file ? (
                      <span className="file">📎 {appointment.file}</span>
                    ) : (
                      <div className="muted">Rentgeno failas nepridėtas.</div>
                    )}

                    <div className="visit-controls">
                      <select
                        className="select"
                        value={appointment.status}
                        onChange={(event) => updateStatus(appointment.id, event.target.value)}
                      >
                        {statuses
                          .filter((status) => status !== "Visos būsenos")
                          .map((status) => (
                            <option key={status}>{status}</option>
                          ))}
                      </select>

                      <select
                        className="select"
                        value={appointment.doctor}
                        onChange={(event) =>
                          moveAppointment(
                            appointment.id,
                            appointment.date,
                            appointment.time,
                            event.target.value
                          )
                        }
                      >
                        {doctors.map((doctor) => (
                          <option key={doctor}>{doctor}</option>
                        ))}
                      </select>

                      <input
                        className="input"
                        type="date"
                        value={appointment.date}
                        onChange={(event) =>
                          moveAppointment(
                            appointment.id,
                            event.target.value,
                            appointment.time,
                            appointment.doctor
                          )
                        }
                      />

                      <select
                        className="select"
                        value={appointment.time}
                        onChange={(event) =>
                          moveAppointment(
                            appointment.id,
                            appointment.date,
                            event.target.value,
                            appointment.doctor
                          )
                        }
                      >
                        {timeSlots.map((time) => (
                          <option key={time}>{time}</option>
                        ))}
                      </select>
                    </div>

                    <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                      <button
                        className="small-btn blue"
                        onClick={() => updateStatus(appointment.id, "Patvirtinta")}
                      >
                        Patvirtinti
                      </button>
                      <button
                        className="small-btn"
                        onClick={() => updateStatus(appointment.id, "Atvyko")}
                      >
                        Atvyko
                      </button>
                      <button
                        className="small-btn"
                        onClick={() => updateStatus(appointment.id, "Neatvyko")}
                      >
                        Neatvyko
                      </button>
                      <button
                        className="small-btn red"
                        onClick={() => removeAppointment(appointment.id)}
                      >
                        Pašalinti
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty">
                Pagal pasirinktus filtrus vizitų nėra.
              </div>
            )}
          </aside>
        </div>

        <div className="note">
          <strong>Pastaba:</strong> šis failas dar veikia demo režimu su lokaliais duomenimis.
          Kitas etapas – prijungti šią logiką prie Supabase lentelių: appointments, blocked_times,
          doctors ir doctor_working_hours.
        </div>
      </section>
    </main>
  );
}