import { lazy, Suspense, useState, useEffect } from 'react';
import { unstable_HistoryRouter as Router, Routes, Route } from 'react-router-dom';
import { browserHistory } from './service/browserHistory';
import './App.css';
import Header from './pages/Header';
// import Load from './components/load/Load';

function App() {


  const Login = lazy(() => import('./pages/auth/Login'))

  return (
    <Router history={browserHistory}>
  
    <Suspense fallback={"<Load />"}>

      <Header />
      {/* <LoadAuthUser />
      <EmailVerificationModal/> */}
      
      <Routes>
      <Route path="/" element={<Login />} />
        {/* <Route path="*" element={<NotFound />} /> */}
        <Route path="/login" element={<Login />} />
        {/* <Route path="/registro" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<CadastraPaciente />} />
        <Route path="/pacientes" element={<ListaPacientes />} />
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

  )
}

export default App
