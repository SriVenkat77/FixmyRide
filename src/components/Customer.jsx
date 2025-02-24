import { useEffect } from 'react';
import ServiceCard from './ServiceCard';
import { shallow } from 'zustand/shallow';
import useServiceStore from '../store/useServiceStore';

const Customer = () => {
    const [getAllServicesForCustomer, services, searchString] = useServiceStore(
        (state) => [
            state.getAllServicesForCustomer,
            state.services,
            state.searchString,
        ],
        shallow
    );

    useEffect(() => {
        getAllServicesForCustomer();
    }, [getAllServicesForCustomer]);

    console.log({ searchString });

    return (
        <div className="w-full flex items-center justify-around flex-wrap space-x-3 space-y-3">
            {services?.length > 0 ? (
                services
                    .filter((service) =>
                        searchString
                            ? service?.name?.toLowerCase().includes(searchString.toLowerCase())
                            : true
                    )
                    .map((service) => (
                        <ServiceCard service={service} key={service._id} />
                    ))
            ) : (
                <div className="text-center text-white p-10">
                    <p className="text-lg font-bold">Whoops! No Service available</p>
                <p className="text-sm text-white">
                    It seems like we don't have any services available right now. 
                    Please check back later or contact support for more information.
                </p>
                </div>
            )}
        </div>
    );
};

export default Customer;
