const express = require("express");
const cors = require("cors");
const {
  getReservations,
  getReservation,
  createReservation,
  updateReservation,
  deleteReservation,
} = require("./dao/reservationsDao");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is Running");
});

app.get("/reservations", async (req, res) => {
  try {
    const data = await getReservations();
    res.json(data);
  } catch (error) {
    console.log(`Something went wrong: ${error}`);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.get("/reservations/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = await getReservation(id);
    res.json(data);
  } catch (error) {
    console.log(`Something went wrong: ${error}`);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.post("/reservations", async (req, res) => {
  const { room_type, guest_name, guest_email, check_in, check_out } = req.body;
  try {
    const data = await createReservation(
      room_type,
      guest_name,
      guest_email,
      check_in,
      check_out,
    );
    res.json({ data: ` New Reservation created with id: ${data}` });
  } catch (error) {
    console.log(`Something went wrong: ${error}`);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.put("/reservations/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { room_type, guest_name, guest_email, check_in, check_out } = req.body;
  try {
    const changes = await updateReservation(
      id,
      room_type,
      guest_name,
      guest_email,
      check_in,
      check_out,
    );

    changes
      ? res.json({ message: `Reservation ${id} has been updated` })
      : res.json({ message: `Reservation ${id} has not been updated` });
  } catch (error) {
    console.log(`Something went wrong: ${error}`);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.delete("/reservations/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const changes = await deleteReservation(id);

    changes
      ? res.json({ message: `Reservation ${id} has been deleted` })
      : res.json({ message: `Reservation ${id} has not been deleted` });
  } catch (error) {
    console.log(`Something went wrong: ${error}`);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.listen(5000, (req, res) => {
  console.log(`port: http://localhost:5000`);
});
