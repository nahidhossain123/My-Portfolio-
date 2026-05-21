import React, { forwardRef, useImperativeHandle, useRef } from 'react'

interface ExperienceCardProps {
    company?: string;
    duration?: string;
    start?: string;
    end?: string;
    service?: string;
    items?: { top: string; bottom: string }[],
    color?: string;
}


const ExperienceCard = forwardRef(({
    company = "Jrnyfy Corp.",
    duration = "1 Year",
    start = "Jan 2023",
    end = "Present",
    service = "WEB/APP",
    items,
    color,

}: ExperienceCardProps, ref) => {
    const mainRef = useRef(null);     // 🔥 rotating part
    const reverseRef = useRef(null);  // 🔥 inner gradient


    // console.log('dragAmountRef', dragAmountRef.value)
    return (
        <div className="w-[600px] relative">
            <div className='absolute z-10 -left-10 top-[76px] bg-[linear-gradient(0deg,black_0%,gray_50%,gray_60%)] w-[60%] h-5'
            />
            {/* Top Section */}
            <div ref={ref}>
                <div className="relative px-8 pt-6 pb-10 bg-gray-950 rounded-t-[35px]">
                    {/* Small top badge */}
                    <div className={`mx-auto w-[120px] h-[120px] rounded-3xl flex flex-col items-center justify-center`} style={{ backgroundColor: color }}>
                        <p className="font-bold text-sm">{service}</p>
                        <div ref={reverseRef} className="w-10 h-10 rounded-full border-2 border-black mt-2 bg-black relative overflow-hidden" >
                            <div className='absolute top-0 bottom-0 my-auto -right-2 bg-[linear-gradient(0deg,black_0%,gray_50%,gray_60%)] w-full h-5' />
                        </div>
                        <p className="text-xs mt-2">{duration}</p>
                    </div>

                    {/* Large WEB text */}
                    <div className='flex items-end gap-2 mt-8'>
                        <h1 className="text-[60px] leading-none font-black ">
                            {company.split(' ')[0]}
                        </h1>
                        <h4 className="text-[30px] leading-none font-black">
                            {company.split(' ')[1]}
                        </h4>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="py-10 border-t-2 border-black rounded-b-[35px]"
                    style={{ backgroundColor: color }}
                >
                    <h2 className="text-2xl font-extrabold tracking-tight leading-none mb-10 px-5">
                        Contributions
                    </h2>

                    {/* Skills Row */}
                    <div className="flex justify-between px-10">
                        {items && items.map((item, i) => (
                            <div key={i} className="relative flex flex-col items-center">

                                {/* Top Text */}
                                <p key={i} className="text-sm font-bold">
                                    {item.top}
                                </p>

                                {/* Triangle */}
                                <div className="w-0 h-0 border-l-8 border-r-8 border-b-10 border-l-transparent border-r-transparent border-b-black mt-1"></div>
                            </div>
                        ))}
                    </div>

                    {/* Divider Line */}
                    <div className="w-full h-1 bg-black"></div>

                    {/* Bottom Row */}
                    <div className="flex justify-between px-5">
                        {items && items.map((item, i) => (
                            <div key={i} className="relative flex flex-col items-center">
                                {/* Triangle */}
                                <div className="w-0 h-0 border-l-8 border-r-8 border-t-10 border-l-transparent border-r-transparent border-t-black">
                                </div>
                                <p key={i} className="text-sm font-bold">
                                    {item.bottom}
                                </p>


                            </div>
                        ))}
                    </div>


                    {/* Divider */}
                    <div className="border-t-2 border-dashed border-black my-10"></div>

                    {/* Footer */}
                    <div className="flex justify-between items-center text-2xl font-extrabold tracking-tight px-5">
                        <span>{start}</span>
                        <span className="text-5xl">→</span>
                        <span>{end}</span>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default ExperienceCard