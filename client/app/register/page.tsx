"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import api from "../../lib/api";

type RegisterForm = {
  fullname: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<RegisterForm>();

  const onSubmit = async (data: RegisterForm) => {
    try {
      const res = await api.post("/api/auth/register", data);

      toast.success(res.data.message);

      reset();

      setTimeout(() => {
        router.push("/login");
      }, 1000);

    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Registration Failed"
      );
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950">
      <div className="w-full max-w-md rounded-2xl bg-gray-900 p-10 shadow-2xl">

        <h1 className="text-center text-4xl font-bold text-white">
          Create Account 🚀
        </h1>

        <p className="mt-3 text-center text-gray-400">
          Join AI Blog Studio today.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-5"
        >

          <div>
            <label className="mb-2 block text-gray-300">
              Full Name
            </label>

            <input
              type="text"
              {...register("fullname")}
              placeholder="Enter your full name"
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-gray-300">
              Email
            </label>

            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-gray-300">
              Password
            </label>

            <input
              type="password"
              {...register("password")}
              placeholder="Create a password"
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Create Account
          </button>

          <p className="mt-6 text-center text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-blue-500 hover:text-blue-400"
            >
              Login
            </Link>
          </p>

        </form>

      </div>
    </main>
  );
}