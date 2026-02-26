'use client'
import { Button } from '@/components/ui/button'
import Header from './Header'
import AddTask from './AddTask'
import StatsAndFilter from './StatsAndFilter'
import TaskList from './TaskList'
import TaskListPagination from './TaskListPagination'
import DateTimeFilter from './DateTimeFilter'
import Footer from './Footer'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { api } from '@/lib/axios'
import { visibleTaskLimit } from '@/lib/data'
const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState<any[]>([]);
  const [activeTasksCount, setActiveTasksCount] = useState(0);
  const [completeTasksCount, setCompleteTasksCount] = useState(0);
  const [filter, setFilter] = useState<"all" | "active" | "complete">("all");
  const [dateQuery, setDateQuery] = useState<string>('today');
  const [page, setPage] = useState(1);
  const fetchTasks = async () => {
    try{
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      setTaskBuffer(res.data.tasks);
      setActiveTasksCount(res.data.activeCount);
      setCompleteTasksCount(res.data.completeCount);
      console.log('Fetched tasks:', res.data.tasks);
    }catch(err){
      console.error('Error fetching tasks:', err);
      toast.error("Lỗi xảy ra khi truy xuất dữ liệu task");
    }
  }
  useEffect(()=>{
    fetchTasks();
  },[dateQuery])

  useEffect(()=>{
    setPage(1);
  }, [filter, dateQuery])
  const filteredTasks = taskBuffer.filter(task=>task.status === filter || filter === 'all');
  const handleTaskChanged = () => {
    fetchTasks();
  }

  const visibleTasks = filteredTasks.slice((page-1)*visibleTaskLimit, page*visibleTaskLimit);
  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);
  
  const handleNext = () => {
    if(page < totalPages) setPage(prev=>prev+1);
  }
  const handlePrev = () => {
    if(page > 1) setPage(prev=>prev-1);
  }
  const handlePageChange = (newPage: number) => {
    if(newPage >= 1 && newPage <= totalPages) setPage(newPage);
  }
  if(visibleTasks.length === 0){
    handlePrev();
  }
  return (
    <div className='container px-1 pt-8 mx-auto relative z-10'>
        <div className='w-full max-w-2xl p-6 mx-auto space-y-6'>
            {/* Đầu trang */}
            <Header/>

            {/* Tạo Task */}
            <AddTask handleNewTaskAdded={handleTaskChanged}/>

            {/* Thống kê và bộ lọc */}
            <StatsAndFilter filter={filter} setFilter={setFilter} completeTasksCount={completeTasksCount} activeTasksCount={activeTasksCount}/>

            {/* Danh sách Task */}
            <TaskList handleTaskChanged={handleTaskChanged} filterTask={visibleTasks}/>

            {/* Phân trang */}
            <div className='flex flex-col items-center justify-between gap-6 sm:flex-row'>
                <TaskListPagination handleNext={handleNext} handlePrev={handlePrev} handlePageChange={handlePageChange} page={page} totalPages={totalPages}/>
                <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery}/>
            </div>
            
            {/* Chân trang */}
            <Footer completeTaskCount={completeTasksCount} activeTaskCount={activeTasksCount} />
        </div>
    </div>
  )
}

export default HomePage