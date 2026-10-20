const database = require("../db");

async function getReservations() {
  const db = await database;
  const data = await db.all("SELECT * FROM reservations");
  return data;
}

async function getReservation(id) {
  const db = await database;
  const data = await db.get("SELECT * FROM reservations WHERE id=? ", id);
  return data;
}

async function createReservation(
  room_type,
  guest_name,
  guest_email,
  guest_number,
  check_in,
  check_out,
) {
  const db = await database;
  const data = await db.run(
    "INSERT INTO reservations (room_type, guest_name, guest_email, guest_number, check_in, check_out) VALUES (?,?,?,?,?,?) ",
    room_type,
    guest_name,
    guest_email,
    guest_number,
    check_in,
    check_out,
  );
  return data.lastID;
}

async function updateReservation(
  id,
  room_type,
  guest_name,
  guest_email,
  guest_number,
  check_in,
  check_out,
) {
  const db = await database;
  const data = await db.run(
    `UPDATE reservations
     SET room_type = ?, guest_name = ?, guest_email = ?, guest_number=?, check_in = ?, check_out = ?
     WHERE id = ?`,
    room_type,
    guest_name,
    guest_email,
    guest_number,
    check_in,
    check_out,
    id,
  );
  return data.changes;
}

async function deleteReservation(id) {
  const db = await database;
  const data = await db.run("DELETE FROM reservations WHERE id=?", id);
  return data.changes;
}

module.exports = {
  getReservations,
  getReservation,
  createReservation,
  updateReservation,
  deleteReservation,
};
