'use client';

import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';

/**
 * AuthModal Component (React.FC)
 * Global floating window for Authentication.
 * Prevents page refresh by managing state within the current layout.
 */
const AuthModal: React.FC = () => {
  const router = useRouter();
  const { isAuthModalOpen, authModalMode, redirectPath, setAuthModal, login, register } = useAuthStore();

  const handleClose = () => setAuthModal(false);

  // Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string().email('Email tidak valid').required('Email wajib diisi'),
    password: Yup.string().min(6, 'Minimal 6 karakter').required('Kata sandi wajib diisi'),
    username: authModalMode === 'register' ? Yup.string().required('Username wajib diisi') : Yup.string(),
    confirmPassword: authModalMode === 'register' 
      ? Yup.string()
          .oneOf([Yup.ref('password')], 'Sandi tidak cocok')
          .required('Konfirmasi sandi wajib diisi') 
      : Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      username: '',
      confirmPassword: '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (authModalMode === 'login') {
          const success = await login(values.email, values.password);
          if (success) {
            toast.success("Login Berhasil", { description: "Selamat datang kembali!" });
            handleClose();
            if (redirectPath) {
              router.push(redirectPath);
            }
          } else {
            toast.error("Login Gagal", { description: "Periksa kembali data Anda." });
          }
        } else if (authModalMode === 'register') {
          const success = await register(values.email, values.password, values.username);
          if (success) {
            toast.success("Registrasi Berhasil", { description: "Akun Anda telah siap!" });
            handleClose();
            if (redirectPath) {
              router.push(redirectPath);
            }
          } else {
            toast.error("Registrasi Gagal", { description: "Email mungkin sudah terdaftar." });
          }
        }
      } catch (error) {
        toast.error("Error", { description: "Terjadi kesalahan sistem." });
      }
    },
  });


  if (!isAuthModalOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-10 md:py-24 md:px-20 bg-black/70 backdrop-blur-lg animate-in fade-in duration-300 overflow-y-auto">
      <div 
        className="relative w-full max-w-[480px] bg-white border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] rounded-[3rem] p-10 md:p-14 my-auto animate-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          type="button"
          onClick={handleClose}
          className="absolute top-8 right-8 text-black hover:scale-110 transition-transform"
        >
          <span className="material-symbols-outlined text-3xl font-black">close</span>
        </button>

        {/* Form Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black text-black tracking-tighter uppercase mb-1">TRIPS.</h1>
          <p className="text-[10px] font-black text-black opacity-40 uppercase tracking-[0.4em]">
            {authModalMode === 'login' ? 'Authentication' : authModalMode === 'register' ? 'Registration' : 'Recovery'}
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[11px] font-black text-black uppercase tracking-widest ml-1">EMAIL</label>
            <input 
              name="email"
              type="email" 
              placeholder="Masukkan email"
              className={`w-full bg-stone-50 border-2 border-black rounded-2xl p-4 text-black placeholder:text-black/30 placeholder:text-sm focus:outline-none focus:ring-4 focus:ring-[#ffcc00]/20 focus:bg-white transition-all font-bold text-base ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && <div className="text-red-500 text-[10px] font-black ml-1 uppercase">{formik.errors.email}</div>}
          </div>

          {authModalMode === 'register' && (
            <div className="space-y-2">
              <label className="text-[11px] font-black text-black uppercase tracking-widest ml-1">USERNAME</label>
              <input 
                name="username"
                type="text" 
                placeholder="Masukkan username"
                className={`w-full bg-stone-50 border-2 border-black rounded-2xl p-4 text-black placeholder:text-black/30 placeholder:text-sm focus:outline-none focus:ring-4 focus:ring-[#ffcc00]/20 focus:bg-white transition-all font-bold text-base ${formik.touched.username && formik.errors.username ? 'border-red-500' : ''}`}
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              {formik.touched.username && formik.errors.username && <div className="text-red-500 text-[10px] font-black ml-1 uppercase">{formik.errors.username}</div>}
            </div>
          )}

          {authModalMode !== 'forgot' && (
            <div className="space-y-2 relative">
              <label className="text-[11px] font-black text-black uppercase tracking-widest ml-1">KATA SANDI</label>
              <input 
                name="password"
                type="password" 
                placeholder="Masukkan kata sandi"
                className={`w-full bg-stone-50 border-2 border-black rounded-2xl p-4 text-black placeholder:text-black/30 placeholder:text-sm focus:outline-none focus:ring-4 focus:ring-[#ffcc00]/20 focus:bg-white transition-all font-bold text-base ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''}`}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && <div className="text-red-500 text-[10px] font-black ml-1 uppercase">{formik.errors.password}</div>}
            </div>
          )}

          {authModalMode === 'register' && (
            <div className="space-y-2">
              <label className="text-[11px] font-black text-black uppercase tracking-widest ml-1">KONFIRMASI KATA SANDI</label>
              <input 
                name="confirmPassword"
                type="password" 
                placeholder="Masukkan kembali kata sandi"
                className={`w-full bg-stone-50 border-2 border-black rounded-2xl p-4 text-black placeholder:text-black/30 placeholder:text-sm focus:outline-none focus:ring-4 focus:ring-[#ffcc00]/20 focus:bg-white transition-all font-bold text-base ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : ''}`}
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && <div className="text-red-500 text-[10px] font-black ml-1 uppercase">{formik.errors.confirmPassword}</div>}
            </div>
          )}

          <div className="pt-2">
            <button 
              disabled={formik.isSubmitting}
              type="submit"
              className="w-full bg-[#ffcc00] hover:bg-black hover:text-white text-black font-black py-4 rounded-2xl border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-none active:translate-x-1 active:translate-y-1 disabled:opacity-50 flex items-center justify-center gap-2 text-sm uppercase tracking-[0.2em]"
            >
              {formik.isSubmitting ? (
                <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
              ) : (
                authModalMode === 'login' ? 'Masuk' : authModalMode === 'register' ? 'Daftar' : 'Send Link'
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center space-y-6">
          <p className="text-xs font-black uppercase text-black/40">
            {authModalMode === 'login' ? 'Belum punya akun?' : 'Sudah punya akun?'} {' '}
            <button 
              type="button"
              onClick={() => setAuthModal(true, authModalMode === 'login' ? 'register' : 'login')}
              className="text-black font-black hover:underline ml-1"
            >
              {authModalMode === 'login' ? 'Daftar' : 'Login'}
            </button>
          </p>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t-2 border-black/5"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase font-black tracking-[0.4em]"><span className="bg-white px-4 text-black/20">ATAU</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button type="button" className="w-full bg-white border-2 border-black hover:bg-stone-50 text-black font-black py-4 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-3 text-[10px] uppercase tracking-widest">
              <img src="/images/google.png" className="w-5 h-5" alt="Google" />
              <span>Google</span>
            </button>
            <button type="button" className="w-full bg-[#1877F2] border-2 border-black hover:bg-[#166fe5] text-white font-black py-4 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-3 text-[10px] uppercase tracking-widest">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              <span>Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
