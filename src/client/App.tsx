import { lazy, Suspense, useState, useEffect } from "react";
import {
  unstable_HistoryRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { browserHistory } from "./service/browserHistory";
import "./App.css";
import Header from "./pages/Header";
// import Load from './components/load/Load';

function App() {
  const Login = lazy(() => import("./pages/auth/Login"));
  const Register = lazy(() => import("./pages/auth/Registro"));
  const User = lazy(() => import("./pages/User"));
  const Cards = lazy(() => import("./pages/Cartas"));
  const Game = lazy(() => import("./pages/Game"));
  return (
    <Router history={browserHistory}>
      <Suspense fallback={"<Load />"}>
        <Header />
        {/* <EmailVerificationModal/> */}

        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="*" element={<NotFound />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/usuario" element={<User />} />
          <Route path="/cartas" element={<Cards />} />
          <Route path="/game" element={<Game />} />
          {/* <Route path="/pacientes" element={<ListaPacientes />} />
        <Route path="/pacientes/:id" element={<PacientePage />} />
        <Route path="/cadastrocompcorp/:id" element={<CadastraAvCompCorp />} />
        <Route path="/compcorp/:id" element={<AvCompCorp />} />
        <Route path="/cadastroantropometrica/:id" element={<CadastraAvAntropometrica />} />
        <Route path="/antropometrica/:id" element={<AvAntropometrica />} />
        <Route path="/laudo/:id" element={<Laudo />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/password-change" element={<PasswordChange />} />         */}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
