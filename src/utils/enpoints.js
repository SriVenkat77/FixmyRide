const endpoints = {
    register: 'https://fixmyride-dpfi.onrender.com/api/v1/register',
    login: 'https://fixmyride-dpfi.onrender.com/api/v1/login',
    logout: 'https://fixmyride-dpfi.onrender.com/api/v1/logout',
    getProfile: 'https://fixmyride-dpfi.onrender.com/api/v1/myprofile',

    // Owner
    createService: 'https://fixmyride-dpfi.onrender.com/api/v1/services',
    getAllServicesForOwner: 'https://fixmyride-dpfi.onrender.com/api/v1/services/owner',
    getServiceById: 'https://fixmyride-dpfi.onrender.com/api/v1/services',
    updateServiceById: 'https://fixmyride-dpfi.onrender.com/api/v1/services',
    deleteServiceById: 'https://fixmyride-dpfi.onrender.com/api/v1/services',

    getAllBookingByOwnerID: 'https://fixmyride-dpfi.onrender.com/api/v1/bookings/owner',

    updateBookingStatus: 'https://fixmyride-dpfi.onrender.com/api/v1/bookings',

    // Customer
    getAllServicesForCustomer: 'https://fixmyride-dpfi.onrender.com/api/v1/services/customer',
    getAllBooking: 'https://fixmyride-dpfi.onrender.com/api/v1/bookings',
    createBookings: 'https://fixmyride-dpfi.onrender.com/api/v1/bookings',
    getAllBookingByCustomerID: 'https://fixmyride-dpfi.onrender.com/api/v1/bookings/customer',
};

export default endpoints;
