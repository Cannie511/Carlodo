import Task from "../models/Task.js";
export const getALlTasks = async (req, res) => {
    const { filter = 'today' } = req.query;
    const now = new Date();
    let startDate;
    switch (filter) {
        case 'today':
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            break;
        case 'week':
            const mondayDate = now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0);// 
            startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
            break;
        case 'month':
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
        case 'all':
        default:
            startDate = null;
    }
    const query = startDate ? { createdAt: { $gte: startDate } } : {};
    try {
        const result = await Task.aggregate([
            {
                $match: query
            },
            {
                $facet: {
                    tasks:[{$sort: { createdAt: -1 }}],
                    activeCount: [{$match: {status: "active"}}, {$count: "count"}],
                    completeCount: [{$match: {status: "complete"}}, {$count: "count"}]
                }
            }
        ]);
        const tasks = result[0].tasks;
        const activeCount = result[0].activeCount[0]?.count || 0;
        const completeCount = result[0].completeCount[0]?.count || 0;
        res.status(200).json({
            message: "Get all tasks",
            tasks,
            activeCount,
            completeCount
        });
    } catch (error) {
        console.log("Error: ",error);
        res.status(500).send({
            message: "(getAllTasks) System error!"
        });
    }
   
}

export const getTaskById = (req, res) => {
    const { id } = req.params;
    res.status(200).json({
        message: `Get task with id ${id}`
    });
}

export const createTask = async (req, res) => {
    try {
        const {title} = req.body;
        const task = new Task({
           title
        });
        const newTask =await task.save();
        res.status(201).json({
            message: "Create a new task",
            task
        });
    } catch (error) {
        console.log("Error: ",error);
        res.status(500).send({
            message: "(createTask) System error!"
        });
    }
}

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, status, completeAt } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(id, {title, status, completeAt}, { new: true });
        if(!updatedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }
        res.status(200).json({
            message: `Update task with id ${id}`
        });
    } catch (error) {
        console.log("Error: ",error);
        res.status(500).send({
            message: "(updateTask) System error!"
        });
    }
    
};

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }
        res.status(200).json({
            message: `Delete task with id ${id}`,
            deletedTask
        });
    } catch (error) {
        console.log("Error: ",error);
        res.status(500).send({
            message: "(deleteTask) System error!"
        });
    }
}