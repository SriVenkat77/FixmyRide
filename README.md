# FixMyRide: Bike Service Web Application

## Deployed Demo
- **Frontend**: [https://fixmyridea.netlify.app/](https://fixmyridea.netlify.app/)
- **Backend**: [https://fixmyride-dpfi.onrender.com](https://fixmyride-dpfi.onrender.com)

## Introduction: High-Level Overview
FixMyRide is a bike service web application that connects customers with service providers for seamless bike maintenance and repairs. The platform supports user authentication, service booking, real-time status updates, online payments via Razorpay, and automated booking confirmation emails using Nodemailer.

## Tech Stack
- **Frontend**: React, Vite, TailwindCSS
- **State Management**: Zustand
- **Backend**: Node.js, Express.js, MongoDB
- **Validation**: Joi Schema
- **Authentication**: JWT-based authentication
- **Real-Time Updates**: Socket.io
- **Notifications**: React Toast
- **Payment Integration**: Razorpay
- **Email Notifications**: Nodemailer

## Detailed Feature Walkthrough

### 1. User Authentication
- **Description**: Secure authentication for both customers and service providers.
- **Implementation**:
  - JWT-based authentication for secure login and session management.
  - Users and service providers register separately with role-based access.
  - Secure password hashing and authentication.

### 2. Customer Features
- **Booking Services**: Customers can book bike services from available providers.
- **Payment Integration**: Razorpay for secure payments.
- **Real-Time Updates**: Live status updates on service progress.
- **Email Notifications**: Customers receive booking confirmation emails via Nodemailer.

### 3. Service Provider Features
- **Post Services**: Providers can list their services with pricing and availability.
- **Edit & Delete Services**: Modify service details as needed.
- **Booking Management**: View and update booking statuses in real-time.

## Technical Details
### Repository Structure
- **Frontend**: Contains React components, Zustand state management, and TailwindCSS styling.
- **Backend**: Contains Express routes, controllers for authentication, service management, payments, and email notifications.


## Acknowledgments
- **Razorpay** for payment processing.
- **TailwindCSS** for styling.
- **MongoDB, Express, React, and Node.js** for building a robust platform.
- **Socket.io** for real-time updates.
- **Nodemailer** for automated booking confirmation emails.



