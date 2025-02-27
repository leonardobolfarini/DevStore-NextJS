import { AddToCartButton } from '@/components/add-to-cart-button'
import { api } from '@/data/api'
import { Product } from '@/data/types/products'
import { Metadata } from 'next'
import Image from 'next/image'

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

async function getProduct(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })

  const product = await response.json()

  return product
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const loadedParams = await params
  const slug = loadedParams.slug

  const product = await getProduct(slug)

  return {
    title: product.title,
  }
}

export async function generateStaticParams() {
  const response = await api('/products/featured')
  const products: Product[] = await response.json()

  return products.map((product) => {
    return {
      slug: product.slug,
    }
  })
}

export default async function ProductPage({ params }: ProductPageProps) {
  const loadedParams = await params
  const slug = loadedParams.slug

  const product = await getProduct(slug)

  return (
    <div className="relative grid grid-cols-3 max-h-[860px]">
      <div className="col-span-2 overflow-hidden">
        <Image
          src={product.image}
          width={1000}
          height={1000}
          quality={100}
          alt=""
        />
      </div>

      <div className="flex flex-col justify-center px-12">
        <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>

        <p className="mt-8 leading-relaxed text-zinc-400">
          {product.description}
        </p>

        <div className="mt-8 flex items-center gap-3">
          <span className="inline-block rounded-full bg-violet-500 px-5 py-2.5 font-semibold">
            {product.price.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
              maximumFractionDigits: 0,
              minimumFractionDigits: 0,
            })}
          </span>
          <span className="text-sm text-zinc-400">
            Em 12x s/ juros de{' '}
            {(product.price / 12).toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </div>

        <div className="mt-8 space-y-4">
          <span className="block font-semibold">Tamanhos</span>

          <div className="flex gap-2">
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold hover:bg-zinc-700 hover:border-zinc-600 transition-colors"
            >
              P
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold hover:bg-zinc-700 hover:border-zinc-600 transition-colors"
            >
              M
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold hover:bg-zinc-700 hover:border-zinc-600 transition-colors"
            >
              G
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold hover:bg-zinc-700 hover:border-zinc-600 transition-colors"
            >
              GG
            </button>
          </div>
        </div>

        <AddToCartButton productId={product.id} />
      </div>
    </div>
  )
}
