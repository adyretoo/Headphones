import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

const ProductsCarusel = ({ slides, onProductClick, onSlideChange }) => {
  // Настройка карусели
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Если слайдов нет — ничего не показываем
  if (!slides || slides.length === 0) return null;

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    setSelectedIndex(index);

    if (onSlideChange) {
      onSlideChange(index);
    }
  }, [emblaApi, onSlideChange]);

  // Функции для стрелок
  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section
      className="py-20 overflow-hidden relative group/section"
      id="Model"
    >
      <div className="text-center max-w-3xl mx-auto mb-10 px-6">
        <h2 className="text-white text-4xl md:text-6xl font-bold mb-4">
          Choose your style
        </h2>
        <p className="text-[#787878] text-lg">
          Find the perfect color and style that matches your vibe.
        </p>
      </div>

      {/* Контейнер карусели */}
      <div className="relative max-w-[1400px] mx-auto px-4 md:px-20">
        {/* КНОПКА ВЛЕВО */}
        <button
          onClick={scrollPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer hidden md:flex"
        >
          <i className="fi fi-rr-angle-left text-4xl"></i>
        </button>

        {/* Само окно слайдера */}
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {slides.map((slide, index) => {
              const isActive = index === selectedIndex;
              return (
                <div
                  key={slide.id}
                  className="relative flex-[0_0_80%] md:flex-[0_0_50%] lg:flex-[0_0_33%] min-w-0 pl-4"
                >
                  <div
                    className={`
                        relative transition-all duration-500 transform cursor-pointer
                        ${isActive ? "scale-100 z-10 opacity-100" : "scale-75 opacity-40 blur-[1px]"}
                    `}
                    onClick={() => onProductClick(slide)}
                  >
                    {/* ИЗМЕНЕНИЕ 1: Уменьшена высота контейнера картинки (было h-[400px]) */}
                    <div className="relative flex justify-center items-center h-[280px] md:h-[350px]">
                      {/* Свечение (тоже чуть уменьшено) */}
                      <div
                        className={`absolute w-52 h-52 md:w-64 md:h-64 rounded-full blur-[60px] transition-all duration-700 ${isActive ? "bg-white/10" : "bg-transparent"}`}
                      ></div>

                      {/* Картинка */}
                      <img
                        src={slide.src}
                        alt={slide.model}
                        // ИЗМЕНЕНИЕ: w-auto чтобы не растягивало, max-h-full чтобы вписывалось по высоте
                        className="relative z-10 w-auto max-h-full object-contain drop-shadow-2xl mx-auto"
                      />
                    </div>

                    {/* ИЗМЕНЕНИЕ 2: Стилизация текста как в оригинале */}
                    <div
                      className={`mt-6 text-center transition-all duration-500 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                    >
                      {/* Название модели: крупно, жирно, курсивом */}
                      <h3 className="text-white text-2xl md:text-3xl font-bold italic">
                        {slide.model}
                      </h3>
                      {/* Цена: мелко, серым, капсом с разрядкой */}
                      <p className="text-[#787878] uppercase tracking-widest text-sm mt-2 font-medium">
                        PRICE: {slide.price}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* КНОПКА ВПРАВО */}
        <button
          onClick={scrollNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer hidden md:flex"
        >
          <i className="fi fi-rr-angle-right text-4xl"></i>
        </button>
      </div>

      {/* Точки навигации */}
      <div className="flex justify-center gap-3 mt-8 md:mt-12">
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

export default ProductsCarusel;
