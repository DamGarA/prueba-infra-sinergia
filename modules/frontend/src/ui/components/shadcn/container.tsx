import { type AllHTMLAttributes, createElement, type ElementType, type ReactNode } from 'react'
import { cn } from '@/utils'

type Props = AllHTMLAttributes<ElementType> & {
  children: ReactNode
  component?: ElementType
}

export function Container({ component, children, className, ...props }: Props) {
  return createElement(component || 'div', { ...props, className: cn('container mx-auto', className) }, children)
}
