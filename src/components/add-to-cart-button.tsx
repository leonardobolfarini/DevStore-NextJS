'use client'
import { useCart } from '@/contexts/cartContext'

interface AddToCartButtonProps {
  productId: number
}

export function AddToCartButton({ productId }: AddToCartButtonProps) {
  const { addToCart } = useCart()

  function handleAddToCart() {
    addToCart(productId)
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white hover:bg-emerald-500 transition-colors"
    >
      Adicionar ao carrinho
    </button>
  )
}
