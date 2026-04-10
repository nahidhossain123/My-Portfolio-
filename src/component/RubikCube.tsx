'use client'
import * as THREE from "three";
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'

function Cube({ position }) {
  const colors = ['red', 'orange', 'white', 'yellow', 'green', 'blue'] // R L U D F B
  return (
    <>
      <mesh position={position} >
        <boxGeometry args={[0.95, 0.95, 0.95]} />
        <meshStandardMaterial attach="material-0" color={colors[0] || 'black'} /> {/* right */}
        <meshStandardMaterial attach="material-1" color={colors[1] || 'black'} /> {/* left */}
        <meshStandardMaterial attach="material-2" color={colors[2] || 'black'} /> {/* top */}
        <meshStandardMaterial attach="material-3" color={colors[3] || 'black'} /> {/* bottom */}
        <meshStandardMaterial attach="material-4" color={colors[4] || 'black'} /> {/* front */}
        <meshStandardMaterial attach="material-5" color={colors[5] || 'black'} /> {/* back */}
      </mesh>
    </>
  )
}

const Rubik = () => {
  return (
    <group>
      {[-1, 0, 1].map(x =>
        [-1, 0, 1].map(y =>
          [-1, 0, 1].map(z =>
            <Cube key={`${x}${y}${z}`} position={[x, y, z]} />
          )
        )
      )}
    </group>
  )
}

const RubikCube = () => {
  return (
    <div className="w-screen h-screen">
      <Canvas shadows camera={{ position: [10, 10, 15], fov: 30 }}>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Rubik />
      </Canvas>
    </div>
  )
}

export default RubikCube