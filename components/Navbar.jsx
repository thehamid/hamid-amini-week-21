'use client'
import { useAuth } from "../context/AuthContext";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="w-full bg-gray-200">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="logo">
          <Image src="/assets/logo.png" alt="logo" width={50} height={50} />
        </div>
        {isAuthenticated ? (
          <div className="flex gap-4">
            <Link
              href={`/`}
              className="text-gray-600 hover:text-primary color-transition"
            >
              خانه
            </Link>
            <Link
              href={`/dashboard`}
              className="text-gray-600 hover:text-primary color-transition"
            >
              داشبورد
            </Link>
            <button
              onClick={logout}
              className="text-gray-600 hover:text-primary color-transition cursor-pointer"
            >
              خروج
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link
              href={`/login`}
              className="text-gray-600 hover:text-primary color-transition"
            >
              ورود
            </Link>
            <Link
              href={`/register`}
              className="text-gray-600 hover:text-primary color-transition"
            >
              ثبت نام
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
