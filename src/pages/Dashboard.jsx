import useAuthStore from '../store/useAuthStore';
import Owner from '../components/Owner';
import Customer from '../components/Customer';

const Dashboard = () => {
    const user = useAuthStore((state) => state.user);
    console.log({ Role: user?.role });
    console.log({ Role: user?.role || "No role assigned" }); // Updated console.log

    

    return (
        <div className="relative isolate z-0 w-full min-h-screen  px-6 pt-14 lg:px-8 bg-cover   bg-center "   style={{
            backgroundImage: 'url(/FixmyRidelogo.jpg)',
            
           
        
          }} >
            <div className="flex justify-center items-center w-full h-full pt-20 pb-20">
                {user?.role === 'owner' ? <Owner /> : <Customer />}
            </div>
         
        </div>
    );
};

export default Dashboard;
