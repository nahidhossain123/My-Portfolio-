'use client';
import { Canvas, useThree } from '@react-three/fiber'
import React from 'react'
import { Model } from './Keyboard'
import { Environment, OrbitControls, Text } from '@react-three/drei'
import { Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import SoftBodyText from './SoftBodyText';
import ScrollingPaper from './ScrollingPaper';
import BetterCornerCurl from './ScrollingPaper';
import PerfectCornerCurl from './ScrollingPaper';
import SmoothCurl from './ScrollingPaper';
import ScrollingCornerPaper from './ScrollingPaper';
import FullCornerRoll from './ScrollingPaper';
import PaperReveal from './ScrollingPaper';
import TopLeftRoll from './ScrollingPaper';
import TopLeftPaperRoll from './ScrollingPaper';
import BottomLeftUnroll from './ScrollingPaper';
import ScrollingUnroll from './ScrollingPaper';
import PaperCurl from './ScrollingPaper';
import GsapPaperCurl from './ScrollingPaper';
import PaperCurlGSAP from './ScrollingPaper';
import CornerRollPaper from './ScrollingPaper';
import CornerRollFixed from './ScrollingPaper';
import CornerRoll from './ScrollingPaper';
import PaperUnfold from './ScrollingPaper';
import PaperMesh from './ScrollingPaper';

function Rig() {
    const { camera, mouse } = useThree()
    const vec = new Vector3()

    return useFrame(() => {
        camera.position.lerp(vec.set(mouse.x * 0.1, mouse.y * 0.1, camera.position.z), 0.1)
        camera.lookAt(0, 0, 0)
    })
}

const MySkillScene = () => {
    return (
        <Canvas className='h-full w-full mb-40' shadows camera={{ position: [2, 2, 2], fov: 50 }}>
            <ambientLight intensity={0.3} />
            <Rig />
            <pointLight color={'red'} position={[0, 0, 0]} distance={10} intensity={1} castShadow />
            <Environment preset="city" />
            {/* <SoftBodyText text="My Skills" glow={1.2} speed={0.8} position={[0, 0.8, 0]} />
            <Model scale={3} /> */}
            <ScrollingPaper />
            {/* <EffectComposer>
                <Noise opacity={0.02} />
            </EffectComposer>  */}
        </Canvas>
    )
}

export default MySkillScene