import React from "react";
import { PRODUCTS } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id || p.slug === id);

  if (!product) {
    return {
      title: "Product Not Found | T-Flex Fashion"
    };
  }

  return {
    title: `${product.name} | T-Flex Custom Printing & Streetwear`,
    description: product.description
  };
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id
  }));
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id || p.slug === id) || PRODUCTS[0];

  return <ProductDetailClient product={product} />;
}
