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
  res.status(200).send("Server is Running");
});

app.get("/reservations", async (req, res) => {
  try {
    const data = await getReservations();
    res.status(200).json(data);
  } catch (error) {
    console.log(`Something went wrong: ${error}`);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
});

app.get("/reservations/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = await getReservation(id);
    res.status(200).json(data);
  } catch (error) {
    console.log(`Something went wrong: ${error}`);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
});

app.post("/reservations", async (req, res) => {
  const {
    room_type,
    guest_name,
    guest_email,
    guest_number,
    check_in,
    check_out,
  } = req.body;
  try {
    const data = await createReservation(
      room_type,
      guest_name,
      guest_email,
      guest_number,
      check_in,
      check_out,
    );
    res
      .status(200)
      .json({ id: data, data: ` New Reservation created with id: ${data}` });
  } catch (error) {
    console.log(`Something went wrong: ${error}`);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
});

app.put("/reservations/:id", async (req, res) => {
  const id = Number(req.params.id);
  const {
    room_type,
    guest_name,
    guest_email,
    guest_number,
    check_in,
    check_out,
  } = req.body;
  try {
    const changes = await updateReservation(
      id,
      room_type,
      guest_name,
      guest_email,
      guest_number,
      check_in,
      check_out,
    );

    changes
      ? res.status(200).json({ message: `Reservation ${id} has been updated` })
      : res
          .status(200)
          .json({ message: `Reservation ${id} has not been updated` });
  } catch (error) {
    console.log(`Something went wrong: ${error}`);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
});

app.delete("/reservations/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const changes = await deleteReservation(id);

    changes
      ? res.status(200).json({ message: `Reservation ${id} has been deleted` })
      : res
          .status(200)
          .json({ message: `Reservation ${id} has not been deleted` });
  } catch (error) {
    console.log(`Something went wrong: ${error}`);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
});

app.listen(5000, (req, res) => {
  console.log(`port: http://localhost:5000`);
});
