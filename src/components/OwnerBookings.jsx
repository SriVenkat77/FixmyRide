import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';
import useBookingStore from '../store/useBookingStore';
import BookingCard from './BookingCard';

const OwnerBookings = () => {
    const [getAllBookingsForOwner, bookings] = useBookingStore(
        (state) => [state.getAllBookingsForOwner, state.bookings],
        shallow
    );

    useEffect(() => {
        getAllBookingsForOwner();
    }, [getAllBookingsForOwner]);

    return (
        <div className="w-full flex flex-wrap items-center  justify-around space-x-3 pt-20 pb-10 space-y-3">
            {bookings?.length ? (
                bookings.map((booking) => (
                    <BookingCard booking={booking} key={booking._id} />
                ))
            ) : (
                <div className="text-center text-white p-10 " >
                    <p className="font-bold text-lg" >Whoops! No Booking History</p>
                <p>It looks like you haven't received any bookings yet.  Please check back later or contact support if you need assistance.</p>
                <p>If you have any questions, feel free to reach out to our support team.</p>
                </div>
            )}
        </div>
    );
};

export default OwnerBookings;
