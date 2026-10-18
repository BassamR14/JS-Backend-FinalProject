import { useState } from "react";
import Navigation from "../components/Navigation";
import ReservationForm from "../components/ReservationForm";
import { fetchData } from "../lib/api";

export default function Home() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function createBooking(
    roomType,
    guestName,
    guestEmail,
    checkInDate,
    checkOutDate,
  ) {
    setError("");
    setMessage("");

    try {
      await fetchData("reservations", "POST", {
        room_type: roomType,
        guest_name: guestName,
        guest_email: guestEmail,
        check_in: checkInDate,
        check_out: checkOutDate,
      });

      setMessage("Your room has been booked.");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <header>
        <Navigation />
      </header>

      <main>
        <div>
          <ReservationForm onSubmitReservation={createBooking} />
          {error && <p>Something went wrong : {error}</p>}
          {message && <p>{message}</p>}
        </div>
      </main>
    </>
  );
}
