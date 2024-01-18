import express from "express";
import { bookVisit, cancelBooking, createUser, getAllBookings } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/bookVisit/:id", bookVisit);
router.get("/getAllBookings", getAllBookings);
router.post("/cancelBooking/:id", cancelBooking);

export { router as userRoute };
