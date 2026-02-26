import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/axios'
import axios from 'axios'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'

const AddTask = ({handleNewTaskAdded}: {handleNewTaskAdded: any}) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const addTask = async() => {
    if(newTaskTitle.trim() === '') {
      toast.error('Tiêu đề công việc không được để trống!');
      return;
    }
    try {
      await api.post('/tasks', { title: newTaskTitle });
      toast.success('Đã thêm 1 việc mới!');
      handleNewTaskAdded();
      setNewTaskTitle('');
    } catch (error) {
      toast.error('Có lỗi xảy ra khi thêm việc mới!');
      console.log("Lỗi xảy ra khi thêm nhiệm vụ mới:", error);
    }
  }

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      addTask();
    }
  }
  return (
    <Card className='p-6 border-0 bg-card shadow-lg'>
        <div className="flex flex-col gap-3 sm:flex-row">
            <Input onKeyPress={handleKeyPress} onChange={(event)=>setNewTaskTitle(event?.target.value)} value={newTaskTitle} placeholder="Thêm việc mới..." className='h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus-visible:border-purple-400  focus-visible:ring-purple-400'/>
            <Button variant={'gradient'} disabled={newTaskTitle.trim() === ''} onClick={addTask} size={'xl'} className='px-6'>
                Thêm <Plus size={20}/>
            </Button>
        </div>
    </Card>
  )
}

export default AddTask