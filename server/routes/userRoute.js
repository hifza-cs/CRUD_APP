import express from "express";
const router = express.Router();
import { createUser, getAll, getOne,update, deleteUser} from "../controller/userController.js"; // Including .js extension is necessary

router.post("/create", createUser);
router.get("/getall", getAll);
router.get("/getone/:id", getOne);
router.put("/update/:id", update);
router.delete("/delete/:id", deleteUser);



export default router;
