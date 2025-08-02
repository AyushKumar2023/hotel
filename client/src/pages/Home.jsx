import React from 'react'
import Hero from '../components/Hero'
import FeaturedDestination from '../components/FeaturedDestination'
import ExclusiveOffers from '../components/ExclusiveOffers'
import Testimonial from '../components/Testimonial'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
        <Hero></Hero>
        <FeaturedDestination></FeaturedDestination>
        <ExclusiveOffers></ExclusiveOffers>
        <Testimonial></Testimonial>
        <NewsLetter></NewsLetter>
        <Footer></Footer>
    </>
  )
}

export default Home