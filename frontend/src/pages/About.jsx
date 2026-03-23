import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} className='w-full md:max-w-[450px]' alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam aspernatur atque ex, debitis, mollitia nihil animi eligendi quasi vitae, ea unde iusto vero repudiandae. Impedit dolore dolorem tenetur laudantium libero.</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis dolor illum voluptatibus doloremque magni odit excepturi, tempora numquam ipsum, ipsa explicabo nam nulla, quas magnam placeat et quis maiores! Perferendis?</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde, nulla est? Ducimus ullam adipisci modi doloribus, et nostrum! Fuga illum dolor eveniet sint magni corporis, libero est qui quisquam officia.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurrance</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur voluptatem rem, earum est, dolorum magnam unde perspiciatis quos voluptate possimus doloribus sint temporibus veritatis? Error at non minima nulla qui?</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur voluptatem rem, earum est, dolorum magnam unde perspiciatis quos voluptate possimus doloribus sint temporibus veritatis? Error at non minima nulla qui?</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur voluptatem rem, earum est, dolorum magnam unde perspiciatis quos voluptate possimus doloribus sint temporibus veritatis? Error at non minima nulla qui?</p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default About