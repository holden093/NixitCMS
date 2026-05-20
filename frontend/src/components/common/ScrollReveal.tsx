import type { PropsWithChildren } from 'react'
import { motion } from 'framer-motion'

interface ScrollRevealProps extends PropsWithChildren {
  className?: string
}

export default function ScrollReveal({ children, className }: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-50px' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
