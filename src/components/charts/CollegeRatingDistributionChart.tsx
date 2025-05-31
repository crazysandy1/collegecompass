
'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { College } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface CollegeRatingDistributionChartProps {
  colleges: College[];
}

interface RatingDistributionData {
  ratingRange: string;
  count: number;
}

export function CollegeRatingDistributionChart({ colleges }: CollegeRatingDistributionChartProps) {
  const ratingBuckets = [
    { range: '0-1 Stars', min: 0, max: 1, count: 0 },
    { range: '1-2 Stars', min: 1, max: 2, count: 0 },
    { range: '2-3 Stars', min: 2, max: 3, count: 0 },
    { range: '3-4 Stars', min: 3, max: 4, count: 0 },
    { range: '4-5 Stars', min: 4, max: 5, count: 0 },
  ];

  colleges.forEach(college => {
    for (const bucket of ratingBuckets) {
      // Ensure exact matches for max (e.g. 5.0) fall into the highest bucket
      if (college.averageRating > bucket.min && college.averageRating <= bucket.max) {
        bucket.count++;
        break;
      }
      // Handle 0 rating specifically for the 0-1 stars bucket
      if (bucket.min === 0 && college.averageRating === 0) {
        bucket.count++;
        break;
      }
    }
  });

  const data: RatingDistributionData[] = ratingBuckets.map(bucket => ({
    ratingRange: bucket.range,
    count: bucket.count,
  }));

  if (colleges.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">College Rating Distribution</CardTitle>
          <CardDescription>Shows the number of colleges in different average rating ranges.</CardDescription>
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
        <CardTitle className="font-headline text-primary">College Rating Distribution</CardTitle>
        <CardDescription>Shows the number of colleges in different average rating ranges.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))"/>
            <XAxis dataKey="ratingRange" tick={{fontSize: 12}} stroke="hsl(var(--foreground))"/>
            <YAxis allowDecimals={false} stroke="hsl(var(--foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
                color: 'hsl(var(--foreground))'
              }}
              cursor={{fill: 'hsl(var(--accent) / 0.2)'}}
            />
            <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }}/>
            <Bar dataKey="count" name="Number of Colleges" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
