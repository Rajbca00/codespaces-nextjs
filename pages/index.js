import { useCallback, useEffect, useState } from 'react'
import Button from '../components/Button'
import ClickCount from '../components/ClickCount'
import styles from '../styles/home.module.css'
import Navbar from '../components/Navbar'
import { useUser } from '@auth0/nextjs-auth0/client';

function throwError() {
  console.log(
    // The function body() is not defined
    document.body()
  )
}

function Home() {

  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;


  return (

    user ? (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <a href="/api/auth/logout">Logout</a>
      </div>
    ) : (
      // <a href="/api/auth/login">Login</a>
      <LandingPage/>
    )
  );
}


function LandingPage() {
  return (
  <>
    <Navbar/>
    <div className='container flex mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8'>
      <div className='flex-1 flex flex-col justify-center'>
        <h1 className='text-6xl leading-snug text-teal-600'>Track your Money, Anytime Anywhere with MTracker</h1>
        <div>
        <Button>Login</Button>
        <Button class='pl-2'>Learn More</Button>
        </div>
      </div>
      <div className='flex-1'>
        <img src='/images/image.jpg' alt='hero-image' className=''></img>
      </div>
    </div>
  </>
  )
}

export default Home
