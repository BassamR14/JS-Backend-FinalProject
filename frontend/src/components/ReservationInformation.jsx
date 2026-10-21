export default function ReservationInformation({ info }) {
  return (
    <div className="reservation-info">
      <h2>Your room has been booked.</h2>

      <dl>
        <dt>Booking number</dt>
        <dd>{info.id}</dd>

        <dt>Room type</dt>
        <dd>{info.room_type}</dd>

        <dt>Name</dt>
        <dd>{info.guest_name}</dd>

        <dt>Email</dt>
        <dd>{info.guest_email}</dd>

        <dt>Mobile</dt>
        <dd>{info.guest_number}</dd>

        <dt>Check-in</dt>
        <dd>{info.check_in}</dd>

        <dt>Check-out</dt>
        <dd>{info.check_out}</dd>
      </dl>
    </div>
  );
}
