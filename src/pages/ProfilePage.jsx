import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const ProfilePage = () => {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);

    // Conditional profile image based on the user's role
    const profileImage = user?.role === 'owner' 
        ? 'owner.jpeg'  
        : 'download.jpeg';  

    return (
        <div className="w-full min-h-screen mx-auto pt-20 p-4 items-center"  style={{
            backgroundImage: 'url(/FixmyRidelogo.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            {/* Profile Header */}
            <div className="bg-white w-full sm:w-4/5 lg:max-w-4xl p-6 rounded-lg shadow-lg mx-auto">

                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
                    <img
                        src={profileImage} // Using conditional profile image
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-4 border-gray-300 object-cover"
                    />
                    <div className="text-center sm:text-left">
                        <h3 className="text-xl font-semibold text-gray-800">{user?.name}</h3>
                        <p className="text-gray-600">Email : {user?.email}</p>
                        <p className="text-gray-600">Mobile : {user?.mobile}</p>
                        <p className="text-gray-600"> {user?.role === 'owner' ? 'Service Provider' : 'Service Customer'}</p>
                    </div>
                </div>
            </div>

            {/* Terms and Conditions */}
            <div className="mt-8 bg-white w-full sm:w-4/5 lg:max-w-4xl p-6 rounded-lg shadow-lg mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Terms & Conditions</h2>
                {user?.role === 'customer' ? (
                    <div className="space-y-4">
                        <p className="text-gray-700">
                            <strong>1. Service Availability:</strong> Services are only available in select regions. Please ensure the service is available in your area before booking.
                        </p>
                        <p className="text-gray-700">
                            <strong>2. Payment Terms:</strong> Payment for services must be completed prior to the scheduled service date. Refunds are not available after payment.
                        </p>
                        <p className="text-gray-700">
                            <strong>3. Service Satisfaction:</strong> If you are not satisfied with the service provided, you must notify us within 48 hours for resolution.
                        </p>
                        <p className="text-gray-700">
                            <strong>4. Data Privacy:</strong> Your personal information will be kept confidential and will only be used for service-related purposes.
                        </p>
                        <p className="text-gray-700">
                            <strong>5. Service Limitations:</strong> We are not responsible for any damages caused to the bike that occurs after the service has been completed and payment has been made.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-gray-700">
                            <strong>1. Service Providers:</strong> You are responsible for ensuring that your services meet the quality standards set by our platform.
                        </p>
                        <p className="text-gray-700">
                            <strong>2. Payment Processing:</strong> Payments for services will be processed through our platform. Any delays or issues in payment processing are not our responsibility.
                        </p>
                        <p className="text-gray-700">
                            <strong>3. Service Delivery:</strong> You must ensure that the service is provided in a timely and professional manner as per the agreement.
                        </p>
                        <p className="text-gray-700">
                            <strong>4. Cancellation Policy:</strong> You may cancel a service, but refunds are subject to our cancellation policy, which should be outlined before service booking.
                        </p>
                        <p className="text-gray-700">
                            <strong>5. Customer Feedback:</strong> You agree to provide a space for customer feedback to maintain transparency and service improvement.
                        </p>
                    </div>
                )}
            </div>

            
        </div>
    );
};

export default ProfilePage;
