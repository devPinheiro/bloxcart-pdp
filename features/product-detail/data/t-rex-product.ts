import type { ProductRecord } from '@/shared/types/product';
import { assets } from '@/shared/lib/assets';

/** Mock catalog item — matches take-home brief JSON (single source of truth). */
export const T_REX_PRODUCT: ProductRecord = {
  slug: 'permanent-t-rex-fruit-roblox',
  slugs: {
    'en-US': 'permanent-t-rex-fruit-roblox',
    'es-ES': 'fruta-t-rex-permanente-roblox',
  },
  game: { slug: 'blox-fruits', name: 'Blox Fruits' },
  category: 'Permanent Fruit',
  rarity: 'Mythical',
  delivery: 'Instant (under 5 min)',
  condition: 'Brand New',
  tags: ['Buy Permanent Fruits', 'Roblox Limiteds', 'Cheap Roblox', 'Roblox Updates'],
  locales: {
    'en-US': {
      title: 'Permanent T-Rex Fruit Roblox',
      description:
        'The Permanent T-Rex Fruit is a Beast-type Blox Fruits ability with high damage and one of the most recognizable forms in the game. Awakened, it transforms you into a full T-Rex with sweeping tail attacks, screen-shaking roars, and a bite that two-shots most early-game opponents. Delivered to your account in under 5 minutes by an in-game trade. Once attached, the fruit is permanent - it stays unlocked across all your servers and never expires.',
      priceOriginal: '$25.34',
      priceCurrent: '$21.50',
      priceSavings: '-$3.84',
      ctaLabel: 'Add to cart',
      trustBadges: ['Fast delivery', '24/7 Support', 'Secure pay'],
      priceAmount: 21.5,
      priceOriginalAmount: 25.34,
      priceCurrency: 'USD',
    },
    'es-ES': {
      title: 'Fruta T-Rex Permanente Roblox',
      description:
        'La Fruta T-Rex Permanente es una habilidad de tipo Bestia en Blox Fruits con alto daño y una de las formas más reconocibles del juego. Despertada, te transforma en un T-Rex completo con ataques de cola, rugidos que sacuden la pantalla y un mordisco capaz de derrotar a la mayoría de los oponentes de inicio en dos golpes. Entrega a tu cuenta en menos de 5 minutos mediante intercambio en el juego. Una vez vinculada, la fruta es permanente - permanece desbloqueada en todos tus servidores y nunca expira.',
      priceOriginal: '25,34 €',
      priceCurrent: '21,50 €',
      priceSavings: '-3,84 €',
      ctaLabel: 'Añadir al carrito',
      trustBadges: ['Envío rápido', 'Soporte 24/7', 'Pago seguro'],
      priceAmount: 21.5,
      priceOriginalAmount: 25.34,
      priceCurrency: 'EUR',
    },
  },
  stock: { available: true, quantity: 47 },
  images: [
    {
      url: 'https://res.cloudinary.com/appnet/image/upload/v1780044897/permanent-t-rex-fruit_1_i3aan3.webp',
      alt: 'T-Rex Fruit hero',
      width: 150,
      height: 143,
    },
    {
      url: 'https://res.cloudinary.com/appnet/image/upload/v1780044897/permanent-t-rex-fruit_1_i3aan3.webp',
      alt: 'T-Rex Fruit angle 2',
      width: 150,
      height: 143,
    },
    {
      url: 'https://res.cloudinary.com/appnet/image/upload/v1780044897/permanent-t-rex-fruit_1_i3aan3.webp',
      alt: 'T-Rex Fruit angle 3',
      width: 150,
      height: 143,
    },
  ],
};
