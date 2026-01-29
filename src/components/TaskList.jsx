import TaskCard from './TaskCard'
import {useContext} from 'react'
import { TaskContext } from '../context/TaskContext'

function TaskList() {
  
  const {tasks} = useContext(TaskContext);

  if (tasks.length === 0) {
    return <h1
    className='flex text-3xl font-bold justify-center items-center'>No hay tareas aún</h1>;
  }

  return (
    <div className='grid grid-cols-3 gap-2'>
      {tasks.map((task) => (
        <TaskCard key= {task.id} task={task}/>
      ))}
    </div>
  );
}

export default TaskList;
