"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ReactNode } from "react";
import { Environment } from "@react-three/drei";
import { Vector3 } from "three";

function Rig() {
    const { camera, mouse } = useThree()
    const vec = new Vector3()

    return useFrame(() => {
        camera.position.lerp(vec.set(mouse.x * 0.4, mouse.y * 0.4, camera.position.z), 0.05)
        camera.lookAt(0, 0, 0)
    })
}

interface GlobalCanvasType {
    children: ReactNode
}

export default function GlobalCanvas({ children }: GlobalCanvasType) {

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
        </Canvas>
    );
}