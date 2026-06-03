import { Download } from "lucide-react";

export const AnimatedBorderButton = () => {
    return (
        // Added "relative" so the absolute SVG stays inside the button
        <button className="relative bg-transparent border border-border
        text-foreground hover:border-primary/50 transition-all
        duration-1000 focus:outliine-none focus-visible:ring-2
        focus-visible:ring-primary foucs-visible:ring-offset-2
        disabled:opactity-50 disabled:cursor-not-allowed group
        px-8 py-4 text-lg font-medium rounded-full overflow-visible
        animated-border"> 
            
            {/* Animated SVG Border */}
            <svg 
                className="absolute left-0 top-0 w-full h-full" 
                pointerEvents="none" 
                viewBox="0 0 200 60" 
                preserveAspectRatio="none"
                style={{ overflow: "visible" }}
            >
                <path
                    d="M 30, 1 A 29, 29 0 0 0 1,30 L 1, 30 A 29, 29 0 0 0 30,59 L 170,59 A 29, 29 0 0 0 199,30 L 199,30 A 29, 29 0 0 0 170,1 L 30,1 Z"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="2"
                    strokeDasharray="400 550"
                    strokeDashoffset="400"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animated-border-path"
                />
            </svg>

            {/* Added relative and z-index to ensure text is above the SVG */}
            <span className="relative z-10 flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Download CV
            </span>
        </button>
    );
};