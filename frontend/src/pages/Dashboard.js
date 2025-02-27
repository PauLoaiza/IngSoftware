import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import logoIPN from "../assets/logo_ipn.png";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <img src={logoIPN} alt="Instituto Politécnico Nacional" className="logo-ipn" />
      <h2>Bienvenido al Dashboard - Instituto Politécnico Nacional</h2>
      <button onClick={() => { localStorage.removeItem("token"); navigate("/"); }}>Cerrar Sesión</button>
    </div>
  );
};

export default Dashboard;