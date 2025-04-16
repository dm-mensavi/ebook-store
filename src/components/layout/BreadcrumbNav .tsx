"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import { getAuthorById } from "../../providers/authorProvider"; // example
import { getBookById } from "../../providers/bookProvider"; // example

const BreadcrumbNav = () => {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<
    { label: string; href: string }[]
  >([]);

  useEffect(() => {
    if (!pathname) return;

    const pathSegments = pathname.split("/").filter(Boolean);
    const fetchBreadcrumbs = async () => {
      const crumbs: { label: string; href: string }[] = [];

      for (let i = 0; i < pathSegments.length; i++) {
        const segment = pathSegments[i];
        const href = "/" + pathSegments.slice(0, i + 1).join("/");

        let label = decodeURIComponent(segment);

        // ✅ Dynamic segments handling
        // Author details page: /authors/[id]
        if (pathSegments[i - 1] === "authors") {
          try {
            const author = await getAuthorById(segment);
            label = author?.name || label;
          } catch (error) {
            console.error("Failed to fetch author", error);
          }
        }

        // Book details page: /books/[id]
        if (pathSegments[i - 1] === "books") {
          try {
            const book = await getBookById(segment);
            label = book?.title || label;
          } catch (error) {
            console.error("Failed to fetch book", error);
          }
        }

        crumbs.push({ label, href });
      }

      setBreadcrumbs(crumbs);
    };

    fetchBreadcrumbs();
  }, [pathname]);

  return (
    <Breadcrumbs aria-label="breadcrumb" separator="›" className=" px-6">
      <Link href="/" className="text-blue-600 hover:underline">
        Home
      </Link>

      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return isLast ? (
          <Typography key={index} color="text.primary" fontWeight="bold">
            {crumb.label}
          </Typography>
        ) : (
          <Link
            key={index}
            href={crumb.href}
            className="text-blue-600 hover:underline capitalize"
          >
            {crumb.label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbNav;
