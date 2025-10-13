import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@heroui/react";
import { sortEventsByYearAndName } from '@/app/lib/functions';
import { useTranslation } from "react-i18next";

export default function CompTable({ ids, showCompsList }: { ids: string[], showCompsList: boolean }) {
    const {t} = useTranslation();
    if (!showCompsList){
        return (
            <Table isStriped aria-label="Competition table" className={`${showCompsList ? "flash-highlight" : ""} h-[250px] w-full`}>
                <TableHeader>
                    <TableColumn>{t("comp_name")}</TableColumn>
                </TableHeader>
                <TableBody className="bg-[#EEEEEE]" emptyContent={"Hidden"}>
                    {[]}
                </TableBody>
            </Table>
        );
    }

    if (ids.length === 0) {
        return (
            <Table isStriped aria-label="Competition table" className={`${showCompsList ? "flash-highlight" : ""} h-[250px] w-full`}>
                <TableHeader>
                    <TableColumn>{t("comp_name")}</TableColumn>
                </TableHeader>
                <TableBody className="bg-[#EEEEEE]">
                    <TableRow>
                        <TableCell>{t("no_comp")}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
    }

    return (
        <Table isStriped aria-label="Competition table" className={`${showCompsList ? "flash-highlight" : ""} h-[250px] w-full`}>
            <TableHeader>
                <TableColumn>{t("comp_name")}</TableColumn>
            </TableHeader>
            <TableBody className="bg-[#EEEEEE]">
                {
                    sortEventsByYearAndName(ids).map((id, index) => (
                        <TableRow key={index}>
                            <TableCell>{id}</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
}