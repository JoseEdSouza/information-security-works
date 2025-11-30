declare module '@/components/Particles' {
  import { FC } from 'react'

  interface ParticlesProps {
    particleCount?: number
    particleSpread?: number
    speed?: number
    particleColors?: string[]
    moveParticlesOnHover?: boolean
    particleHoverFactor?: number
    alphaParticles?: boolean
    particleBaseSize?: number
    sizeRandomness?: number
    cameraDistance?: number
    disableRotation?: boolean
    pixelRatio?: number
    className?: string
  }

  const Particles: FC<ParticlesProps>
  export default Particles
}
