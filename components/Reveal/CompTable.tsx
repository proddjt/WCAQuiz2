import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@heroui/react";
import { sortEventsByYearAndName } from '@/app/lib/functions';

export default function CompTable({ ids, showCompsList }: { ids: string[], showCompsList: boolean }) {
    if (!showCompsList){
        return (
            <Table isStriped aria-label="Competition table" className={`${showCompsList ? "flash-highlight" : ""} h-[250px] w-full`}>
                <TableHeader>
                    <TableColumn>Competition Name</TableColumn>
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
                    <TableColumn>Competition Name</TableColumn>
                </TableHeader>
                <TableBody className="bg-[#EEEEEE]">
                    <TableRow>
                        <TableCell>No competitions</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
    }

    return (
        <Table isStriped aria-label="Competition table" className={`${showCompsList ? "flash-highlight" : ""} h-[250px] w-full`}>
            <TableHeader>
                <TableColumn>Competition Name</TableColumn>
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