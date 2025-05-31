import type { Review } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, User, CalendarDays } from 'lucide-react';
import { format } from 'date-fns';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
      />
    ));
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold text-primary flex items-center">
              <User className="w-5 h-5 mr-2 text-accent" />
              {review.studentName}
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground flex items-center mt-1">
              <CalendarDays className="w-3 h-3 mr-1" />
              {format(new Date(review.date), 'MMMM d, yyyy')}
            </CardDescription>
          </div>
          <div className="flex items-center">{renderStars(review.rating)}</div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-foreground/90">{review.reviewText}</p>
      </CardContent>
    </Card>
  );
}
