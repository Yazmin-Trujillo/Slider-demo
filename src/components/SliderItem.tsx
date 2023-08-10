import Image from 'next/image'

interface Props {text:string, src:string, className?: string}
export default function SliderItem ({text, src, className = ''}: Props) {
    return (
        <div className={className}>
            <p className='text-[#008c93] text-center mb-12'>{text}</p>
            <div className={`w-full`}>
                <Image
                    className="w-full"
                    src={src}
                    alt="Slide"
                    width={180}
                    height={37}
                    priority
                />
            </div>
        </div>
    )
}
