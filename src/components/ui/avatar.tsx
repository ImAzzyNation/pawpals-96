// components/SimpleAvatar.tsx
import React from "react"

interface SimpleAvatarProps {
  src?: string
  alt: string
  fallback: string
}

const SimpleAvatar: React.FC<SimpleAvatarProps> = ({ src, alt, fallback }) => {
  return src ? (
    <img src={src} alt={alt} className="w-10 h-10 rounded-full object-cover" />
  ) : (
    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-white">
      {fallback}
    </div>
  )
}

export default SimpleAvatar
