import { create } from 'zustand';
import request from '../utils/axios_request';
import endpoints from '../utils/enpoints';

const initialState = {
    bookings: null,
};

const useBookingStore = create((set, get) => ({
    ...initialState,

    getAllBookingsForOwner: async () => {
        try {
            const { data } = await request.get(endpoints.getAllBookingByOwnerID);
            console.log({ GET_ALL_BOOKING_OWNER_RESPONSE: data });

            if (data.success) {
                set({ bookings: data?.bookings });
                return data;
            }
        } catch (error) {
            console.error('Get all services failed:', error);
            console.log({ error });
            return error?.response?.data;
        }
    },

    getAllBookingsForCustomer: async () => {
        try {
            const { data } = await request.get(endpoints.getAllBookingByCustomerID);
            console.log({ GET_ALL_BOOKING_CUSTOMER_RESPONSE: data });

            if (data.success) {
                set({ bookings: data?.bookings });
                return data;
            }
        } catch (error) {
            console.error('Get all services failed:', error);
            console.log({ error });
            return error?.response?.data;
        }
    },

    updateBookingStatus: async (id, status) => {
        try {
            const { data } = await request.patch(`${endpoints.updateBookingStatus}`, {
                bookingId: id,
                status,
            });
            console.log({ UPDATE_BOOKING_STATUS_RESPONSE: data });

            if (data.success) {
                const oldBookings = get().bookings || [];
                const newBookings = oldBookings.map((booking) =>
                    booking._id === id ? data.booking : booking
                );
                set({ bookings: newBookings });
                return data;
            }
        } catch (error) {
            console.error('Update Booking Status failed:', error);
            console.log({ error });
            return error?.response?.data;
        }
    },

    serviceBooking: async (serviceId, date) => {
        try {
            const { data } = await request.post(endpoints.createBookings, {
                serviceId,
                date,
            });
            console.log({ CREATE_BOOKING_RESPONSE: data });

            if (data.success) {
                return data;
            }
        } catch (error) {
            console.error('Create Service failed:', error);
            console.log({ error });
            return error?.response?.data;
        }
    },
}));

export default useBookingStore;
