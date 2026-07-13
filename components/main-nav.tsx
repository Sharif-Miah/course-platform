"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

import { MobileNav } from "@/components/mobile-nav";
import { Logo } from "./logo";
import { X, Menu, Sun, Moon } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface NavItem {
    title: string;
    href: string;
    disabled?: boolean;
}

interface MainNavProps {
    items?: NavItem[];
    children?: React.ReactNode;
}

export function MainNav({ items, children }: MainNavProps) {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <>
            <div className="flex gap-6 lg:gap-10">
                <Link href="/">
                    <Logo />
                </Link>
                {items?.length ? (
                    <nav className="hidden gap-6 lg:flex">
                        {items?.map((item, index) => (
                            <Link
                                key={index}
                                href={item.disabled ? "#" : item.href}
                                className={cn(
                                    "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm"
                                )}>
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                ) : null}

                {showMobileMenu && items && (
                    <MobileNav items={items}>{children}</MobileNav>
                )}
            </div>
            <nav className="flex items-center gap-3">
                <div className="items-center gap-3 hidden lg:flex">
                    <Link
                        href="/login"
                        className={cn(buttonVariants({ size: "sm" }), "px-4")}>
                        Login
                    </Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
                            Register
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 mt-4">
                            <DropdownMenuItem className="cursor-pointer" render={<Link href="" />}>
                                Student
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" render={<Link href="" />}>
                                Instructor
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="h-9 w-9 rounded-md cursor-pointer"
                    aria-label="Toggle theme"
                >
                    {!mounted ? (
                        <div className="h-5 w-5" />
                    ) : theme === "dark" ? (
                        <Sun className="h-5 w-5 text-yellow-500" />
                    ) : (
                        <Moon className="h-5 w-5 text-slate-700" />
                    )}
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger nativeButton={false} render={<div className="cursor-pointer" />}>
                        <Avatar>
                            <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt="@shadcn"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 mt-4">
                        <DropdownMenuItem className="cursor-pointer" render={<Link href="account" />}>
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" render={<Link href="account/enrolled-courses" />}>
                            My Courses
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" render={<Link href="" />}>
                            Testimonials & Certificates
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" render={<Link href="" />}>
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <button
                    className="flex items-center space-x-2 lg:hidden"
                    onClick={() => setShowMobileMenu(!showMobileMenu)}>
                    {showMobileMenu ? <X /> : <Menu />}
                </button>
            </nav>
        </>
    );
}
