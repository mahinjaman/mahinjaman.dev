'use client';

import { AnimatePresence, motion, useInView, type HTMLMotionProps } from 'framer-motion';
import * as React from 'react';

interface GradualSpacingProps<T extends keyof React.JSX.IntrinsicElements> {
  text: string;
  className?: string;
  as?: T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  motionProps?: HTMLMotionProps<any>;
}

export function GradualSpacing<T extends keyof React.JSX.IntrinsicElements = 'span'>({
  text = 'Gradual Spacing',
  as,
  className = 'inline-block text-xl sm:text-4xl md:text-6xl font-bold tracking-tighter',
  motionProps = {},
}: GradualSpacingProps<T>) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  const Component = (as || 'span') as keyof typeof motion;
  const MotionTag = motion[Component] as React.ElementType;

  return (
    <span ref={ref} className="inline-flex flex-wrap justify-center">
      <AnimatePresence>
        {text.split('').map((char, i) => (
          <MotionTag
            key={i}
            initial={{ opacity: 0, x: -2 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className={className}
            {...motionProps}
          >
            {char === ' ' ? '\u00A0' : char}
          </MotionTag>
        ))}
      </AnimatePresence>
    </span>
  );
}