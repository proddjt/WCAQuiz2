'use client';

import { useEffect, useState } from "react";
import { Link } from "@heroui/link";
import {Select, SelectItem} from "@heroui/react";
import i18n from "@/app/translation/i18n";

export default function Footer(){
    const [selectedValue, setSelectedValue] = useState("it");
    function handleLangChange(key: any) {
        setSelectedValue(key);
        i18n.changeLanguage(key);
        localStorage.setItem("lang", key);
    }

    useEffect(() => {
        const savedLang = localStorage.getItem("lang");
        if (savedLang) {
            setSelectedValue(savedLang);
            i18n.changeLanguage(savedLang);
        }
    })
    return (
        <footer className="w-full flex items-center justify-center py-3 mt-10 lg:gap-2 gap-1 lg:flex-row flex-col">
            <Link
            isExternal
            className="flex items-center gap-1 text-current lg:text-sm text-xs"
            href="https://github.com/proddjt"
            title="giovanni tramontano github profile"
            >
                <span className="text-default-600">Powered by</span>
                <p className="text-primary">Giovanni Tramontano</p>
            </Link>
            <span className="lg:inline hidden">|</span>
            <Link isExternal className="flex items-center gap-1 text-current lg:text-sm text-xs" title="carmen gravano contact" href="mailto:carmen.grav998@gmail.com">
                <span className="text-default-600">Graphics by</span>
                <p className="text-primary">Carmen Gravano</p>
            </Link>
            <Select aria-label="lang-select" className="2xl:w-1/15 w-1/3 xl:w-1/10" variant="underlined" selectedKeys={new Set([selectedValue])} onSelectionChange={(key) => handleLangChange(Array.from(key)[0])}>
                <SelectItem key="it">Italiano</SelectItem>
                <SelectItem key="us">English</SelectItem>
            </Select>
        </footer>
    )
}