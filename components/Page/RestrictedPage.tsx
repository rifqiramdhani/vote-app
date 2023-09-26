import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import Button from '../Button'
import { signIn } from 'next-auth/react'

export default function RestrictedPage() {
    return (
        <div className='flex flex-col items-center justify-center h-screen space-y-5'>
            <Head>
                <title>Login Dulu</title>
            </Head>

            <Image 
                src={"/assets/login.svg"} 
                alt="Restricted" 
                width={200} 
                height={200} 
            />

            <h1 className='text-4xl font-bold'>Login Dulu Yah!</h1>
            <h2 className="text-lg">
                Untuk mengakses halaman ini, kamu wajib login terlebih dahulu
            </h2>

            <Button onClick={signIn} text="Login"/>
        </div>
    )
}
