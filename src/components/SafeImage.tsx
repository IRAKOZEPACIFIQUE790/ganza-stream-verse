
import React, { useState } from 'react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  onError?: (error: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const SafeImage: React.FC<SafeImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  fallbackSrc = '/placeholder.svg',
  onError 
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Image failed to load:', src);
    
    if (!hasError && fallbackSrc !== imgSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
    
    if (onError) {
      onError(event);
    }
  };

  return (
    <img 
      src={imgSrc} 
      alt={alt} 
      className={className}
      onError={handleError}
      loading="lazy"
    />
  );
};

export default SafeImage;
