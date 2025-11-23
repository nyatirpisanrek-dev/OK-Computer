'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ShimmeringTextProps {
  text: string;
  className?: string;
  duration?: number;
  repeatDelay?: number;
  tag?: keyof JSX.IntrinsicElements;
}

export const ShimmeringText: React.FC<ShimmeringTextProps> = ({
  text,
  className,
  duration = 1.5,
  repeatDelay = 1,
  tag: Tag = 'p',
}) => {
  const animationStyle = {
    '--shimmer-duration': `${duration}s`,
    '--shimmer-repeat-delay': `${repeatDelay}s`,
  } as React.CSSProperties;

  return (
    <Tag style={animationStyle} className={cn(
      'animate-shimmer bg-clip-text text-transparent relative',
      'bg-[linear-gradient(110deg,#000,45%,#718096,55%,#000)] dark:bg-[linear-gradient(110deg,#fff,45%,#94A3B8,55%,#fff)]',
      'bg-[length:250%_100%]',
      className
    )}>
      <span className="absolute inset-0 text-neutral-900 dark:text-white opacity-75">
        {text}
      </span>
      {text}
    </Tag>
  );
};