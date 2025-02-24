import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import useServiceStore from '../store/useServiceStore';
import ServiceCard from './ServiceCard';

const Owner = () => {
    const navigate = useNavigate();
    const [getAllServicesForOwner, services] = useServiceStore(
        (state) => [state.getAllServicesForOwner, state.services],
        shallow
    );

    useEffect(() => {
        getAllServicesForOwner();
    }, [getAllServicesForOwner]);

    const handleAddService = () => navigate('/dashboard/add');

    return (
        <div className="w-full flex flex-wrap items-center justify-around space-x-3 space-y-3">
            {/* Header Section */}
            <div className="flex w-full  p-1">
                <button
                    onClick={handleAddService}
                    className="px-2 py-1 bg-orange-400 text-white border border-black rounded"
                >
                    Add Service
                </button>
            </div>

            {/* Service List */}
            {services?.length ? (
                services.map((service) => (
                    <ServiceCard service={service} key={service._id} />
                ))
            ) : (
                <div className="text-center p-10 " >
                   <p className="text-white font-semibold text-xl">It seems like you haven't created any services yet.</p>
                   <p className="text-white">Start by adding your first service and make it visible to customers!</p>
                </div>
            )}
        </div>
    );
};

export default Owner;
