import Breadcrumb from '../../components/ui/Breadcrumb';
import { ReactNode } from 'react';

type GlobalLayoutProps = {
  children: ReactNode;
  breadcrumbs: {
    label: string;
    href?: string;
  }[];
};

const GlobalLayout = ({ children, breadcrumbs }: GlobalLayoutProps) => {
  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumb displayed on every page */}
      <Breadcrumb items={breadcrumbs} />

      {/* Page content */}
      <div>{children}</div>
    </div>
  );
};

export default GlobalLayout;
 