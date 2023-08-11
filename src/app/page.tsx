'use client'
import SliderItem from "@/components/SliderItem";
import {useEffect, useRef, useState} from "react";

const items = [
    {
        text: 'DiscipleMaker serves as a tool to help you grow, learn, and connect with your Disciples.',
        src: '/slide1.png'
    },
    {text: 'Did you know that XX.XXX.XXX people from all over the world are in our network?', src: '/slide2.png'},
    {
        text: '9.5 out of every 10 Disciples say that they have grown in their journey with Jesus through Discipling.',
        src: '/slide3.png'
    }
]
export default function Home() {
    // const intersectionsMap = useRef(new Map<number, number>)
    const [currentSlide, setCurrentSlide] = useState(0)
    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleSlide = (index: number) => {
        wrapperRef.current?.children[index].scrollIntoView({behavior: "smooth"})
    }

    useEffect(() => {
        const wrapper = wrapperRef.current
        if (!wrapper) {
            return
        }

        //holds the item index with the current intersection ratio
        const intersectionsMap = new Map<number, number>()

        function setCurrentSlideToIndexWithMostIntersectionRatio() {
            if (intersectionsMap.size === 0) {
                // when there is no element, simply set 0
                setCurrentSlide(0)
                return
            }

            // we know there are items, we pick the one with most intersection ratio (the one most visible)
            const intersectionsArray = Array.from(intersectionsMap.entries())
            const sorted = intersectionsArray.sort((a, b) => b[1] - a[1])
            const mostVisible = sorted[0];
            setCurrentSlide(mostVisible[0])
        }

        // tracks intersection ratio changes to several elements, to know which one has the highest value
        const observer = new IntersectionObserver(changedEntries => {
            // for each changed entry, replace the index-intersectionRatio value
            changedEntries.forEach(entry => {
                const index = Number(entry.target.getAttribute('data-item-index'))
                intersectionsMap.set(index, entry.intersectionRatio)
            })

            setCurrentSlideToIndexWithMostIntersectionRatio();
        }, {threshold: [0, .1, .9, 1]})

        // observe each child of the component, to track when their intersection ratio changes
        for (let i = 0; i < wrapper.childElementCount; i++) {
            observer.observe(wrapper.children[i])
        }
    }, [])

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <div className="relative w-full flex snap-x overflow-x-auto snap-mandatory snap-x no-scrollbar"
                 ref={wrapperRef}>
                {items.map((item, index) => (
                    <div key={index} className="w-full min-w-full snap-center" data-item-index={index}>
                        <SliderItem text={item.text} src={item.src} className="pt-20"/>
                    </div>
                ))}
            </div>
            <div className="bg-[#008c93] h-full flex flex-col flex-1 w-full items-center gap-16">
                <div className='flex flex-col gap-2'>
                <div className='text-white font-medium text-xs'>SWIPE TO LEARN MORE</div>
                <div className='flex gap-4 justify-center'>
                    {items.map((item, index) => (
                        <button key={index} onClick={() => handleSlide(index)}
                                className={`rounded-full w-4 h-4 border border-2 border-white ${currentSlide === index ? 'bg-white' : 'bg-transparent'}`}/>
                    ))}
                </div>
                </div>
                <div className='text-center flex flex-col gap-5'>
                    <button className='bg-[#d19f2a] py-4 px-14 w-fit rounded-full text-white font-semibold tracking-widest'>GET STARTED!</button>
                    <div className='text-white font-semibold tracking-widest'>LOG IN</div>
                </div>
            </div>
        </main>
    )
}
