import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import useAuthStore from './store/useAuthStore';
import { useEffect } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

const App = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const getProfile = useAuthStore((state) => state.getProfile);

    console.log({ isAuthenticated });

    useEffect(() => {
        getProfile();
    }, []);

    return <RouterProvider router={router} />;
};

export default App;
