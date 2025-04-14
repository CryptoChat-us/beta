import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { validateEmail } from '../utils/validateEmail';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Por favor, insira um email válido');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      if (err.message === 'Invalid login credentials') {
        setError('Email ou senha inválidos');
      } else {
        setError('Erro ao fazer login: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      await loginWithGoogle();
      // O redirecionamento será feito automaticamente pelo Supabase
    } catch (err: any) {
      setError('Erro ao fazer login com Google: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
<motion.div 
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="w-screen h-screen relative bg-black overflow-hidden">
{/* Glow Background */}
<div className="w-[720px] h-[722px] left-[585px] top-[230px] absolute origin-top-left rotate-[-7.46deg] opacity-90 mix-blend-screen bg-yellow-700 rounded-[30px] blur-[148px]" />
 {/* Login Card */}
 <div className="w-[649px] h-[910px] left-[636px] top-[85px] absolute bg-black/70 rounded-2xl outline outline-1 outline-neutral-600 backdrop-blur-[30px]">
    {/* Logo */}
    <div className="absolute top-[59px] left-[218px] flex items-center gap-3">
      <img src="/assets/logo-cryptochat.png" alt="Logo" className="w-12 h-11" />
      <span className="text-white text-3xl font-light font-['Power_Grotesk_Trial']">Crypto Chat</span>
    </div>

    {/* Headline */}
    <div className="absolute top-[160px] left-[73px] text-yellow-400 text-5xl font-['Sequel_Sans']">
      Sua IA Crypto Pessoal!
    </div>

    {/* Subheadline */}
    <div className="absolute top-[238px] left-[63px] text-zinc-500 text-2xl font-['Sequel_Sans']">
      Invista melhor. Com inteligência, não achismo!
    </div>

    {/* E-mail Field */}
    <div className="w-[546px] h-20 px-6 absolute top-[311px] left-[51px] flex items-center gap-2.5 rounded-lg outline outline-1 outline-neutral-400">
      <img src="/assets/icon-email.svg" alt="E-mail Icon" className="w-6 h-6" />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail"
        className="w-full bg-transparent text-white text-2xl opacity-60 font-['Helvetica_Now_Display'] focus:outline-none"
        required
      />
    </div>

    {/* Password Field */}
    <div className="w-[546px] h-20 px-6 absolute top-[404px] left-[51px] flex items-center gap-2.5 rounded-lg outline outline-1 outline-neutral-400">
      <img src="/assets/icon-senha.svg" alt="Senha Icon" className="w-7 h-7" />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
        className="w-full bg-transparent text-white text-2xl opacity-60 font-['Helvetica_Now_Display'] focus:outline-none"
        required
      />
    </div>

    {/* Error Message */}
    {error && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute top-[460px] left-[51px] w-[546px] text-center text-red-500 text-sm font-sequel"
      >
        {error}
      </motion.div>
    )}

    {/* Entrar Button */}
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleLogin}
      disabled={loading}
      className={`w-[546px] h-20 px-20 absolute top-[497px] left-[51px] bg-gradient-to-bl from-yellow-400 to-white rounded-lg outline outline-1 outline-white flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      <span className="text-zinc-950 text-xl font-['Sequel_Sans']">
        {loading ? 'Entrando...' : 'Entrar'}
      </span>
    </motion.button>

    {/* Divider */}
    <div className="w-64 h-px absolute top-[595px] left-[53px] opacity-30 outline outline-[0.85px] outline-white"></div>
    <div className="w-5 h-3 absolute top-[589px] left-[315px] bg-zinc-500 opacity-30" />
    <div className="w-64 h-px absolute top-[595px] left-[348px] opacity-30 outline outline-[0.85px] outline-white"></div>

    {/* Google Button */}
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleGoogleLogin}
      disabled={loading}
      className={`w-[546px] h-20 px-6 absolute top-[615px] left-[51px] rounded-lg outline outline-1 outline-neutral-400 flex items-center justify-center ${loading ? 'opacity-30' : 'opacity-60'} hover:opacity-100 transition-opacity`}
    >
      <span className="text-white text-2xl font-['Helvetica_Now_Display']">
        {loading ? 'Conectando...' : 'Continuar com Google'}
      </span>
    </motion.button>

    {/* Criar conta */}
    <div className="absolute top-[714px] left-[163px] text-2xl font-['Sequel_Sans']">
      <span className="text-zinc-500">Ainda não tem conta? </span>
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={() => navigate('/signup')}
        className="text-yellow-400 hover:text-yellow-300 transition-colors"
      >
        Criar agora
      </motion.button>
    </div>

    {/* Termos e Política */}
    <div className="absolute top-[815px] left-[197px] text-sm font-['Sequel_Sans'] flex gap-6">
      <span className="text-stone-300 underline">Termos de uso</span>
      <span className="text-stone-300 opacity-50 underline">Política de privacidade</span>
    </div>
  </div>
</motion.div>
);
};

export default LoginPage;