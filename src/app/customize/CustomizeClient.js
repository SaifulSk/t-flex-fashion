"use client";

import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import CanvasStudio from "@/components/CanvasStudio";
import { PRODUCTS } from "@/data/products";

export default function CustomizeClient() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("product");

  const initialProduct = useMemo(() => {
    if (!productId) return PRODUCTS[0];
    return PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
  }, [productId]);

  return <CanvasStudio initialProduct={initialProduct} />;
}
