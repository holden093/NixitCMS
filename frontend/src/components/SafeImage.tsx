import { useState, type ImgHTMLAttributes, type SyntheticEvent } from 'react'
import { ImageOff } from 'lucide-react'

type SafeImageProps = ImgHTMLAttributes<HTMLImageElement>

export default function SafeImage({
  alt = '',
  className = '',
  onError,
  ...rest
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false)

  const handleError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    onError?.(event)
    setHasError(true)
  }

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-[rgba(131,98,84,0.08)] text-muted ${className}`}
        role="img"
        aria-label={alt || 'Image unavailable'}
      >
        <ImageOff className="h-8 w-8" aria-hidden="true" />
      </div>
    )
  }

  return <img {...rest} alt={alt} className={className} onError={handleError} />
}
