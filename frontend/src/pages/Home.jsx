import { useState } from "react";
import Navigation from "../components/Navigation";
import ReservationForm from "../components/ReservationForm";
import { fetchData } from "../lib/api";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function createBooking(
    roomType,
    guestName,
    guestEmail,
    guestNumber,
    checkInDate,
    checkOutDate,
  ) {
    setError("");
    setMessage("");

    try {
      const res = await fetchData("reservations", "POST", {
        room_type: roomType,
        guest_name: guestName,
        guest_email: guestEmail,
        guest_number: guestNumber,
        check_in: checkInDate,
        check_out: checkOutDate,
      });

      setMessage("Your room has been booked.");

      navigate(`/confirmation/${res.id}`);
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
