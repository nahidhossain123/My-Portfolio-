import React, { useRef, useMemo } from 'react'
import { useFrame, extend, useThree } from '@react-three/fiber'
import { shaderMaterial, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useControls } from 'leva'
import SuperGlowText from './SoftBodyText'

const PaperCurlMaterial = shaderMaterial(
    {
        uProgress: 0,
        uRadius: 0.3,
        uFoldStart: 0.5,
        uTexture: null
    },
    // Vertex Shader
    `
  varying vec2 vUv;
  uniform float uProgress;
  uniform float uRadius;
  uniform float uFoldStart;

  void main() {
     vUv = uv;

  vec3 pos = position;
float dist = (pos.x + pos.y) - uProgress;
    if (dist > 0.0) {
        // 2. Calculate rotation angle based on distance past the axis
        float angle = dist / uRadius;
        
        // 3. Limit the roll to a half-circle (optional) or full roll
        // If angle > PI, it has rolled completely over to the back
        
        // 4. Apply cylindrical transformation
        // Calculate projection vector (direction of the roll)
        vec2 rollDir = normalize(vec2(1.0, 1.0)); 
        // Offset the vertex position
        // We move 'backwards' from the axis by R * sin(theta) 
        // and 'upwards' by R * (1 - cos(theta))
        pos.xy -= rollDir*(dist-uRadius*sin(angle));
        pos.z = uRadius * (1.0 - cos(angle));
    }
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
  `,
    // Fragment Shader
    `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  void main() {
    vec4 tex = texture2D(uTexture, vUv);
    gl_FragColor = tex;
  }
  `
)

extend({ PaperCurlMaterial })

export default function ScrollingPaper({ curlProgress }) {
    const { viewport } = useThree();
    const tex = useTexture('/knowmore1.jpg')
    const materialRef = useRef();

    const { progress, radius, foldStart } = useControls({
        progress: { value: 0.0, min: 0, max: 1 },
        radius: { value: 0.5, min: 0.1, max: 1 },
        foldStart: { value: 0.5, min: -5, max: 5 }
    });

    useFrame(() => {
        // Calculate scroll progress (0 to 1)
        const scrollY = window.scrollY
        const maxScroll = document.body.scrollHeight - window.innerHeight
        const progress = (scrollY / maxScroll)
        if (!materialRef.current) return;

        console.log('scrollY', (2500 - scrollY) * 0.1, curlProgress.current.value)
        materialRef.current.uniforms.uProgress.value = curlProgress.current.value;
        materialRef.current.uniforms.uRadius.value = radius;
        materialRef.current.uniforms.uFoldStart.value = foldStart;

    })

    return (
        <mesh>
            {/* High segments are critical for the "soft" bend */}
            <planeGeometry
                args={[viewport.width, viewport.height, 100, 100]} />
            <paperCurlMaterial
                ref={materialRef}
                uTexture={tex}
                side={THREE.DoubleSide}
                transparent
            />
        </mesh>
    )
}