import { useEffect, useState } from "react";
import { fetchData } from "../lib/api";
import Navigation from "../components/Navigation";
import TableRow from "../components/TableRow";
import Modal from "../components/Modal";
import ReservationForm from "../components/ReservationForm";

export default function Admin() {
  const [bookings, setBookings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editBooking, setEditBooking] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchData("reservations");
        setBookings(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  async function updateReservation(
    id,
    roomType,
    guestName,
    guestEmail,
    guestNumber,
    checkInDate,
    checkOutDate,
  ) {
    const updated = {
      room_type: roomType,
      guest_name: guestName,
      guest_email: guestEmail,
      guest_number: guestNumber,
      check_in: checkInDate,
      check_out: checkOutDate,
    };
    try {
      setError("");
      await fetchData(`reservations/${id}`, "PUT", updated);
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, ...updated } : b)),
      );
      setEditBooking(null);
    } catch (error) {
      setError(error.message);
    }
  }

  async function deleteReservation(id) {
    if (!window.confirm("Delete this booking?")) return;

    try {
      setError("");
      await fetchData(`reservations/${id}`, "DELETE");
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <Navigation />

      <main className="admin">
        {loading && <p>Loading...</p>}
        {error && <p>Could not get reservation information: {error} </p>}

        <div className="table-wrapper">
          <table className="reservations-table">
            <thead>
              <tr>
                <th>Room Type</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Check-in Date</th>
                <th>Check-out Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookings &&
                bookings.map((booking) => (
                  <TableRow
                    key={booking.id}
                    room={booking.room_type}
                    name={booking.guest_name}
                    email={booking.guest_email}
                    mobile={booking.guest_number}
                    checkIn={booking.check_in}
                    checkOut={booking.check_out}
                    updateBooking={() => {
                      setError("");
                      setEditBooking(booking);
                    }}
                    deleteBooking={() => {
                      deleteReservation(booking.id);
                    }}
                  />
                ))}
            </tbody>
          </table>
        </div>

        {editBooking && (
          <Modal onClose={() => setEditBooking(null)}>
            <h2>Edit reservation</h2>
            {error && <p>{error}</p>}
            <ReservationForm
              key={editBooking.id}
              initialValues={{
                roomType: editBooking.room_type,
                guestName: editBooking.guest_name,
                guestEmail: editBooking.guest_email,
                guestNumber: editBooking.guest_number,
                checkInDate: editBooking.check_in,
                checkOutDate: editBooking.check_out,
              }}
              submitLabel="Save changes"
              onCancel={() => setEditBooking(null)}
              onSubmitReservation={(...values) =>
                updateReservation(editBooking.id, ...values)
              }
            />
          </Modal>
        )}
      </main>
    </>
  );
}
