import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SearchBar from '../components/SearchBar'

const Landing = () => {
  const [searchValue, setsearchValue] = useState("")
  const handleSearch = (e) => {
    const newValue = e.currentTarget.value;
    setsearchValue(newValue);
  }
  return (
    <>
      <Header />
      LandingPage
      <h1>Landing</h1>
      <SearchBar width="200px" height="" fontSize="20px" placeholder="검색" value={searchValue} onChange={handleSearch} />
      {searchValue}
      <Footer />
    </>
  )
}

export default Landing