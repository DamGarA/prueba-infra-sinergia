import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '@/utils'
import { Loader } from '@/components/icons'

const buttonVariants = cva(
  'inline-flex items-center cursor-pointer justify-center whitespace-nowrap duration-200 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white shadow-lg hover:shadow-primary/10 duration-200',
        destructive: 'bg-destructive/70 text-destructive-foreground shadow-sm border border-destructive',
        outline: 'border border-neutral-800 shadow-sm hover:bg-neutral-950',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm',
        ghost: 'hover:bg-background',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-10 rounded-lg px-8',
        icon: 'size-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean | null
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, loading = null, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), loading && 'flex gap-2 items-center justify-center')}
        ref={ref}
        {...props}
        disabled={props?.disabled || (loading as boolean)}
      >
        {children}
        {loading && <Loader />}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
