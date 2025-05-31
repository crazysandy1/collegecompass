
import { mockColleges, mockReviews } from '@/lib/data';
import type { College, Review } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { PageTitle } from '@/components/common/PageTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ReviewCard } from '@/components/colleges/ReviewCard';
import { MapPin, Star, BookOpen, Link as LinkIcon, DollarSign, Building } from 'lucide-react';
import { notFound } from 'next/navigation';

async function getCollegeData(id: string): Promise<College | undefined> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 200)); 
  const college = mockColleges.find(c => c.id === id);
  if (college) {
    // Ensure reviews are correctly populated for this college, as mockReviews is global
    return { ...college, reviews: mockReviews.filter(r => r.collegeId === id) };
  }
  return undefined;
}

export default async function CollegeDetailPage({ params }: { params: { id: string } }) {
  const college = await getCollegeData(params.id);

  if (!college) {
    notFound();
  }

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star
        key={index}
        className={`w-6 h-6 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
      />
    ));
  };

  return (
    <div className="space-y-8">
      <PageTitle title={college.name} subtitle={
        <div className="flex items-center text-lg text-muted-foreground mt-1">
          <MapPin className="w-5 h-5 mr-2 text-accent" />
          {college.address.city}, {college.address.state}
        </div>
      } />

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Card className="shadow-xl overflow-hidden">
            <Image
              src={college.imageUrl}
              alt={`Campus of ${college.name}`}
              width={800}
              height={450}
              className="w-full h-auto object-cover"
              data-ai-hint="campus aerial"
              priority
            />
            <CardContent className="p-6">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">About the College</h2>
              <p className="text-foreground/90 leading-relaxed">{college.description}</p>
            </CardContent>
          </Card>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-headline text-primary flex items-center">
                <BookOpen className="w-7 h-7 mr-3 text-accent" />
                Courses Offered
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {college.coursesOffered.map(course => (
                  <Badge key={course} variant="default" className="text-sm px-3 py-1 bg-primary/80 text-primary-foreground">{course}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1 space-y-8">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-headline text-primary">College Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-400" />
                <span className="font-semibold">{college.averageRating.toFixed(1)}/5.0</span>
                <span className="ml-1 text-muted-foreground">({college.reviews.length} reviews)</span>
              </div>
              {college.tuitionFees && (
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-accent" />
                  <span className="text-foreground/90">{college.tuitionFees}</span>
                </div>
              )}
              {college.resources.websiteUrl && (
                <div className="flex items-center">
                  <Building className="w-5 h-5 mr-2 text-accent" />
                  <Button variant="link" asChild className="p-0 h-auto text-primary hover:underline">
                    <a href={college.resources.websiteUrl} target="_blank" rel="noopener noreferrer">Visit Website</a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {Object.values(college.resources).some(url => url) && (
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-headline text-primary flex items-center">
                  <LinkIcon className="w-6 h-6 mr-3 text-accent" />
                  Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {college.resources.applicationPortalUrl && (
                  <Button variant="outline" asChild className="w-full">
                    <a href={college.resources.applicationPortalUrl} target="_blank" rel="noopener noreferrer">
                      Application Portal
                    </a>
                  </Button>
                )}
                {college.resources.financialAidUrl && (
                  <Button variant="outline" asChild className="w-full">
                    <a href={college.resources.financialAidUrl} target="_blank" rel="noopener noreferrer">
                      Financial Aid
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-primary">Student Reviews</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {college.reviews.length > 0 ? (
            college.reviews.map(review => <ReviewCard key={review.id} review={review} />)
          ) : (
            <p className="text-muted-foreground">No reviews yet for this college. Be the first to write one!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export async function generateStaticParams() {
  // Pre-render paths for mock colleges
  return mockColleges.map(college => ({
    id: college.id,
  }));
}

// To handle cases where an ID might not be in mockColleges during build,
// or for truly dynamic fetching later.
export const dynamicParams = true; // Default, can be false if all paths known
