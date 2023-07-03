import React from 'react';
import { easing } from 'maath';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';

const Model = ({ link }) => {
  const { nodes, materials } = useGLTF(link);

  const logoTexture = useTexture('./threejs.png');
  const fullTexture = useTexture('./threejs.png');

  useFrame((state, delta) =>
    easing.dampC(materials.lambert1.color, '#EFBD48', 0.25, delta)
  );

  return (
    <group>
      <mesh
        castShadow
        geometry={nodes.T_3DModel_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        <Decal
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          scale={1}
          map={fullTexture}
        />

        <Decal
          position={[0, 0.04, 0.15]}
          rotation={[0, 0, 0]}
          scale={0.15}
          map={logoTexture}
          mapAnisotropy={16}
          depthTest={false}
          depthWrite={true}
        />
      </mesh>
    </group>
  );
};

export default Model;
