import React from 'react'

const Loading = () => {
  return (
    <div className='space-x-2 text-center py-52'>
      <h1 className=' text-7xl font-bold bg-gradient-to-l from-purple-600 to-red-300 text-transparent bg-clip-text'>
        Carlodo
      </h1>
      <p className='mt-4 text-lg font-semibold text-muted-foreground'>Đang tải dữ liệu...</p>
    </div>
  )
}

export default Loading