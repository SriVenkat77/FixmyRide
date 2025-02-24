import { useEffect } from 'react';
import BookingCard from './BookingCard';
import { shallow } from 'zustand/shallow';
import useBookingStore from '../store/useBookingStore';

const CustomerBookings = () => {
    const [getAllBookingsForCustomer, bookings] = useBookingStore(
        (state) => [state.getAllBookingsForCustomer, state.bookings],
        shallow
    );

    useEffect(() => {
        getAllBookingsForCustomer();
    }, [getAllBookingsForCustomer]);

    return (
        <div className='w-full flex items-center pt-20 justify-around flex-wrap space-x-3 space-y-3'>
            {bookings?.length ? (
                bookings?.map((booking) => {
                    console.log({ booking });
                    return (
                        <BookingCard
                            booking={booking}
                            key={booking._id}
                        />
                    );
                })
            ) : (
                <div className='text-center text-white font-bold p-10'>
                    <p className='text-lg'>Whoops! No Booking History</p>
                    <p className='text-white mt-2'>
                        It looks like you haven't made any bookings yet. Start exploring and book your first stay now!
                    </p>
                </div>
            )}
        </div>
    );
};

export default CustomerBookings;
