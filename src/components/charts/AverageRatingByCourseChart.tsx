'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { College } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface AverageRatingByCourseChartProps {
  colleges: College[];
}

interface CourseRatingData {
  course: string;
  totalRating: number;
  count: number;
  averageRating?: number;
}

export function AverageRatingByCourseChart({ colleges }: AverageRatingByCourseChartProps) {
  const courseDataMap = new Map<string, CourseRatingData>();

  colleges.forEach(college => {
    college.coursesOffered.forEach(course => {
      if (!courseDataMap.has(course)) {
        courseDataMap.set(course, { course, totalRating: 0, count: 0 });
      }
      const data = courseDataMap.get(course)!;
      // This logic assumes college.averageRating is for the college overall.
      // A more accurate chart would use average ratings *per course* if available.
      // For this mock, we'll use college's average rating for each course it offers.
      data.totalRating += college.averageRating;
      data.count += 1;
    });
  });
  
  const data = Array.from(courseDataMap.values()).map(item => ({
    ...item,
    averageRating: item.count > 0 ? parseFloat((item.totalRating / item.count).toFixed(1)) : 0,
  })).sort((a, b) => (b.averageRating ?? 0) - (a.averageRating ?? 0));


  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Average Rating by Course Type</CardTitle>
           <CardDescription>Comparing average student ratings for different courses.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No data available to display the chart.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-primary">Average Rating by Course Type</CardTitle>
        <CardDescription>Comparing average student ratings for different courses (based on college average ratings).</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data.slice(0,10)} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}> {/* Show top 10 courses */}
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))"/>
            <XAxis dataKey="course" tick={{fontSize: 12}} interval={0} angle={-30} textAnchor="end" height={80} stroke="hsl(var(--foreground))"/>
            <YAxis domain={[0, 5]} stroke="hsl(var(--foreground))" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))', 
                borderColor: 'hsl(var(--border))',
                color: 'hsl(var(--foreground))'
              }}
              cursor={{fill: 'hsl(var(--accent) / 0.2)'}}
            />
            <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }}/>
            <Bar dataKey="averageRating" name="Average Rating" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
