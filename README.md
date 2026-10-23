# The Crooked Raven

A hotel booking app. Guests can book a single or double room, and an admin page lets staff view, update and delete reservations.

## Tech stack

- **Frontend:** React, React Router (Vite)
- **Backend:** Node.js, Express
- **Database:** SQLite (`hotel.db`, created automatically on first start)
- **Pattern:** DAO (Data Access Object) for all database access

## Features

- Booking form with room type (Single/Double), guest name, email, mobile number, check-in and check-out dates
- Check-out date cannot be earlier than the check-in date (validated in the form and in the database)
- Confirmation page showing the booking after it is created
- Admin page listing all reservations, with the ability to edit and delete them
- All SQL lives in `backend/dao/reservationsDao.js`; the routes in `server.js` only call the DAO

## Running locally

You need **two terminals**, one for the backend and one for the frontend.

### Terminal 1: Backend

```bash
cd backend
npm install
node server.js
```

The API runs on http://localhost:5000. The SQLite database and `reservations` table are created automatically.

### Terminal 2: Frontend

```bash
cd frontend
npm install
npm run dev
```

Open the URL Vite prints in the terminal (usually http://localhost:5173).

## Pages

| Route               | Description                              |
| ------------------- | ---------------------------------------- |
| `/`                 | Home page with the booking form          |
| `/about`            | Placeholder page (under construction)    |
| `/confirmation/:id` | Confirmation of a created booking        |
| `/admin`            | Admin page (not linked from the site)    |

The admin page is intentionally not linked from the navigation. Visit it directly by typing the URL.

## API endpoints

Base URL: `http://localhost:5000`

| Method | Endpoint            | Description                |
| ------ | ------------------- | -------------------------- |
| GET    | `/reservations`     | List all reservations      |
| GET    | `/reservations/:id` | Get a single reservation   |
| POST   | `/reservations`     | Create a reservation       |
| PUT    | `/reservations/:id` | Update a reservation       |
| DELETE | `/reservations/:id` | Delete a reservation       |

Example request body for POST/PUT:

```json
{
  "room_type": "double",
  "guest_name": "Jane Doe",
  "guest_email": "jane@example.com",
  "guest_number": "+46 70 123 4567",
  "check_in": "2026-11-01",
  "check_out": "2026-11-05"
}
```

These endpoints can also be tested with Postman.

## Project structure

```
.
├── backend/
│   ├── server.js             # Express server and routes
│   ├── db.js                 # SQLite connection and table creation
│   └── dao/
│       └── reservationsDao.js  # DAO: all database access
└── frontend/
    └── src/
        ├── App.jsx           # Routes
        ├── pages/            # Home, About, Admin, Confirmation
        ├── components/       # Navigation, Modal, ReservationForm,
        │                     # ReservationInformation, TableRow
        └── lib/api.js        # fetch helper for the backend
```

## Possible improvements

- **Room prices:** set a price per night for each room type and calculate the total price from the number of nights a guest stays
- **Authentication:** login for users and admins, with the admin page accessible to admins only
- **Backend validation:** validate and sanitize request bodies on the server, not just in the form and database constraints
- **Availability checks:** prevent double bookings of the same room for overlapping dates
- **Room inventory:** track the number of rooms per type and show available rooms
- **Proper HTTP status codes:** return 201 for creates, 404 for missing reservations and 400 for invalid input
- **Booking emails:** send a confirmation email to the guest
- **Admin features:** search, filtering and sorting of reservations
- **Environment config:** move the API URL and port into environment variables
- **Tests:** unit tests for the DAO and API, and component tests for the frontend
