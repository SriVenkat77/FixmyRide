import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const Home = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div
  className="relative isolate z-0 w-full min-h-screen  px-6 pt-14 lg:px-8 bg-cover   bg-center"
  style={{
    backgroundImage: 'url(/FixmyRidelogo.jpg)',
   
  }}
>
            <div className='relative mx-auto max-w-2xl py-24'>
                
                <div className='text-center'>
                   
                    <p className='mt-6 text-md sm:text-xl leading-8 text-white'>
                        Riding a bike is not just a journey; it's a way of life,
                        where the road becomes your canvas and the wind whispers
                        your dreams. Embrace the freedom of two wheels, and
                        you'll find a world of endless adventures and
                        unforgettable memories.
                    </p>
                    <div className='mt-10 flex items-center justify-center gap-x-2'>
                    <button
    type='button'
    className='rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
    onClick={() => navigate('/login')}
>
    Explore Now
</button>

                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
