import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@heroui/react";

export default function RecordTable({records, showRecords} : {records: any, showRecords: boolean}) {
    return (
        <>
            <Table isStriped className={`${showRecords ? "flash-highlight" : ""} lg:inline-block hidden`} aria-labelledby="Records table">
                <TableHeader>
                    <TableColumn>World Records</TableColumn>
                    <TableColumn>Continental Records</TableColumn>
                    <TableColumn>National Records</TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow key={1}>
                        <TableCell><span className={showRecords ? '' : 'blur-md'}>{records.world}</span></TableCell>
                        <TableCell><span className={showRecords ? '' : 'blur-md'}>{records.continental}</span></TableCell>
                        <TableCell><span className={showRecords ? '' : 'blur-md'}>{records.national}</span></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Table isStriped className={`${showRecords ? "flash-highlight" : ""} lg:hidden inline-block`} aria-labelledby="Records table">
                <TableHeader>
                    <TableColumn>WR</TableColumn>
                    <TableColumn>CR</TableColumn>
                    <TableColumn>NR</TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow key={1}>
                        <TableCell><span className={showRecords ? '' : 'blur-md'}>{records.world}</span></TableCell>
                        <TableCell><span className={showRecords ? '' : 'blur-md'}>{records.continental}</span></TableCell>
                        <TableCell><span className={showRecords ? '' : 'blur-md'}>{records.national}</span></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    );
}