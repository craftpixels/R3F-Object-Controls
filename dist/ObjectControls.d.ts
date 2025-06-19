import { Mesh } from 'three';
type ObjectPropertyType = {
    object: React.RefObject<Mesh>;
    orbitControl?: React.RefObject<any>;
    dampingFactor?: number;
    maxRotationX?: number;
    minRotationX?: number;
    enableXRotation?: boolean;
    enableYRotation?: boolean;
};
export declare function ObjectControls({ object, orbitControl, dampingFactor, maxRotationX, minRotationX, enableXRotation, enableYRotation, }: ObjectPropertyType): null;
export {};
