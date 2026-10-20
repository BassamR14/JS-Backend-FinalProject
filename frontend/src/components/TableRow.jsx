export default function TableRow({
  room,
  name,
  email,
  mobile,
  checkIn,
  checkOut,
  updateBooking,
  deleteBooking,
}) {
  return (
    <tr>
      <td> {room} </td>
      <td> {name} </td>
      <td> {email} </td>
      <td> {mobile} </td>
      <td> {checkIn} </td>
      <td> {checkOut} </td>
      <td>
        <button onClick={updateBooking}>Update</button>
        <button onClick={deleteBooking}>Delete</button>
      </td>
    </tr>
  );
}
