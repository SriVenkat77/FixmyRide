# Todo

## Routes

### Bike Station owner

- [x] POST      /service            -   Create Service
- [x] EDIT      /service/:id        -   Edit Service
- [x] DELETE    /service/:id        -   Delete Service
- [x] GET       /service/booked     -   Get all booking details by ownerID
- [x] GET       /service/booked/:id -   Get Specifics booking details

### Customer

- [ ] POST      /booking            -   Create Booking with Date
- [ ] GET       /booking            -   Get all booked history
- [ ] 



### Mock Data

```json

{
    "services": [
        {
            "name": "General Service Check-Up",
            "description": "Comprehensive check-up of the bike to ensure it's in good working condition.",
            "price": 30.0
        },
        {
            "name": "Oil Change",
            "description": "Changing the bike's oil to maintain proper lubrication in the engine.",
            "price": 20.0
        },
        {
            "name": "Water Wash",
            "description": "Thorough cleaning of the bike using water and mild detergent.",
            "price": 15.0
        },
        {
            "name": "Brake Adjustment",
            "description": "Fine-tuning the brake system for optimal performance and safety.",
            "price": 25.0
        },
        {
            "name": "Gear Adjustment",
            "description": "Adjusting the bike's gears for smooth shifting and efficient pedaling.",
            "price": 20.0
        },
        {
            "name": "Tire Replacement",
            "description": "Installing new tires on the bike for improved traction and ride quality.",
            "price": 40.0
        },
        {
            "name": "Chain Lubrication",
            "description": "Applying lubricant to the bike's chain to reduce friction and prevent rust.",
            "price": 10.0
        },
        {
            "name": "Wheel Truing",
            "description": "Straightening and balancing the bike's wheels for a smoother ride.",
            "price": 30.0
        },
        {
            "name": "Full Tune-Up",
            "description": "Comprehensive service that includes checking and adjusting various components of the bike.",
            "price": 70.0
        },
        {
            "name": "Suspension Service",
            "description": "Inspecting and maintaining the bike's suspension system for optimal performance.",
            "price": 50.0
        }
    ]
}


```