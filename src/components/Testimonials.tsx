import Image from 'next/image'
import React from 'react'
import { Container } from '@/components/Container'

import userOneImg from '../../public/img/user1.jpg'
import userTwoImg from '../../public/img/user2.jpg'
import userThreeImg from '../../public/img/user3.jpg'

export const Testimonials = () => {
  return (
<Container>
  <div className='grid gap-10 lg:grid-cols-2 xl:grid-cols-3 mt-3'>
    <div className='lg:col-span-2 xl:col-auto'>
      <div className='flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 dark:bg-trueGray-800'>
        <p className='text-2xl leading-normal '>
          “After switching to <Mark>DOML</Mark>, we saw a 40% increase in lead conversions. The real-time insights helped us fine-tune our messaging and outreach strategy in ways we never could before.”
        </p>
        <Avatar image={userOneImg} name='Sarah Steiner' title='VP Sales at Google' />
      </div>
    </div>
    <div className=''>
      <div className='flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 dark:bg-trueGray-800'>
        <p className='text-2xl leading-normal '>
          “DOML’s <Mark>predictive analytics</Mark> gave us deep visibility into customer behavior. We can now anticipate needs and tailor campaigns that actually convert.”
        </p>
        <Avatar image={userTwoImg} name='Dylan Ambrose' title='Lead Marketer at Netflix' />
      </div>
    </div>
    <div className=''>
      <div className='flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 dark:bg-trueGray-800'>
        <p className='text-2xl leading-normal '>
          “DOML is like having a marketing team running 24/7. The <Mark>AI-driven strategy</Mark> suggestions saved us time and budget while increasing our campaign performance.”
        </p>
        <Avatar image={userThreeImg} name='Gabrielle Winn' title='Co-founder of Acme Inc' />
      </div>
    </div>
  </div>
</Container>

  )
}

interface AvatarProps {
  image: any
  name: string
  title: string
}

function Avatar(props: Readonly<AvatarProps>) {
  return (
    <div className='flex items-center mt-8 space-x-3'>
      <div className='flex-shrink-0 overflow-hidden rounded-full w-14 h-14'>
        <Image src={props.image} width='40' height='40' alt='Avatar' placeholder='blur' />
      </div>
      <div>
        <div className='text-lg font-medium'>{props.name}</div>
        <div className='text-gray-600 dark:text-gray-400'>{props.title}</div>
      </div>
    </div>
  )
}

function Mark(props: { readonly children: React.ReactNode }) {
  return (
    <>
      {' '}
      <mark className='text-indigo-800 bg-indigo-100 rounded-md ring-indigo-100 ring-4 dark:ring-indigo-900 dark:bg-indigo-900 dark:text-indigo-200'>
        {props.children}
      </mark>{' '}
    </>
  )
}
