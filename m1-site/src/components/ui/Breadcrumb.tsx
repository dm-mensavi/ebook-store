"use client";

import Link from "next/link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  const lastIndex = items.length - 1;

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{
        mb: 1,
        fontSize: "0.875rem", // text-sm equivalent
      }}
    >
      {items.map((item, index) =>
        item.href && index !== lastIndex ? (
          <Link
            key={index}
            href={item.href}
            style={{
              color: "#2563EB", // Tailwind's text-blue-600 color
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            {item.label}
          </Link>
        ) : (
          <Typography
            key={index}
            sx={{
              color: "#111827", // Tailwind's text-gray-900 color
              fontWeight: 600,
            }}
          >
            {item.label}
          </Typography>
        )
      )}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
