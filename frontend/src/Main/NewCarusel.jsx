import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

const NewCarousel = ({ slides, onProductClick, onSlideChange }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!slides || slides.length === 0) return null;

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    setSelectedIndex(index);
    if (onSlideChange) onSlideChange(index);
  }, [emblaApi, onSlideChange]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-20 overflow-hidden">
      <div className="text-center max-w-3xl mx-auto mb-10 px-6">
        <h2 className="text-white text-4xl md:text-6xl font-bold mb-4">
          Choose your style
        </h2>
        <p className="text-[#787878] text-lg">
          Find the perfect color and style that matches your vibe.
        </p>
      </div>

      <div
        className="embla relative max-w-[1400px] mx-auto px-4"
        ref={emblaRef}
      >
        <div className="flex touch-pan-y">
          {slides.map((slide, index) => {
            const isActive = index === selectedIndex;
            return (
              <div
                key={slide.id}
                className="relative flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33%] min-w-0 pl-4"
              >
                <div
                  className={`relative transition-all duration-500 transform cursor-pointer ${isActive ? "scale-110 z-10 opacity-100" : "scale-90 opacity-40 blur-[1px]"}`}
                  onClick={() => onProductClick(slide)}
                >
                  <div className="relative flex justify-center items-center h-[400px]">
                    <div
                      className={`absolute w-64 h-64 rounded-full blur-[60px] transition-all duration-700 ${isActive ? "bg-white/10" : "bg-transparent"}`}
                    ></div>
                    <img
                      src={slide.src}
                      alt={slide.model}
                      className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
                    />
                  </div>
                  <div
                    className={`mt-6 text-center transition-all duration-500 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  >
                    <h3 className="text-white text-3xl font-bold italic">
                      {slide.model}
                    </h3>
                    <p className="text-[#787878] uppercase tracking-widest text-sm mt-2">
                      PRICE: {slide.price}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Точки вместо стрелок */}
      <div className="flex justify-center gap-3 mt-12">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi && emblaApi.scrollTo(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${index === selectedIndex ? "w-12 bg-white" : "w-2 bg-white/20"}`}
          />
        ))}
      </div>
    </section>
  );
};

export default NewCarousel;
