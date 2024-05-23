import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
    return (
        <Link href={"/"}>
            <Image src="/logo_beincomm_text_only.webp" alt="logo" width={100} height={100} />
        </Link>
    );
};

export default Logo;
