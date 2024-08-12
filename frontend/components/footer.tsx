import React from 'react'

import { cn } from '@/lib/utils'
import { FooterLink } from '@/components/footer-link'

export function Footer({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'px-2 text-center text-xs leading-normal text-zinc-500',
        className
      )}
      {...props}
    >
      Open source app powered by{' '}
      <FooterLink href="https://ai.google.dev/gemini-api">
        Google Gemini
      </FooterLink>
      , built by <FooterLink href="https://github.com/danielbacsur">Daniel Bacsur</FooterLink> and{' '}
      <FooterLink href="https://github.com/vjdad4m">
        Adam Vajda
      </FooterLink>
      .
    </p>
  )
}