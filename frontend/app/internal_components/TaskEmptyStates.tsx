import { Card } from '@/components/ui/card';
import { Circle, CircleCheckBig } from 'lucide-react';
import React from 'react'

interface TaskEmptyStatesProps {
  filter: string;
}
const TaskEmptyStates = ({filter}:TaskEmptyStatesProps) => {
  return (
    <Card className='p-8 text-center border-0 bg-card shadow-md'>
        <div className="space-y-3">
            <CircleCheckBig className='text-green-400 mx-auto size-12 '/>
            <div>
                <h3 className='font-medium text-foreground'>
                    {
                        filter === 'active' ? 'Không có công việc đang làm nào!' :
                        filter === 'complete' ? 'Không có công việc hoàn thành nào!' :
                        'HẾT VIỆC RỒIIIIII!!!!'
                    }
                </h3>
                <p className='text-sm text-muted-foreground'>
                    {filter === 'all' ? "Thêm nhiệm vụ đầu tiên để bắt đầu!":`Chuyển sang "Tất cả" để xem các nhiệm vụ  
                    ${filter === 'active' ? "đang làm" : "đã hoàn thành"}.`}
                </p>
            </div>
        </div>
    </Card>
  )
}

export default TaskEmptyStates