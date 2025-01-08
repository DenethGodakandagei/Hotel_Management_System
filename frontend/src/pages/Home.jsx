import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import { About } from '../components/Aboutus'
import Rooms from '../components/Rooms'
import { Contact } from '../components/Contact'
import { Footer } from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <About />
      <Rooms />
      <Contact />
      <Footer />
    </div>
  )
}

export default Home
