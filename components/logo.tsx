import Image from "next/image";
import logo from "@/assets/lws_logo.svg";
import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
}

export const Logo = ({ className = "" }: LogoProps) => {
    return (
        <Image className={cn("max-w-[100px]", className)} src={logo} alt="logo" />
    );
};
