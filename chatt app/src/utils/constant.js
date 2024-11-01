import animationData from "@/assets/lottie-json";
export const colors = [
    "bg-[#fff] text-[#f59e0b] border-[2px] border-[#f59e0b]", // Bright yellow-orange
    "bg-[#fde68a] text-[#e11d48] border-[2px] border-[#e11d48]", // Soft peach with vivid red
    "bg-[#e0f2fe] text-[#3b82f6] border-[2px] border-[#3b82f6]", // Light blue with bold blue
    "bg-[#f0abfc] text-[#a855f7] border-[2px] border-[#a855f7]", // Light pink with vibrant purple
    "bg-[#e4e7eb] text-[#10b981] border-[2px] border-[#10b981]", // Neutral gray with striking green
  ];
  export const getColor = (index) => {
    if (index >= 0 && index < colors.length) {
      return colors[index];
    }
    return colors[0];
  };
  
  export const AnimationDefaultOption = {
    loop: true,
    autoplay: true,
    animationData,
  };