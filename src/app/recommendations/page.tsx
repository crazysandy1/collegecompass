import { PageTitle } from '@/components/common/PageTitle';
import { RecommendationForm } from '@/components/recommendations/RecommendationForm';

export default function RecommendationsPage() {
  return (
    <div>
      <PageTitle 
        title="Personalized College Recommendations" 
        subtitle="Let our AI assist you in finding colleges that best match your academic interests, location preferences, and financial considerations." 
      />
      <RecommendationForm />
    </div>
  );
}
