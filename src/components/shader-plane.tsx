import { getRandomTexture } from "@/lib/utils";
import { useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export default function ShaderPlane() {
  const { gl, size, scene, camera } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  const initTexture = useMemo(() => {
    // 픽셀 데이터를 저장할 배열 생성 (가로 x 세로 x 4 (RGBA))
    return getRandomTexture(size.width, size.height);
  }, [size]);
  // 렌더 타겟 초기화
  const initScene = new THREE.Scene();
  const initMaterial = new THREE.MeshBasicMaterial({ map: initTexture });
  const initPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(size.width, size.height),
    initMaterial
  );
  initScene.add(initPlane);

  return (
    <mesh>
      <planeGeometry args={[size.width, size.height]} />
      <meshBasicMaterial map={initTexture} toneMapped={false} />
    </mesh>
  );
}
