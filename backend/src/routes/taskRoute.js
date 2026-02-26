import express from 'express';
import { createTask, deleteTask, getALlTasks, getTaskById, updateTask } from '../controller/taskController.js';

const router = express.Router();
router.get("/", getALlTasks);

router.post("/", createTask);

router.get("/:id", getTaskById);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

export default router;
