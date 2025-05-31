'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { collegeRecommendation, type CollegeRecommendationInput, type CollegeRecommendationOutput } from '@/ai/flows/college-recommendation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const recommendationSchema = z.object({
  academicInterests: z.string().min(3, 'Please describe your academic interests.'),
  preferredLocation: z.string().min(2, 'Please specify your preferred location.'),
  financialConstraints: z.string().min(3, 'Please mention any financial constraints or preferences.'),
});

type RecommendationFormValues = z.infer<typeof recommendationSchema>;

export function RecommendationForm() {
  const [recommendationResult, setRecommendationResult] = useState<CollegeRecommendationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RecommendationFormValues>({
    resolver: zodResolver(recommendationSchema),
  });

  const onSubmit: SubmitHandler<RecommendationFormValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    setRecommendationResult(null);
    try {
      const result = await collegeRecommendation(data as CollegeRecommendationInput);
      setRecommendationResult(result);
      reset(); // Optionally reset form on success
    } catch (e) {
      console.error('Error fetching recommendations:', e);
      setError('Failed to get recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-primary flex items-center">
          <Wand2 className="w-7 h-7 mr-3 text-accent" />
          Get Personalized College Recommendations
        </CardTitle>
        <CardDescription>
          Tell us your preferences, and our AI will suggest colleges tailored for you.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="academicInterests" className="font-semibold">Academic Interests</Label>
            <Textarea
              id="academicInterests"
              {...register('academicInterests')}
              placeholder="e.g., Computer Science, Artificial Intelligence, Robotics"
              className="mt-1"
            />
            {errors.academicInterests && <p className="text-sm text-destructive mt-1">{errors.academicInterests.message}</p>}
          </div>

          <div>
            <Label htmlFor="preferredLocation" className="font-semibold">Preferred Location</Label>
            <Input
              id="preferredLocation"
              {...register('preferredLocation')}
              placeholder="e.g., Bangalore, Maharashtra, or 'any major city'"
              className="mt-1"
            />
            {errors.preferredLocation && <p className="text-sm text-destructive mt-1">{errors.preferredLocation.message}</p>}
          </div>

          <div>
            <Label htmlFor="financialConstraints" className="font-semibold">Financial Constraints/Preferences</Label>
            <Input
              id="financialConstraints"
              {...register('financialConstraints')}
              placeholder="e.g., Max tuition ₹2 Lakhs/year, or 'looking for scholarships'"
              className="mt-1"
            />
            {errors.financialConstraints && <p className="text-sm text-destructive mt-1">{errors.financialConstraints.message}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isLoading} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Getting Recommendations...
              </>
            ) : (
              'Find Colleges'
            )}
          </Button>
        </CardFooter>
      </form>

      {error && (
         <Alert variant="destructive" className="m-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {recommendationResult && (
        <div className="p-6 border-t">
          <h3 className="text-xl font-headline font-semibold text-primary mb-3">Here are your recommendations:</h3>
          <Card className="bg-primary/5 p-4">
            <CardContent>
              <p className="text-foreground whitespace-pre-line">
                {recommendationResult.collegeRecommendations}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </Card>
  );
}
