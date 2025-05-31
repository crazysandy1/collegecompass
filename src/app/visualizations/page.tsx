import { PageTitle } from '@/components/common/PageTitle';
import { CollegesByStateChart } from '@/components/charts/CollegesByStateChart';
import { AverageRatingByCourseChart } from '@/components/charts/AverageRatingByCourseChart';
import { mockColleges } from '@/lib/data';
import type { College } from '@/types';

async function getVisualizationData(): Promise<{ colleges: College[] }> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 100));
  return { colleges: mockColleges };
}

export default async function VisualizationsPage() {
  const { colleges } = await getVisualizationData();

  return (
    <div>
      <PageTitle 
        title="Data Visualizations" 
        subtitle="Explore trends and insights about colleges in India through interactive charts." 
      />
      <div className="space-y-12 mt-8">
        <CollegesByStateChart colleges={colleges} />
        <AverageRatingByCourseChart colleges={colleges} />
      </div>
    </div>
  );
}
