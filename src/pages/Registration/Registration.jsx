import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider';

const Registration = () => {
  const { registration, googleLogin, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', photoUrl: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    if (!formData.name.trim()) { newErrors.name = 'Name is required'; isValid = false; }
    if (!formData.email.trim()) { newErrors.email = 'Email is required'; isValid = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { newErrors.email = 'Please enter a valid email'; isValid = false; }
    if (!formData.password) { newErrors.password = 'Password is required'; isValid = false; }
    else if (formData.password.length < 6) { newErrors.password = 'Password must be at least 6 characters'; isValid = false; }
    if (formData.password !== formData.confirmPassword) { newErrors.confirmPassword = 'Passwords do not match'; isValid = false; }
    setErrors(newErrors);
    return isValid;
  };

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    try { await googleLogin(); navigate('/'); }
    catch (error) { Swal.fire({ title: "Registration Failed", text: error.message, icon: "error" }); }
    finally { setIsSubmitting(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try { await registration(formData.email, formData.password, formData.name, formData.photoUrl); navigate('/'); }
    catch (error) {}
    finally { setIsSubmitting(false); }
  };

  const inputClass = (field) =>
    `appearance-none block w-full px-3 py-2 border ${errors[field] ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-[#D1A054] focus:border-[#D1A054] sm:text-sm`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">Create your account</h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Or{' '}
          <Link to="/login" className="font-medium text-[#D1A054] hover:text-[#b18441]">sign in to your existing account</Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <button onClick={handleGoogleLogin} disabled={isSubmitting || loading}
            className="w-full flex justify-center items-center gap-3 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 mb-6 disabled:opacity-50">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.784-1.664-4.152-2.675-6.735-2.675-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.496 10-10 0-0.67-0.069-1.325-0.189-1.955h-9.811z"/>
            </svg>
            {isSubmitting || loading ? "Processing..." : "Sign up with Google"}
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300 dark:border-gray-600"></div></div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {[
              { id: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe', auto: 'name' },
              { id: 'photoUrl', label: 'Photo URL (Optional)', type: 'url', placeholder: 'https://example.com/photo.jpg', auto: 'off' },
              { id: 'email', label: 'Email address', type: 'email', placeholder: 'you@example.com', auto: 'email' },
              { id: 'password', label: 'Password', type: 'password', placeholder: '••••••••', auto: 'new-password' },
              { id: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: '••••••••', auto: 'new-password' },
            ].map(({ id, label, type, placeholder, auto }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
                <div className="mt-1">
                  <input id={id} name={id} type={type} autoComplete={auto} placeholder={placeholder}
                    value={formData[id]} onChange={handleChange} disabled={isSubmitting || loading}
                    className={inputClass(id)} />
                  {errors[id] && <p className="mt-1 text-sm text-red-600">{errors[id]}</p>}
                </div>
              </div>
            ))}

            <button type="submit" disabled={isSubmitting || loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#D1A054] hover:bg-[#b18441] disabled:opacity-50">
              {isSubmitting || loading ? "Creating account..." : 'Create account'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>By creating an account, you agree to our{' '}
              <Link to="/terms" className="font-medium text-[#D1A054] hover:text-[#b18441]">Terms of Service</Link>{' '}and{' '}
              <Link to="/privacy" className="font-medium text-[#D1A054] hover:text-[#b18441]">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
