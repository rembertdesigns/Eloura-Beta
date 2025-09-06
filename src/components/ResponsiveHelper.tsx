import React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveHelperProps {
  children: React.ReactNode;
  className?: string;
}

// Utility component to ensure consistent responsive behavior
export const ResponsiveContainer: React.FC<ResponsiveHelperProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={cn(
      "w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8",
      className
    )}>
      {children}
    </div>
  );
};

// Touch-friendly button wrapper
interface TouchButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const TouchButton: React.FC<TouchButtonProps> = ({
  children,
  onClick,
  disabled = false,
  className,
  variant = 'primary',
  size = 'md'
}) => {
  const baseClasses = "touch-manipulation transition-all duration-200 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:ring-secondary", 
    ghost: "text-foreground hover:bg-accent hover:text-accent-foreground focus:ring-accent"
  };

  const sizeClasses = {
    sm: "min-h-[40px] px-3 py-2 text-sm",
    md: "min-h-[44px] px-4 py-2 text-base", 
    lg: "min-h-[48px] px-6 py-3 text-lg"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </button>
  );
};

// Responsive grid component
interface ResponsiveGridProps {
  children: React.ReactNode;
  cols?: {
    default: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: number;
  className?: string;
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  cols = { default: 1, sm: 2, md: 3, lg: 4 },
  gap = 4,
  className
}) => {
  const gridClasses = [
    `grid`,
    `gap-${gap}`,
    `grid-cols-${cols.default}`,
    cols.sm && `sm:grid-cols-${cols.sm}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`,
  ].filter(Boolean).join(' ');

  return (
    <div className={cn(gridClasses, className)}>
      {children}
    </div>
  );
};

// Responsive text component
interface ResponsiveTextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption';
  className?: string;
}

export const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  children,
  variant = 'body',
  className
}) => {
  const variantClasses = {
    h1: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight",
    h2: "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight",
    h3: "text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold leading-tight",
    h4: "text-base sm:text-lg md:text-xl lg:text-2xl font-medium leading-tight",
    h5: "text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-tight",
    h6: "text-xs sm:text-sm md:text-base lg:text-lg font-medium leading-tight",
    body: "text-sm sm:text-base md:text-lg leading-relaxed",
    caption: "text-xs sm:text-sm leading-relaxed"
  };

  const Component = variant.startsWith('h') ? variant as keyof JSX.IntrinsicElements : 'p';

  return (
    <Component className={cn(variantClasses[variant], className)}>
      {children}
    </Component>
  );
};