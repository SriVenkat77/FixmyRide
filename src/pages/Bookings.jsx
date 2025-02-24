import CustomerBookings from '../components/CustomerBookings';
import OwnerBookings from '../components/OwnerBookings';
import useAuthStore from '../store/useAuthStore';

const Bookings = () => {
    const user = useAuthStore((state) => state.user);
    console.log({ Role: user?.role });

    return (
        <div className="min-h-screen w-full  flex flex-col items-center" style={{
            backgroundImage: 'url(/FixmyRidelogo.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        
          }} >
            <div className="flex justify-center items-center w-full h-full">
                {user?.role === 'owner' ? <OwnerBookings /> : <CustomerBookings />}
            </div>
        </div>
    );
};

export default Bookings;
