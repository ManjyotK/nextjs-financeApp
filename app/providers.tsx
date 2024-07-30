'use client'

import {NextUIProvider} from '@nextui-org/react'

/**
 * Providers component is responsible for wrapping the entire application
 * with NextUIProvider component.
 *
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The children to be rendered.
 * @return {JSX.Element} The Providers component.
 */
export function Providers({children}: { children: React.ReactNode }) {
  // Render the Providers component
  return (
    // NextUIProvider component from @nextui-org/react
    <NextUIProvider>
      {/* Render the children */}
      {children}
    </NextUIProvider>
  )
}
