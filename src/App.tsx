import { Canvas } from "@react-three/fiber";

import ShaderPlane from "./components/shader-plane";
function App() {
  return (
    <div className="h-screen flex flex-col">
      <header className="p-6">
        <h1 className="text-2xl font-semibold">Ising Model</h1>
      </header>
      <Canvas
        className="flex-1"
        orthographic
        camera={{ zoom: 1, position: [0, 0, 10] }}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  );
}

export default App;
