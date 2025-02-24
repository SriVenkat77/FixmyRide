import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useServiceStore from '../store/useServiceStore';
import { shallow } from 'zustand/shallow';
import Datepicker from 'react-tailwindcss-datepicker';
import { toast } from 'react-hot-toast';
import useBookingStore from '../store/useBookingStore';
import { startOfDay } from 'date-fns';





const ServiceDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [value, setValue] = useState({ startDate: null, endDate: null });
    const [serviceDetails, setServiceDetails] = useState(null); 

    const [getServiceById] = useServiceStore((state) => [state.getServiceById], shallow);

    const [serviceBooking] = useBookingStore((state) => [state.serviceBooking]);

    useEffect(() => {
        const fetchServiceData = async () => {
            const result = await getServiceById(id);
            console.log(result); // Log the result
            if (result?.service) {
                setServiceDetails(result.service);
            }
        };
        fetchServiceData();
    }, [getServiceById, id]);

    const handleValueChange = (newValue) => {
        setValue(newValue);
    };

    const handleBookNow = async () => {
        if (!value.startDate || !value.endDate) {
            toast.error('Please select a date first');
            return;
        }

        const toastId = toast.loading('Processing booking...'); 
        const result = await serviceBooking(id, value.startDate);
    
        toast.dismiss(toastId); 
    
        if (result?.success) {
            toast.success(result.message || 'Redirecting to Payment');
            const orderData = await createRazorpayOrder(result?.service?.price); 
            openRazorpayPayment(orderData);
        } else {
            toast.error(result?.message || 'Booking failed, please try again.');
        }
    };

    const createRazorpayOrder = async (amount) => {
        try {
            const response = await fetch('https://fixmyride-dpfi.onrender.com/api/v1/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    serviceId: id,
                    date: value.startDate,
                }),
                credentials: 'include', 
            });
            const data = await response.json();
            if (data.success) {
                return data;
            }
            throw new Error('Error creating Razorpay order');
        } catch (error) {
            toast.error('Error initiating payment.');
            console.error(error);
        }
    };

    const openRazorpayPayment = (orderData) => {
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY, 
            amount: orderData.amount,
            currency: orderData.currency,
            order_id: orderData.orderId,
            handler: async (response) => {
                const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
                try {
                    const verificationResponse = await verifyPayment({
                        razorpay_order_id,
                        razorpay_payment_id,
                        razorpay_signature,
                        serviceId: id,
                        date: value.startDate,
                    });
                    if (verificationResponse.success) {
                        toast.success('Payment successful, booking confirmed!');
                        navigate('/dashboard/bookings');
                    } else {
                        toast.error('Payment verification failed.');
                    }
                } catch (error) {
                    toast.error('Error verifying payment.');
                    console.error(error);
                }
            },
            theme: {
                color: '#528FF0',
            },
        };
        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };

    const verifyPayment = async ({ razorpay_order_id, razorpay_payment_id, razorpay_signature, serviceId, date }) => {
        try {
            const response = await fetch('https://fixmyride-dpfi.onrender.com/api/v1/bookings/verify-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    razorpay_order_id,
                    razorpay_payment_id,
                    razorpay_signature,
                    serviceId,
                    date,
                }),

                credentials: 'include',  
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error verifying payment', error);
        }
    };

    const today = startOfDay(new Date());

    return (
        <div
  className="flex flex-col items-center justify-center min-h-screen w-full pt-20 p-6"
  style={{
    backgroundImage: 'url(/FixmyRidelogo.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  {/* Container with two separate boxes */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
    
    {/* Service Details Box */}
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
        Service Details
      </h2>
      <Datepicker
        asSingle={true}
        showFooter={true}
        startFrom={today}
        minDate={today}
        value={value}
        displayFormat={'DD/MM/YYYY'}
        onChange={handleValueChange}
        className="w-full p-2 text-sm md:text-base border rounded-lg focus:ring-2 focus:ring-orange-500"
        popoverDirection="bottom"
      />
      {serviceDetails ? (
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-black mt-4">
            Service: {serviceDetails.name}
          </h3>
          <p className="text-gray-600">Provider: {serviceDetails?.ownerId?.name}</p>
          <p className="text-gray-600">{serviceDetails.description}</p>
          <p className="font-bold text-lg mt-2">
            Price: ₹{serviceDetails?.price || 'N/A'}
          </p>
          <button
            className="mt-4 w-full bg-gray-600 hover:bg-orange-500 text-white py-2 px-4 rounded-lg"
            onClick={handleBookNow}
          >
            Book Now
          </button>
        </div>
      ) : (
        <p className="text-gray-500">Loading service...</p>
      )}
    </div>

    {/* Terms & Conditions Box */}
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-4">
        Terms and Conditions
      </h2>
      <div className="space-y-4 text-sm md:text-md text-gray-700">
        <p>
          1. <strong>Service Availability:</strong> All services are subject to availability. We reserve the right to cancel or reschedule services based on operational requirements.
        </p>
        <p>
          2. <strong>Payment Terms:</strong> Payment for services must be completed prior to the service being rendered. No services will be provided until payment is received in full.
        </p>
        <p>
          3. <strong>Liability Disclaimer:</strong> We are not liable for any damage or loss caused during the service process, except in cases of gross negligence by our technicians.
        </p>
        <p>
          4. <strong>Customer Responsibilities:</strong> The customer is responsible for ensuring the bike is in a safe condition to undergo service and that all required documents (e.g., ownership proof) are available.
        </p>
        <p>
          5. <strong>Refund and Cancellation:</strong> Refund requests or cancellations must be made within 24 hours of booking. After this period, no refund or cancellation will be accepted.
        </p>
      </div>
    </div>
  </div>
</div>

    );
};

export default ServiceDetails;
