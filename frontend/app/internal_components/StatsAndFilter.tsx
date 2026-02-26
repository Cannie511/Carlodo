import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FilterType } from '@/lib/data';
import { Filter } from 'lucide-react';
import React from 'react'

interface StatsAndFilterProps {
    completeTasksCount?: number;
    activeTasksCount?: number;
    filter?: "all" | "active" | "complete";
    setFilter?: (filter: "all" | "active" | "complete") => void;
}
const StatsAndFilter = ({ completeTasksCount = 0, activeTasksCount = 0, filter = "all", setFilter }: StatsAndFilterProps) => {
  return (
    <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm-items-center'>
        {/* Phần thống kê */}
        <div className="flex gap-3 items-center">
            <Badge className='bg-purple-200/50 text-purple-800 border-purple-400 '>
                {activeTasksCount} {FilterType.active}
            </Badge>
            <Badge className='bg-green-300/50 text-green-800 border-green-400 '>
                {completeTasksCount} {FilterType.complete}
            </Badge>
        </div>

        {/* Phần Filter */}
        <div className="flex-1 flex-col gap-2 sm:flex-none sm:justify-end">
            {
                Object.keys(FilterType).map((key) => (
                    <Button key={key} variant={filter === key ? 'gradient' : 'ghost'} size={'sm'} className='capitalize cursor-pointer'
                    onClick={()=>setFilter(key)}  >
                        <Filter className='size-4'/>
                        {FilterType[key as keyof typeof FilterType]}
                    </Button>
                ))
            }
        </div>
    </div>
  )
}

export default StatsAndFilter