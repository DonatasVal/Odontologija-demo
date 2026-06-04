import Odontologija1 from "./Odontologija1.jsx";
import LegalPage from "./LegalPage.jsx";
import ConsentBanner from "./ConsentBanner.jsx";
import AdminPanel from "./AdminPanel.jsx";
import { supabase } from "./supabaseClient.js";

export default function App() {
  const path = window.location.pathname;

  console.log("Supabase prijungtas:", supabase);

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