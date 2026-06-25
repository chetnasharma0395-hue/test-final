'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Car } from 'lucide-react';
import type { FleetImage as FleetImageType } from '@/lib/fleet-images';

interface FleetImageProps {
  images: FleetImageType[];
  fallbackAlt: string;
  className?: string;
}

export default function FleetImage({ images, fallbackAlt, className }: FleetImageProps) {
  const [image, setImage] = useState<FleetImageType | null>(images[0] ?? null);

  useEffect(() => {
    if (images.length > 1) {
      const random = images[Math.floor(Math.random() * images.length)];
      setImage(random);
    } else {
      setImage(images[0] ?? null);
    }
    // Re-roll whenever the image list itself changes (e.g. different vehicle card)
  }, [images]);

  if (!image) {
    // No real photos yet for this vehicle — friendly placeholder instead of a broken image
    return (
      <div className={`flex flex-col items-center justify-center gap-2 bg-gray-100 text-gray-400 ${className ?? ''}`}>
        <Car className="w-10 h-10" />
        <span className="text-xs font-bold uppercase tracking-widest">Photos coming soon</span>
      </div>
    );
  }

  return (
    <Image
      src={image.src}
      alt={image.alt || fallbackAlt}
      width={600}
      height={400}
      className={className}
    />
  );
}
