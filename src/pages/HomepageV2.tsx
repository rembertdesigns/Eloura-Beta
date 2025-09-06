
import React from 'react';
import TrustworthyStyleHomepage from '@/components/TrustworthyStyleHomepage';
import SEOHead from '@/components/SEOHead';

const HomepageV2 = () => {
  return (
    <>
      <SEOHead
        title="Eloura - Secure Family Caregiving Information Management | Organize Care Documents"
        description="Safeguard your family's important caregiving information in one secure place. Medical records, insurance, legal documents, and care coordination made simple. Get organized in minutes."
        keywords="family care documents, medical records management, caregiving information, secure care coordination, family health records, insurance management, legal documents storage"
      />
      <div className="min-h-screen bg-white">
        <TrustworthyStyleHomepage />
      </div>
    </>
  );
};

export default HomepageV2;
