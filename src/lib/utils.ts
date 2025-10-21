import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as THREE from "three";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomTexture(
  width: number,
  height: number
): THREE.DataTexture {
  const size = width * height * 4;
  const data = new Uint8Array(size);

  for (let i = 0; i < size; i += 4) {
    const rand = Math.random() < 0.5 ? 0 : 255;
    data[i] = rand; // R
    data[i + 1] = rand; // G
    data[i + 2] = rand; // B
    data[i + 3] = 255; // A
  }

  const texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.needsUpdate = true;

  return texture;
}
