
import { PageTitle } from '@/components/common/PageTitle';
import { CollegesByStateChart } from '@/components/charts/CollegesByStateChart';
import { AverageRatingByCourseChart } from '@/components/charts/AverageRatingByCourseChart';
import { CollegeRatingDistributionChart } from '@/components/charts/CollegeRatingDistributionChart';
import { mockColleges } from '@/lib/data';
import type { College } from '@/types';
import Image from 'next/image';

async function getVisualizationData(): Promise<{ colleges: College[] }> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 100));
  return { colleges: mockColleges };
}

export default async function VisualizationsPage() {
  const { colleges } = await getVisualizationData();

  return (
    <div>
      <div className="mb-8 overflow-hidden rounded-lg shadow-lg">
        <Image
          src="https://placehold.co/1200x300.png"
          alt="Data visualization banner"
          width={1200}
          height={300}
          className="w-full object-cover"
          data-ai-hint="data abstract"
          priority
        />
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
