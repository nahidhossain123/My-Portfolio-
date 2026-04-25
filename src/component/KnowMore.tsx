import { useLoader } from '@react-three/fiber'
import React from 'react'
import * as THREE from 'three';

const KnowMore = () => {
    const texture = useLoader(THREE.TextureLoader, '/knowmore1.jpg')
    return (
        <>
            <mesh position={[0, 0, -1]}>
                <planeGeometry args={[10, 6]} />
                <meshBasicMaterial
                    map={texture}
                    transparent
                    opacity={0.9}
                    blending={THREE.MultiplyBlending}
                />
            </mesh>
        </>
    )
}

export default KnowMore