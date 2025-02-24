
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useAuthStore from '../store/useAuthStore';
import Input from '../components/Input';
import { toast } from 'react-hot-toast';
import loginSchema from '../schemas/loginSchema';
import { shallow } from 'zustand/shallow';
import { useEffect } from 'react';

const initialValue = {
    email: '',
    password: '',
};

const inputTypes = [
    { id: 'email', label: 'Email Address', type: 'email' },
    { id: 'password', label: 'Password', type: 'password' },
];

const LogIn = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: initialValue,
        resolver: zodResolver(loginSchema),
    });

    const [isAuthenticated, login, getProfile] = useAuthStore(
        (state) => [state.isAuthenticated, state.login, state.getProfile],
        shallow
    );
    useEffect(() => {
        getProfile(); // Fetch user on component mount to avoid stale data
    }, [getProfile]);
    
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const onSubmit = async (data) => {
        toast.loading('Authenticating... ⌛', { id: '1' });

        const result = await login(data.email, data.password);

        if (result?.success) {
            toast.success(result.message || 'Login successful 🚀', { id: '1' });
            navigate('/dashboard');
        } else {
            toast.error(result?.message || 'Login failed 🥲', { id: '1' });
        }
    };

    return (
        <div className="flex h-screen items-center justify-center pt-20 w-full  px-4"  style={{
            backgroundImage: 'url(/FixmyRidelogo.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        
          }}  >
            <div className="w-full max-w-md rounded-lg bg-white p-8  shadow-2xl">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    Welcome Back! 👋
                </h2>
                <p className="mt-2 text-center text-gray-600">
                    Don't have an account?{' '}
                    <Link
                        to="/sign-up"
                        className="font-semibold text-indigo-600 hover:underline"
                    >
                        Sign up for free
                    </Link>
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
                    {inputTypes.map((input) => (
                        <Input
                            key={input.id}
                            label={input.label}
                            id={input.id}
                            type={input.type}
                            register={register}
                            errors={errors}
                            disabled={isSubmitting}
                        />
                    ))}

                    <button
                        type="submit"
                        className="mt-4 flex w-full items-center justify-center rounded-lg bg-gray-600 px-5 py-3 text-lg font-medium text-white transition-all duration-300 hover:bg-orange-500 focus:ring-2 focus:ring-orange-500"
                    >
                        Sign In
                        
                    </button>
                </form>

                <p className="mt-2 text-center text-gray-600">
                   
                    <Link
                        to="/sign-up"
                        className="font-semibold text-indigo-600 hover:underline"
                    >
                        Forgot Password
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LogIn;
