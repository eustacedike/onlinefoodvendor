'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './carousel.module.css';

export default function Carousel({ images = [], imageClassName }) {
  const [index, setIndex] = useState(0);
  const carouselRef = useRef(null);
  const transitionRef = useRef(true); // to disable transition temporarily

  const totalSlides = images?.length;

  // Clone first slide
  const extendedImages = [...images, images[0]];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Reset back to the real first slide after reaching clone
  useEffect(() => {
    if (index === totalSlides) {
      // Wait for the transition to finish
      setTimeout(() => {
        transitionRef.current = false;
        setIndex(0);
      }, 500);
    } else {
      transitionRef.current = true;
    }
  }, [index, totalSlides]);

  return (
    <div className={styles.carousel}>
      <div
        className={styles.carouselInner}
        ref={carouselRef}
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: transitionRef.current ? 'transform 0.5s ease-in-out' : 'none',
        }}
      >
        {extendedImages.map((src, i) => (
          <div key={i} className={styles.card}>
            {/* <Image
              src={src}
              alt={`Slide ${i + 1}`}
              layout='responsive'
              className={imageClassName}
              style={{ objectFit: 'contain' }}
              width={0}
              height={0}
            /> */}
            <img  className={imageClassName}  src={src}/>
          </div>
        ))}
      </div>
    </div>
  );
}
