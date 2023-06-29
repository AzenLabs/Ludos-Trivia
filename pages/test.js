import dynamic from 'next/dynamic';
const Slide1 = dynamic(() => import("../components/slides/slide_1"), { ssr: false, })

export default function Test(){
  return (
    <>
      <Slide1/>
    </>
  )
}