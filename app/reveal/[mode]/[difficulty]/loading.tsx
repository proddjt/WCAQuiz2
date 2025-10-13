"use client";

import ShinyText from "@/components/ReactBits/ShinyText";
import {Spinner} from "@heroui/react";
import { useTranslation } from "react-i18next";

export default function Loading(){
    const {t} = useTranslation();
    return(
        <div className="flex justify-center items-center flex-col gap-5">
            <ShinyText 
                text={t("loading")}
                disabled={false} 
                speed={3} 
                className='font-bold text-5xl' 
            />
            <Spinner color="default" classNames={{label: "text-foreground mt-4"}} variant="gradient" />
        </div>
    )
}