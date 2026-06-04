export default function LegalPage() {
  const css = `
    * { box-sizing: border-box; }
    body { margin: 0; }
    .legal-page { min-height: 100vh; background: #f8fafc; color: #0f172a; font-family: Inter, Arial, sans-serif; }
    .legal-header { background: #082f49; color: white; padding: 64px 20px; }
    .wrap { width: min(1040px, calc(100% - 40px)); margin: 0 auto; }
    .legal-header h1 { margin: 0 0 14px; font-size: clamp(34px, 5vw, 56px); letter-spacing: -0.05em; line-height: 1; }
    .legal-header p { margin: 0; color: #cbd5e1; font-size: 18px; line-height: 1.6; max-width: 760px; }
    .tabs { display: flex; gap: 10px; flex-wrap: wrap; margin: 28px 0 0; }
    .tabs a { color: white; text-decoration: none; border: 1px solid rgba(255,255,255,.22); border-radius: 999px; padding: 10px 14px; font-weight: 800; }
    .content { padding: 46px 0 70px; }
    .grid { display: grid; grid-template-columns: 280px 1fr; gap: 24px; align-items: start; }
    .side { position: sticky; top: 20px; background: white; border: 1px solid #e2e8f0; border-radius: 22px; padding: 18px; box-shadow: 0 16px 45px rgba(15,23,42,.05); }
    .side a { display: block; color: #334155; text-decoration: none; padding: 10px 12px; border-radius: 12px; font-weight: 800; }
    .side a:hover { background: #e0f2fe; color: #0369a1; }
    .card { background: white; border: 1px solid #e2e8f0; border-radius: 26px; padding: 28px; margin-bottom: 18px; box-shadow: 0 16px 45px rgba(15,23,42,.05); }
    h2 { margin: 0 0 14px; font-size: 28px; color: #082f49; letter-spacing: -0.03em; }
    h3 { margin: 22px 0 8px; color: #0f172a; }
    p, li { color: #475569; line-height: 1.75; }
    ul { padding-left: 20px; }
    .notice { background: #eff6ff; border: 1px solid #bfdbfe; color: #1e3a8a; padding: 16px; border-radius: 18px; margin-top: 14px; line-height: 1.6; }
    .table { width: 100%; border-collapse: collapse; margin-top: 12px; overflow: hidden; border-radius: 16px; }
    .table th, .table td { border: 1px solid #e2e8f0; padding: 12px; text-align: left; vertical-align: top; color: #475569; }
    .table th { background: #f1f5f9; color: #0f172a; }
    .back { display:inline-flex; margin-top: 22px; color:white; background:#0369a1; text-decoration:none; padding: 12px 18px; border-radius: 999px; font-weight: 900; }
    @media (max-width: 850px) { .grid { grid-template-columns: 1fr; } .side { position: static; } }
  `;

  return (
    <main className="legal-page">
      <style>{css}</style>

      <header className="legal-header">
        <div className="wrap">
          <h1>Privatumo politika ir pacientų informavimas</h1>
          <p>
            Šiame puslapyje pateikiama informacija, kaip klinika tvarko registracijos,
            kontaktinius ir kitus paciento pateiktus duomenis. Tekstą būtina pritaikyti
            pagal realią kliniką, jos rekvizitus, naudojamas sistemas ir duomenų saugojimo terminus.
          </p>
          <div className="tabs">
            <a href="#privatumas">Privatumas</a>
            <a href="#sutikimai">Sutikimai</a>
            <a href="#slapukai">Slapukai</a>
            <a href="#teises">Paciento teisės</a>
          </div>
          <a className="back" href="/">Grįžti į svetainę</a>
        </div>
      </header>

      <div className="wrap content">
        <div className="grid">
          <nav className="side">
            <a href="#valdytojas">Duomenų valdytojas</a>
            <a href="#privatumas">Kokius duomenis renkame</a>
            <a href="#tikslai">Tvarkymo tikslai</a>
            <a href="#sutikimai">Sutikimo tekstas</a>
            <a href="#saugojimas">Saugojimo terminai</a>
            <a href="#slapukai">Slapukai</a>
            <a href="#teises">Jūsų teisės</a>
            <a href="#kontaktai">Kontaktai</a>
          </nav>

          <section>
            <div className="card" id="valdytojas">
              <h2>Duomenų valdytojas</h2>
              <p>
                Duomenų valdytojas: <strong>[KLINIKOS PAVADINIMAS]</strong>,
                juridinio asmens kodas <strong>[KODAS]</strong>, adresas <strong>[ADRESAS]</strong>,
                el. paštas <strong>[EL. PAŠTAS]</strong>, tel. <strong>[TELEFONAS]</strong>.
              </p>
              <div className="notice">
                Šie laukai yra pildomi realiais klinikos duomenimis prieš svetainės paleidimą.
              </div>
            </div>

            <div className="card" id="privatumas">
              <h2>Kokius duomenis renkame</h2>
              <p>Registracijos ir kontaktų formose galime rinkti šiuos duomenis:</p>
              <ul>
                <li>vardą ir pavardę;</li>
                <li>telefono numerį;</li>
                <li>el. pašto adresą, jei jis pateikiamas;</li>
                <li>pasirinktą paslaugą, gydytoją, datą ir laiką;</li>
                <li>papildomą paciento pateiktą informaciją, jei tokia įrašoma formoje.</li>
              </ul>
              <p>
                Odontologijos paslaugų kontekste dalis informacijos gali būti susijusi su sveikata,
                todėl tokie duomenys turi būti tvarkomi ypač atsakingai.
              </p>
            </div>

            <div className="card" id="tikslai">
              <h2>Duomenų tvarkymo tikslai ir pagrindai</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Tikslas</th>
                    <th>Duomenys</th>
                    <th>Teisinis pagrindas</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Vizito registravimas ir administravimas</td>
                    <td>Vardas, telefonas, paslauga, gydytojas, data, laikas</td>
                    <td>Paslaugos teikimas / veiksmai prieš paslaugos suteikimą</td>
                  </tr>
                  <tr>
                    <td>Susisiekimas dėl vizito patvirtinimo ar pakeitimo</td>
                    <td>Vardas, telefonas, el. paštas</td>
                    <td>Teisėtas interesas ir paslaugos administravimas</td>
                  </tr>
                  <tr>
                    <td>SMS arba el. pašto priminimai</td>
                    <td>Telefono numeris, el. paštas, vizito laikas</td>
                    <td>Paslaugos administravimas arba sutikimas, jei naudojama papildomai rinkodarai</td>
                  </tr>
                  <tr>
                    <td>Naujienlaiškiai ir rinkodara</td>
                    <td>El. paštas, vardas</td>
                    <td>Atskiras laisvai duotas sutikimas</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="card" id="sutikimai">
              <h2>Sutikimo lentelė registracijos formoje</h2>
              <p>Registracijos formoje rekomenduojama naudoti aiškius, atskirus sutikimus:</p>
              <table className="table">
                <thead>
                  <tr>
                    <th>Žymimasis laukas</th>
                    <th>Tekstas</th>
                    <th>Privalomas?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Privatumo politikos patvirtinimas</td>
                    <td>Susipažinau su privatumo politika ir suprantu, kad mano pateikti duomenys bus tvarkomi vizito registravimo ir administravimo tikslu.</td>
                    <td>Taip</td>
                  </tr>
                  <tr>
                    <td>SMS / el. pašto priminimas</td>
                    <td>Sutinku gauti su mano vizitu susijusį SMS arba el. pašto priminimą.</td>
                    <td>Rekomenduojama atskirai</td>
                  </tr>
                  <tr>
                    <td>Rinkodara</td>
                    <td>Sutinku gauti klinikos naujienas, profilaktikos patarimus ir specialius pasiūlymus el. paštu.</td>
                    <td>Ne</td>
                  </tr>
                </tbody>
              </table>
              <div className="notice">
                Rinkodaros sutikimas neturi būti būtina registracijos sąlyga. Pacientas turi galėti registruotis ir nesutikęs gauti rinkodaros pranešimų.
              </div>
            </div>

            <div className="card" id="saugojimas">
              <h2>Duomenų saugojimas</h2>
              <p>
                Registracijos duomenys saugomi tiek, kiek reikia vizito administravimui ir klinikos
                teisiniams įsipareigojimams vykdyti. Konkretūs terminai turi būti nustatyti pagal
                klinikos vidaus tvarką, medicininių dokumentų saugojimo reikalavimus ir naudojamas sistemas.
              </p>
            </div>

            <div className="card" id="slapukai">
              <h2>Slapukai</h2>
              <p>
                Svetainėje gali būti naudojami būtini slapukai, kurie reikalingi svetainės veikimui,
                ir analitiniai slapukai, kurie padeda suprasti lankytojų elgseną. Nebūtini slapukai
                turėtų būti naudojami tik gavus lankytojo sutikimą.
              </p>
              <ul>
                <li><strong>Būtini slapukai</strong> – svetainės veikimui ir saugumui.</li>
                <li><strong>Analitiniai slapukai</strong> – lankomumo ir naudojimo statistikai.</li>
                <li><strong>Rinkodaros slapukai</strong> – reklamos ir pakartotinės rinkodaros tikslais.</li>
              </ul>
            </div>

            <div className="card" id="teises">
              <h2>Paciento teisės</h2>
              <p>Pagal BDAR pacientas gali turėti teisę:</p>
              <ul>
                <li>susipažinti su savo duomenimis;</li>
                <li>prašyti ištaisyti netikslius duomenis;</li>
                <li>prašyti ištrinti duomenis, kai tai galima pagal teisės aktus;</li>
                <li>apriboti duomenų tvarkymą;</li>
                <li>atšaukti sutikimą, kai tvarkymas grindžiamas sutikimu;</li>
                <li>pateikti skundą Valstybinei duomenų apsaugos inspekcijai.</li>
              </ul>
            </div>

            <div className="card" id="kontaktai">
              <h2>Kontaktai dėl duomenų apsaugos</h2>
              <p>
                Jei turite klausimų dėl asmens duomenų tvarkymo, kreipkitės:
                <br />
                <strong>[EL. PAŠTAS]</strong> arba <strong>[TELEFONAS]</strong>.
              </p>
              <p className="muted">
                Paskutinį kartą atnaujinta: [DATA]
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
