import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@heroui/react";
import { useTranslation } from "react-i18next";

export default function CompetitorsTable({competitors, showList} : {competitors: any, showList: boolean}) {
    const {t} = useTranslation();
    return (
        <Table isStriped aria-labelledby="Competitors table" className={`${showList ? "flash-highlight" : ""} h-[500px]`}>
            <TableHeader>
                <TableColumn>{t("name")}</TableColumn>
                <TableColumn>WCA ID</TableColumn>
            </TableHeader>
            <TableBody>
                {
                    competitors.map((competitor:any) => (
                        <TableRow key={competitor.id}>
                            <TableCell><span className={showList ? '' : 'blur-md'}>{competitor.name}</span></TableCell>
                            <TableCell><span className={showList ? '' : 'blur-md'}>{competitor.id}</span></TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
}