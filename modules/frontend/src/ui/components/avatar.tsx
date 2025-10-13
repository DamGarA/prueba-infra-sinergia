import { AvatarFallback, AvatarImage, Avatar as AvatarPrimitive } from '@/components/shadcn/avatar'
import { cn } from '@/utils'

export function Avatar({ alt, src, className }: { alt: string; src: string; className?: string }) {
  return (
    <AvatarPrimitive className={cn('cursor-pointer', className)}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{alt?.charAt(0)?.toLocaleUpperCase() || '?'}</AvatarFallback>
    </AvatarPrimitive>
  )
}
