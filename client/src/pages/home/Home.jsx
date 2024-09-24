import Footer from '@/components/custom/Footer'
import ExploreOption from '@/components/custom/home/ExploreOption'
import Features from '@/components/custom/home/Features'
import HeroSection from '@/components/custom/home/HeroSection'
import Navbar from '@/components/custom/home/Navbar'
import ReviewCarousel from '@/components/custom/home/ReviewCarousel'
import Layout from '@/components/custom/Layout'
import React from 'react'

const Home = () => {
  return (
    <>
      <HeroSection />
      <Features />
      <ExploreOption />
      <ReviewCarousel />
    </>
  )
}

export default Home