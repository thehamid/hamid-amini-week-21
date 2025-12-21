'use client'
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/schemas/authSchemas";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useLoginMutation } from "@/hooks/useAuthMutations";
import Image from "next/image";
import Link from "next/link";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const loginMutation = useLoginMutation();

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <Image
          src="/assets/logo.png"
          alt="botoshop"
          width={50}
          height={50}
          className="mx-auto block my-3"
        />
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {" "}
          فرم ورود{" "}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="نام کاربری"
            name="username"
            {...register("username")}
            error={errors.username?.message}
          />
          <Input
            label="رمز عبور"
            name="password"
            type="password"
            {...register("password")}
            error={errors.password?.message}
          />
          <Button type="submit" isLoading={loginMutation.isPending}>
            ورود
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          حساب کاربری ندارید؟{" "}
          <Link
            href="/register"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            ثبت‌نام کنید
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
