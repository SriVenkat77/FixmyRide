import { Toaster } from 'react-hot-toast';
import { Navbar } from '../components/Navbar';

const BaseLayout = ({ children }) => {
    return (
        <div className="h-screen flex flex-col">
            <Navbar />
            <main className="flex flex-1 justify-center bg-black items-center pt-15 ">
                {children}
            </main>
            <footer className="fixed bottom-0 w-full text-white py-1 text-center hidden sm:block" style={{ backgroundColor: '#545454' }}>
                <p className="text-sm">&copy; {new Date().getFullYear()} FixMyRide. All rights reserved.</p>
            </footer>
            <Toaster />
        </div>
    );
};

export default BaseLayout;
