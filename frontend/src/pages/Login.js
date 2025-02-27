import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import "../styles/Login.css";
import logoIPN from "../assets/logo_ipn.png";

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ correo, contrasena });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div className="login-container">
      <img src={logoIPN} alt="Instituto Politécnico Nacional" className="logo-ipn" />
      <h2>Iniciar Sesión - Instituto Politécnico Nacional</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
        <input type="password" placeholder="Contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;