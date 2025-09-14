import { Button } from "../button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from 'react-router'

interface Props {
  totalPages: number;
}

export const CustomPagination = ({ totalPages }: Props) => {

  const [searchParams, setSearchParams] = useSearchParams()
  const queryPage = searchParams.get('page') ?? '1'
  const page = isNaN(+queryPage) ? 1 : +queryPage
  
  const handlePageChange = (page:number) => {

    if(page < 1 || page > totalPages) return

    searchParams.set('page', page.toString())
    setSearchParams(searchParams)
  }
  
  return (
    <div className="flex items-center justify-center space-x-2">
      <Button variant="outline" size="sm" disabled={page === 1} onClick={()=> handlePageChange(page-1)} >
        <ChevronLeft className="h-4 w-4" />
        Anteriores
      </Button>

      {Array.from({ length: totalPages }).map((_, index) => (
        <Button
          variant={page == index + 1 ? "default" : "outline"}
          size="sm"
          key={index}
          onClick={()=> handlePageChange(index+1)}
        >
          {index + 1}
        </Button>
      ))}

      <Button onClick={()=> handlePageChange(page + 1)} variant="outline" size="sm" disabled={page === totalPages}>
        Siguientes
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
