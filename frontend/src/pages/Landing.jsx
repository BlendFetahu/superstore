import React from 'react'
import HeroSection from '../components/landing/HeroSection';
import AboutSection from '../components/landing/AboutSection'
import FeaturesSection from '../components/landing/FeaturesSection';
import SystemArchitecture from '../components/landing/SystemArchitectureSection';
import AnalyticsSection from '../components/landing/AnalyticsSection';

function Landing() {
  return (
   <>
        <HeroSection/>
        <AboutSection/>
        <FeaturesSection/>
        <SystemArchitecture/>
        <AnalyticsSection/>

   </>
  )
}

export default Landing