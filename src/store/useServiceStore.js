import { create } from 'zustand';
import request from '../utils/axios_request';
import endpoints from '../utils/enpoints';

const initialState = {
    services: null,
    searchString: '',
};

const useServiceStore = create((set, get) => ({
    ...initialState,

    getAllServicesForOwner: async () => {
        try {
            const { data } = await request.get(endpoints.getAllServicesForOwner);
            console.log({ GET_ALL_SERVICES_RESPONSE: data });
            if (data.success) {
                set({ services: data?.services });
                return data;
            }
        } catch (error) {
            console.error('Get all services failed:', error);
            return error?.response?.data;
        }
    },

    getAllServicesForCustomer: async () => {
        try {
            const { data } = await request.get(endpoints.getAllServicesForCustomer, {
                withCredentials: true,
            });
            console.log({ GET_ALL_SERVICES_RESPONSE: data });
            if (data.success) {
                set({ services: data?.services });
                return data;
            }
        } catch (error) {
            console.error('Get all services failed:', error);
            return error?.response?.data;
        }
    },

    getServiceById: async (id) => {
        try {
            const { data } = await request.get(`${endpoints.getServiceById}/${id}`);
            console.log({ GET_SERVICE_BY_ID_RESPONSE: data });
            if (data.success) {
                return data;
            }
        } catch (error) {
            console.error('Get service by id failed:', error);
            return error?.response?.data;
        }
    },

    addService: async (name, description, price) => {
        try {
            const { data } = await request.post(endpoints.createService, {
                name,
                description,
                price,
            });
            console.log({ CREATE_ROOM_RESPONSE: data });
            if (data.success) {
                return data;
            }
        } catch (error) {
            console.error('Create Service failed:', error);
            return error?.response?.data;
        }
    },

    updateService: async (name, description, price, id) => {
        try {
            const { data } = await request.patch(`${endpoints.updateServiceById}/${id}`, {
                name,
                description,
                price,
            });
            console.log({ UPDATE_SERVICES_RESPONSE: data });
            if (data.success) {
                const oldServices = get().services || [];
                const newServices = oldServices.map((service) =>
                    service._id === id ? data.service : service
                );
                set({ services: newServices });
                return data;
            }
        } catch (error) {
            console.error('Update Service failed:', error);
            return error?.response?.data;
        }
    },

    deleteService: async (id) => {
        try {
            const { data } = await request.delete(`${endpoints.deleteServiceById}/${id}`);
            console.log({ DELETE_RESPONSE: data });
            if (data.success) {
                let newService = get().services || [];
                newService = newService.filter((service) => service._id !== id);
                set({ services: newService });
                return data;
            }
        } catch (error) {
            console.error('Delete Services failed:', error);
            return error?.response?.data;
        }
    },

    setSearchString: (searchString) => set({ searchString }),
}));

export default useServiceStore;
