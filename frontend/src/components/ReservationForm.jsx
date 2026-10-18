import { useState } from "react";

export default function ReservationForm({ onSubmitReservation }) {
  const [roomType, setRoomType] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmedName = guestName.trim();
    const trimmedEmail = guestEmail.trim();

    onSubmitReservation(
      roomType,
      trimmedName,
      trimmedEmail,
      checkInDate,
      checkOutDate,
    );
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Room Type</legend>
          <label>
            <input
              type="radio"
              name="roomType"
              value="single"
              onChange={(e) => setRoomType(e.target.value)}
              checked={roomType === "single"}
              required
            />
            Single
          </label>

          <label>
            <input
              type="radio"
              name="roomType"
              value="double"
              onChange={(e) => setRoomType(e.target.value)}
              checked={roomType === "double"}
              required
            />
            Double
          </label>
        </fieldset>

        <label>
          Name:
          <input
            type="text"
            placeholder="Enter Your Name"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            placeholder="Enter Your Email"
            value={guestEmail}
            onChange={(e) => setGuestEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Check-in Date:
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            min={today}
            required
          />
        </label>

        <label>
          Check-out Date:
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            min={checkInDate}
            required
          />
        </label>

        <button type="submit">Book a Room</button>
      </form>
    </div>
  );
}
