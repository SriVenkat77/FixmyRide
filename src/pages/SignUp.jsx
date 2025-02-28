import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import useAuthStore from '../store/useAuthStore';
import Input from '../components/Input';
import registerSchema from '../schemas/registerSchema';
import { shallow } from 'zustand/shallow';

const inputFields = [
    { id: 'name', label: 'User Name', type: 'text' },
    { id: 'email', label: 'Email Address', type: 'email' },
    { id: 'mobile', label: 'Mobile Number', type: 'tel' },
    { id: 'password', label: 'Password', type: 'password' },
];

const SignUp = () => {
    const navigate = useNavigate();
    const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const [user, isAuthenticated, registerUser] = useAuthStore(
        (state) => [state.user, state.isAuthenticated, state.register],
        shallow
    );

    if (isAuthenticated) {
        navigate('/dashboard');
        return null;
    }

    const onSubmit = async (data) => {
        toast.loading('Registering User ⌛', { id: '1' });
        const result = await registerUser(data.name, data.password, data.email, data.mobile, data.role);

        if (result?.success) {
            toast.success(result.message || 'User registered successfully 🚀', { id: '1' });
            navigate('/login');
        } else {
            let errorMessage = 'Error while registering user 🥲';
            if (typeof result?.message === 'string') errorMessage = result.message;
            toast.error(errorMessage, { id: '1' });
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center w-full pt-20 pb-20 px-4 sm:px-6 lg:px-8'  style={{
            backgroundImage: 'url(/FixmyRidelogo.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        
          }}>
            <div className='bg-white shadow-xl rounded-lg p-6  sm:p-10 w-full max-w-md'>
                <h2 className='text-2xl font-bold text-gray-900'>Sign up to create an account</h2>
                <p className='mt-2 text-sm text-gray-600'>
                    Already have an account? 
                    <Link to='/login' className='font-medium text-indigo-600 hover:underline'> Log In</Link>
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className='mt-4 space-y-4'>
                    {inputFields.map(({ id, label, type }) => (
                        <Input key={id} label={label} id={id} type={type} register={register} errors={errors} disabled={isSubmitting} />
                    ))}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Role</label>
                        <Controller
                            name='role'
                            control={control}
                            defaultValue=''
                            render={({ field }) => (
                                <select {...field} className='w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-300'>
                                    <option value=''>Select a role</option>
                                    <option value='owner'>Partner</option>
                                    <option value='customer'>Customer</option>
                                </select>
                            )}
                        />
                        {errors.role && <span className='text-red-500 text-xs'>Role must be either Customer or Owner</span>}
                    </div>
                    <button type='submit' className='w-full flex items-center justify-center bg-gray-600 text-white py-2 rounded-md font-semibold hover:bg-orange-500 transition'>
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
