import React, { useState, useEffect } from "react";
import Header from "./header/Header.jsx";
import Banner from "./Main/Banner.jsx";
import Info from "./Main/Info.jsx";
import ProductFeatures from "./Main/ProductFeatures.jsx";
import Accessories from "./Main/Accessories.jsx";
import ProductsCarusel from "./Main/ProductsCarusel.jsx";
import Footer from "./Footer/Footer.jsx";
import AuthModal from "./components/Modals/AuthModal";
import ProductModal from "./components/Modals/ProductModal";
//import ProductsCarusel from "./Main/NewCarusel.jsx";
// Убедись, что путь к CartModal правильный (CardModal или CartModal)
import CartModal from "./components/Modals/CardModal.jsx";

function App() {
  // --- Состояния интерфейса ---
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // --- Состояния данных ---
  const [slides, setSlides] = useState([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [cart, setCart] = useState([]);

  // --- Состояние пользователя ---
  const [user, setUser] = useState(null);

  // --- 1. ЗАГРУЗКА ПРИ СТАРТЕ ---
  useEffect(() => {
    // Проверяем, вошел ли пользователь раньше
    const savedUsername = localStorage.getItem("username");

    if (savedUsername) {
      setUser(savedUsername);
      // Если юзер есть — сразу грузим ЕГО корзину
      const savedCart = localStorage.getItem(`cart_${savedUsername}`);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }

    // Грузим товары из Django
    fetch("http://127.0.0.1:8000/api/products/")
      .then((response) => response.json())
      .then((data) => {
        setSlides(data);
      })
      .catch((error) => console.error("Ошибка соединения с Django:", error));
  }, []);

  // --- 2. ЛОГИКА АВТОРИЗАЦИИ И КОРЗИНЫ ---

  // Когда пользователь меняется (вошел или вышел), пробуем загрузить его корзину
  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem(`cart_${user}`);
      setCart(savedCart ? JSON.parse(savedCart) : []);
    } else {
      setCart([]); // Если вышел — корзина пуста
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
    // Корзина очистится сама благодаря useEffect выше
  };

  // --- 3. ФУНКЦИИ КОРЗИНЫ (С СОХРАНЕНИЕМ) ---

  const addToCart = (product) => {
    // 1. Обновляем состояние (визуально)
    const newCart = [...cart, product];
    setCart(newCart);
    setIsCartOpen(true);
    setSelectedProduct(null);

    // 2. Если пользователь вошел — сохраняем в память под его именем
    if (user) {
      localStorage.setItem(`cart_${user}`, JSON.stringify(newCart));
    }
  };

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);

    if (user) {
      localStorage.setItem(`cart_${user}`, JSON.stringify(newCart));
    }
  };

  // --- Вычисляем активный товар для Info ---
  const activeProduct = slides.length > 0 ? slides[activeSlideIndex] : null;

  return (
    <>
      <Header
        onAccountClick={() => setIsAuthOpen(true)}
        user={user}
        onCartClick={() => setIsCartOpen(true)}
        cartCount={cart.length}
      />

      <Banner />

      <Info product={activeProduct} />

      <ProductFeatures />
      <Accessories />

      {slides.length > 0 ? (
        <ProductsCarusel
          slides={slides}
          onProductClick={(product) => setSelectedProduct(product)}
          onSlideChange={(index) => setActiveSlideIndex(index)}
        />
      ) : (
        <div className="text-center text-white py-20">
          <h2 className="text-2xl">Загрузка товаров...</h2>
          <p className="text-gray-500 text-sm">Django port 8000</p>
        </div>
      )}

      <Footer />

      {/* МОДАЛКИ */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        user={user}
        setUser={setUser}
        onLogout={handleLogout}
      />

      {selectedProduct && (
        <ProductModal
          isOpen={!!selectedProduct}
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemove={removeFromCart}
      />
    </>
  );
}

export default App;
