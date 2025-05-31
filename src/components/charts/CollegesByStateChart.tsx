'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { College } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface CollegesByStateChartProps {
  colleges: College[];
}

export function CollegesByStateChart({ colleges }: CollegesByStateChartProps) {
  const data = colleges.reduce((acc, college) => {
    const state = college.address.state;
    const existingState = acc.find(item => item.state === state);
    if (existingState) {
      existingState.count += 1;
    } else {
      acc.push({ state, count: 1 });
    }
    return acc;
  }, [] as { state: string; count: number }[]);

  data.sort((a, b) => b.count - a.count); // Sort by count descending

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Colleges by State</CardTitle>
          <CardDescription>Distribution of listed colleges across different states.</CardDescription>
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
        <CardTitle className="font-headline text-primary">Colleges by State</CardTitle>
        <CardDescription>Distribution of listed colleges across different states.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="state" stroke="hsl(var(--foreground))" />
            <YAxis stroke="hsl(var(--foreground))" allowDecimals={false}/>
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))', 
                borderColor: 'hsl(var(--border))',
                color: 'hsl(var(--foreground))'
              }}
              cursor={{fill: 'hsl(var(--accent) / 0.2)'}}
            />
            <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
            <Bar dataKey="count" name="Number of Colleges" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
