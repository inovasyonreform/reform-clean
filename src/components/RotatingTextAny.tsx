"use client";
import { useEffect, useState } from "react";

type Props = {
  texts: string[];
  rotationInterval?: number;
  mainClassName?: string;
};

export default function RotatingTextAny({
  texts,
  rotationInterval = 3000,
  mainClassName = "",
}: Props) {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const validTexts = texts && Array.isArray(texts) && texts.length > 0;
  const displayTexts = validTexts ? texts : ["yazılım"];

  useEffect(() => {
    if (!validTexts || displayTexts.length <= 1) return;

    const interval = setInterval(() => {
      // Önce mevcut text'i fade out yap
      setIsVisible(false);
      
      // Sonra yeni text'e geç ve fade in yap
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % displayTexts.length);
        setIsVisible(true);
      }, 500); // fade out süresi
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [displayTexts, rotationInterval, validTexts]);

  if (!validTexts) {
    return (
      <span className={`block ${mainClassName}`}>
        #{displayTexts[0]}
      </span>
    );
  }

  return (
    <span
      className={`block transition-all duration-500 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      } ${mainClassName}`}
    >
      #{displayTexts[index]}
    </span>
  );
}