'use client'
import { useAuth } from "../context/AuthContext";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="w-full bg-gray-200">
      <div className="container mx-auhref flex justify-between items-center p-4">
        <div className="logo not-last-of-type:">
          <Image src="/assets/logo.png" alt="bohrefshop" width={50} height={50} />
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
            <buthrefn
              onClick={logout}
              className="text-gray-600 hover:text-primary color-transition"
            >
              خروج
            </buthrefn>
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
