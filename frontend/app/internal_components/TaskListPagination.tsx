import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils";

interface TaskListPaginationProps {
  handleNext: () => void;
  handlePrev: () => void;
  handlePageChange: (newPage: number) => void;
  page: number;
  totalPages: number;
}
const TaskListPagination = ({handleNext, handlePrev, handlePageChange, page, totalPages}: TaskListPaginationProps) => {
  const generatePages = () => { 
    const pages = [];
    if(totalPages < 4){
      for(let i=1; i<=totalPages; i++){
        pages.push(i)
      }
    }
    else
    {
      if(page < 2){
        pages.push(1,2,3, "...", totalPages);
      }
      else if(page >= totalPages - 1){
        pages.push(1, "...", totalPages-2, totalPages-1, totalPages);
      }
      else{
        pages.push(1, "...", page-1, page, page+1, "...", totalPages);
      }
    }
    console.log('Generated pages: ', pages);
    return pages;
  }
  const pageToShow = generatePages();
  return (
     <Pagination className="justify-start">
      <PaginationContent>
        {/* nút trang trước */}
        <PaginationItem>
          <PaginationPrevious onClick={page === 1 ? undefined:handlePrev}
          className={cn("cursor-pointer", page===1 && "pointer-events-none opacity-50")} href="#" />
        </PaginationItem>

        {/* các nút trang */}
        
        {
          pageToShow.map((p, index)=>{
            return (
              <PaginationItem key={index}>
              {
                p === "..." ? <PaginationEllipsis key={index} /> : 
                <PaginationLink className="cursor-pointer" isActive={p === page} onClick={()=>p!==page && handlePageChange(+p)} href="#">{p}</PaginationLink>
              }
            </PaginationItem>
            )
          })
        }

          {/* nút trang sau */}
        <PaginationItem>
          <PaginationNext onClick={page === totalPages ? undefined:handleNext}
          className={cn("cursor-pointer", page === totalPages && "pointer-events-none opacity-50")}  content="Sau" href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default TaskListPagination