import Link from 'next/link';

type BreadcrumbItem = {
  label: string;
  href?: string; // No href = current page
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="flex text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex items-center">
            {!isLast && item.href ? (
              <Link
                href={item.href}
                className="text-blue-600 hover:underline font-medium transition"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-black font-semibold">{item.label}</span>
            )}

            {!isLast && (
              <span className="mx-2 text-gray-400 select-none">/</span>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
