
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Compass, ListChecks, BarChart3, Lightbulb } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12 bg-gradient-to-r from-primary/10 via-background to-primary/10 rounded-lg shadow-lg">
        <div className="container mx-auto px-4">
          
          <Compass className="mx-auto h-24 w-24 text-primary mb-6 mt-8" />
          <h1 className="text-5xl font-headline font-bold text-primary mb-4">
            Welcome to College Compass
          </h1>
          <p className="text-xl text-foreground mb-8 max-w-2xl mx-auto">
            Your trusted guide to navigating the path of higher education in India. Discover colleges, read honest reviews, and get personalized recommendations.
          </p>
          <div className="space-x-4">
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/colleges">Explore Colleges</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-primary text-primary hover:bg-primary/10">
              <Link href="/recommendations">Get Recommendations</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-headline font-semibold text-center text-primary mb-10">
          Key Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<ListChecks className="h-12 w-12 text-accent" />}
            title="College Listings"
            description="Browse an extensive directory of colleges across India. Filter by location, courses, and more."
            link="/colleges"
            linkText="View Colleges"
          />
          <FeatureCard
            icon={<Lightbulb className="h-12 w-12 text-accent" />}
            title="Personalized Recommendations"
            description="Our AI-powered tool helps you find colleges that match your unique preferences and aspirations."
            link="/recommendations"
            linkText="Find Your Match"
          />
          <FeatureCard
            icon={<BarChart3 className="h-12 w-12 text-accent" />}
            title="Data Visualizations"
            description="Gain insights from visualized data on reviews, course popularity, and other key metrics."
            link="/visualizations"
            linkText="See Insights"
          />
          <FeatureCard
            icon={<Compass className="h-12 w-12 text-accent" />}
            title="Honest Reviews"
            description="Read genuine reviews from students to make informed decisions about your future."
            link="/colleges"
            linkText="Read Reviews"
          />
        </div>
      </section>
      
      <section className="py-12 bg-secondary/50 rounded-lg shadow-md">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-headline font-semibold text-primary mb-4">
              Empowering Your Educational Journey
            </h2>
            <p className="text-lg text-foreground mb-6">
              Choosing a college is a significant decision. College Compass provides you with the tools and information needed to navigate this complex process with confidence. We believe in transparency and honest feedback to help you find the perfect fit for your academic and personal growth.
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  linkText: string;
}

function FeatureCard({ icon, title, description, link, linkText }: FeatureCardProps) {
  return (
    <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="mx-auto bg-accent/10 p-4 rounded-full w-fit mb-4">
          {icon}
        </div>
        <CardTitle className="font-headline text-2xl text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-foreground/80 mb-4">{description}</CardDescription>
        <Button variant="link" asChild className="text-accent hover:text-accent/80 p-0">
          <Link href={link}>{linkText} &rarr;</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
