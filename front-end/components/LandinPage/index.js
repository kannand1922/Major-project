"use client";
import React from 'react';
import './style.css';
import { useRouter } from "next/navigation";
  
const LandingPage = () => {
    const router = useRouter();
  return (
    <div className="landing-page">
      <header className="header">
        <h1 className="logo">Enterprise Name</h1>
        <nav className="nav">
          <a href="#about">About</a>
          <a href="#products">Products</a>
          <a onClick={()=>router.push("/login")}>Login</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h2>Welcome to Our Enterprise</h2>
          <p>We provide the best quality paint, pipes, and accessories for all your needs.</p>
          <a onClick={()=>router.push("/category")} className="btn">Explore Products</a>
        </div>
      </section>

      <section id="products" className="products">
        <h2>Our Products</h2>
        <div className="product-list">
          <div className="product-card">
            <img src="https://m.media-amazon.com/images/I/619b0dTruOL.jpg" alt="Paint" />
            <h3>Paint</h3>
            <p>High-quality paints in a variety of colors and finishes.</p>
          </div>
          <div className="product-card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAFzAOJej67hP6F74mLj35Thurrw4bzbztqQ&s" alt="Pipe" />
            <h3>Pipes</h3>
            <p>Durable and reliable pipes for all construction needs.</p>
          </div>
          <div className="product-card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTODhtMZ4gKC2BAAOjtChmc2zg_uMhM5yuVuw&s" alt="Accessories" />
            <h3>Accessories</h3>
            <p>Wide range of accessories to complement your projects.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2025 Enterprise Name. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
