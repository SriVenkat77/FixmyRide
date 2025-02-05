const app = require('./app');
const connectDB = require('./helpers/databases');
const PORT = process.env?.PORT || 4000;

// Database connection
connectDB();

const server = app.listen(PORT, () =>
    console.log(
        `\n 🚀 is lunching at http://localhost:${PORT} in ${process.env?.NODE_ENV} mode`
    )
);

// Handle unhandled promise rejections (eg: database connection error ) and uncaught exceptions (eg: syntax error)
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to unhandled rejection error');
    // Stop the server program
    server.close(() => {
        // Stop the node program
        process.exit(1);
    });
});

process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to uncaught exception error');
    server.close(() => {
        process.exit(1);
    });
});
