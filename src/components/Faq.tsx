'use client'
import React from 'react'
import { Container } from '@/components/Container'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/24/solid'

export const Faq = () => {
  return (
    <Container className='!p-0'>
      <div className='w-full max-w-2xl p-2 mx-auto mt-3 rounded-2xl '>
        {faqdata.map((item, index) => (
          <div key={item.question} className='mb-5 '>
            <Disclosure>
              {({ open }) => (
                <>
                  <DisclosureButton className='flex dark:bg-trueGray-800 items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 dark:bg-trueGray-800 dark:text-gray-200'>
                    <span>{item.question}</span>
                    <ChevronUpIcon className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-indigo-500`} />
                  </DisclosureButton>
                  <DisclosurePanel className='px-4 pt-4 pb-2 text-gray-500 dark:text-gray-300'>
                    {item.answer}
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </Container>
  )
}
const faqdata = [
  {
    question: 'What is DOML?',
    answer: 'DOML is a digital media agency powered by AI that delivers real-time, data-driven insights to help businesses understand and engage their audience more effectively.',
  },
  {
    question: 'How does DOML improve my marketing strategy?',
    answer: 'DOML uses AI to analyze customer data, automate decision-making, and provide strategic insights, so you can run smarter campaigns and boost ROI.',
  },
  {
    question: 'Is DOML suitable for startups and small businesses?',
    answer: "Yes! DOML is built to support businesses of all sizes. Whether you're a startup or an established brand, our tools scale to meet your needs.",
  },
  {
    question: 'Do I need technical skills to use DOML?',
    answer: 'No technical background is required. DOML’s intuitive dashboard and guided workflows make it easy for marketers to operate without writing a single line of code.',
  },
  {
    question: 'How does DOML protect my data?',
    answer: 'We follow strict data privacy and security protocols, ensuring your business and customer information stays confidential and protected.',
  },
  {
    question: 'Can DOML integrate with tools I already use?',
    answer: 'Absolutely. DOML seamlessly connects with popular platforms like Google Analytics, Mailchimp, HubSpot, and more.',
  },
  {
    question: 'Is there a trial or demo version of DOML?',
    answer: 'Yes, we offer a 14-day free trial with full access to DOML’s features so you can experience its power firsthand.',
  },
];
