import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import useBookingStore from '../store/useBookingStore';

const BookingCard = ({ booking }) => {
    const [selectedStatus, setSelectedStatus] = useState(booking?.status || '');
    const navigate = useNavigate();
    const [updateBookingStatus] = useBookingStore((state) => [state.updateBookingStatus]);
    const [user] = useAuthStore((state) => [state.user]);

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    const handleBookingStatus = async () => {
        console.log({ selectedStatus });
        toast.loading('Updating Booking Status... ⌛', { id: '1' });
        
        const response = await updateBookingStatus(booking?._id, selectedStatus);
        const result = typeof response.json === "function" ? await response.json() : response;
        
        console.log({ UPDATE_BOOKING_STATUS: result });

        if (result?.success) {
            toast.success(result?.message ?? 'Status successfully updated 🚀', { id: '1' });
        } else {
            toast.error(result?.message ?? 'Error occurs in Status Updating 🥲', { id: '1' });
        }
    };

    const handleServiceDetails = () => {
        navigate(`/dashboard/service-details/${booking?._id}`);
    };

    return (
        <div className='w-[350px] rounded-md border mt-1  shadow-lg hover:bg-gray-400'>
            <div className='p-4'>
                <div className='m-1 text-sm text-white flex flex-col space-y-2 items-start justify-between w-full flex-wrap'>
                    {user?.role === 'owner' ? (
                        <>
                            <h1 className='text-xl text-black  font-bold mx-auto'>
                                Customer Details
                            </h1>
                            <div><span className='text-md font-semibold'>Name :</span> <span className='text-sm font-medium'>{booking?.customer?.name}</span></div>
                            <div><span className='text-md font-semibold'>Email :</span> <span className='text-sm font-medium'>{booking?.customer?.email}</span></div>
                            <div><span className='text-md font-semibold'>Mobile :</span> <span className='text-sm font-medium'>{booking?.customer?.mobile}</span></div>
                            <div><span className='text-md font-semibold'>Booked Service :</span> <span className='text-sm font-medium'>{booking?.service?.name}</span></div>
                            <div><span className='text-md font-semibold'>Service Booked Date :</span> <span className='text-sm font-medium'>{new Date(booking?.date).toDateString()}</span></div>
                            
                            <div><span className='text-md font-semibold'>Service Status :</span> <span className='text-sm font-medium'>{booking?.status}</span></div>
                            <div className='flex flex-col'>
                                <label className='text-base font-medium text-white'>Post an Update</label>
                                <select value={selectedStatus} onChange={handleStatusChange} className='mt-1 flex h-10 w-full rounded-md border bg-transparent text-black font-bold border-gray-300 px-3 py-2 text-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1'>
                                    <option value=''>Pending</option>
                                    <option value='ReadyForDelivery'>Ready For Delivery</option>
                                    <option value='Completed'>Completed</option>
                                </select>
                            </div>
                        </>
                    ) : (
                        <>
                            

                            <div> <span className='text-lg text-black font-bold'>{booking?.service?.name}</span></div>
                            <div >
    <span className='text-md font-semibold '>Provider : {booking?.service?.ownerId?.name?.toUpperCase() || 'Not Available'}</span>
</div><div><span className='text-md font-semibold'>Service Booked Date :</span> <span className='text-sm font-medium'>{new Date(booking?.date).toDateString()}</span></div>
                            <div>
                                <span className='text-md font-semibold'>Service Status :</span>
                                <span className={`text-sm font-medium ${booking?.status === 'Completed' ? 'text-yellow-100' : booking?.status === 'ReadyForDelivery' ? 'text-green-100' : 'text-blue-100'}`}>{booking?.status}</span>
                            </div>
                        </>
                    )}
                </div>
                <div className='flex items-center justify-between'>
                    {user?.role === 'owner' && (
                        <button type='button' className='mt-2 rounded-md bg-gray-600 px-2.5 py-1 text-base font-semibold text-white shadow-sm hover:bg-orange-500' onClick={handleBookingStatus}>Update</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingCard;
