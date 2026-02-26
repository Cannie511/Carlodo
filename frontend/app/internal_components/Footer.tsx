import React from 'react'
interface FooterProps {
    completeTaskCount?: number;
    activeTaskCount?: number;
}
const Footer = ({completeTaskCount = 0, activeTaskCount = 0}: FooterProps) => {
  return (
    <>
     {completeTaskCount + activeTaskCount > 0 && (
        <div className="text-center">
            <p className='text-sm text-muted-foreground'>
                <>
                    {
                        completeTaskCount > 0 && (<>🎊 Tuyệt vời, Bạn đã hoàn thành {completeTaskCount} công việc rồi đó!
                            {
                                activeTaskCount > 0 && (<>, Bạn chỉ còn {activeTaskCount} công việc nữa thôi, Cố lên! 🎉.</>)
                            }
                        </>)
                    }
                </>
                
                {
                    completeTaskCount === 0 && activeTaskCount > 0 &&
                    (<>Bạn đang có {activeTaskCount} công việc chưa xong, Cố lênnnn! 🎉.</>)
                }
            </p>
        </div>
     )}   
    </>
  )
}

export default Footer