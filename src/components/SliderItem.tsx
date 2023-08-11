import Image from 'next/image'

interface Props {text:string, src:string, className?: string}
export default function SliderItem ({text, src, className = ''}: Props) {
    return (
        <div className={className}>
            <p className='text-[#008c93] text-center h-20 px-6'>{text}</p>
            <div className={`w-full`}>
                <Image
                    className="w-full"
                    src={src}
                    alt="Slide"
                    width={478}
                    height={372}
                    priority
                />
            </div>
        </div>
    )
}
