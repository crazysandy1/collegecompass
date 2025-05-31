
import type { College } from '@/types';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Star, BookOpen, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CollegeCardProps {
  college: College;
}

export function CollegeCard({ college }: CollegeCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      {/* CardHeader with Image removed */}
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-xl font-headline mb-2 text-primary pt-6">{college.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-3 flex items-center">
          <MapPin className="w-4 h-4 mr-2 text-accent" />
          {college.address.city}, {college.address.state}
        </CardDescription>
        <p className="text-sm text-foreground line-clamp-3 mb-4">{college.description}</p>
        <div className="flex items-center space-x-2 mb-3 text-sm">
          <Star className="w-4 h-4 text-yellow-400" />
          <span>{college.averageRating.toFixed(1)}/5.0</span>
          <span className="text-muted-foreground">({college.reviews.length} reviews)</span>
        </div>
         {college.tuitionFees && (
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <DollarSign className="w-4 h-4 mr-2 text-accent" />
            <span>{college.tuitionFees}</span>
          </div>
        )}
        <div className="mb-3">
          <h4 className="text-sm font-semibold mb-1 flex items-center">
            <BookOpen className="w-4 h-4 mr-2 text-accent" />
            Courses:
          </h4>
          <div className="flex flex-wrap gap-1">
            {college.coursesOffered.slice(0, 3).map(course => (
              <Badge key={course} variant="secondary" className="text-xs">{course}</Badge>
            ))}
            {college.coursesOffered.length > 3 && <Badge variant="secondary" className="text-xs">...</Badge>}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 bg-secondary/30">
        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href={`/colleges/${college.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
