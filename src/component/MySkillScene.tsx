'use client';

import { useRef } from 'react'
import { Model } from './Keyboard'

import * as THREE from 'three'

import { useFrame } from '@react-three/fiber';



const MySkillScene = ({ yRef }) => {

    // const sectionRef = useRef(null);
    // const text1Ref = useRef(null);
    // const text2Ref = useRef(null);
    const modelRef = useRef(null)
    // const [modelReady, setModelReady] = React.useState(false);

    // useGSAP(() => {
    //     const words = gsap.utils.toArray(".word");
    //     const words2 = gsap.utils.toArray(".word2");

    //     const tl = gsap.timeline({
    //         scrollTrigger: {
    //             trigger: '#skills',
    //             start: "50% center",
    //             end: "bottom center",
    //             scrub: true,
    //         },
    //     });

    //     // 🔹 Word highlight (main effect)
    //     tl.fromTo(modelRef.current.position,
    //         { y: -10 },
    //         { y: 0 }
    //     );

    //     tl.fromTo(modelRef.current.position,
    //         { y: 0 },
    //         { y: 10 }
    //         , 0.8);



    // },);

    useFrame(() => {
        if (!modelRef.current) return;

        modelRef.current.position.y = THREE.MathUtils.lerp(
            modelRef.current.position.y,
            yRef.current.value,
            0.1
        );
    });
    return (


        <group ref={modelRef} >
            <Model scale={3} />
        </group>


    )
}

export default MySkillScene