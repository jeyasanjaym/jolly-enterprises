import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ProductCard from '../components/ProductCard'
import {
  ShoppingBag,
  Truck,
  Shield,
  Star,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import slide1 from '../../istockphoto-1201024668-612x612.jpg'
import slide2 from '../../istockphoto-1300966679-612x612.jpg'
import slide3 from '../../istockphoto-1308246727-612x612.jpg'
import slide4 from '../../istockphoto-1409728562-612x612.jpg'
import slide5 from '../../istockphoto-1453723844-612x612.jpg'
import slide6 from '../../istockphoto-626856214-612x612.jpg'
import slide7 from '../../istockphoto-653003428-612x612.jpg'
import slide8 from '../../istockphoto-831656828-612x612.jpg'
import slide9 from '../../pic1.jpg'

const heroSlides = [
  { src: slide5, caption: 'Sharp formals for standout events.' },
  { src: slide3, caption: 'Premium layering for every season.' },
  { src: slide1, caption: 'Tailored fits with modern lines.' },
  { src: slide6, caption: 'Statement outerwear, refined details.' },
  { src: slide2, caption: 'Weekend-ready casual sophistication.' },
  { src: slide4, caption: 'Elevated essentials, sleek silhouettes.' },
  { src: slide7, caption: 'Comfort-first polos, premium fabrics.' },
  { src: slide8, caption: 'Luxury knitwear for cooler days.' },
  { src: slide9, caption: 'Curated looks from our latest drop.' },
]

const Home = () => {
  const [newArrivals, setNewArrivals] = useState([])
  const [backInStock, setBackInStock] = useState([])
  const [featured, setFeatured] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 4500)

    return () => clearInterval(timer)
  }, [])

  const fetchProducts = async () => {
    try {
      const [newArrivalsRes, backInStockRes, featuredRes] = await Promise.all([
        axios.get('/api/products?newArrival=true&limit=6'),
        axios.get('/api/products?backInStock=true&limit=6'),
        axios.get('/api/products?featured=true&limit=6'),
      ])

      setNewArrivals(newArrivalsRes.data.products || [])
      setBackInStock(backInStockRes.data.products || [])
      setFeatured(featuredRes.data.products || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 grid gap-10 lg:grid-cols-2 items-center">
          <div className="text-center lg:text-left space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-300">
              Welcome to
            </p>
            <h1 className="text-5xl font-bold leading-tight">
              Jolly Enterprises
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Premium clothing for every occasion — discover curated looks,
              tailored fits, and elevated essentials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
              <Link to="/products" className="btn-primary inline-block">
                Shop Now
              </Link>
              <span className="text-sm text-gray-300">
                Handpicked styles updated weekly.
              </span>
            </div>
          </div>

          <div className="relative w-full">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gray-800 aspect-[4/3]">
              {heroSlides.map((slide, index) => (
                <div
                  key={slide.src}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={slide.src}
                    alt={slide.caption}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-300">
                        Premium Clothing
                      </p>
                      <p className="text-lg font-semibold">{slide.caption}</p>
                    </div>
                    <span className="text-xs bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur">
                      {index + 1}/{heroSlides.length}
                    </span>
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full backdrop-blur hover:bg-black/70 transition"
                aria-label="Previous slide"
                onClick={() =>
                  setCurrentSlide(
                    (prev) =>
                      (prev - 1 + heroSlides.length) % heroSlides.length
                  )
                }
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full backdrop-blur hover:bg-black/70 transition"
                aria-label="Next slide"
                onClick={() =>
                  setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
                }
              >
                <ChevronRight size={20} />
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`h-2.5 w-2.5 rounded-full transition ${
                      index === currentSlide
                        ? 'bg-white'
                        : 'bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <Truck className="mx-auto mb-2" size={40} />
              <h3 className="font-semibold mb-1">Fast Shipping</h3>
              <p className="text-sm text-gray-600">Ships in 24–48 Hours</p>
            </div>
            <div className="text-center">
              <Star className="mx-auto mb-2" size={40} />
              <h3 className="font-semibold mb-1">4.8★ Rating</h3>
              <p className="text-sm text-gray-600">from 8,000+ customers</p>
            </div>
            <div className="text-center">
              <Shield className="mx-auto mb-2" size={40} />
              <h3 className="font-semibold mb-1">Secure Checkout</h3>
              <p className="text-sm text-gray-600">Secure Checkout with Buyer Protection</p>
            </div>
            <div className="text-center">
              <ShoppingBag className="mx-auto mb-2" size={40} />
              <h3 className="font-semibold mb-1">Store Location</h3>
              <p className="text-sm text-gray-600">Visit our 5 Stores in Coimbatore</p>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">NEW ARRIVAL</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              {newArrivals.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back in Stock */}
      {backInStock.length > 0 && (
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">BACK IN STOCK</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              {backInStock.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">FEATURED PRODUCTS</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              {featured.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default Home

