import { Button } from "@heroui/button";
import Link from "next/link";

export default function NotFound() {
    return (
        <section className="flex justify-center items-center flex-col gap-5">
            <h1 className="text-xl font-bold">Oops! Page not found</h1>
            <Button color="primary" variant="ghost">
                <Link href="/">Return to homepage</Link>
            </Button>
        </section>
    )
}