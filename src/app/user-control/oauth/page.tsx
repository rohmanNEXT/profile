'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';
import { useFormik } from 'formik';
import * as Yup from 'yup';

/**
 * AuthPage Component (React.FC)
 * Features a WHITE floating window with Formik & Yup integration.
 * Register mode includes: Email, Username, Kata Sandi, Konfirmasi Kata Sandi.
 */
const AuthPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode = (searchParams.get('mode') as 'login' | 'register' | 'forgot') || 'login';
  
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(initialMode);
  const { login, register, user } = useAuthStore();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  // Validation Schema with Yup
  const validationSchema = Yup.object({
    email: Yup.string().email('Email tidak valid').required('Email wajib diisi'),
    password: Yup.string().min(6, 'Minimal 6 karakter').required('Kata sandi wajib diisi'),
    username: mode === 'register' ? Yup.string().required('Username wajib diisi') : Yup.string(),
    confirmPassword: mode === 'register' 
      ? Yup.string()
          .oneOf([Yup.ref('password')], 'Sandi tidak cocok')
          .required('Konfirmasi sandi wajib diisi') 
      : Yup.string(),
  });

  // Formik Integration
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      username: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (mode === 'login') {
          const success = await login(values.email, values.password);
          if (success) {
            toast.success("Welcome back!", { description: "Login berhasil." });
            router.push('/');
          } else {
            toast.error("Login Gagal", { description: "Periksa kembali email dan sandi Anda." });
          }
        } else if (mode === 'register') {
          const success = await register(values.email, values.password, values.username);
          if (success) {
            toast.success("Account Created", { description: "Registrasi berhasil!" });
            router.push('/');
          } else {
            toast.error("Registrasi Gagal", { description: "Email mungkin sudah digunakan." });
          }
        } else {
          toast.info("Reset Link Sent", { description: `Link reset dikirim ke ${values.email}` });
          setMode('login');
        }
      } catch (error) {
        console.error("Auth Error:", error);
        toast.error("System Error", { description: "Terjadi kesalahan sistem." });
      }
    },
  });

  const switchMode = useCallback((newMode: 'login' | 'register' | 'forgot') => {
    setMode(newMode);
    formik.resetForm();
  }, [formik]);

  return (
    <div className="min-h-screen bg-[#f5f0e8] font-['Inter'] relative">
      {/* OVERLAY WITH GENEROUS OUTER MARGIN */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-8 md:p-16 bg-black/70 backdrop-blur-lg overflow-y-auto">
        <div className="relative w-full max-w-[480px] bg-white border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] rounded-[3rem] p-8 md:p-12 my-auto animate-in fade-in zoom-in duration-300">
          
          {/* Close Button */}
          <button 
            type="button"
            onClick={() => router.push("/")}
            className="absolute top-8 right-8 text-black hover:scale-110 transition-transform"
          >
            <span className="material-symbols-outlined text-3xl font-black">close</span>
          </button>

          {/* Form Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-black text-black tracking-tighter uppercase mb-1">TRIPS.</h1>
            <p className="text-[10px] font-black text-black opacity-40 uppercase tracking-[0.4em]">
              {mode === 'login' ? 'Authentication' : mode === 'register' ? 'Registration' : 'Recovery'}
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* EMAIL FIELD (Visible in all modes) */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-black uppercase tracking-widest ml-1">EMAIL</label>
              <input 
                name="email"
                type="email" 
                placeholder="Masukkan email"
                className={`w-full bg-stone-50 border-2 border-black rounded-2xl p-4 text-black placeholder:text-black/30 placeholder:text-sm focus:outline-none focus:ring-4 focus:ring-[#ffcc00]/20 focus:bg-white transition-all font-bold text-base ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? <div className="text-red-500 text-[10px] font-black ml-1 uppercase">{formik.errors.email}</div> : null}
            </div>

            {/* USERNAME FIELD (Register Only) */}
            {mode === 'register' && (
              <div className="space-y-2">
                <label className="text-[11px] font-black text-black uppercase tracking-widest ml-1">USERNAME</label>
                <input 
                  name="username"
                  type="text" 
                  placeholder="Masukkan username"
                  className={`w-full bg-stone-50 border-2 border-black rounded-2xl p-4 text-black placeholder:text-black/30 placeholder:text-sm focus:outline-none focus:ring-4 focus:ring-[#ffcc00]/20 focus:bg-white transition-all font-bold text-base ${formik.touched.username && formik.errors.username ? 'border-red-500' : ''}`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username ? <div className="text-red-500 text-[10px] font-black ml-1 uppercase">{formik.errors.username}</div> : null}
              </div>
            )}

            {/* PASSWORD FIELD (Login/Register Only) */}
            {mode !== 'forgot' && (
              <div className="space-y-2 relative">
                <label className="text-[11px] font-black text-black uppercase tracking-widest ml-1">KATA SANDI</label>
                <div className="relative">
                  <input 
                    name="password"
                    type="password" 
                    placeholder="Masukkan kata sandi"
                    className={`w-full bg-stone-50 border-2 border-black rounded-2xl p-4 text-black placeholder:text-black/30 placeholder:text-sm focus:outline-none focus:ring-4 focus:ring-[#ffcc00]/20 focus:bg-white transition-all font-bold text-base ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''}`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-black/20 cursor-pointer hover:text-black transition-colors">visibility</span>
                </div>
                {formik.touched.password && formik.errors.password ? <div className="text-red-500 text-[10px] font-black ml-1 uppercase">{formik.errors.password}</div> : null}
              </div>
            )}

            {/* CONFIRM PASSWORD FIELD (Register Only) */}
            {mode === 'register' && (
              <div className="space-y-2 relative">
                <label className="text-[11px] font-black text-black uppercase tracking-widest ml-1">KONFIRMASI KATA SANDI</label>
                <input 
                  name="confirmPassword"
                  type="password" 
                  placeholder="Masukkan kembali kata sandi"
                  className={`w-full bg-stone-50 border-2 border-black rounded-2xl p-4 text-black placeholder:text-black/30 placeholder:text-sm focus:outline-none focus:ring-4 focus:ring-[#ffcc00]/20 focus:bg-white transition-all font-bold text-base ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : ''}`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? <div className="text-red-500 text-[10px] font-black ml-1 uppercase">{formik.errors.confirmPassword}</div> : null}
              </div>
            )}

            {/* FORGOT PASSWORD LINK */}
            {mode === 'login' && (
              <div className="flex justify-end">
                <button 
                  type="button"
                  onClick={() => switchMode('forgot')}
                  className="text-xs font-black text-black/40 hover:text-black transition-all mt-1"
                >
                  Lupa kata sandi?
                </button>
              </div>
            )}

            {/* PRIMARY ACTION BUTTON */}
            <div className="pt-2">
              <button 
                disabled={formik.isSubmitting}
                type="submit"
                className="w-full bg-[#ffcc00] hover:bg-black hover:text-white text-black font-black py-4 rounded-2xl border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-none active:translate-x-1 active:translate-y-1 disabled:opacity-50 flex items-center justify-center gap-2 text-sm uppercase tracking-[0.2em]"
              >
                {formik.isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                ) : (
                  mode === 'login' ? 'Masuk' : mode === 'register' ? 'Daftar' : 'Send Link'
                )}
              </button>
            </div>
          </form>

          {/* SWITCHER & SOCIAL */}
          <div className="mt-8 text-center space-y-6">
            <p className="text-xs font-black uppercase text-black/40 tracking-tight">
              {mode === 'login' ? 'Belum punya akun?' : 'Sudah punya akun?'} {' '}
              <button 
                type="button"
                onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}
                className="text-black font-black hover:underline ml-1"
              >
                {mode === 'login' ? 'Daftar' : 'Login'}
              </button>
            </p>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t-2 border-black/5"></div></div>
              <div className="relative flex justify-center text-[10px] uppercase font-black tracking-[0.4em]"><span className="bg-white px-4 text-black/20">ATAU</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button type="button" className="w-full bg-white border-2 border-black hover:bg-stone-50 text-black font-black py-4 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-3 active:shadow-none active:translate-x-1 active:translate-y-1 text-[10px] uppercase tracking-widest">
                <img src="/images/google.png" className="w-5 h-5" alt="Google" />
                <span>Google</span>
              </button>
              <button type="button" className="w-full bg-[#1877F2] border-2 border-black hover:bg-[#166fe5] text-white font-black py-4 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-3 active:shadow-none active:translate-x-1 active:translate-y-1 text-[10px] uppercase tracking-widest">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                <span>Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;