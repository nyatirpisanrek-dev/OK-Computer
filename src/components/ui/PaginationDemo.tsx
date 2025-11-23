'use client'


import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from '@/components/ui/pagination'
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationDemoProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function PaginationDemo({ currentPage, totalPages, onPageChange }: PaginationDemoProps) {
  if (totalPages <= 1) {
    return null
  }

  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <Card>
      <Pagination>
        <PaginationContent className="p-1">
          <PaginationItem>
            <Button variant="ghost" size="sm" onClick={() => onPageChange(1)} disabled={currentPage === 1}>
              <ChevronFirst className="rtl:rotate-180" />
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button variant="ghost" size="sm" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
              <ChevronLeft className="rtl:rotate-180" />
            </Button>
          </PaginationItem>

          {/* This logic can be expanded for more complex pagination displays */}
          {pageNumbers.map((page) => (
            <PaginationItem key={page}>
              <Button
                variant={currentPage === page ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onPageChange(page)}
                className={currentPage === page ? 'bg-primary-500 text-white' : ''}
              >
                {page}
              </Button>
            </PaginationItem>
          ))}

          {totalPages > 5 && <PaginationEllipsis />}

          <PaginationItem>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="rtl:rotate-180" />
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button variant="ghost" size="sm" onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>
              <ChevronLast className="rtl:rotate-180" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </Card>
  )
}
