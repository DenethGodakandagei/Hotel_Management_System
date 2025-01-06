import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import { About } from '../components/Aboutus'
import Rooms from '../components/Rooms'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <About />
      <Rooms />
    </div>
  )
}

export default Home
