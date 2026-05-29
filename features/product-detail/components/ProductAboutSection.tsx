import { Badge } from '@/shared/components/ui/badge';

export interface ProductAboutSectionProps {
  title: string;
  description: string;
  tags: string[];
}

export function ProductAboutSection({ title, description, tags }: ProductAboutSectionProps) {
  return (
    <section className="w-full lg:w-[360px] ">
      <h2 className="font-display text-xl font-extrabold tracking-[-0.01em] text-foreground">
        {title}
      </h2>
      <p className="mt-4 text-sm font-medium leading-relaxed tracking-[-0.01em] opacity-50">
        {description}
      </p>
      <ul className="flex flex-wrap gap-2 py-4" data-testid="product-tags">
        {tags.map((tag) => (
          <li key={tag} className='mt-2'>
            <Badge variant="tag">{tag}</Badge>
          </li>
        ))}
      </ul>
    </section>
  );
}
