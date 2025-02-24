import { create } from 'zustand';
import request from '../utils/axios_request';
import endpoints from '../utils/enpoints';

const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
};

const useAuthStore = create((set) => ({
    ...initialState,

    register: async (name, password, email, mobile, role) => {
        try {
            const { data } = await request.post(endpoints.register, {
                name,
                password,
                email,
                mobile,
                role,
            });
            console.log({ REGISTER_RESPONSE: data });

            if (data.success) {
                set(() => ({
                    user: data?.userObj,
                }));
                return data;
            }
        } catch (error) {
            console.error('Registration failed:', error);
            console.log({ error });
            return error?.response?.data;
        }
    },

    login: async (email, password) => {
        try {
            const { data } = await request.post(endpoints.login, {
                email,
                password,
            });
            console.log({ LOGIN_RESPONSE: data });

            if (data.success) {

                console.log("User from API:", data.user); // Add this line
                set({
                    isAuthenticated: true,
                    user: data?.user,
                });
                return data;
                
            }
        } catch (error) {
            console.error('Login failed:', error);
            console.log({ error });
            return error?.response?.data;
        }
    },

    logout: async () => {
        try {
            const { data } = await request.get(endpoints.logout);
            console.log({ LOGOUT_RESPONSE: data });
    
            if (data.success) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('user');
                sessionStorage.removeItem('authToken');
                set({ isAuthenticated: false, user: null, token: null });
                
                
                return true;
            }
        } catch (error) {
            console.error('Error While Logout', error);
            return false;
        }
    },
    
    

    getProfile: async () => {
        try {
            const { data } = await request.get(endpoints.getProfile);
            console.log({ PROFILE_RESPONSE: data });

            if (data.success) {
                set({
                    isAuthenticated: true,
                    user: data?.user,
                });
                return data;
            }
        } catch (error) {
            console.error('Get Profile failed:', error);
            console.log({ error });
            return error?.response?.data;
        }
    },
}));

export default useAuthStore;
