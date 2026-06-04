import Odontologija1 from "./Odontologija1.jsx";
import LegalPage from "./LegalPage.jsx";
import ConsentBanner from "./ConsentBanner.jsx";
import AdminPanel from "./AdminPanel.jsx";

export default function App() {
  const path = window.location.pathname;

  return (
    <>
      {path === "/admin" ? (
        <AdminPanel />
      ) : path === "/privatumas" ? (
        <LegalPage />
      ) : (
        <Odontologija1 />
      )}
      <ConsentBanner />
    </>
  );
}
