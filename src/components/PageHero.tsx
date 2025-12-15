import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({
  title,
  subtitle,
  backgroundImage,
  children,
  align = 'center',
  className,
}) => {
  return (
    <div className={cn("relative overflow-hidden bg-brand-deep text-white", className)}>
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt={title}
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-transparent to-transparent" />
        </div>
      )}
      <div className={cn(
        "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24",
        align === 'center' ? 'text-center' : 'text-left'
      )}>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          {title}
        </h1>
        {subtitle && (
          <p className={cn(
            "text-xl text-brand-light max-w-2xl mb-8",
            align === 'center' ? 'mx-auto' : ''
          )}>
            {subtitle}
          </p>
        )}
        {children && (
          <div className={cn(
            "flex flex-col sm:flex-row gap-4",
            align === 'center' ? 'justify-center' : ''
          )}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
