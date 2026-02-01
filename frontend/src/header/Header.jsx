import React, { useState } from "react";

function Header({ onAccountClick, onCartClick, cartCount }) {
  const [isOpen, setIsOpen] = useState(false);

  const User = {
    iconClass: "fi fi-rr-user",
    link: "#",
    alt: "user icon",
  };

  const Cart = {
    iconClass: "fi fi-rr-shopping-cart",
    link: "#",
    alt: "shopping cart icon",
  };

  return (
    <header className="header fixed md:relative top-0 left-0 w-full z-50 bg-[#121212]/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none">
      <div className="header-title flex items-center justify-between px-6 md:px-10 py-4">
        {/* Логотип */}
        <img
          src="/Nav-logo-Headphonse.svg"
          alt="logo"
          className="header-logo w-[25px] z-50"
        />

        {/* Навигация */}
        {/* ОШИБКА БЫЛА ТУТ: Добавлены обратные кавычки ` ` внутри скобок {} */}
        <nav
          className={`header-nav absolute md:relative top-0 left-0 w-full h-screen md:h-auto bg-[#121212] md:bg-transparent flex flex-col md:flex-row items-center justify-center transition-transform duration-300 z-40 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        >
          <div className="nav-links flex flex-col md:flex-row gap-8 md:gap-6 text-center">
            <a
              href="#Banner"
              onClick={() => setIsOpen(false)}
              className="nav-link text-xl md:text-base text-[#787878] hover:text-white transition-colors"
            >
              Home
            </a>
            <a
              href="#Info"
              onClick={() => setIsOpen(false)}
              className="nav-link text-xl md:text-base text-[#787878] hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#Design"
              onClick={() => setIsOpen(false)}
              className="nav-link text-xl md:text-base text-[#787878] hover:text-white transition-colors"
            >
              Design
            </a>
            <a
              href="#Accessories"
              onClick={() => setIsOpen(false)}
              className="nav-link text-xl md:text-base text-[#787878] hover:text-white transition-colors"
            >
              Accessories
            </a>
            <a
              href="#Model"
              onClick={() => setIsOpen(false)}
              className="nav-link text-xl md:text-base text-[#787878] hover:text-white transition-colors"
            >
              Model
            </a>
          </div>
        </nav>

        <div className="nav-icon flex items-center gap-5 md:gap-7 z-50">
          {/* Кнопка бургера */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white text-2xl flex items-center"
          >
            {/* ОШИБКА БЫЛА ТУТ: Добавлены обратные кавычки ` ` */}
            <i
              className={`fi ${isOpen ? "fi-rr-cross" : "fi-rr-menu-burger"}`}
            ></i>
          </button>

          {/* Иконка юзера */}
          <button
            onClick={onAccountClick}
            className="user-icon bg-transparent border-none cursor-pointer p-0 outline-none"
            title="User"
          >
            {/* ОШИБКА БЫЛА ТУТ: Добавлены обратные кавычки ` ` */}
            <i
              className={`fi ${User.iconClass} text-xl text-white transition-opacity hover:opacity-70`}
            ></i>
          </button>

          {/* Иконка корзины */}
          <button
            onClick={onCartClick}
            className="cart-icon relative cursor-pointer"
            title="Cart"
          >
            {/* ОШИБКА БЫЛА ТУТ: Добавлены обратные кавычки ` ` */}
            <i className={`fi ${Cart.iconClass} text-xl text-white`}></i>

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] size-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
