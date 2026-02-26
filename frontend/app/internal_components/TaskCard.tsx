import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/axios';
import { cn } from '@/lib/utils';
import { Calendar, CheckCircle2, Circle, SquarePen, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface TaskCardProps {
  task: any;
  index: number;
  handleTaskChanged: () => void;
}
const TaskCard = ({task, index, handleTaskChanged}: TaskCardProps) => {
    const [isEditting, setIsEditting] = useState(false);
    const [updatedTaskTitle, setUpdatedTaskTitle] = useState(task.title || "");
    const deleteTask = async(taskId) => {
        try {
            await api.delete(`/tasks/${taskId}`);
            toast.success('Đã xóa 1 việc!');
            handleTaskChanged();
        } catch (error) {
            toast.error('Có lỗi xảy ra khi xóa việc!');
            console.log("Lỗi xảy ra khi xóa nhiệm vụ:", error);
        }
    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
        updateTask();
        }
    }
    const toggleTaskComplete = async() => {
       try {
            if(task.status === 'active') {
                await api.put(`/tasks/${task._id}`, { status: 'complete', completeAt: new Date().toISOString() });
                toast.success('Đã hoàn thành!');
            } else {
                await api.put(`/tasks/${task._id}`, { status: 'active', completeAt: null });
                toast.success('Đã đánh dấu chưa hoàn thành!');
            }
            handleTaskChanged();
       } catch (error) {
            toast.error('Có lỗi xảy ra khi cập nhật trạng thái công việc!');
            console.log("Lỗi xảy ra khi cập nhật trạng thái nhiệm vụ:", error);
       }
    }
    const updateTask = async() => {
        try {
            setIsEditting(false);
            await api.put(`/tasks/${task._id}`, { title: updatedTaskTitle });
            toast.success('Nhiệm vụ đã đổi thành '+ updatedTaskTitle + '!');
            handleTaskChanged();
        } catch (error) {
            toast.error('Có lỗi xảy ra khi cập nhật công việc!');  
            console.log("Lỗi xảy ra khi cập nhật nhiệm vụ:", error);
        }
    }
  return (
     <Card className={cn("flex-row items-center p-4 bg-card border-0 shadow-md hover:shadow-lg transition-all duration-200 animate-in fade-in-0  group",
        task.status === 'complete' && 'opacity-75', 
     )}
        style={{animationDelay: `${index * 100}ms`}}
     >
        {/* Checkbox hoàn thành */}
        <div className="flex items-center gap-4">
            <Button variant={'ghost'} onClick={toggleTaskComplete} size={'icon'} className={cn('shrink-0 size-8 rounded-full transition-all duration-200',
                task.status === 'complete' ? 'text-green-400 hover:text-green-400/80' : 'text-muted-foreground hover:text-primary/80'
            )}>
                {task.status === 'complete' ? <CheckCircle2 className='size-5'/> : <Circle className='size-5'/>}
            </Button>
        </div>

        {/* input chỉnh sửa tiêu đề */}
        <div className="flex-1 min-w-0">
            {isEditting ? (
                <Input type='text' value={updatedTaskTitle} onChange={(e) => setUpdatedTaskTitle(e.target.value)} 
                onKeyPress={handleKeyPress}
                onBlur={()=>{
                    setIsEditting(false);
                    setUpdatedTaskTitle(task.title || "")
                }}
                placeholder='Cần phải làm gì ?'
                 className='flex-1 h-12 text-base border-border/50 focus-visible:border-purple-400/50 focus-visible:ring-purple-400/20'/>
            ) : (
                <p className={cn('text-base transition-all duration-200', task.status === 'complete' ? 
                    'line-through text-muted-foreground':
                    'text-foreground'
                )}>
                    {task.title}
                </p>
            )}
            {/* Ngày tạo và ngày hoàn thành */}
            <div className='flex items-center gap-2 mt-1'>
            <Calendar className='size-3 text-muted-foreground'/>
            <span className='text-xs text-muted-foreground'>
                {new Date(task.createdAt).toLocaleString()}
            </span>
            {task.completeAt && (
                <>
                    <span className='text-xs text-muted-foreground'>-</span>
                    <Calendar className='size-3 text-green-400'/>
                    <span className='text-xs text-muted-foreground'>
                        {new Date(task.completeAt).toLocaleString()}
                    </span>
                </>
            )}
        </div> 
        </div>


        {/* Các nút chỉnh sửa và xóa */}
        <div className="sm:hidden gap-2 group-hover:inline-flex transition-all duration-200 animate-in slide-in-from-bottom-50">
            {/* nút edit */}
            <Button variant={'ghost'} onClick={()=>{
                setIsEditting(true);
                setUpdatedTaskTitle(task.title || "");
            }} size={'icon'} className='shrink-0 transition-colors size-8 text-muted-foreground hover:text-blue-400'>
                <SquarePen className='size-4'/>
            </Button>
            {/* nút delete */} 
            <Button variant={'ghost'} onClick={()=>deleteTask(task._id)} size={'icon'} className='shrink-0 transition-colors size-8 text-muted-foreground hover:text-red-400'>
                <Trash2 className='size-4'/>
            </Button>
        </div>
     </Card>
  )
}

export default TaskCard