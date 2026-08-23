import React from 'react'
const categories = [
  {
    name: "MEN",
    image:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=700",
  },
  {
    name: "WOMEN",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700",
  },
  {
    name: "SHOES",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700",
  },
];

const products = [
  {
    title: "Nike Sportswear",
    category: "Men",
    oldPrice: "$1400",
    price: "$1200",
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800",
  },
  {
    title: "Nike Women's Collection",
    category: "Women",
    oldPrice: "$1500",
    price: "$1350",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800",
  },
  {
    title: "Nike Running Shoes",
    category: "Shoes",
    oldPrice: "$1700",
    price: "$1500",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
  },
];

function CategoryCard({ category }) {
  return (
    <div className="category-card">
      <img src={category.image} alt={category.name} />

      <div className="category-info">
        <h3>{category.name}</h3>
        <span>Shop Now →</span>
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <span className="sale-badge">SALE</span>

        <img src={product.image} alt={product.title} />
      </div>

      <div className="product-info">
        <h3>{product.title}</h3>

        <p className="product-category">
          {product.category}
        </p>

        <div className="product-price">
          <span className="old-price">
            {product.oldPrice}
          </span>

          <span className="current-price">
            {product.price}
          </span>
        </div>
      </div>
    </div>
  );
}
function ShoppingHome() {
  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        .home {
          background: #fff;
          color: #111;
          font-family: Arial, sans-serif;
          padding: 40px 6%;
        }

        /* HERO */

        .hero {
          display: flex;
          height: 450px;
          margin-bottom: 80px;
        }

        .hero-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 40px;
        }

        .hero-label {
          color: #e0aaaa;
          font-size: 13px;
          letter-spacing: 2px;
          margin-bottom: 15px;
        }

        .hero-title {
          font-size: 58px;
          font-weight: 500;
          line-height: 1;
          margin: 0 0 20px;
        }

        .hero-description {
          color: #999;
          font-size: 15px;
          margin-bottom: 25px;
        }

        .shop-button {
          width: 130px;
          padding: 12px;
          border: none;
          background: #111;
          color: #fff;
          cursor: pointer;
          font-size: 12px;
          letter-spacing: 1px;
        }

        .shop-button:hover {
          background: #333;
        }

        .hero-image {
          width: 55%;
          overflow: hidden;
        }

        .hero-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* SECTION */

        .section {
          margin-bottom: 80px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .section-title {
          font-size: 24px;
          font-weight: 500;
          margin: 0;
        }

        .view-all {
          color: #e0aaaa;
          font-size: 14px;
          cursor: pointer;
        }

        /* CATEGORY */

        .category-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .category-card {
          cursor: pointer;
        }

        .category-card img {
          width: 100%;
          height: 320px;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }

        .category-card:hover img {
          transform: scale(1.02);
        }

        .category-info {
          padding-top: 15px;
        }

        .category-info h3 {
          font-size: 18px;
          font-weight: 400;
          margin: 0 0 8px;
        }

        .category-info span {
          color: #e0aaaa;
          font-size: 14px;
        }

        /* PRODUCT */

        .product-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
        }

        .product-card {
          cursor: pointer;
        }

        .product-image {
          position: relative;
          overflow: hidden;
        }

        .product-image img {
          width: 100%;
          height: 330px;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }

        .product-card:hover .product-image img {
          transform: scale(1.03);
        }

        .sale-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          z-index: 2;
          background: #ff4d6d;
          color: white;
          padding: 5px 8px;
          font-size: 10px;
        }

        .product-info {
          padding-top: 15px;
        }

        .product-info h3 {
          font-size: 17px;
          font-weight: 400;
          margin: 0 0 8px;
        }

        .product-category {
          color: #e0aaaa;
          font-size: 14px;
          margin: 0 0 12px;
        }

        .product-price {
          display: flex;
          gap: 18px;
        }

        .old-price {
          color: #888;
          font-size: 14px;
          text-decoration: line-through;
        }

        .current-price {
          color: #111;
          font-size: 15px;
        }

        /* RESPONSIVE */

        @media (max-width: 900px) {
          .hero {
            height: auto;
          }

          .hero-title {
            font-size: 45px;
          }

          .category-grid,
          .product-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .home {
            padding: 25px 5%;
          }

          .hero {
            flex-direction: column;
          }

          .hero-content {
            padding: 20px 0 30px;
          }

          .hero-image {
            width: 100%;
            height: 350px;
          }

          .category-grid,
          .product-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <main className="home">

        {/* Hero */}
        <section className="hero">
          <div className="hero-content">
            <p className="hero-label">
              NEW COLLECTION
            </p>

            <h1 className="hero-title">
              MOVE
              <br />
              WITH STYLE
            </h1>

            <p className="hero-description">
              Discover our latest collection.
            </p>

            <button className="shop-button">
              SHOP NOW
            </button>
          </div>

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200"
              alt="Collection"
            />
          </div>
        </section>

        {/* Categories */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">
              SHOP BY CATEGORY
            </h2>
          </div>

          <div className="category-grid">
            {categories.map((category) => (
              <CategoryCard
                key={category.name}
                category={category}
              />
            ))}
          </div>
        </section>

        {/* Products */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">
              FEATURED PRODUCTS
            </h2>

            <span className="view-all">
              View All →
            </span>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product.title}
                product={product}
              />
            ))}
          </div>
        </section>

      </main>
    </>
  );
}

export default ShoppingHome





