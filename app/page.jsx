
"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";

import { FaInstagram as Instagram } from "react-icons/fa";
import {
  Search,
  ShoppingCart,
  UserRound,
  Heart,
  Menu,
  X,
  MapPin,
  Pencil,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  SlidersHorizontal,
  Plus,
  Minus,
  Trash2,
  Package,
  Truck,
  ShieldCheck,
  Phone,
  MessageCircle,
  ShoppingBag,
  CheckCircle2,
  LogOut,
  Eye,
  EyeOff,
  ArrowRight,
  CreditCard,
  ClipboardList,
  Lock,
} from "lucide-react";

/*
  KLEEN KLEAR
  Product pictures:
  Put your product images directly inside public/ and use /filename.jpg
  in the image properties below.

  Product images are stored directly in public/ and referenced as /filename.jpg.
  Authentication and orders in this starter version use browser localStorage
  for demonstration only. Add a secure backend and payment provider before production.
*/

const PRODUCTS = [
  {
    id: 1,
    name: "Liquid Dish Wash Lemon",
    description: "Liquid dishwashing liquid with lemon fragrance.",
    category: "Dishwashing Liquid",
    size: "450ML",
    price: 2000,
    oldPrice: 2500,
    image: "/2.jpg",
    badge: "POPULAR",
  },
  {
    id: 2,
    name: "Liquid Dish Wash Multi Fruity",
    description: "Fresh multi-fruit scented dishwashing liquid.",
    category: "Dishwashing Liquid",
    size: "450ML",
    price: 2000,
    oldPrice: 2500,
    image: "/3.jpg",
    badge: "",
  },
  {
    id: 3,
    name: "Liquid Dish Wash Multi Fruity",
    description: "Convenient multi-fruity dishwashing liquid.",
    category: "Dishwashing Liquid",
    size: "200ML",
    price: 1200,
    oldPrice: 1500,
    image: "/4.jpg",
    badge: "",
  },
  {
    id: 4,
    name: "Liquid Dish Wash Lemon",
    description: "Lemon scented liquid dishwashing solution.",
    category: "Dishwashing Liquid",
    size: "200ML",
    price: 1200,
    oldPrice: 1500,
    image: "/5.jpg",
    badge: "",
  },
  {
    id: 5,
    name: "Block Air Freshener Savannah",
    description: "Savannah flower scented block air freshener.",
    category: "Block Air Freshener",
    size: "STANDARD",
    price: 1500,
    oldPrice: 1800,
    image: "/6.jpg",
    badge: "",
  },
  {
    id: 6,
    name: "Block Air Freshener Fruity Fresh",
    description: "Fruity fresh fragrance for your home.",
    category: "Block Air Freshener",
    size: "STANDARD",
    price: 1500,
    oldPrice: 1800,
    image: "/15.jpg",
    badge: "",
  },
  {
    id: 7,
    name: "Block Air Freshener Mixed Fruit",
    description: "A refreshing mixed fruit fragrance.",
    category: "Block Air Freshener",
    size: "STANDARD",
    price: 1500,
    oldPrice: 1800,
    image: "/8.jpg",
    badge: "",
  },
  {
    id: 8,
    name: "Block Air Freshener Lavender",
    description: "Relaxing lavender scented block freshener.",
    category: "Block Air Freshener",
    size: "STANDARD",
    price: 1500,
    oldPrice: 1800,
    image: "/9.jpg",
    badge: "BEST SELLER",
  },
  {
    id: 9,
    name: "Gel Air Freshener",
    description: "Long-lasting fragrance for your home.",
    category: "Air Freshener",
    size: "STANDARD",
    price: 1800,
    oldPrice: 2200,
    image: "/10.jpg",
    badge: "",
  },
  {
    id: 10,
    name: "Car Air Freshener",
    description: "Keep your car smelling fresh.",
    category: "Car Freshener",
    size: "STANDARD",
    price: 1200,
    oldPrice: 1500,
    image: "/14.jpg",
    badge: "",
  },
  {
    id: 11,
    name: "Scent Pads",
    description: "Fresh fragrance scent pads.",
    category: "Scent Pads",
    size: "STANDARD",
    price: 1000,
    oldPrice: 1300,
    image: "/12.jpg",
    badge: "",
  },
  {
    id: 12,
    name: "Liquid Air Freshener",
    description: "Fresh fragrance for your living space.",
    category: "Air Freshener",
    size: "STANDARD",
    price: 2000,
    oldPrice: 2500,
    image: "/13.jpg",
    badge: "",
  },
];

const CATEGORIES = [
  "All Products",
  "Dishwashing Liquid",
  "Block Air Freshener",
  "Air Freshener",
  "Car Freshener",
  "Scent Pads",
];

const money = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
export default function Home() {
  const [showAllSouvenirs, setShowAllSouvenirs] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Products");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sizeFilter, setSizeFilter] = useState("All sizes");

  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const [user, setUser] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [pendingCheckout, setPendingCheckout] = useState(false);

  const [ordersOpen, setOrdersOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orders, setOrders] = useState([]);

  const [notification, setNotification] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [chatOpen, setChatOpen] = useState(false);

  // Load saved demo data after the page mounts.
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("kleenKlearUser");
      const savedCart = localStorage.getItem("kleenKlearCart");
      const savedOrders = localStorage.getItem("kleenKlearOrders");
      const savedFavorites = localStorage.getItem("kleenKlearFavorites");

      if (savedUser) setUser(JSON.parse(savedUser));
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedOrders) setOrders(JSON.parse(savedOrders));
      if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    } catch {
      showNotice("Could not load saved shopping information.");
    }
  }, []);

  function showNotice(message) {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  }

  function saveCart(nextCart) {
    setCart(nextCart);
    localStorage.setItem("kleenKlearCart", JSON.stringify(nextCart));
  }

  function addToCart(product) {
    const existing = cart.find((item) => item.id === product.id);

    const nextCart = existing
      ? cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cart, { ...product, quantity: 1 }];

    saveCart(nextCart);
    showNotice(`${product.name} added to your cart.`);
  }

  function changeQuantity(id, amount) {
    const nextCart = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + amount }
          : item
      )
      .filter((item) => item.quantity > 0);

    saveCart(nextCart);
  }

  function removeFromCart(id) {
    saveCart(cart.filter((item) => item.id !== id));
    showNotice("Product removed from cart.");
  }

  function toggleFavorite(id) {
    const next = favorites.includes(id)
      ? favorites.filter((item) => item !== id)
      : [...favorites, id];

    setFavorites(next);
    localStorage.setItem("kleenKlearFavorites", JSON.stringify(next));
  }

  function openAccount() {
    if (user) {
      setOrdersOpen(true);
    } else {
      setAuthMode("login");
      setAuthOpen(true);
    }
  }

  function beginCheckout() {
    if (cart.length === 0) {
      showNotice("Your shopping cart is empty.");
      return;
    }

    if (!user) {
      setPendingCheckout(true);
      setAuthMode("login");
      setAuthOpen(true);
      setCartOpen(false);
      showNotice("Please log in or create an account before checkout.");
      return;
    }

    setCartOpen(false);
    setCheckoutOpen(true);
  }

  function handleAuth(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const name = form.get("name")?.toString().trim();
    const email = form.get("email")?.toString().trim().toLowerCase();
    const password = form.get("password")?.toString();

    if (!email || !password) {
      showNotice("Please fill in your email and password.");
      return;
    }

    if (password.length < 6) {
      showNotice("Password must contain at least 6 characters.");
      return;
    }

    const savedAccounts = JSON.parse(
      localStorage.getItem("kleenKlearAccounts") || "[]"
    );

    if (authMode === "signup") {
      if (!name) {
        showNotice("Please enter your full name.");
        return;
      }

      if (savedAccounts.some((account) => account.email === email)) {
        showNotice("An account with this email already exists. Please log in.");
        return;
      }

      const newAccount = { name, email, password };
      localStorage.setItem(
        "kleenKlearAccounts",
        JSON.stringify([...savedAccounts, newAccount])
      );

      const customer = { name, email };
      setUser(customer);
      localStorage.setItem("kleenKlearUser", JSON.stringify(customer));

      setAuthOpen(false);
      showNotice("Your account has been created successfully!");
    } else {
      const account = savedAccounts.find(
        (item) => item.email === email && item.password === password
      );

      if (!account) {
        showNotice("Incorrect email or password. Please try again.");
        return;
      }

      const customer = { name: account.name, email: account.email };
      setUser(customer);
      localStorage.setItem("kleenKlearUser", JSON.stringify(customer));

      setAuthOpen(false);
      showNotice("Welcome back!");
    }

    if (pendingCheckout) {
      setPendingCheckout(false);
      setCheckoutOpen(true);
    }
  }

  function logout() {
    localStorage.removeItem("kleenKlearUser");
    setUser(null);
    setOrdersOpen(false);
    showNotice("You have logged out.");
  }

  function placeOrder(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!user) {
      setCheckoutOpen(false);
      setAuthOpen(true);
      setAuthMode("login");
      return;
    }

    if (!cart.length) return;

    const form = new FormData(e.currentTarget);

    const customerName = form.get("customerName")?.toString().trim();
    const phone = form.get("phone")?.toString().trim();
    const address = form.get("address")?.toString().trim();
    const city = form.get("city")?.toString().trim();
    const payment = form.get("payment")?.toString();

    if (!customerName || !phone || !address || !city || !payment) {
      showNotice("Please complete all delivery details.");
      return;
    }

    const order = {
      id: `KK-${Date.now().toString().slice(-8)}`,
      customerEmail: user.email,
      customerName,
      phone,
      address,
      city,
      payment,
      items: cart,
      total: cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
      status: "Order received",
      date: new Date().toLocaleString(),
    };

    const nextOrders = [...orders, order];

    setOrders(nextOrders);
    localStorage.setItem("kleenKlearOrders", JSON.stringify(nextOrders));

    setDeliveryAddress(`${address}, ${city}`);
    saveCart([]);
    setCheckoutOpen(false);
    setOrdersOpen(true);
    showNotice("Your order has been placed!");
  }

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        category === "All Products" || product.category === category;

      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      const matchesSize =
        sizeFilter === "All sizes" || product.size === sizeFilter;

      return matchesCategory && matchesSearch && matchesSize;
    });
  }, [category, search, sizeFilter]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const customerOrders = orders.filter(
    (order) => order.customerEmail === user?.email
  );

  return (
    <main className="min-h-screen bg-[#f8fff5] text-[#123b2b]">

      {/* BUSINESS INFO TOP BAR */}
      <div className="border-b border-emerald-100 bg-lime-50">
        <div className="mx-auto flex max-w-[1248px] flex-col items-start justify-between gap-2 px-4 py-2 text-[11px] text-emerald-950 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Bulala+Street%2C+Opp.+Crescent+Star+Islamic+College%2C+Harmony+Estate%2C+Akerebiata%2C+Ilorin%2C+Kwara+State"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-emerald-700"
          >
            <MapPin size={15} className="shrink-0" />
            <span>Bulala Street, Opp. Crescent Star Islamic College, Harmony Estate, Akerebiata, Ilorin, Kwara State, Nigeria</span>
          </a>
          <a href="tel:+2348134973726" className="flex shrink-0 items-center gap-2 font-bold hover:text-emerald-700">
            <Phone size={14} />
            08134973726
          </a>
        </div>
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-[78px] max-w-[1248px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

          {/* LOGO */}
          <a href="#" className="flex shrink-0 items-center gap-3" aria-label="KLEEN-KLEAR home">
            <img
              src="/1.jpg"
              alt="KLEEN-KLEAR logo"
              className="h-17 w-auto max-w-[150px] object-contain"
              onError={(event) => {
                event.currentTarget.style.display = "none";
                const fallback = event.currentTarget.nextElementSibling as HTMLElement | null;
                if (fallback) fallback.style.display = "block";
              }}
            />
            <span className="hidden font-serif text-2xl font-extrabold tracking-tight text-[#064e3b]">
              KLEEN-KLEAR
            </span>
          </a>

          {/* DESKTOP LINKS */}
          <nav className="hidden items-center gap-6 lg:flex">
            <a href="#" className="text-sm font-semibold hover:text-[#059669]">
              Home
            </a>
            <a href="#shop" className="text-sm font-semibold hover:text-[#059669]">
              Shop
            </a>
            <a href="#about" className="text-sm font-semibold hover:text-[#059669]">
              About Us
            </a>
            <a href="#souvenirs" className="text-sm font-semibold hover:text-[#059669]">
              Souvenirs
            </a>
            <a href="#shipping" className="text-sm font-semibold hover:text-[#059669]">
              Shipping & Payments
            </a>
            <a href="#contact" className="text-sm font-semibold hover:text-[#059669]">
              Contact Us
            </a>
          </nav>

          {/* NAV ACTIONS */}
          <div className="flex items-center gap-4">
            <button
              onClick={openAccount}
              aria-label="Account"
              className="hidden items-center gap-2 text-gray-700 hover:text-[#047857] sm:flex"
            >
              <UserRound size={21} />
              <ChevronDown size={14} />
            </button>

            <button
              onClick={() => {
                if (!user) {
                  setAuthMode("login");
                  setAuthOpen(true);
                  return;
                }
                setOrdersOpen(true);
              }}
              aria-label="My favorites"
              className="text-gray-700 hover:text-[#047857]"
            >
              <Heart size={22} />
            </button>

            <button
              onClick={() => setCartOpen(true)}
              aria-label="Shopping cart"
              className="relative text-gray-700 hover:text-[#047857]"
            >
              <ShoppingCart size={23} />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#047857] px-1 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              aria-label="Open menu"
              className="rounded-md p-2 hover:bg-gray-100 lg:hidden"
            >
              {mobileMenu ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* MOBILE NAV */}
        {mobileMenu && (
          <nav className="border-t border-gray-100 bg-white p-4 lg:hidden">
            {[
              ["Home", "#"],
              ["Shop", "#shop"],
              ["About Us", "#about"],
              ["Souvenir Packaging", "#souvenirs"],
              ["Shipping & Payments", "#shipping"],
              ["Contact Us", "#contact"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileMenu(false)}
                className="block border-b border-gray-100 py-3 text-sm font-semibold hover:text-[#047857]"
              >
                {label}
              </a>
            ))}

            <button
              onClick={() => {
                setMobileMenu(false);
                openAccount();
              }}
              className="flex items-center gap-2 py-3 text-sm font-semibold"
            >
              <UserRound size={18} />
              {user ? "My Account" : "Login / Sign Up"}
            </button>
          </nav>
        )}
      </header>

    {/* HERO */}
<section className="relative overflow-hidden border-b border-emerald-200 bg-gradient-to-r from-emerald-900 via-emerald-700 to-lime-500 text-white">
  <div className="mx-auto flex min-h-[350px] max-w-[1248px] flex-col justify-center gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">

    {/* LEFT CONTENT */}
    <div className="max-w-[650px]">
      <p className="text-[10px] font-medium uppercase tracking-[3px] text-lime-100">
        QUALITY CLEANING PRODUCTS & CUSTOM SOUVENIRS
      </p>

      <h1 className="mt-2 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">
        A cleaner, fresher space starts with KLEEN-KLEAR
      </h1>

      <p className="mt-3 max-w-[590px] text-sm leading-7 text-white/90 sm:text-base">
        Explore our quality cleaning products, discover our customized
        souvenir packaging services, and place your order or send us an
        enquiry with ease.
      </p>

      <button
        onClick={() => window.location.reload()}
        className="mt-6 flex w-fit items-center gap-2 rounded-full border border-emerald-100 bg-white px-5 py-3 text-sm font-medium text-[#14532d] transition hover:bg-[#f7fee7]"
      >
        <RefreshCw size={16} />
        Refresh
      </button>
    </div>

    {/* OWNER IMAGE */}
    <div className="flex shrink-0 justify-center md:justify-end">
      <div className="relative">
        <div className="absolute -inset-2 rounded-2xl bg-lime-300/30 blur-md"></div>

        <img
          src="/11.jpg"
          alt="Owner of KLEEN-KLEAR"
          className="relative h-[250px] w-[220px] rounded-2xl border-4 border-white/80 object-cover shadow-2xl sm:h-[260px] sm:w-[260px]"
        />
      </div>
    </div>

  </div>
</section>
      {/* SHOP */}
      <section id="shop" className="mx-auto max-w-[1248px] px-4 py-12 sm:px-6 lg:px-8">

        {/* FILTER BAR */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex w-full items-center justify-between px-5 py-5 text-left"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#064e3b] text-white">
                <SlidersHorizontal size={17} />
              </span>

              <span>
                <span className="block text-sm font-bold text-gray-900">
                  Filters
                </span>
                <span className="mt-1 block text-xs text-gray-500">
                  {filteredProducts.length} scents
                </span>
              </span>
            </div>

            <ChevronDown
              size={19}
              className={`text-gray-500 transition ${
                filtersOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {filtersOpen && (
            <div className="grid gap-5 border-t border-gray-100 p-5 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-xs font-bold text-gray-700">
                  Search products
                </label>

                <div className="flex items-center rounded-lg border border-gray-200 px-3">
                  <Search size={16} className="text-gray-400" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                    className="h-11 w-full px-3 text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold text-gray-700">
                  Product category
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none"
                >
                  {CATEGORIES.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold text-gray-700">
                  Product size
                </label>

                <select
                  value={sizeFilter}
                  onChange={(e) => setSizeFilter(e.target.value)}
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none"
                >
                  <option>All sizes</option>
                  <option>450ML</option>
                  <option>200ML</option>
                  <option>STANDARD</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All Products");
                  setSizeFilter("All sizes");
                }}
                className="text-left text-xs font-bold text-[#047857] underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* CATEGORY QUICK LINKS */}
        <div className="mt-7 flex gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition ${
                category === item
                  ? "border-[#047857] bg-[#047857] text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:border-[#047857]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* PRODUCT HEADER */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#064e3b]">
              Our Products
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Discover your favourite scents and cleaning essentials.
            </p>
          </div>

          <span className="text-xs text-gray-500">
            Showing {filteredProducts.length} products
          </span>
        </div>

        {/* PRODUCT GRID */}
        {filteredProducts.length > 0 ? (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">

            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-[27px] border border-emerald-100 bg-[#f7fee7] transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* PRODUCT IMAGE */}
                <div className="relative m-2 overflow-hidden rounded-[20px] bg-white">
                  <div className="aspect-square">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextElementSibling.style.display = "flex";
                      }}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="hidden h-full w-full flex-col items-center justify-center bg-[#ecfccb] p-4 text-center">
                      <ShoppingBag size={36} className="text-[#059669]" />
                      <span className="mt-3 text-xs font-bold text-[#047857]">
                        {product.name}
                      </span>
                    </div>
                  </div>

                  {product.badge && (
                    <span className="absolute left-2 top-2 rounded-full bg-[#a3a000] px-3 py-1 text-[9px] font-bold text-white">
                      {product.badge}
                    </span>
                  )}

                  <button
                    onClick={() => toggleFavorite(product.id)}
                    aria-label="Add to favorites"
                    className={`absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:scale-110 ${
                      favorites.includes(product.id)
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  >
                    <Heart
                      size={18}
                      fill={
                        favorites.includes(product.id)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </button>
                </div>

                {/* PRODUCT DETAILS */}
                <div className="px-4 pb-5 pt-2 sm:px-5">
                  <h3 className="min-h-[48px] font-serif text-base font-bold leading-6 text-[#064e3b] sm:text-lg">
                    {product.name}
                  </h3>

                  <p className="mt-1 line-clamp-1 text-[11px] text-gray-500">
                    {product.description}
                  </p>

                  <div className="mt-3">
                    <span className="inline-flex rounded-full bg-[#065f46] px-3 py-1.5 text-[10px] font-bold text-white">
                      {product.size}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="font-serif text-lg font-bold text-[#064e3b]">
                      {money(product.price)}
                    </span>

                    <span className="text-xs text-gray-400 line-through">
                      {money(product.oldPrice)}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#047857] py-3 text-xs font-bold text-white transition hover:bg-[#065f46] sm:text-sm"
                  >
                    <ShoppingBag size={15} />
                    Add to cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white px-5 py-16 text-center">
            <Search size={35} className="mx-auto text-gray-300" />
            <h3 className="mt-4 font-bold text-gray-800">
              No products found
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Try a different product name or category.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("All Products");
                setSizeFilter("All sizes");
              }}
              className="mt-4 text-sm font-bold text-[#047857]"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* ABOUT */}
      <section id="about" className="border-y border-emerald-100 bg-[#ecfccb]">
        <div className="mx-auto grid max-w-[1248px] gap-8 px-4 py-14 sm:px-6 md:grid-cols-2 lg:px-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[3px] text-emerald-700">
              ABOUT KLEEN-KLEAR
            </p>

            <h2 className="mt-3 font-serif text-3xl font-bold text-[#064e3b]">
              A fresher space starts here.
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-7 text-[#426354]">
              KLEEN-KLEAR is your online destination for high-quality cleaning products and customized souvenir packaging. Explore our product range, learn more about our brand, view packaging options for special occasions, and conveniently place orders or make enquiries.
            </p>

            <a
              href="#shop"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#047857] px-6 py-3 text-sm font-bold text-white hover:bg-[#065f46]"
            >
              Explore products <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col justify-center rounded-2xl bg-white p-5">
              <Truck size={27} className="text-[#047857]" />
              <h3 className="mt-4 font-bold">Based in Ilorin</h3>
              <p className="mt-2 text-xs leading-5 text-gray-500">
                Visit or contact our team at our business address in Akerebiata, Ilorin, Kwara State.
              </p>
            </div>

            <div className="flex flex-col justify-center rounded-2xl bg-white p-5">
              <ShieldCheck size={27} className="text-[#047857]" />
              <h3 className="mt-4 font-bold">Souvenir Packaging</h3>
              <p className="mt-2 text-xs leading-5 text-gray-500">
                Customized souvenir packaging options for events, gifts and special occasions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOM SOUVENIR PACKAGING */}
      <section id="souvenirs" className="bg-gradient-to-b from-lime-50 to-white py-14">
        <div className="mx-auto max-w-[1248px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[3px] text-emerald-700">
              MADE FOR YOUR SPECIAL MOMENTS
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-emerald-950 sm:text-4xl">
              Customized Souvenir Packaging
            </h2>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              Make your celebrations memorable with customized souvenir packages from KLEEN-KLEAR. Contact us to discuss available sizes, designs and quantities.
            </p>
          </div>

          {/*
            Add the 23 souvenir photos directly inside public/ and name them:
            1.jpg, 2.jpg, 3.jpg ... 23.jpg
            If your files are PNG, change the ".jpg" below to ".png".
          */}
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 23 }, (_, index) => ({
              id: index + 1,
              image: `/${index + 1}.jpg`,
            }))
              .slice(0, showAllSouvenirs ? 23 : 9)
              .map((item) => (
                <article
                  key={item.id}
                  className="group overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-lime-100 via-white to-emerald-100">
                    <img
                      src={item.image}
                      alt={`KLEEN-KLEAR customized souvenir package ${item.id}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                        const fallback = event.currentTarget.nextElementSibling as HTMLElement | null;
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />
                    <div className="hidden h-full w-full flex-col items-center justify-center p-6 text-center">
                      <Package size={38} className="text-emerald-700" />
                      <span className="mt-3 text-sm font-bold text-emerald-900">
                        Souvenir package {item.id}
                      </span>
                      <span className="mt-1 text-xs text-gray-500">
                        Add {item.id}.jpg to your public folder
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-3 p-4">
                    <div>
                      <h3 className="font-bold text-emerald-950">
                        Souvenir Package {item.id}
                      </h3>
                      <p className="mt-1 text-xs text-gray-500">
                        Customized packaging by KLEEN-KLEAR
                      </p>
                    </div>
                    <a
                      href={`https://wa.me/2348134973726?text=${encodeURIComponent(`Hello KLEEN-KLEAR, I want to enquire about souvenir package ${item.id}.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 rounded-full bg-emerald-700 px-3 py-2 text-xs font-bold text-white transition hover:bg-emerald-800"
                    >
                      Enquire
                    </a>
                  </div>
                </article>
              ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAllSouvenirs((current) => !current)}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-7 py-3 text-sm font-bold text-white shadow-md transition hover:bg-emerald-800"
            >
              {showAllSouvenirs ? "Show less" : "Show more"}
              <ChevronDown
                size={17}
                className={`transition-transform ${showAllSouvenirs ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          <p className="mt-5 text-center text-xs text-gray-500">
            Browse our customized souvenir packaging options. Contact KLEEN-KLEAR for available sizes, designs and quotations.
          </p>
        </div>
      </section>

      {/* SHIPPING */}
      <section id="shipping" className="mx-auto max-w-[1248px] px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-center font-serif text-3xl font-bold text-[#064e3b]">
          Shipping & Payments
        </h2>

        <p className="mx-auto mt-2 max-w-lg text-center text-sm text-gray-500">
          Everything you need to know before placing your order.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <Truck size={26} className="text-[#047857]" />
            <h3 className="mt-4 font-bold">Delivery</h3>
            <p className="mt-2 text-xs leading-6 text-gray-500">
              Enter your delivery address during checkout. Delivery fees
              and availability will be confirmed before dispatch.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <CreditCard size={26} className="text-[#047857]" />
            <h3 className="mt-4 font-bold">Payment</h3>
            <p className="mt-2 text-xs leading-6 text-gray-500">
              Available starter options include bank transfer and
              cash on delivery, subject to confirmation.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <ClipboardList size={26} className="text-[#047857]" />
            <h3 className="mt-4 font-bold">Order tracking</h3>
            <p className="mt-2 text-xs leading-6 text-gray-500">
              Sign in to your account to view your order records
              and their current status.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-[#064e3b] text-white">
        <div className="mx-auto max-w-[1248px] px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

            <div>
              <a href="#" className="inline-flex items-center" aria-label="KLEEN-KLEAR home">
                <img
                  src="/1.jpg"
                  alt="KLEEN-KLEAR"
                  className="h-14 w-auto max-w-[180px] object-contain"
                />
              </a>
              <p className="mt-2 text-[10px] font-semibold tracking-[3px] text-[#bef264]">
                CLEANING • FRESHNESS • SOUVENIRS
              </p>

              <p className="mt-5 max-w-xs text-xs leading-6 text-gray-300">
                Discover refreshing fragrances and quality cleaning
                essentials for your home, office and car.
              </p>

              <div className="mt-5 flex gap-3">
                <a
                  href="https://www.instagram.com/kleen_klear?dlrf=bnFjajE2Zno3OHJ3&utm_source=qr"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-[#047857]"
                >
                  <Instagram size={17} />
                </a>

                <a
                  href="https://www.tiktok.com/@kleen_klear"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="TikTok"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-emerald-700"
                >
                  <span className="text-xs font-black">Tk</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold">Quick Links</h3>
              <div className="mt-5 flex flex-col gap-3 text-xs text-gray-300">
                <a href="#" className="hover:text-[#d9f99d]">Home</a>
                <a href="#shop" className="hover:text-[#d9f99d]">Shop Products</a>
                <a href="#about" className="hover:text-[#d9f99d]">About Us</a>
                <a href="#souvenirs" className="hover:text-[#d9f99d]">Souvenir Packaging</a>
                <a href="#shipping" className="hover:text-[#d9f99d]">Shipping & Payments</a>
                <button
                  onClick={openAccount}
                  className="text-left hover:text-[#d9f99d]"
                >
                  My Account
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold">Customer Service</h3>
              <div className="mt-5 flex flex-col gap-3 text-xs text-gray-300">
                <a href="#shipping" className="hover:text-[#d9f99d]">
                  Delivery Information
                </a>
                <a href="#shipping" className="hover:text-[#d9f99d]">
                  Payment Information
                </a>
                <button
                  onClick={() => {
                    if (!user) {
                      setAuthOpen(true);
                      setAuthMode("login");
                    } else {
                      setOrdersOpen(true);
                    }
                  }}
                  className="text-left hover:text-[#d9f99d]"
                >
                  Track My Orders
                </button>
                <a href="#contact" className="hover:text-[#d9f99d]">
                  Contact Support
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold">Contact Us</h3>

              <div className="mt-5 flex flex-col gap-4 text-xs text-gray-300">
                <div className="flex items-center gap-3">
                  <MapPin size={17} className="shrink-0 text-[#bef264]" />
                  <span>Bulala Street, Opp. Crescent Star Islamic College, Harmony Estate, Akerebiata, Ilorin, Kwara State, Nigeria</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone size={17} className="shrink-0 text-[#bef264]" />
                  <a href="tel:+2348134973726" className="hover:text-lime-200">08134973726</a>
                </div>


              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-6 text-center text-[10px] text-gray-400 sm:flex-row sm:text-left">
            <p>© {new Date().getFullYear()} KLEEN-KLEAR. All rights reserved.</p>
            <p>Quality cleaning products. Thoughtful souvenirs. Everyday freshness.</p>
          </div>
        </div>
      </footer>

      {/* FLOATING CHAT */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-5 right-4 z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-800 to-lime-500 px-5 py-4 text-xs font-bold text-white shadow-lg transition hover:brightness-110 sm:right-6"
      >
        {chatOpen ? <X size={17} /> : <MessageCircle size={18} />}
        Chat with us
      </button>

      {chatOpen && (
        <div className="fixed bottom-24 right-4 z-40 w-[290px] rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl sm:right-6">
          <h3 className="font-bold text-[#064e3b]">Hello! Welcome to Kleen Klear.</h3>
          <p className="mt-2 text-xs leading-5 text-gray-500">
            Need help with a product, custom souvenir package or delivery? Chat with our team.
          </p>
          <a
            href="https://wa.me/2348134973726"
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#65a30d] py-3 text-xs font-bold text-white"
          >
            <MessageCircle size={16} />
            Open WhatsApp
          </a>
          <p className="mt-2 text-center text-[9px] text-gray-400">
            WhatsApp: 08134973726
          </p>
        </div>
      )}

      {/* NOTIFICATION */}
      {notification && (
        <div className="fixed bottom-24 left-1/2 z-[100] flex max-w-[90%] -translate-x-1/2 items-center gap-2 rounded-xl bg-[#064e3b] px-5 py-3 text-xs font-semibold text-white shadow-xl">
          <CheckCircle2 size={17} className="shrink-0 text-lime-200" />
          {notification}
        </div>
      )}

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 z-[80]">
          <button
            onClick={() => setCartOpen(false)}
            aria-label="Close cart"
            className="absolute inset-0 bg-black/40"
          />

          <aside className="absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 p-5">
              <div>
                <h2 className="font-serif text-xl font-bold">Your Cart</h2>
                <p className="mt-1 text-xs text-gray-500">
                  {cartCount} items in your basket
                </p>
              </div>

              <button
                onClick={() => setCartOpen(false)}
                aria-label="Close"
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <X size={21} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <ShoppingCart size={45} className="text-gray-300" />
                  <h3 className="mt-4 font-bold">Your cart is empty</h3>
                  <p className="mt-2 text-xs text-gray-500">
                    Add some products to start shopping.
                  </p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="mt-5 rounded-full bg-[#047857] px-6 py-3 text-xs font-bold text-white"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 border-b border-gray-100 pb-5"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 rounded-xl bg-[#f7fee7] object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-bold">{item.name}</h3>
                        <p className="mt-1 text-sm font-bold text-[#7e22ce]">
                          {money(item.price)}
                        </p>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center overflow-hidden rounded-full border border-gray-200">
                            <button
                              onClick={() => changeQuantity(item.id, -1)}
                              className="p-2 hover:bg-gray-100"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="min-w-8 text-center text-xs font-bold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => changeQuantity(item.id, 1)}
                              className="p-2 hover:bg-gray-100"
                            >
                              <Plus size={13} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            aria-label="Remove product"
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-gray-100 p-5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-bold">{money(cartTotal)}</span>
                </div>

                <p className="mt-2 text-[10px] text-gray-400">
                  Delivery fee will be confirmed before dispatch.
                </p>

                <div className="mt-4 flex justify-between border-t border-gray-100 pt-4">
                  <span className="font-bold">Total</span>
                  <span className="text-xl font-bold text-[#047857]">
                    {money(cartTotal)}
                  </span>
                </div>

                <button
                  onClick={beginCheckout}
                  className="mt-5 w-full rounded-full bg-[#047857] py-4 text-sm font-bold text-white transition hover:bg-[#065f46]"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* AUTHENTICATION MODAL */}
      {authOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div className="relative my-auto w-full max-w-[440px] rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
            <button
              onClick={() => {
                setAuthOpen(false);
                setPendingCheckout(false);
              }}
              aria-label="Close login"
              className="absolute right-4 top-4 rounded-full p-2 text-gray-500 hover:bg-gray-100"
            >
              <X size={20} />
            </button>

            <div className="text-center">
              <h2 className="font-serif text-2xl font-bold text-[#064e3b]">
                Kleen Klear
              </h2>

              <p className="mt-2 text-xs text-gray-500">
                {authMode === "signup"
                  ? "Create an account to start shopping."
                  : "Welcome back! Sign in to continue."}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 rounded-full bg-gray-100 p-1">
              <button
                onClick={() => setAuthMode("login")}
                className={`rounded-full py-3 text-xs font-bold ${
                  authMode === "login"
                    ? "bg-[#047857] text-white"
                    : "text-gray-500"
                }`}
              >
                Login
              </button>

              <button
                onClick={() => setAuthMode("signup")}
                className={`rounded-full py-3 text-xs font-bold ${
                  authMode === "signup"
                    ? "bg-[#047857] text-white"
                    : "text-gray-500"
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleAuth} className="mt-6 space-y-4">
              {authMode === "signup" && (
                <div>
                  <label className="mb-2 block text-xs font-semibold">
                    Full name
                  </label>
                  <input
                    name="name"
                    required
                    placeholder="Enter your full name"
                    className="h-12 w-full rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-[#059669]"
                  />
                </div>
              )}

              <div>
                <label className="mb-2 block text-xs font-semibold">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="example@email.com"
                  className="h-12 w-full rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-[#059669]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    minLength={6}
                    placeholder="At least 6 characters"
                    className="h-12 w-full rounded-lg border border-gray-200 px-4 pr-12 text-sm outline-none focus:border-[#059669]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-[#047857] py-4 text-sm font-bold text-white transition hover:bg-[#065f46]"
              >
                {authMode === "signup" ? "Create Account" : "Login"}
              </button>
            </form>

            <p className="mt-5 text-center text-xs text-gray-500">
              {authMode === "signup"
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
              <button
                onClick={() =>
                  setAuthMode(authMode === "signup" ? "login" : "signup")
                }
                className="font-bold text-[#047857]"
              >
                {authMode === "signup" ? "Login" : "Sign up"}
              </button>
            </p>

            <div className="mt-5 flex items-center justify-center gap-2 text-[10px] text-gray-400">
              <Lock size={12} />
              Customer account access
            </div>
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL */}
      {checkoutOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div className="relative my-auto w-full max-w-[560px] rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
            <button
              onClick={() => setCheckoutOpen(false)}
              aria-label="Close checkout"
              className="absolute right-4 top-4 rounded-full p-2 hover:bg-gray-100"
            >
              <X size={20} />
            </button>

            <h2 className="font-serif text-2xl font-bold text-[#064e3b]">
              Checkout
            </h2>

            <p className="mt-2 text-xs text-gray-500">
              Complete your delivery information to place your order.
            </p>

            <form onSubmit={placeOrder} className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-xs font-semibold">
                  Full name
                </label>
                <input
                  name="customerName"
                  required
                  defaultValue={user?.name || ""}
                  placeholder="Your full name"
                  className="h-12 w-full rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-[#059669]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold">
                  Phone number
                </label>
                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="08012345678"
                  className="h-12 w-full rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-[#059669]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold">
                  Delivery address
                </label>
                <textarea
                  name="address"
                  required
                  rows={3}
                  placeholder="House number, street and area"
                  className="w-full rounded-lg border border-gray-200 p-4 text-sm outline-none focus:border-[#059669]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold">
                  City / Area
                </label>
                <input
                  name="city"
                  required
                  placeholder="e.g. Akerebiata, Ilorin"
                  className="h-12 w-full rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-[#059669]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold">
                  Payment method
                </label>

                <select
                  name="payment"
                  required
                  className="h-12 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm outline-none focus:border-[#059669]"
                >
                  <option value="">Choose payment method</option>
                  <option value="Cash on delivery">Cash on delivery</option>
                  <option value="Bank transfer">Bank transfer</option>
                </select>
              </div>

              <div className="rounded-xl bg-[#f7fee7] p-4">
                <div className="flex justify-between text-sm">
                  <span>Order subtotal</span>
                  <strong>{money(cartTotal)}</strong>
                </div>
                <p className="mt-2 text-[10px] text-gray-500">
                  Delivery fee will be confirmed separately.
                </p>
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-[#047857] py-4 text-sm font-bold text-white hover:bg-[#065f46]"
              >
                Place My Order
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MY ORDERS */}
      {ordersOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div className="relative my-auto max-h-[85vh] w-full max-w-[600px] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <button
              onClick={() => setOrdersOpen(false)}
              aria-label="Close orders"
              className="absolute right-4 top-4 rounded-full p-2 hover:bg-gray-100"
            >
              <X size={20} />
            </button>

            <h2 className="font-serif text-2xl font-bold text-[#064e3b]">
              My Account
            </h2>

            {user && (
              <div className="mt-4 flex items-center justify-between rounded-xl bg-[#f7fee7] p-4">
                <div>
                  <p className="text-sm font-bold">{user.name}</p>
                  <p className="mt-1 text-xs text-gray-500">{user.email}</p>
                </div>

                <button
                  onClick={logout}
                  className="flex items-center gap-2 text-xs font-bold text-red-600"
                >
                  <LogOut size={15} />
                  Logout
                </button>
              </div>
            )}

            <div className="mt-6 flex items-center justify-between">
              <h3 className="font-bold">My Orders</h3>
              <span className="text-xs text-gray-500">
                {customerOrders.length} orders
              </span>
            </div>

            {customerOrders.length === 0 ? (
              <div className="py-12 text-center">
                <Package size={40} className="mx-auto text-gray-300" />
                <h3 className="mt-4 font-bold">No orders yet</h3>
                <p className="mt-2 text-xs text-gray-500">
                  Your orders will appear here after checkout.
                </p>
                <button
                  onClick={() => setOrdersOpen(false)}
                  className="mt-5 rounded-full bg-[#047857] px-6 py-3 text-xs font-bold text-white"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                {customerOrders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-xl border border-gray-200 p-4"
                  >
                    <div className="flex flex-wrap justify-between gap-2">
                      <span className="text-sm font-bold">{order.id}</span>
                      <span className="rounded-full bg-[#ecfccb] px-3 py-1 text-[10px] font-bold text-[#7e22ce]">
                        {order.status}
                      </span>
                    </div>

                    <p className="mt-2 text-[10px] text-gray-500">
                      {order.date}
                    </p>

                    <div className="mt-3 space-y-2">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between gap-3 text-xs"
                        >
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <strong>
                            {money(item.price * item.quantity)}
                          </strong>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 border-t border-gray-100 pt-3">
                      <div className="flex justify-between text-sm">
                        <span className="font-bold">Total</span>
                        <strong>{money(order.total)}</strong>
                      </div>
                      <p className="mt-2 text-[10px] text-gray-500">
                        Delivery: {order.address}, {order.city}
                      </p>
                      <p className="mt-1 text-[10px] text-gray-500">
                        Payment: {order.payment}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
