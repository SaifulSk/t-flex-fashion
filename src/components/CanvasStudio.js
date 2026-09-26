"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import TShirtMockup from "./TShirtMockup";
import { DESIGN_CLIPARTS, AVAILABLE_FONTS, PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import confetti from "canvas-confetti";
import {
  Type,
  Image as ImageIcon,
  Sparkles,
  Layers,
  Palette,
  Undo2,
  Redo2,
  Trash2,
  Copy,
  Download,
  RotateCw,
  Maximize2,
  Minimize2,
  Eye,
  EyeOff,
  ShoppingBag,
  BookmarkCheck,
  Check,
  AlertCircle,
  Move,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Sliders,
  ChevronRight,
  ArrowUpDown,
  RefreshCw
} from "lucide-react";

// Standard canvas coordinates
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 650;

export default function CanvasStudio({ initialProduct = null }) {
  const { addToCart } = useCart();
  const { user } = useAuth();

  // Active apparel selection
  const [selectedProduct, setSelectedProduct] = useState(
    initialProduct || PRODUCTS[0]
  );
  const [shirtColor, setShirtColor] = useState(
    initialProduct?.colors?.[0]?.hex || "#121214"
  );
  const [shirtSize, setShirtSize] = useState("L");
  const [activeSide, setActiveSide] = useState("front"); // 'front' | 'back'
  const [showPrintGuide, setShowPrintGuide] = useState(true);

  // Active tool tab
  const [activeTab, setActiveTab] = useState("text"); // 'text' | 'graphics' | 'upload' | 'layers' | 'apparel'

  // Front & Back canvas objects
  const [frontElements, setFrontElements] = useState([
    {
      id: "init-text",
      type: "text",
      text: "T-FLEX",
      fontFamily: "Impact, Charcoal, sans-serif",
      fontSize: 56,
      fill: "#00f0ff",
      stroke: "#000000",
      strokeWidth: 0,
      letterSpacing: 4,
      isBold: true,
      isItalic: false,
      align: "center",
      curved: 0,
      opacity: 1,
      x: CANVAS_WIDTH / 2,
      y: 190,
      width: 220,
      height: 70,
      rotation: 0
    },
    {
      id: "init-subtext",
      type: "text",
      text: "LIMITED EDITION",
      fontFamily: "Montserrat, sans-serif",
      fontSize: 16,
      fill: "#ffffff",
      stroke: "#000000",
      strokeWidth: 0,
      letterSpacing: 6,
      isBold: true,
      isItalic: false,
      align: "center",
      curved: 0,
      opacity: 0.9,
      x: CANVAS_WIDTH / 2,
      y: 250,
      width: 240,
      height: 30,
      rotation: 0
    }
  ]);

  const [backElements, setBackElements] = useState([]);
  const [selectedId, setSelectedId] = useState("init-text");

  // Undo/Redo stacks
  const [history, setHistory] = useState({
    front: [frontElements],
    back: [[]],
    index: { front: 0, back: 0 }
  });

  // UI notifications & states
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  // Canvas element ref
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Mouse interaction state for dragging, resizing, rotating
  const dragRef = useRef({
    isDragging: false,
    isResizing: false,
    isRotating: false,
    handle: null,
    startX: 0,
    startY: 0,
    elemStartX: 0,
    elemStartY: 0,
    elemStartW: 0,
    elemStartH: 0,
    elemStartAngle: 0
  });

  const currentElements = activeSide === "front" ? frontElements : backElements;

  // Helper to update elements and record history
  const updateElements = useCallback((newElements, recordHistory = true) => {
    if (activeSide === "front") {
      setFrontElements(newElements);
    } else {
      setBackElements(newElements);
    }

    if (recordHistory) {
      setHistory((prev) => {
        const side = activeSide;
        const currentStack = prev[side].slice(0, prev.index[side] + 1);
        return {
          ...prev,
          [side]: [...currentStack, newElements],
          index: {
            ...prev.index,
            [side]: currentStack.length
          }
        };
      });
    }
  }, [activeSide]);

  // Undo / Redo handlers
  const handleUndo = () => {
    const side = activeSide;
    const currentIndex = history.index[side];
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      const targetState = history[side][prevIndex];
      if (side === "front") setFrontElements(targetState);
      else setBackElements(targetState);
      setHistory((prev) => ({
        ...prev,
        index: { ...prev.index, [side]: prevIndex }
      }));
    }
  };

  const handleRedo = () => {
    const side = activeSide;
    const currentIndex = history.index[side];
    if (currentIndex < history[side].length - 1) {
      const nextIndex = currentIndex + 1;
      const targetState = history[side][nextIndex];
      if (side === "front") setFrontElements(targetState);
      else setBackElements(targetState);
      setHistory((prev) => ({
        ...prev,
        index: { ...prev.index, [side]: nextIndex }
      }));
    }
  };

  // Selected element object
  const activeElement = currentElements.find((e) => e.id === selectedId) || null;

  // Update a single property of active element
  const updateActiveElement = (updates) => {
    if (!selectedId) return;
    const updated = currentElements.map((el) =>
      el.id === selectedId ? { ...el, ...updates } : el
    );
    updateElements(updated);
  };

  // Text tools
  const handleAddText = () => {
    const newText = {
      id: `text-${Date.now()}`,
      type: "text",
      text: "CUSTOM TEXT",
      fontFamily: "Montserrat, sans-serif",
      fontSize: 40,
      fill: "#ffffff",
      stroke: "#000000",
      strokeWidth: 0,
      letterSpacing: 2,
      isBold: true,
      isItalic: false,
      align: "center",
      curved: 0,
      opacity: 1,
      x: CANVAS_WIDTH / 2,
      y: 280,
      width: 260,
      height: 50,
      rotation: 0
    };
    updateElements([...currentElements, newText]);
    setSelectedId(newText.id);
  };

  // Clipart tools
  const handleAddClipart = (clipart) => {
    // Convert SVG string to data URL image
    const svgBlob = new Blob([clipart.svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.src = url;
    img.onload = () => {
      const newClipart = {
        id: `clipart-${Date.now()}`,
        type: "image",
        name: clipart.name,
        img: img,
        src: url,
        x: CANVAS_WIDTH / 2,
        y: 280,
        width: 140,
        height: 140,
        rotation: 0,
        opacity: 1,
        fill: "#00f0ff"
      };
      updateElements([...currentElements, newClipart]);
      setSelectedId(newClipart.id);
    };
  };

  // Upload artwork tool
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        // scale proportionally to max 200px
        const maxDim = 200;
        let w = img.width;
        let h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = (h / w) * maxDim;
            w = maxDim;
          } else {
            w = (w / h) * maxDim;
            h = maxDim;
          }
        }
        const newImg = {
          id: `upload-${Date.now()}`,
          type: "image",
          name: file.name,
          img: img,
          src: event.target.result,
          x: CANVAS_WIDTH / 2,
          y: 280,
          width: Math.round(w),
          height: Math.round(h),
          rotation: 0,
          opacity: 1
        };
        updateElements([...currentElements, newImg]);
        setSelectedId(newImg.id);
      };
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // Duplicate active element
  const handleDuplicate = () => {
    if (!activeElement) return;
    const clone = {
      ...activeElement,
      id: `${activeElement.type}-${Date.now()}`,
      x: activeElement.x + 20,
      y: activeElement.y + 20
    };
    updateElements([...currentElements, clone]);
    setSelectedId(clone.id);
  };

  // Delete active element
  const handleDelete = () => {
    if (!selectedId) return;
    const remaining = currentElements.filter((el) => el.id !== selectedId);
    updateElements(remaining);
    setSelectedId(remaining.length ? remaining[remaining.length - 1].id : null);
  };

  // Layer ordering
  const handleMoveLayer = (direction) => {
    if (!activeElement) return;
    const index = currentElements.findIndex((e) => e.id === selectedId);
    if (index === -1) return;

    const items = [...currentElements];
    if (direction === "up" && index < items.length - 1) {
      const temp = items[index];
      items[index] = items[index + 1];
      items[index + 1] = temp;
    } else if (direction === "down" && index > 0) {
      const temp = items[index];
      items[index] = items[index - 1];
      items[index - 1] = temp;
    } else if (direction === "top") {
      const [item] = items.splice(index, 1);
      items.push(item);
    } else if (direction === "bottom") {
      const [item] = items.splice(index, 1);
      items.unshift(item);
    }
    updateElements(items);
  };

  // Center alignment
  const handleCenter = (axis) => {
    if (!activeElement) return;
    if (axis === "h") {
      updateActiveElement({ x: CANVAS_WIDTH / 2 });
    } else if (axis === "v") {
      updateActiveElement({ y: CANVAS_HEIGHT / 2 });
    }
  };

  // Clear Canvas
  const handleClear = () => {
    if (window.confirm("Clear all elements on this side?")) {
      updateElements([]);
      setSelectedId(null);
    }
  };

  // ----------------------------------------------------
  // CANVAS RENDERING ENGINE
  // ----------------------------------------------------
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw Print Area Border Guide (if enabled)
    if (showPrintGuide) {
      ctx.save();
      ctx.strokeStyle = "rgba(0, 240, 255, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 6]);
      ctx.strokeRect(10, 10, CANVAS_WIDTH - 20, CANVAS_HEIGHT - 20);

      ctx.font = "10px 'Plus Jakarta Sans', sans-serif";
      ctx.fillStyle = "rgba(0, 240, 255, 0.6)";
      ctx.textAlign = "center";
      ctx.fillText("PRINT AREA • 12\" × 16\"", CANVAS_WIDTH / 2, 24);
      ctx.restore();
    }

    // Draw all elements in order
    currentElements.forEach((el) => {
      ctx.save();
      ctx.translate(el.x, el.y);
      ctx.rotate((el.rotation * Math.PI) / 180);
      ctx.globalAlpha = el.opacity ?? 1;

      if (el.type === "text") {
        ctx.font = `${el.isItalic ? "italic " : ""}${el.isBold ? "bold " : ""}${el.fontSize}px ${el.fontFamily}`;
        ctx.textAlign = el.align || "center";
        ctx.textBaseline = "middle";

        // Curved text or regular text
        if (el.curved && el.curved !== 0) {
          drawCurvedText(ctx, el);
        } else {
          // Draw Stroke
          if (el.strokeWidth > 0 && el.stroke) {
            ctx.strokeStyle = el.stroke;
            ctx.lineWidth = el.strokeWidth;
            ctx.lineJoin = "round";
            ctx.strokeText(el.text, 0, 0);
          }
          // Draw Fill
          ctx.fillStyle = el.fill || "#ffffff";
          ctx.fillText(el.text, 0, 0);
        }
      } else if (el.type === "image" && el.img) {
        ctx.drawImage(
          el.img,
          -el.width / 2,
          -el.height / 2,
          el.width,
          el.height
        );
      }

      ctx.restore();

      // Draw Selection Bounding Box & Handles for active element
      if (el.id === selectedId) {
        drawSelectionBox(ctx, el);
      }
    });
  }, [currentElements, selectedId, showPrintGuide]);

  // Curved text rendering math
  const drawCurvedText = (ctx, el) => {
    const chars = el.text.split("");
    const radius = Math.abs(el.curved * 3);
    const direction = el.curved > 0 ? 1 : -1;
    const totalAngle = (chars.length * el.fontSize * 0.5) / radius;
    let startAngle = -totalAngle / 2;

    chars.forEach((char) => {
      ctx.save();
      const angle = startAngle + (chars.indexOf(char) / chars.length) * totalAngle;
      ctx.rotate(angle * direction);
      ctx.translate(0, direction > 0 ? -radius : radius);

      if (el.strokeWidth > 0 && el.stroke) {
        ctx.strokeStyle = el.stroke;
        ctx.lineWidth = el.strokeWidth;
        ctx.strokeText(char, 0, 0);
      }
      ctx.fillStyle = el.fill || "#ffffff";
      ctx.fillText(char, 0, 0);
      ctx.restore();
    });
  };

  // Draw Transform Handles & Outline
  const drawSelectionBox = (ctx, el) => {
    ctx.save();
    ctx.translate(el.x, el.y);
    ctx.rotate((el.rotation * Math.PI) / 180);

    const halfW = el.width / 2 + 8;
    const halfH = el.height / 2 + 8;

    // Selection dashed border
    ctx.strokeStyle = "#00f0ff";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.strokeRect(-halfW, -halfH, halfW * 2, halfH * 2);
    ctx.setLineDash([]);

    // 4 Corner resize handles
    const handleSize = 10;
    const corners = [
      { x: -halfW, y: -halfH },
      { x: halfW, y: -halfH },
      { x: halfW, y: halfH },
      { x: -halfW, y: halfH }
    ];

    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#00f0ff";
    ctx.lineWidth = 2;

    corners.forEach((c) => {
      ctx.fillRect(c.x - handleSize / 2, c.y - handleSize / 2, handleSize, handleSize);
      ctx.strokeRect(c.x - handleSize / 2, c.y - handleSize / 2, handleSize, handleSize);
    });

    // Rotation Handle at Top
    const rotY = -halfH - 24;
    ctx.beginPath();
    ctx.moveTo(0, -halfH);
    ctx.lineTo(0, rotY);
    ctx.strokeStyle = "#00f0ff";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, rotY, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#00f0ff";
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.restore();
  };

  // Re-render when elements change
  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  // ----------------------------------------------------
  // MOUSE & TOUCH EVENT HANDLERS
  // ----------------------------------------------------
  const getCanvasCoords = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_WIDTH / rect.width;
    const scaleY = CANVAS_HEIGHT / rect.height;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const handlePointerDown = (e) => {
    const coords = getCanvasCoords(e);
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check if clicked on rotation handle of selected element
    if (activeElement) {
      const rad = (activeElement.rotation * Math.PI) / 180;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);

      const halfH = activeElement.height / 2 + 8;
      const rotRelX = 0;
      const rotRelY = -halfH - 24;

      const rotHandleX = activeElement.x + (rotRelX * cos - rotRelY * sin);
      const rotHandleY = activeElement.y + (rotRelX * sin + rotRelY * cos);

      const distRot = Math.hypot(coords.x - rotHandleX, coords.y - rotHandleY);
      if (distRot <= 14) {
        dragRef.current = {
          isRotating: true,
          startX: coords.x,
          startY: coords.y,
          elemStartX: activeElement.x,
          elemStartY: activeElement.y,
          elemStartAngle: activeElement.rotation
        };
        return;
      }

      // Check if clicked corner resize handles
      const halfW = activeElement.width / 2 + 8;
      const cornerHandles = [
        { handle: "nw", x: -halfW, y: -halfH },
        { handle: "ne", x: halfW, y: -halfH },
        { handle: "se", x: halfW, y: halfH },
        { handle: "sw", x: -halfW, y: halfH }
      ];

      for (let c of cornerHandles) {
        const hX = activeElement.x + (c.x * cos - c.y * sin);
        const hY = activeElement.y + (c.x * sin + c.y * cos);
        if (Math.hypot(coords.x - hX, coords.y - hY) <= 12) {
          dragRef.current = {
            isResizing: true,
            handle: c.handle,
            startX: coords.x,
            startY: coords.y,
            elemStartW: activeElement.width,
            elemStartH: activeElement.height,
            elemStartX: activeElement.x,
            elemStartY: activeElement.y,
            elemStartAngle: activeElement.rotation
          };
          return;
        }
      }
    }

    // Check if clicked inside any element (from top to bottom)
    const reversed = [...currentElements].reverse();
    const hit = reversed.find((el) => {
      // Inverse rotate point to match axis-aligned element
      const dx = coords.x - el.x;
      const dy = coords.y - el.y;
      const rad = (-el.rotation * Math.PI) / 180;
      const localX = dx * Math.cos(rad) - dy * Math.sin(rad);
      const localY = dx * Math.sin(rad) + dy * Math.cos(rad);

      const halfW = el.width / 2 + 10;
      const halfH = el.height / 2 + 10;
      return (
        localX >= -halfW && localX <= halfW && localY >= -halfH && localY <= halfH
      );
    });

    if (hit) {
      setSelectedId(hit.id);
      dragRef.current = {
        isDragging: true,
        startX: coords.x,
        startY: coords.y,
        elemStartX: hit.x,
        elemStartY: hit.y
      };
    } else {
      setSelectedId(null);
    }
  };

  const handlePointerMove = (e) => {
    const coords = getCanvasCoords(e);

    if (dragRef.current.isRotating && activeElement) {
      const dx = coords.x - activeElement.x;
      const dy = coords.y - activeElement.y;
      let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      if (angle < 0) angle += 360;
      updateActiveElement({ rotation: Math.round(angle) });
      return;
    }

    if (dragRef.current.isResizing && activeElement) {
      const dx = coords.x - dragRef.current.startX;
      const dy = coords.y - dragRef.current.startY;
      const change = Math.max(Math.abs(dx), Math.abs(dy)) * (dx > 0 || dy > 0 ? 1 : -1);

      let newW = Math.max(40, dragRef.current.elemStartW + change * 2);
      let newH = Math.max(20, dragRef.current.elemStartH + change * 2);

      if (activeElement.type === "text") {
        const fontScale = newW / dragRef.current.elemStartW;
        const newFontSize = Math.min(
          120,
          Math.max(14, Math.round(activeElement.fontSize * fontScale))
        );
        updateActiveElement({ width: newW, height: newH, fontSize: newFontSize });
      } else {
        updateActiveElement({ width: newW, height: newH });
      }
      return;
    }

    if (dragRef.current.isDragging && activeElement) {
      const dx = coords.x - dragRef.current.startX;
      const dy = coords.y - dragRef.current.startY;
      updateActiveElement({
        x: Math.round(dragRef.current.elemStartX + dx),
        y: Math.round(dragRef.current.elemStartY + dy)
      });
      return;
    }
  };

  const handlePointerUp = () => {
    if (
      dragRef.current.isDragging ||
      dragRef.current.isResizing ||
      dragRef.current.isRotating
    ) {
      // Record history state on drag release
      updateElements([...currentElements]);
    }
    dragRef.current = {
      isDragging: false,
      isResizing: false,
      isRotating: false,
      handle: null
    };
  };

  // ----------------------------------------------------
  // EXPORT & CART INTEGRATION
  // ----------------------------------------------------
  const generateCompositePreview = async () => {
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 950;
    const ctx = canvas.getContext("2d");

    // Background gradient / clean neutral
    ctx.fillStyle = "#161822";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw shirt svg mockup onto this canvas
    const svgEl = document.querySelector("#tshirt-studio-preview svg");
    if (svgEl) {
      const svgXml = new XMLSerializer().serializeToString(svgEl);
      const svgBlob = new Blob([svgXml], { type: "image/svg+xml;charset=utf-8" });
      const svgUrl = URL.createObjectURL(svgBlob);
      const shirtImg = new Image();
      shirtImg.src = svgUrl;

      await new Promise((resolve) => {
        shirtImg.onload = () => {
          ctx.drawImage(shirtImg, 50, 40, 700, 810);
          resolve();
        };
        shirtImg.onerror = () => resolve();
      });
      URL.revokeObjectURL(svgUrl);
    }

    // Draw current canvas print design over chest area
    const printCanvas = canvasRef.current;
    if (printCanvas) {
      // Scaled chest placement
      ctx.drawImage(printCanvas, 275, 230, 250, 325);
    }

    return canvas.toDataURL("image/png");
  };

  const handleDownloadMockup = async () => {
    const dataUrl = await generateCompositePreview();
    const link = document.createElement("a");
    link.download = `tflex-custom-${selectedProduct.id}-${activeSide}.png`;
    link.href = dataUrl;
    link.click();
  };

  const handleSaveToCloud = async () => {
    setIsSaving(true);
    try {
      const previewUrl = await generateCompositePreview();
      const designPayload = {
        userId: user ? user.uid : "guest",
        product: selectedProduct.name,
        productId: selectedProduct.id,
        shirtColor: shirtColor,
        frontElements: frontElements.map((e) => ({ ...e, img: null })), // omit raw DOM img
        backElements: backElements.map((e) => ({ ...e, img: null })),
        previewThumbnail: previewUrl,
        createdAt: new Date().toISOString()
      };

      if (user) {
        await addDoc(collection(db, "designs"), {
          ...designPayload,
          serverTime: serverTimestamp()
        });
      } else {
        // Save in guest storage
        const saved = JSON.parse(localStorage.getItem("tflex_saved_designs") || "[]");
        saved.unshift(designPayload);
        localStorage.setItem("tflex_saved_designs", JSON.stringify(saved.slice(0, 10)));
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Save error:", err);
      alert("Design saved locally! Sign in to keep all designs permanently in your cloud vault.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddToCart = async () => {
    const previewUrl = await generateCompositePreview();
    const customExtra = (frontElements.length > 0 ? 5 : 0) + (backElements.length > 0 ? 5 : 0);
    const unitPrice = selectedProduct.price + customExtra;

    addToCart({
      id: selectedProduct.id,
      name: `Custom ${selectedProduct.name}`,
      price: unitPrice,
      color: selectedProduct.colors.find((c) => c.hex === shirtColor) || {
        name: "Custom Color",
        hex: shirtColor
      },
      size: shirtSize,
      image: previewUrl,
      isCustom: true,
      customDetails: {
        frontItemsCount: frontElements.length,
        backItemsCount: backElements.length,
        previewThumbnail: previewUrl,
        frontElements: frontElements.map((e) => ({ ...e, img: null })),
        backElements: backElements.map((e) => ({ ...e, img: null }))
      }
    });

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 }
    });

    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3500);
  };

  // Quick fashion color swatches
  const COLOR_PALETTE = [
    "#121214", // Jet Black
    "#f8f9fa", // Clean White
    "#2b2d35", // Charcoal
    "#1a3a2a", // Forest Green
    "#1b2838", // Vintage Navy
    "#7a1c1d", // Crimson Red
    "#8338ec", // Neon Purple
    "#00f0ff", // Cyber Cyan
    "#ff007a", // Vivid Pink
    "#f59e0b", // Amber
    "#e2d9c8"  // Vintage Oatmeal
  ];

  return (
    <div style={{ minHeight: "100vh", padding: "30px 16px 80px" }}>
      <div className="container">
        {/* Top Studio Header */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
            padding: "16px 24px",
            background: "var(--bg-glass)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border-subtle)",
            backdropFilter: "blur(12px)"
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span className="badge badge-cyan">Studio 2.0</span>
              <h1 style={{ fontSize: "1.5rem", fontWeight: 800 }}>
                Customizer <span className="text-gradient">Studio</span>
              </h1>
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "2px" }}>
              Design your dream apparel with live canvas rendering & DTG print preview
            </p>
          </div>

          {/* Quick Actions (Undo, Redo, Download, Save, Cart) */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <button
              onClick={handleUndo}
              disabled={history.index[activeSide] <= 0}
              className="btn-secondary"
              style={{
                padding: "8px 14px",
                opacity: history.index[activeSide] <= 0 ? 0.4 : 1
              }}
              title="Undo (Ctrl+Z)"
            >
              <Undo2 size={16} />
              <span style={{ fontSize: "0.85rem" }}>Undo</span>
            </button>

            <button
              onClick={handleRedo}
              disabled={history.index[activeSide] >= history[activeSide].length - 1}
              className="btn-secondary"
              style={{
                padding: "8px 14px",
                opacity:
                  history.index[activeSide] >= history[activeSide].length - 1
                    ? 0.4
                    : 1
              }}
              title="Redo"
            >
              <Redo2 size={16} />
              <span style={{ fontSize: "0.85rem" }}>Redo</span>
            </button>

            <button
              onClick={handleDownloadMockup}
              className="btn-secondary"
              style={{ padding: "8px 14px" }}
              title="Download high-resolution mockup"
            >
              <Download size={16} />
              <span style={{ fontSize: "0.85rem" }}>Mockup</span>
            </button>

            <button
              onClick={handleSaveToCloud}
              disabled={isSaving}
              className="btn-secondary"
              style={{ padding: "8px 14px" }}
              title="Save design to cloud account"
            >
              {saveSuccess ? (
                <>
                  <Check size={16} color="#10b981" />
                  <span style={{ fontSize: "0.85rem", color: "#10b981" }}>Saved</span>
                </>
              ) : (
                <>
                  <BookmarkCheck size={16} />
                  <span style={{ fontSize: "0.85rem" }}>Save</span>
                </>
              )}
            </button>

            <button
              onClick={handleAddToCart}
              className="btn-primary"
              style={{ padding: "10px 22px" }}
            >
              <ShoppingBag size={18} />
              <span>
                Add to Cart • $
                {(
                  selectedProduct.price +
                  (frontElements.length ? 5 : 0) +
                  (backElements.length ? 5 : 0)
                ).toFixed(2)}
              </span>
            </button>
          </div>
        </div>

        {/* Main Studio Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "360px 1fr",
            gap: "24px",
            alignItems: "start"
          }}
        >
          {/* LEFT SIDEBAR: TOOL TABS & CONTROLS */}
          <div
            style={{
              background: "var(--bg-card)",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--border-subtle)",
              padding: "20px",
              boxShadow: "var(--shadow-subtle)"
            }}
          >
            {/* Tab navigation */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "4px",
                padding: "4px",
                background: "rgba(0,0,0,0.3)",
                borderRadius: "var(--radius-md)",
                marginBottom: "20px"
              }}
            >
              {[
                { id: "text", label: "Text", icon: Type },
                { id: "graphics", label: "Art", icon: Sparkles },
                { id: "upload", label: "Upload", icon: ImageIcon },
                { id: "layers", label: "Layers", icon: Layers },
                { id: "apparel", label: "Shirt", icon: Palette }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                      padding: "8px 2px",
                      borderRadius: "var(--radius-sm)",
                      background: isActive ? "var(--bg-tertiary)" : "transparent",
                      color: isActive ? "var(--accent-cyan)" : "var(--text-secondary)",
                      border: isActive
                        ? "1px solid rgba(0, 240, 255, 0.3)"
                        : "1px solid transparent",
                      fontSize: "0.72rem",
                      fontWeight: isActive ? 700 : 500,
                      transition: "all 0.2s"
                    }}
                  >
                    <Icon size={16} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT 1: TEXT TOOLS */}
            {activeTab === "text" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <button
                  onClick={handleAddText}
                  className="btn-primary"
                  style={{ width: "100%", borderRadius: "var(--radius-md)", padding: "12px" }}
                >
                  <Type size={16} />
                  <span>+ Add New Text</span>
                </button>

                {activeElement && activeElement.type === "text" ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "14px",
                      background: "rgba(0,0,0,0.25)",
                      padding: "16px",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-subtle)"
                    }}
                  >
                    <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--accent-cyan)" }}>
                      EDIT SELECTED TEXT
                    </div>

                    {/* Text Input */}
                    <div>
                      <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                        Text Content
                      </label>
                      <input
                        type="text"
                        value={activeElement.text}
                        onChange={(e) => updateActiveElement({ text: e.target.value })}
                        className="input-field"
                      />
                    </div>

                    {/* Font Family */}
                    <div>
                      <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                        Font Style
                      </label>
                      <select
                        value={activeElement.fontFamily}
                        onChange={(e) => updateActiveElement({ fontFamily: e.target.value })}
                        className="input-field"
                        style={{ cursor: "pointer" }}
                      >
                        {AVAILABLE_FONTS.map((font) => (
                          <option key={font.name} value={font.value} style={{ background: "#1a1c26", color: "#fff" }}>
                            {font.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Font Size & Arc Slider */}
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                        <span>Font Size</span>
                        <span>{activeElement.fontSize}px</span>
                      </div>
                      <input
                        type="range"
                        min="16"
                        max="110"
                        value={activeElement.fontSize}
                        onChange={(e) => updateActiveElement({ fontSize: Number(e.target.value) })}
                        style={{ width: "100%", accentColor: "var(--accent-cyan)", marginTop: "6px" }}
                      />
                    </div>

                    {/* Curved Arch Effect */}
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                        <span>Text Curve / Arch</span>
                        <span>{activeElement.curved || 0}°</span>
                      </div>
                      <input
                        type="range"
                        min="-60"
                        max="60"
                        value={activeElement.curved || 0}
                        onChange={(e) => updateActiveElement({ curved: Number(e.target.value) })}
                        style={{ width: "100%", accentColor: "var(--accent-purple)", marginTop: "6px" }}
                      />
                    </div>

                    {/* Formatting Toggles (Bold, Italic, Align) */}
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <button
                        onClick={() => updateActiveElement({ isBold: !activeElement.isBold })}
                        style={{
                          flex: 1,
                          padding: "8px",
                          borderRadius: "var(--radius-sm)",
                          background: activeElement.isBold ? "rgba(0, 240, 255, 0.2)" : "rgba(255,255,255,0.06)",
                          border: activeElement.isBold ? "1px solid var(--accent-cyan)" : "1px solid var(--border-subtle)"
                        }}
                      >
                        <Bold size={16} />
                      </button>

                      <button
                        onClick={() => updateActiveElement({ isItalic: !activeElement.isItalic })}
                        style={{
                          flex: 1,
                          padding: "8px",
                          borderRadius: "var(--radius-sm)",
                          background: activeElement.isItalic ? "rgba(0, 240, 255, 0.2)" : "rgba(255,255,255,0.06)",
                          border: activeElement.isItalic ? "1px solid var(--accent-cyan)" : "1px solid var(--border-subtle)"
                        }}
                      >
                        <Italic size={16} />
                      </button>

                      <button
                        onClick={() => updateActiveElement({ align: "left" })}
                        style={{
                          flex: 1,
                          padding: "8px",
                          borderRadius: "var(--radius-sm)",
                          background: activeElement.align === "left" ? "rgba(0, 240, 255, 0.2)" : "rgba(255,255,255,0.06)",
                          border: activeElement.align === "left" ? "1px solid var(--accent-cyan)" : "1px solid var(--border-subtle)"
                        }}
                      >
                        <AlignLeft size={16} />
                      </button>

                      <button
                        onClick={() => updateActiveElement({ align: "center" })}
                        style={{
                          flex: 1,
                          padding: "8px",
                          borderRadius: "var(--radius-sm)",
                          background: activeElement.align === "center" ? "rgba(0, 240, 255, 0.2)" : "rgba(255,255,255,0.06)",
                          border: activeElement.align === "center" ? "1px solid var(--accent-cyan)" : "1px solid var(--border-subtle)"
                        }}
                      >
                        <AlignCenter size={16} />
                      </button>

                      <button
                        onClick={() => updateActiveElement({ align: "right" })}
                        style={{
                          flex: 1,
                          padding: "8px",
                          borderRadius: "var(--radius-sm)",
                          background: activeElement.align === "right" ? "rgba(0, 240, 255, 0.2)" : "rgba(255,255,255,0.06)",
                          border: activeElement.align === "right" ? "1px solid var(--accent-cyan)" : "1px solid var(--border-subtle)"
                        }}
                      >
                        <AlignRight size={16} />
                      </button>
                    </div>

                    {/* Text Color Swatches */}
                    <div>
                      <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "8px" }}>
                        Text Color
                      </label>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {COLOR_PALETTE.map((hex) => (
                          <div
                            key={hex}
                            onClick={() => updateActiveElement({ fill: hex })}
                            style={{
                              width: "28px",
                              height: "28px",
                              borderRadius: "50%",
                              backgroundColor: hex,
                              border: activeElement.fill === hex ? "2px solid #00f0ff" : "1px solid rgba(255,255,255,0.2)",
                              cursor: "pointer",
                              boxShadow: activeElement.fill === hex ? "0 0 10px rgba(0, 240, 255, 0.5)" : "none"
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "24px 16px",
                      background: "rgba(0,0,0,0.2)",
                      borderRadius: "var(--radius-md)",
                      color: "var(--text-muted)",
                      fontSize: "0.85rem"
                    }}
                  >
                    Select a text element on the shirt to customize fonts, colors, curves, and styles.
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT 2: GRAPHICS & CLIPARTS */}
            {activeTab === "graphics" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  Curated street art, cyberpunk logos, and graphic badges:
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
                  {DESIGN_CLIPARTS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleAddClipart(item)}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "8px",
                        padding: "16px 12px",
                        background: "rgba(255,255,255,0.04)",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--border-subtle)",
                        transition: "all 0.2s"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--accent-cyan)";
                        e.currentTarget.style.background = "rgba(0, 240, 255, 0.08)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--border-subtle)";
                        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                      }}
                    >
                      <div
                        style={{ width: "48px", height: "48px", color: "var(--accent-cyan)" }}
                        dangerouslySetInnerHTML={{ __html: item.svg }}
                      />
                      <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: UPLOAD ARTWORK */}
            {activeTab === "upload" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <label
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                    padding: "36px 16px",
                    border: "2px dashed var(--border-highlight)",
                    borderRadius: "var(--radius-lg)",
                    background: "rgba(0, 240, 255, 0.03)",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent-cyan)";
                    e.currentTarget.style.background = "rgba(0, 240, 255, 0.07)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-highlight)";
                    e.currentTarget.style.background = "rgba(0, 240, 255, 0.03)";
                  }}
                >
                  <ImageIcon size={36} color="var(--accent-cyan)" />
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>Upload Your Design / Logo</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "4px" }}>
                      Supports high-res PNG, JPG, SVG, WebP (up to 25MB)
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                  <div className="btn-secondary" style={{ padding: "6px 16px", fontSize: "0.8rem", pointerEvents: "none" }}>
                    Browse Files
                  </div>
                </label>

                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-muted)",
                    padding: "12px",
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "var(--radius-md)"
                  }}
                >
                  💡 <strong>Tip for best print results:</strong> Transparent PNGs at 300 DPI will be rendered directly by our UltraHD DTG printers without any background box.
                </div>
              </div>
            )}

            {/* TAB CONTENT 4: LAYERS & ARRANGE */}
            {activeTab === "layers" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-secondary)" }}>
                    Active Elements ({currentElements.length})
                  </span>
                  <button
                    onClick={handleClear}
                    style={{ fontSize: "0.75rem", color: "var(--accent-magenta)", display: "flex", alignItems: "center", gap: "4px" }}
                  >
                    <Trash2 size={12} /> Clear Side
                  </button>
                </div>

                {currentElements.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "30px", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                    No elements on this side yet. Add text or graphics!
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {[...currentElements].reverse().map((item, idx) => {
                      const isSelected = item.id === selectedId;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setSelectedId(item.id)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "10px 14px",
                            borderRadius: "var(--radius-md)",
                            background: isSelected ? "rgba(0, 240, 255, 0.12)" : "rgba(255,255,255,0.04)",
                            border: isSelected ? "1px solid var(--accent-cyan)" : "1px solid var(--border-subtle)",
                            cursor: "pointer"
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            {item.type === "text" ? <Type size={16} /> : <ImageIcon size={16} />}
                            <span style={{ fontSize: "0.85rem", fontWeight: isSelected ? 700 : 500 }}>
                              {item.type === "text" ? item.text.slice(0, 16) : item.name || "Graphic"}
                            </span>
                          </div>

                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDuplicate();
                              }}
                              style={{ color: "var(--text-secondary)" }}
                              title="Duplicate"
                            >
                              <Copy size={14} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete();
                              }}
                              style={{ color: "var(--accent-magenta)" }}
                              title="Delete"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Layer arrange action buttons */}
                {activeElement && (
                  <div
                    style={{
                      marginTop: "12px",
                      padding: "14px",
                      background: "rgba(0,0,0,0.3)",
                      borderRadius: "var(--radius-md)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px"
                    }}
                  >
                    <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 700 }}>
                      LAYER ORDER & ALIGNMENT
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
                      <button onClick={() => handleMoveLayer("up")} className="btn-secondary" style={{ padding: "6px", fontSize: "0.75rem" }}>
                        Bring Forward
                      </button>
                      <button onClick={() => handleMoveLayer("down")} className="btn-secondary" style={{ padding: "6px", fontSize: "0.75rem" }}>
                        Send Backward
                      </button>
                      <button onClick={() => handleCenter("h")} className="btn-secondary" style={{ padding: "6px", fontSize: "0.75rem" }}>
                        Center Horizontally
                      </button>
                      <button onClick={() => handleCenter("v")} className="btn-secondary" style={{ padding: "6px", fontSize: "0.75rem" }}>
                        Center Vertically
                      </button>
                    </div>

                    {/* Opacity slider */}
                    <div style={{ marginTop: "6px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                        <span>Opacity</span>
                        <span>{Math.round((activeElement.opacity ?? 1) * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.1"
                        max="1"
                        step="0.05"
                        value={activeElement.opacity ?? 1}
                        onChange={(e) => updateActiveElement({ opacity: parseFloat(e.target.value) })}
                        style={{ width: "100%", accentColor: "var(--accent-cyan)", marginTop: "4px" }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT 5: APPAREL & COLOR OPTIONS */}
            {activeTab === "apparel" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {/* Select Base Product */}
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "8px" }}>
                    T-Shirt Silhouette
                  </label>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {PRODUCTS.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => {
                          setSelectedProduct(prod);
                          setShirtColor(prod.colors[0].hex);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "10px 14px",
                          borderRadius: "var(--radius-md)",
                          background: selectedProduct.id === prod.id ? "rgba(0, 240, 255, 0.12)" : "rgba(255,255,255,0.03)",
                          border: selectedProduct.id === prod.id ? "1px solid var(--accent-cyan)" : "1px solid var(--border-subtle)",
                          cursor: "pointer"
                        }}
                      >
                        <div>
                          <div style={{ fontSize: "0.85rem", fontWeight: 700 }}>{prod.name}</div>
                          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{prod.specs.weight}</div>
                        </div>
                        <span style={{ fontSize: "0.9rem", fontWeight: 800, color: "var(--accent-cyan)" }}>
                          ${prod.price.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fabric Colors */}
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "8px" }}>
                    Fabric Color
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                    {selectedProduct.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setShirtColor(c.hex)}
                        title={c.name}
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          backgroundColor: c.hex,
                          border: shirtColor === c.hex ? "3px solid #00f0ff" : "1px solid rgba(255,255,255,0.2)",
                          boxShadow: shirtColor === c.hex ? "0 0 12px rgba(0, 240, 255, 0.5)" : "none",
                          transition: "all 0.2s"
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Size Selector */}
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "8px" }}>
                    Apparel Size
                  </label>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {selectedProduct.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setShirtSize(s)}
                        style={{
                          padding: "8px 16px",
                          borderRadius: "var(--radius-sm)",
                          background: shirtSize === s ? "var(--accent-cyan)" : "rgba(255,255,255,0.06)",
                          color: shirtSize === s ? "#000000" : "#ffffff",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          border: "none",
                          transition: "all 0.15s"
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDE: LIVE MOCKUP & INTERACTIVE CANVAS STAGE */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px"
            }}
          >
            {/* View Switcher (Front / Back) & Print Bounds Toggle */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                maxWidth: "600px",
                padding: "8px 16px",
                background: "var(--bg-glass)",
                borderRadius: "var(--radius-full)",
                border: "1px solid var(--border-subtle)"
              }}
            >
              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  onClick={() => {
                    setActiveSide("front");
                    setSelectedId(frontElements[0]?.id || null);
                  }}
                  style={{
                    padding: "8px 20px",
                    borderRadius: "var(--radius-full)",
                    background: activeSide === "front" ? "var(--gradient-brand)" : "transparent",
                    color: activeSide === "front" ? "#ffffff" : "var(--text-secondary)",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    transition: "all 0.2s"
                  }}
                >
                  Front View ({frontElements.length})
                </button>

                <button
                  onClick={() => {
                    setActiveSide("back");
                    setSelectedId(backElements[0]?.id || null);
                  }}
                  style={{
                    padding: "8px 20px",
                    borderRadius: "var(--radius-full)",
                    background: activeSide === "back" ? "var(--gradient-brand)" : "transparent",
                    color: activeSide === "back" ? "#ffffff" : "var(--text-secondary)",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    transition: "all 0.2s"
                  }}
                >
                  Back View ({backElements.length})
                </button>
              </div>

              {/* Print Guide Toggle */}
              <button
                onClick={() => setShowPrintGuide(!showPrintGuide)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "0.8rem",
                  color: showPrintGuide ? "var(--accent-cyan)" : "var(--text-muted)"
                }}
              >
                {showPrintGuide ? <Eye size={15} /> : <EyeOff size={15} />}
                <span>Print Bounds</span>
              </button>
            </div>

            {/* MOCKUP CONTAINER WITH INTERACTIVE CANVAS OVERLAY */}
            <div
              id="tshirt-studio-preview"
              ref={containerRef}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "580px",
                aspectRatio: "600 / 700",
                background: "radial-gradient(circle at 50% 50%, #1e2235 0%, #0d0e14 100%)",
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--border-subtle)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden"
              }}
            >
              <TShirtMockup view={activeSide} color={shirtColor}>
                {/* INTERACTIVE CANVAS ELEMENT */}
                <canvas
                  ref={canvasRef}
                  width={CANVAS_WIDTH}
                  height={CANVAS_HEIGHT}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerLeave={handlePointerUp}
                  style={{
                    width: "100%",
                    height: "100%",
                    cursor: dragRef.current.isDragging
                      ? "grabbing"
                      : dragRef.current.isRotating
                      ? "crosshair"
                      : dragRef.current.isResizing
                      ? "nwse-resize"
                      : "default",
                    touchAction: "none"
                  }}
                />
              </TShirtMockup>
            </div>

            {/* Bottom notification indicator */}
            {addedNotice && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 24px",
                  background: "rgba(16, 185, 129, 0.15)",
                  border: "1px solid rgba(16, 185, 129, 0.4)",
                  borderRadius: "var(--radius-full)",
                  color: "#10b981",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  animation: "floatAnimation 3s ease infinite"
                }}
              >
                <Check size={18} />
                <span>Custom Tee successfully added to your cart!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
