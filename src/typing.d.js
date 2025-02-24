/**
 * @typedef {Object} SignUp
 * @property {string} name
 * @property {string} email
 * @property {string} mobile
 * @property {string} password
 * @property {string} role
 */

/**
 * @typedef {Object} LogIn
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} InputTypes
 * @property {string} id
 * @property {string} label
 * @property {string} type
 */

/**
 * @typedef {Object} User
 * @property {string} _id
 * @property {string} name
 * @property {string} email
 * @property {string} mobile
 * @property {string} role
 */

/**
 * @typedef {Object} AuthStore
 * @property {boolean} isAuthenticated
 * @property {User | null} user
 * @property {User[] | null} users
 */

/**
 * @typedef {Object} Response
 * @property {boolean} success
 * @property {string} [message]
 * @property {User} [user]
 * @property {string} [token]
 * @property {Service} [service]
 * @property {Service[]} [services]
 * @property {Booking} [booking]
 * @property {Booking[]} [bookings]
 */

/**
 * @typedef {Object} Booking
 * @property {string} _id
 * @property {Object} customer
 * @property {string} customer._id
 * @property {string} customer.name
 * @property {string} customer.email
 * @property {string} customer.mobile
 * @property {Object} service
 * @property {string} service._id
 * @property {string} service.ownerId
 * @property {string} service.name
 * @property {Date} date
 * @property {string} status
 */

/**
 * @typedef {Object} ServiceStore
 * @property {Service[] | null} services
 * @property {string} searchString
 */

/**
 * @typedef {Object} BookingStore
 * @property {Booking[] | null} bookings
 */

/**
 * @typedef {Object} Service
 * @property {string} _id
 * @property {Object} ownerId
 * @property {string} ownerId._id
 * @property {string} ownerId.name
 * @property {string} name
 * @property {string} description
 * @property {string | number} price
 */

/**
 * @typedef {Object} AddService
 * @property {string} name
 * @property {string} description
 * @property {string | number} price
 */
