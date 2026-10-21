import { useState } from "react";

export default function ReservationForm({
  onSubmitReservation,
  initialValues = {},
  submitLabel = "Book a Room",
  onCancel,
}) {
  const [roomType, setRoomType] = useState(initialValues.roomType ?? "");
  const [guestName, setGuestName] = useState(initialValues.guestName ?? "");
  const [guestEmail, setGuestEmail] = useState(initialValues.guestEmail ?? "");
  const [guestNumber, setGuestNumber] = useState(
    initialValues.guestNumber ?? "",
  );
  const [checkInDate, setCheckInDate] = useState(
    initialValues.checkInDate ?? "",
  );
  const [checkOutDate, setCheckOutDate] = useState(
    initialValues.checkOutDate ?? "",
  );

  function handleSubmit(e) {
    e.preventDefault();
    const trimmedName = guestName.trim();
    const trimmedEmail = guestEmail.trim();
    const trimmedNumber = guestNumber.trim();

    onSubmitReservation(
      roomType,
      trimmedName,
      trimmedEmail,
      trimmedNumber,
      checkInDate,
      checkOutDate,
    );
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <div>
      <form className="reservation-form" onSubmit={handleSubmit}>
        <fieldset className="room-type">
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

        <div className="form-fields">
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
            Mobile Number:
            <input
              type="tel"
              placeholder="Enter Your Mobile Number"
              value={guestNumber}
              onChange={(e) => setGuestNumber(e.target.value)}
              autoComplete="tel"
              pattern="[0-9+\s\-]{7,15}"
              title="Enter a valid phone number: 7-15 characters: digits, spaces, + and -"
              required
            />
          </label>
        </div>

        <div className="form-dates">
          {" "}
          <label>
            Check-in Date:
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              min={initialValues.checkInDate ? undefined : today}
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
        </div>

        <div className="form-actions">
          <button type="submit">{submitLabel}</button>
          {onCancel && (
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
