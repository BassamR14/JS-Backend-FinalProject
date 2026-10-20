export default function ReservationInformation({ info }) {
  return (
    <div>
      <h2>Your room has been booked.</h2>
      <p>Room type: {info.room_type} </p>
      <section>
        <p>Name: {info.guest_name} </p>
        <p> Email: {info.guest_email} </p>
        <p>Mobile: {info.guest_number} </p>
      </section>
      <section>
        <p>Check-in Date: {info.check_in} </p>
        <p>Check-out Date: {info.check_out} </p>
      </section>
    </div>
  );
}
