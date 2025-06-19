import * as THREE from 'three'
import React, { JSX, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { ObjectControls } from 'r3f-object-controls';

type GLTFResult = GLTF & {
    nodes: {
        ['Top-Chair']: THREE.Mesh
        ['Top-Chair_1']: THREE.Mesh
        ['Top-Chair_2']: THREE.Mesh
        ['Top-Chair_3']: THREE.Mesh
        ['Bottom-Chair']: THREE.Mesh
        ['Bottom-Chair_1']: THREE.Mesh
        ['Bottom-Chair_2']: THREE.Mesh
    }
    materials: {
        BlackMetal: THREE.MeshStandardMaterial
        Lether: THREE.MeshStandardMaterial
        Matteplastic: THREE.MeshStandardMaterial
        Chairback: THREE.MeshStandardMaterial
        Chrome: THREE.MeshStandardMaterial
    }
}

export function RollChair(props: JSX.IntrinsicElements['group']) {
    const topMeshRef = useRef<THREE.Mesh>(null);
    const { nodes, materials } = useGLTF('/rollchair1_50648.glb') as unknown as GLTFResult
    return (
        <>
            <group {...props} dispose={null}>
                <group name="Scene">
                    <group name="Top" ref={topMeshRef}>
                        <mesh
                            name="Top-Chair"
                            castShadow
                            receiveShadow
                            geometry={nodes['Top-Chair'].geometry}
                            material={materials.BlackMetal}
                        />
                        <mesh
                            name="Top-Chair_1"
                            castShadow
                            receiveShadow
                            geometry={nodes['Top-Chair_1'].geometry}
                            material={materials.Lether}
                        />
                        <mesh
                            name="Top-Chair_2"
                            castShadow
                            receiveShadow
                            geometry={nodes['Top-Chair_2'].geometry}
                            material={materials.Matteplastic}
                        />
                        <mesh
                            name="Top-Chair_3"
                            castShadow
                            receiveShadow
                            geometry={nodes['Top-Chair_3'].geometry}
                            material={materials.Chairback}
                        />
                    </group>
                    <group name="Bottom">
                        <mesh
                            name="Bottom-Chair"
                            castShadow
                            receiveShadow
                            geometry={nodes['Bottom-Chair'].geometry}
                            material={materials.Matteplastic}
                        />
                        <mesh
                            name="Bottom-Chair_1"
                            castShadow
                            receiveShadow
                            geometry={nodes['Bottom-Chair_1'].geometry}
                            material={materials.BlackMetal}
                        />
                        <mesh
                            name="Bottom-Chair_2"
                            castShadow
                            receiveShadow
                            geometry={nodes['Bottom-Chair_2'].geometry}
                            material={materials.Chrome}
                        />
                    </group>
                </group>
            </group>
            <ObjectControls object={topMeshRef}
                dampingFactor={0.2}
                enableXRotation={false}
                enableYRotation={true} />
        </>
    )
}

useGLTF.preload('/rollchair1_50648.glb')