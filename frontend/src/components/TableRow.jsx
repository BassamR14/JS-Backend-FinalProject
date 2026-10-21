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
        <div className="row-actions">
          <button onClick={updateBooking}>Update</button>
          <button className="danger" onClick={deleteBooking}>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
