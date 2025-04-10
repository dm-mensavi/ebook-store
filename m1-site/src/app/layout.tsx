// export const metadata = {
//   title: "Next.js",
//   description: "Generated by Next.js",
// };

// // export default function RootLayout({
// //   children,
// // }: {
// //   children: React.ReactNode
// // }) {
// //   return (
// //     <html lang="en">
// //       <body>{children}</body>
// //     </html>
// //   )
// // }

// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body>
//         {children}
//         <ToastContainer position="top-right" autoClose={3000} />
//       </body>
//     </html>
//   );
// }

// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import GlobalLayout from "../components/layout/GlobalLayout";
import BreadcrumbNav from "../components/layout/BreadcrumbNav ";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book Management App",
  description: "Manage your books and authors",
  icons: {
    icon: "/hero.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalLayout>
          {" "}
          {/* ✅ Wrap the page content inside GlobalLayout */}
          <BreadcrumbNav />
          {children}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </GlobalLayout>
      </body>
    </html>
  );
}
