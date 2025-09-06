
import React from 'react';
import CombinedHomepage from '@/components/CombinedHomepage';
import SEOHead from '@/components/SEOHead';

const Index = () => {
  const homepageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Eloura",
    "url": "https://eloura.com",
    "description": "AI-powered family care management and daily planner that helps coordinate caregiving, reduce mental load, and keep families connected.",
    "applicationCategory": "LifestyleApplication",
    "operatingSystem": "Web, iOS, Android",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "14-day free trial"
    },
    "author": {
      "@type": "Organization",
      "name": "Eloura",
      "url": "https://eloura.com"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    }
  };

  return (
    <>
      <SEOHead
        title="Eloura - Smart Family Care Management & Daily Planner | Reduce Mental Load"
        description="Make family caregiving feel manageable. AI-powered daily planner that helps coordinate care, reduce mental load, and keep families connected. Try free for 14 days."
        keywords="family care management, daily planner, caregiving app, mental load, family coordination, shared calendar, care coordination, family planner, parenting tools, AI scheduler"
        structuredData={homepageStructuredData}
      />
      <div className="min-h-screen warm-gradient">
        <CombinedHomepage />
      </div>
    </>
  );
};

export default Index;
