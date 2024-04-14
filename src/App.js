import { useState } from "react";
import {
  useNavigate,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import logo from "./img/teste.jpg";
import footer from "./img/extratora.jpg";
import "./index.scss";

function Header() {
  return (
    <nav className="header">
      <img src={logo} alt="logo company" />
      <ul>
        <li>
          <a
            href="https://www.facilimpafloripa.com.br/aluguel-locacao-equipamentos-de-limpeza.html"
            target="_blank"
            rel="noreferrer"
          >
            Equipamentos de limpeza
          </a>
        </li>
        <li>
          <a
            href="https://www.facilimpafloripa.com.br/about-us"
            target="_blank"
            rel="noreferrer"
          >
            Sobre nós
          </a>
        </li>
        <li>
          <a
            href="https://www.facilimpafloripa.com.br/contact"
            target="_blank"
            rel="noreferrer"
          >
            Fale conosco
          </a>
        </li>
      </ul>
    </nav>
  );
}
function Success() {
  const navigate = useNavigate();
  return (
    <div className="cadastro">
      <h1>Cadastro efectuado</h1>
      <button onClick={() => navigate("/")}> Voltar</button>
    </div>
  );
}
function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      return;
    }
    const usuario = {
      email: email,
      password: password,
    };
    fetch("http://localhost:3005/cadastro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/success");
        }
        return response.json();
      })
      .then((data) => {
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h1 className="titulo">Cadastre seu e-mail</h1>
        <label className="escrever">
          <span>Nome </span>
          <input
            type="email"
            name="e-mail"
            value={email}
            onChange={handleEmail}
          />
        </label>
        <label className="escrever">
          <span>Senha </span>
          <input
            type="password"
            name="senha"
            value={password}
            onChange={handlePassword}
          />
        </label>
        <input type="submit" value="Enviar " className="enviar" />
      </form>
    </div>
  );
}
function Footer() {
  return (
    <div className="footer">
      <img src={footer} alt="footer extractor" />
    </div>
  );
}
function App() {
  return (
    <Router>
      <Header />
      <div className="app">
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
export default App;
