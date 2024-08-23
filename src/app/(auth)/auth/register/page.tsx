"use client";
import { register } from "@/app/actions/register";
import OauthButton from "@/components/auth/oauthbutton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

type loginfrom = z.infer<typeof registerSchema>;

function RegisterForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<loginfrom>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: loginfrom) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const data = await register(values);
      setError(data.error);
      setSuccess(data.success);
    });
  };

  return (
    <div className="h-full w-full flex flex-col bg-white justify-center items-center">
      <div className="w-[400px] ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        type="email"
                        placeholder="johdoe@gmail.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {error && (
              <div className="py-2 text-center w-full bg-destructive/15">
                {error}
              </div>
            )}
            {success && (
              <div className="py-2 text-center w-full bg-emerald-500/30">
                {success}
              </div>
            )}
            <Button className="w-full bg-neutral-700">submit</Button>
          </form>
        </Form>
        <div className="w-full text-center font-thin uppercase text-xs py-2">
          or continue with
        </div>
        <OauthButton />
      </div>
      <p className="text-xs">
        Already a user ?{" "}
        <Link href={"/auth/login"} className="text-muted-foreground">
          Login
        </Link>{" "}
      </p>
    </div>
  );
}

export default RegisterForm;
