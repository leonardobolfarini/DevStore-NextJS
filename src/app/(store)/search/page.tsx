import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { Product } from '@/data/types/products'
import { api } from '@/data/api'

interface SearchPageProps {
  searchParams: {
    q: string
  }
}

async function getSearchProducts(query: string): Promise<Product[]> {
  const response = await api(`/products/search?q=${query}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })

  const products = await response.json()

  return products
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: query } = await searchParams

  if (!query) {
    redirect('/')
  }

  const products = await getSearchProducts(query)

  return (
    <div className="flex flex-col gap-4">
      <p>
        Resultados para: <span className="font-semibold">{query}</span>
      </p>

      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => {
          return (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="relative group rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
            >
              <Image
                src={product.image}
                className="group-hover:scale-105 transition-transform duration-500"
                width={480}
                height={480}
                quality={100}
                alt=""
              />
              <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
                <span className="text-sm truncate">{product.title}</span>
                <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                  {product.price.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                    maximumFractionDigits: 0,
                    minimumFractionDigits: 0,
                  })}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
