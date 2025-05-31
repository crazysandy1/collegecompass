
import { PageTitle } from '@/components/common/PageTitle';
import { CollegesByStateChart } from '@/components/charts/CollegesByStateChart';
import { AverageRatingByCourseChart } from '@/components/charts/AverageRatingByCourseChart';
import { CollegeRatingDistributionChart } from '@/components/charts/CollegeRatingDistributionChart';
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
      <div className="mb-8 overflow-hidden rounded-lg shadow-lg bg-secondary flex items-center justify-center h-48 md:h-64">
        {/* Image removed, added background color and height for placeholder */}
      </div>
      <PageTitle 
        title="Data Visualizations" 
        subtitle="Explore trends and insights about colleges in India through interactive charts." 
      />
      <div className="space-y-12 mt-8">
        <CollegesByStateChart colleges={colleges} />
        <AverageRatingByCourseChart colleges={colleges} />
        <CollegeRatingDistributionChart colleges={colleges} />
      </div>
    </div>
  );
}
