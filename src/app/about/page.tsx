
import { PageTitle } from '@/components/common/PageTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Eye } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <PageTitle 
        title="About College Compass" 
        subtitle="Guiding students towards a brighter future." 
      />

      <section className="grid md:grid-cols-1 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-headline font-semibold text-primary">Our Mission</h2>
          <p className="text-lg text-foreground leading-relaxed">
            At College Compass, our mission is to empower 10th-grade students and their parents with comprehensive, unbiased information to make informed decisions about higher education in India. We strive to create a transparent platform built on honest student reviews and data-driven insights.
          </p>
          <p className="text-lg text-foreground leading-relaxed">
            We believe that every student deserves access to reliable information to find the college that best fits their aspirations, academic interests, and financial situation.
          </p>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-headline font-semibold text-center text-primary">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <ValueCard
            icon={<Eye className="h-10 w-10 text-accent" />}
            title="Transparency"
            description="We are committed to providing clear and honest information, including unfiltered student reviews (moderated for community standards)."
          />
          <ValueCard
            icon={<Users className="h-10 w-10 text-accent" />}
            title="Student-Centric"
            description="Our platform is designed with the needs of students and parents at its core, aiming to simplify the college search process."
          />
          <ValueCard
            icon={<Target className="h-10 w-10 text-accent" />}
            title="Empowerment"
            description="We aim to equip users with the knowledge and tools to confidently choose their educational path."
          />
        </div>
      </section>

      <section className="text-center py-10 bg-secondary/50 rounded-lg shadow">
          <h2 className="text-3xl font-headline font-semibold text-primary mb-4">Get Started on Your Journey</h2>
          <p className="text-lg text-foreground mb-6 max-w-xl mx-auto">
            Ready to find the perfect college? Explore our listings or get personalized recommendations today.
          </p>
          <a href="/colleges" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 px-6 rounded-md shadow-md transition duration-300">
            Explore Colleges Now
          </a>
      </section>
    </div>
  );
}

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ValueCard({ icon, title, description }: ValueCardProps) {
  return (
    <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="items-center">
        <div className="p-3 bg-accent/10 rounded-full mb-3 w-fit">
         {icon}
        </div>
        <CardTitle className="font-headline text-xl text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-foreground/80">{description}</p>
      </CardContent>
    </Card>
  );
}
