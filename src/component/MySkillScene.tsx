'use client';
import { Canvas } from '@react-three/fiber'
import React from 'react'
import { Model } from './Keyboard'
import { Environment, OrbitControls } from '@react-three/drei'

const MySkillScene = () => {
    return (
        <Canvas className='h-full w-full' shadows camera={{ position: [2, 2, 2], fov: 50 }}>
            <ambientLight intensity={0.3} />


            <Environment preset="city" />  {/* 🔥 THIS IS KEY */}

            <Model scale={3} />
            <OrbitControls />
        </Canvas>
    )
}

export default MySkillScene