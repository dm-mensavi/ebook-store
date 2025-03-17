import Link from 'next/link';

type BreadcrumbItem = {
  label: string;
  href?: string; // If href is undefined, it's the current page (no link)
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="flex text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={index} className="flex items-center">
            {!isLast && item.href ? (
              <Link
                href={item.href}
                className="text-blue-600 hover:underline font-medium"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-800">{item.label}</span>
            )}
            {!isLast && <span className="mx-2">/</span>}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
