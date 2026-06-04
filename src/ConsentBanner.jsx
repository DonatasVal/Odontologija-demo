import { useEffect, useState } from "react";

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("clinic_cookie_consent");
    if (!saved) setVisible(true);
  }, []);

  function save(choice) {
    localStorage.setItem("clinic_cookie_consent", JSON.stringify({
      choice,
      date: new Date().toISOString()
    }));
    setVisible(false);
  }

  if (!visible) return null;

  const css = `
    .consent-box {
      position: fixed;
      left: 20px;
      right: 20px;
      bottom: 20px;
      z-index: 9999;
      max-width: 980px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 22px;
      box-shadow: 0 28px 80px rgba(15,23,42,.22);
      padding: 18px;
      font-family: Inter, Arial, sans-serif;
      color: #0f172a;
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 16px;
      align-items: center;
    }
    .consent-box h3 { margin: 0 0 6px; font-size: 18px; }
    .consent-box p { margin: 0; color: #475569; line-height: 1.55; font-size: 14px; }
    .consent-actions { display: flex; gap: 10px; flex-wrap: wrap; }
    .consent-actions button, .consent-actions a {
      border: 0;
      border-radius: 999px;
      padding: 11px 15px;
      font-weight: 900;
      cursor: pointer;
      text-decoration: none;
      font-size: 14px;
    }
    .accept { background: #0369a1; color: white; }
    .necessary { background: #f1f5f9; color: #0f172a; border: 1px solid #e2e8f0 !important; }
    .details { background: transparent; color: #0369a1; }
    @media (max-width: 760px) {
      .consent-box { grid-template-columns: 1fr; }
      .consent-actions { width: 100%; }
      .consent-actions button, .consent-actions a { flex: 1; text-align: center; }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <div className="consent-box">
        <div>
          <h3>Slapukų ir duomenų naudojimas</h3>
          <p>
            Naudojame būtinus slapukus svetainės veikimui. Analitinius ir rinkodaros slapukus
            naudosime tik gavę jūsų sutikimą. Daugiau informacijos rasite privatumo politikoje.
          </p>
        </div>
        <div className="consent-actions">
          <button className="necessary" onClick={() => save("necessary")}>Tik būtini</button>
          <button className="accept" onClick={() => save("all")}>Sutinku</button>
          <a className="details" href="/privatumas">Plačiau</a>
        </div>
      </div>
    </>
  );
}
