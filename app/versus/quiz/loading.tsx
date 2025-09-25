"use client";

import ShinyText from "@/components/ReactBits/ShinyText";
import { Spinner } from "@heroui/react";

export default function Loading(){
    return(
        <div className="flex justify-center items-center flex-col gap-5">
            <ShinyText 
                text="Loading..." 
                disabled={false} 
                speed={3} 
                className='font-bold text-5xl' 
            />
            <Spinner color="default" classNames={{label: "text-foreground mt-4"}} variant="gradient" />
        </div>
    )
}