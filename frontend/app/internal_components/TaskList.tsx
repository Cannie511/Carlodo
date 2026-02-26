import React from 'react'
import TaskEmptyStates from './TaskEmptyStates';
import TaskCard from './TaskCard';

interface TaskListProps {
    filterTask?: any[];
    handleTaskChanged: () => void;
}
const TaskList = ({filterTask, handleTaskChanged}:TaskListProps) => {
    let filter = 'all';
    
    if(!filterTask || filterTask.length === 0) {
        return <TaskEmptyStates filter={filter} />;
    }
    return (
        <div className='space-y-3'>
            {filterTask.map((task, index) => (
                <TaskCard key={task._id || index} task={task} index={index} handleTaskChanged={handleTaskChanged}/>
            ))}

        </div>
    )
}

export default TaskList