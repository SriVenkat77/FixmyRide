import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import useAuthStore from '../store/useAuthStore';
import useServiceStore from '../store/useServiceStore';
import addServiceSchema from '../schemas/addServiceSchema';

const initialValue = {
    name: '',
    description: '',
    price: '',
};

const inputTypes = [
    { id: 'name', label: 'Service Name', type: 'text' },
    { id: 'description', label: 'Description', type: 'text' },
    { id: 'price', label: 'Price', type: 'number' },
];

const AddService = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm({
        defaultValues: initialValue,
        resolver: zodResolver(addServiceSchema),
    });

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const addService = useServiceStore((state) => state.addService);

    const onSubmit = async (data) => {
        if (isDirty && isValid) setLoading(true);
        console.log({ data });

        toast.loading('Adding Service details ⌛', { id: '1' });

        const result = await addService(data.name, data.description, data.price);
        console.log({ ADD_SERVICES: result, isAuthenticated });

        if (result?.success) {
            toast.success(result?.message ?? 'Service added successfully 🚀', { id: '1' });
            navigate('/dashboard');
        } else {
            toast.error(
                typeof result?.message === 'string' ? result.message : 'Error adding service 🥲',
                { id: '1' }
            );
        }
    };

    return (
        <div className="h-[95vh] w-full flex items-center justify-center  px-4 py-10 sm:px-6 sm:py-16 lg:px-8"  style={{
            backgroundImage: 'url(/FixmyRidelogo.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        
          }} >
            <div className="bg-slate-100 w-full px-4 py-8 shadow-xl sm:rounded-lg sm:px-10 xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                <h2 className="text-2xl font-bold leading-tight text-black">Add Service Details</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-2 space-y-5">
                    {inputTypes.map((input) => (
                        <Input
                            key={input.id}
                            label={input.label}
                            id={input.id}
                            type={input.type}
                            register={register}
                            errors={errors}
                            disabled={loading}
                        />
                    ))}
                    <button
                        type="submit"
                        className="inline-flex w-full items-center justify-center rounded-md bg-gray-600 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-orange-500"
                        disabled={loading}
                    >
                        Add Service
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddService;
