"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Environment } from "@react-three/drei";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Vector3 } from "three";
import { EffectComposer, Noise, Vignette } from "@react-three/postprocessing";

function Rig() {
    const { camera, mouse } = useThree()
    const vec = new Vector3()

    return useFrame(() => {
        camera.position.lerp(vec.set(mouse.x * 0.4, mouse.y * 0.4, camera.position.z), 0.05)
        camera.lookAt(0, 0, 0)
    })
}

export default function GlobalCanvas({ children }) {

    return (
        <Canvas
            className="h-screen w-screen"
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 0,
            }}
            camera={{ position: [0, 0, 5], fov: 35 }}
        >
            <Rig />
            {children}

            <ambientLight intensity={0.3} />
            <pointLight position={[2, 2, 2]} intensity={1} />
            <Environment preset="city" />
            {/* <EffectComposer>
                <Noise opacity={0.02} />
                <Vignette eskil={false} offset={0.1} darkness={1.3} />
            </EffectComposer> */}
        </Canvas>
    );
}