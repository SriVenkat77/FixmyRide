import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import Input from '../components/Input';
import { useNavigate, useParams } from 'react-router-dom';

import useAuthStore from '../store/useAuthStore';
import { shallow } from 'zustand/shallow';
import useServiceStore from '../store/useServiceStore';
import { useEffect } from 'react';
import editServiceSchema from '../schemas/editServiceSchema';

const inputTypes = [
    {
        id: 'name',
        label: 'Service Name',
        type: 'text',
    },
    {
        id: 'description',
        label: 'Description',
        type: 'text',
    },
    {
        id: 'price',
        label: 'Price',
        type: 'text',
    },
];

const EditService = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const [updateService, getServiceById] = useServiceStore(
        (state) => [state.updateService, state.getServiceById],
        shallow
    );

    const {
        register,
        handleSubmit,
        formState: { errors, isLoading },
        reset,
    } = useForm({
        resolver: zodResolver(editServiceSchema),
    });

    useEffect(() => {
        const getServiceData = async () => {
            const result = await getServiceById(id);
            console.log(result?.service);
            if (result?.service) {
                reset({
                    name: result.service.name,
                    description: result.service.description,
                    price: Number(result.service.price),
                });
            }
        };
        getServiceData();
    }, [getServiceById, id, reset]);

    const onSubmit = async (data) => {
        console.log({ data });
        const { name, description, price } = data;
        toast.loading('Service updating ⌛', { id: '1' });

        const result = await updateService(name, description, price, id);

        console.log({ UPDATE_SERVICE: result });
        console.log({ isAuthenticated });

        if (result?.success) {
            toast.success(result.message ?? 'Service updated successfully 🚀', { id: '1' });
            navigate('/dashboard');
        } else {
            let message = 'Error occurs in service updating 🥲';
            if (typeof result?.message === 'string') {
                message = result.message;
            } else if (typeof result === 'string') {
                message = result;
            }
            toast.error(message, { id: '1' });
        }
    };

    return (
        <div className="h-[93vh] w-full flex items-center justify-center  px-4 py-10 sm:px-6 sm:py-16 lg:px-8"   style={{
            backgroundImage: 'url(/FixmyRidelogo.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#545454',
          }} >
            <div className="bg-slate-100  px-4 py-8 shadow-xl rounded-lg sm:px-20 xl:mx-auto xl:w-full  2xl:max-w-lg">
                <h2 className="text-xl sm:text-2xl font-bold leading-tight text-black text-center">
                    Modify Service
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
                    <div className="space-y-5">
                        {inputTypes.map((input) => (
                            <Input
                                key={input.id}
                                label={input.label}
                                id={input.id}
                                type={input.type}
                                register={register}
                                errors={errors}
                                disabled={isLoading}
                            />
                        ))}

                        <button
                            type="submit"
                            className="inline-flex w-full items-center justify-center rounded-md bg-gray-600 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-orange-500"
                            disabled={isLoading}
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditService;
