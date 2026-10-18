import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../lib/api";
import ReservationInformation from "../components/ReservationInformation";
import { Navigation } from "../components/Navigation";

export default function Confirmation() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getBooking() {
      try {
        const res = await fetchData(`reservations/${id}`);
        setBooking(res);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    getBooking();
  }, [id]);

  return (
    <>
      <header>
        <Navigation />
      </header>

      <main>
        {loading && <p>Loading...</p>}
        {error && <p>Could not get reservation information: {error} </p>}
        {booking && <ReservationInformation info={booking} />}
      </main>
    </>
  );
}
