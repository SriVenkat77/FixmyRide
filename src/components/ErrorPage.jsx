import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError(); 

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
    <h1 className="text-3xl font-bold text-red-600">Oops! Something went wrong 😔</h1>
    <p className="mt-4 text-lg">
        <strong>
            Error: {error?.statusText || "Unknown Error"} {error?.status && `(${error.status})`}
        </strong>
    </p>
    <p className="mt-6 text-md text-gray-600">
        We're sorry, but it seems something went wrong on our end. Please try again later or contact support if the issue persists.
    </p>
    <p className="mt-6">
        <Link to="/" className="text-blue-600 underline text-lg">
            Go to Homepage
        </Link>
    </p>
    <p className="mt-2 text-sm text-gray-500">
        If you need assistance, feel free to reach out to our customer support team.
    </p>
</div>

    );
};

export default ErrorPage;
