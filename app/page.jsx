'use client'

import { Benefits } from '@/components/Benefits'
import { Hero } from '@/components/Hero'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { benefitOne, benefitTwo } from "@/components/data";
import { Container } from '@/components/Container'
import { SectionTitle } from "@/components/SectionTitle";
import { Video } from "@/components/Video";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { Cta } from "@/components/Cta";
import { Footer } from '@/components/Footer'




const Globe = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Globe), { ssr: false })
const TorusKnot = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.TorusKnot), { ssr: false })
const Box2 = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Box2), { ssr: false })


const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

export default function Page() {
  return (
    <>
      <Container>
        <Hero>
          <View orbit  className='flex  h-full w-full flex-col  items-center justify-center'>
            <Suspense fallback={null}>
              <Globe  />
              <Common />
            </Suspense>
          </View>
        </Hero>


        <Benefits data={benefitOne}>
          <View className=' h-full sm:h-48 sm:w-full'>
            <Suspense fallback={null}>
              <Box2 />
              <Common />
            </Suspense>
          </View>
        </Benefits>

        <Benefits imgPos="right" data={benefitTwo}>
          <View className=' h-full sm:h-48 sm:w-full'>
            <Suspense fallback={null}>
              <TorusKnot />
              <Common />
            </Suspense>
          </View>
        </Benefits>

        <Video videoId="iUtnZpzkbG8" />

        <SectionTitle
          preTitle="Testimonials"
          title="Here's what our customers say about DOML"
       />
       

        <Testimonials />


        <SectionTitle preTitle="FAQ" title="Frequently Asked Questions"/>
        

        <Faq />

        <Cta />

        <Footer />
      </Container>

    </>
  )
}
