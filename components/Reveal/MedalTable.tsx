import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@heroui/react";
import { useTranslation } from "react-i18next";

export default function MedalTable({medals, showMedals} : {medals: any, showMedals: boolean}) {
    const {t} = useTranslation();
    return (
        <Table isStriped aria-labelledby="Medals table" className={`${showMedals ? "flash-highlight" : ""}`}>
            <TableHeader>
                <TableColumn>{t("gold")}</TableColumn>
                <TableColumn>{t("silver")}</TableColumn>
                <TableColumn>{t("bronze")}</TableColumn>
            </TableHeader>
            <TableBody>
                <TableRow key={1}>
                    <TableCell><span className={showMedals ? '' : 'blur-md'}>{medals.gold}</span></TableCell>
                    <TableCell><span className={showMedals ? '' : 'blur-md'}>{medals.silver}</span></TableCell>
                    <TableCell><span className={showMedals ? '' : 'blur-md'}>{medals.bronze}</span></TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}