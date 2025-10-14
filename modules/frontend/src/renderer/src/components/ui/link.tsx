import { cva, type VariantProps } from 'class-variance-authority'
import { Link as ReactRouterLink } from 'react-router'
import { cn } from '@renderer/lib/utils'

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof linkVariants> {}

const linkVariants = cva(
  'inline-flex cursor-pointer items-center justify-center whitespace-nowrap duration-200 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        button: 'bg-primary text-white shadow-lg hover:shadow-primary/10 duration-200 px-4',
        destructive: 'bg-destructive/70 text-destructive-foreground shadow-sm border border-destructive',
        outline: 'border border-neutral-850 bg-background shadow-sm hover:bg-accent',
        secondary: 'bg-secondary border border-secondary text-secondary-foreground shadow-sm hover:border-neutral-700',
        ghost: 'hover:bg-background',
        default: 'items-start justify-start',
      },
      size: {
        default: 'h-9',
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

export function Link({ children, variant, size, className, ...props }: Props) {
  // const className = cn(buttonVariants({ variant, className: props.className, size }))
  if (props.href?.startsWith('http')) {
    return (
      <a href={props.href} {...props} className={cn(linkVariants({ variant, size, className }))}>
        {children}
      </a>
    )
  }

  return (
    <ReactRouterLink to={props.href || ''} {...props} className={cn(linkVariants({ variant, size, className }))}>
      {children}
    </ReactRouterLink>
  )
}
