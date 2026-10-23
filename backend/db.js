const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

async function connectDatabase() {
  try {
    const database = await open({
      filename: "./hotel.db",
      driver: sqlite3.Database,
    });

    await database.exec(`
  CREATE TABLE IF NOT EXISTS reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    room_type TEXT NOT NULL CHECK (room_type IN ('single', 'double')),
    guest_name TEXT NOT NULL CHECK (length(trim(guest_name)) > 0),
    guest_email TEXT NOT NULL CHECK (guest_email LIKE '%_@_%._%'),
    guest_number TEXT NOT NULL CHECK (length(guest_number) >= 7),
    check_in TEXT NOT NULL CHECK (date(check_in) IS check_in),
    check_out TEXT NOT NULL CHECK (date(check_out) IS check_out),
    CHECK (check_out > check_in)
  )
`);

    console.log("Connected to Database");

    return database;
  } catch (err) {
    console.error("Error with connection or creation of table:", err.message);

    throw err;
  }
}

module.exports = connectDatabase();
