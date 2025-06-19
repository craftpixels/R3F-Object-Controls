import './index.css';
import React, { useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
// import { ObjectRotationControl } from 'r3f-object-control'; // ← local import
import { RollChair } from './Chair';
import { OrbitControls } from '@react-three/drei';

// function Box(probs: any) {
//     const meshRef = useRef<THREE.Mesh>(null);
//     return (
//         <>
//             <mesh  {...probs} ref={meshRef} castShadow>
//                 <boxGeometry />
//                 <meshStandardMaterial color="orange" />
//             </mesh >
//             <ObjectRotationControl meshRef={meshRef}
//                 dampingFactor={0.2}
//                 enableXRotation={true}
//                 enableYRotation={true} />
//         </>

//     );
// }

function Plane() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial color="#ffffff" />
        </mesh>
    );
}



ReactDOM.createRoot(document.getElementById('root')!).render(

    <Canvas shadows camera={{ position: [0, 2, 9], fov: 35 }}>
        <ambientLight />
        {/* <Box position={[0, 0.5, 0]} /> */}
        {/* <Box position={[-2, 0.5, 0]} /> */}

        {/* <OrbitControls enablePan={false}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3} /> */}
        <RollChair scale={0.03} position={[0, 1.05, 0]} />
        <Plane />
        <directionalLight position={[10, 10, 5]} castShadow />
    </Canvas>
);
