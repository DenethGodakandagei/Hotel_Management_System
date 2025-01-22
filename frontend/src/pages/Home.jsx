import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import { About } from '../components/Aboutus'
import Rooms from '../components/Rooms'
import { Contact } from '../components/Contact'
import { Footer } from '../components/Footer'
import { Features } from '../components/Features'
import { Gallery } from '../components/Gallery'
import Dining from '../components/Dining'

const Home = () => {
  return (
    <div>
     <Navbar />
      <Header />
      <About />
      <Rooms />
      <Features />
      <Dining />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  )
}

export default Home
