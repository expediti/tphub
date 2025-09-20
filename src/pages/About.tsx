import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  Users, 
  Download, 
  Star, 
  Target, 
  Heart, 
  Shield, 
  Rocket 
} from 'lucide-react';

const stats = [
  { label: 'Templates', value: '10,000+', icon: Zap },
  { label: 'Creators', value: '50,000+', icon: Users },
  { label: 'Downloads', value: '1M+', icon: Download },
  { label: 'Rating', value: '4.9/5', icon: Star },
];

const features = [
  {
    icon: Target,
    title: 'Curated Quality',
    description: 'Every template is handpicked and tested by our expert team to ensure professional quality.'
  },
  {
    icon: Zap,
    title: 'Instant Download',
    description: 'Get your templates instantly after purchase. No waiting, no complicated processes.'
  },
  {
    icon: Heart,
    title: 'Creator Support',
    description: 'We support independent creators and designers, helping them monetize their work.'
  },
  {
    icon: Shield,
    title: 'Commercial License',
    description: 'All templates come with commercial licensing. Use them for client work without worry.'
  }
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4 text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold">About Template Hub</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We're the world's largest marketplace for video editing templates, 
                connecting creators with high-quality resources for their projects.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center space-y-2">
                    <IconComponent className="h-8 w-8 mx-auto text-primary" />
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Our Mission</h2>
                <p className="text-lg text-muted-foreground">
                  To democratize video creation by providing creators with professional-grade 
                  templates that save time and elevate their content quality.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <Card key={index} className="text-left">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <IconComponent className="h-6 w-6 text-primary" />
                          </div>
                          <CardTitle>{feature.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">
                          {feature.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold">Our Story</h2>
                <p className="text-muted-foreground">
                  Founded in 2024 by creators, for creators
                </p>
              </div>
              
              <div className="prose prose-lg mx-auto text-muted-foreground">
                <p>
                  Template Hub started as a simple idea: what if creators could access 
                  professional-quality templates without breaking the bank or spending 
                  hours creating them from scratch?
                </p>
                <p>
                  Our founders, experienced video editors and motion designers, noticed 
                  that while tools like CapCut, After Effects, and Premiere Pro were 
                  becoming more accessible, finding quality templates remained a challenge.
                </p>
                <p>
                  Today, we're proud to host templates from hundreds of talented creators 
                  worldwide, serving over 50,000 content creators, agencies, and businesses 
                  who trust us for their template needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Built by Creators</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our team combines technical expertise with creative passion to build 
                the best template marketplace for the creator economy.
              </p>
            </div>
            
            <div className="flex flex-col items-center space-y-6">
              <div className="flex items-center gap-2">
                <Rocket className="h-6 w-6 text-primary" />
                <span className="text-lg font-medium">Always Improving</span>
              </div>
              <p className="text-muted-foreground max-w-2xl">
                We're constantly adding new features, improving our platform, and 
                expanding our template library based on creator feedback.
              </p>
              <Button size="lg">
                Join Our Community
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;
