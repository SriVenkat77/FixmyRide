import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import useServiceStore from '../store/useServiceStore';

const ServiceCard = ({ service }) => {
    const navigate = useNavigate();
    const deleteService = useServiceStore((state) => state.deleteService);
    const user = useAuthStore((state) => state.user);
    

    const handleDeleteService = async () => {
        toast.loading('Deleting Service... ⌛', { id: '1' });
        const result = await deleteService(service?._id);
        result.success
            ? toast.success('Service deleted successfully 🚀', { id: '1' })
            : toast.error('Error in service deletion 🥲', { id: '1' });
    };

    return (
        <div className="w-[300px]  h-[300px] rounded-md border mt-1 shadow-lg hover:bg-gray-400">
            <div className="p-4">
                <div className="m-1 text-md text-white flex flex-col space-y-4 items-center justify-between w-full flex-wrap">
                <div className="border border-white  text-white rounded-md p-1"> 
                    <h1 className="text-lg font-semibold">{service?.name}</h1>
                    </div>
                    {user?.role === 'customer' && (
                        <div className=" p-1">
                            <span>Provider : </span>
                            <span>{service?.ownerId?.name?.toUpperCase()}</span>
                        </div>
                    )}
                    <div>
                      
                        <p>{service?.description}</p>
                    </div>
                    <div>
                        <span>Service Price: </span>
                        <span>Rs {service?.price}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    {user?.role === 'owner' ? (
                        <>
                        
                            <button
                                className="mt-2 rounded-md bg-gray-600 px-2.5 py-1 text-base font-semibold text-white shadow-sm hover:bg-orange-500"
                                onClick={() => navigate(`/dashboard/edit/${service?._id}`)}
                            >
                                Modify
                            </button>
                            <button
                                className="mt-2 rounded-md bg-gray-600 px-2.5 py-1 text-base font-semibold text-white shadow-sm hover:bg-red-500/80"
                                onClick={handleDeleteService}
                            >
                                Delete
                            </button>
                        </>
                    ) : (
                        <button
                            className="mt-2 mx-auto rounded-md bg-gray-600 px-2.5 py-1 text-base font-semibold text-white border border-black shadow-sm hover:bg-orange-500"
                            onClick={() => navigate(`/dashboard/service-details/${service?._id}`)}
                        >
                            View Details
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;
