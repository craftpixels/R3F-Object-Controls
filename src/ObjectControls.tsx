import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { MathUtils, Euler, Raycaster, Vector2, Mesh } from "three";

type ObjectPropertyType = {
    object: React.RefObject<Mesh>;
    orbitControl?: React.RefObject<any>;
    dampingFactor?: number;
    maxRotationX?: number;
    minRotationX?: number;
    enableXRotation?: boolean;
    enableYRotation?: boolean;
};

type TouchPosType = { x: number; y: number };

export function ObjectControls({
    object,
    orbitControl,
    dampingFactor = 0.1,
    maxRotationX = Math.PI / 2,
    minRotationX = -Math.PI / 2,
    enableXRotation = true,
    enableYRotation = true,
}: ObjectPropertyType) {
    const { gl, camera } = useThree();

    const [isRotating, setIsRotating] = useState(false);
    const [initialTouchPos, setInitialTouchPos] = useState<TouchPosType>({ x: 0, y: 0 });
    const startRotationRef = useRef(new Euler());
    const targetRotationRef = useRef(new Euler());

    const raycaster = useRef(new Raycaster());
    const pointer = useRef(new Vector2());

    const isPointerOnObject = (clientX: number, clientY: number): boolean => {
        const rect = gl.domElement.getBoundingClientRect();
        pointer.current.x = ((clientX - rect.left) / rect.width) * 2 - 1;
        pointer.current.y = -((clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.current.setFromCamera(pointer.current, camera);
        const intersects = raycaster.current.intersectObject(object.current, true);
        return intersects.length > 0;
    };

    const handleStart = (x: number, y: number) => {
        if (!isPointerOnObject(x, y)) return;

        setIsRotating(true);
        setInitialTouchPos({ x, y });
        if (object.current) {
            startRotationRef.current.copy(object.current.rotation);
        }
    };

    const handleMove = (x: number, y: number) => {
        if (!isRotating || !object.current) return;

        const dx = x - initialTouchPos.x;
        const dy = y - initialTouchPos.y;

        const newX = enableXRotation ? startRotationRef.current.x + dy * 0.01 : object.current.rotation.x;
        const newY = enableYRotation ? startRotationRef.current.y + dx * 0.01 : object.current.rotation.y;

        targetRotationRef.current.set(newX, newY, 0);
    };

    useEffect(() => {
        const canvas = gl.domElement;

        canvas.style.cursor = isRotating ? "grabbing" : "default";

        const onMouseDown = (e: MouseEvent) => handleStart(e.clientX, e.clientY);
        const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
        const onMouseUp = () => setIsRotating(false);

        const onTouchStart = (e: TouchEvent) => {
            if (e.touches.length === 1) {
                e.preventDefault();
                handleStart(e.touches[0].clientX, e.touches[0].clientY);
            }
        };

        const onTouchMove = (e: TouchEvent) => {
            if (e.touches.length === 1) {
                e.preventDefault();
                handleMove(e.touches[0].clientX, e.touches[0].clientY);
            }
        };

        const onTouchEnd = () => setIsRotating(false);

        canvas.addEventListener("mousedown", onMouseDown);
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mouseup", onMouseUp);

        canvas.addEventListener("touchstart", onTouchStart, { passive: false });
        canvas.addEventListener("touchmove", onTouchMove, { passive: false });
        canvas.addEventListener("touchend", onTouchEnd);

        return () => {
            canvas.removeEventListener("mousedown", onMouseDown);
            canvas.removeEventListener("mousemove", onMouseMove);
            canvas.removeEventListener("mouseup", onMouseUp);

            canvas.removeEventListener("touchstart", onTouchStart);
            canvas.removeEventListener("touchmove", onTouchMove);
            canvas.removeEventListener("touchend", onTouchEnd);
        };
    }, [gl, isRotating, enableXRotation, enableYRotation]);

    useEffect(() => {
        // Toggle orbit control on/off based on rotation state
        if (orbitControl && orbitControl.current) {
            orbitControl.current.enabled = !isRotating;
        }
    }, [isRotating, orbitControl]);

    useFrame(() => {
        const mesh = object.current;
        if (!mesh) return;

        const current = mesh.rotation;
        const target = targetRotationRef.current;

        const clampedX = MathUtils.clamp(target.x, minRotationX, maxRotationX);

        if (enableXRotation) {
            current.x = MathUtils.lerp(current.x, clampedX, dampingFactor);
        }
        if (enableYRotation) {
            current.y = MathUtils.lerp(current.y, target.y, dampingFactor);
        }
    });

    return null;
}
