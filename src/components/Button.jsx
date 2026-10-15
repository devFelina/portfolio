const baseClasses =
  "relative inline-flex min-h-11 items-center justify-center overflow-hidden rounded-full font-medium cursor-pointer transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50";

const variantClasses = {
  primary:
    "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90",
  secondary:
    "border border-border-strong bg-surface text-foreground hover:border-accent/50 hover:bg-surface-hover",
  ghost:
    "bg-transparent text-foreground hover:bg-white/5",
  link:
    "min-h-0 rounded-none bg-transparent p-0 text-foreground underline-offset-4 hover:text-accent hover:underline focus-visible:ring-offset-4",
};

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  default: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
  icon: "h-11 w-11 shrink-0 p-0",
};

const getButtonClasses = ({
  variant = "primary",
  size = "default",
  className = "",
} = {}) =>
  `${baseClasses} ${variantClasses[variant] ?? variantClasses.primary} ${
    sizeClasses[size] ?? sizeClasses.default
  } ${className}`.trim();

export const Button = ({
  className = "",
  variant = "primary",
  size = "default",
  type = "button",
  children,
  ...props
}) => (
  <button
    type={type}
    className={getButtonClasses({ variant, size, className })}
    {...props}
  >
    <span className="relative flex items-center justify-center gap-2">
      {children}
    </span>
  </button>
);

export const LinkButton = ({
  className = "",
  variant = "primary",
  size = "default",
  children,
  ...props
}) => (
  <a
    className={getButtonClasses({ variant, size, className })}
    {...props}
  >
    <span className="relative flex items-center justify-center gap-2">
      {children}
    </span>
  </a>
);
