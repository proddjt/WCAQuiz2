import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@heroui/react";

export default function MedalTable({medals, showMedals} : {medals: any, showMedals: boolean}) {
    return (
        <Table isStriped aria-labelledby="Medals table" className={`${showMedals ? "flash-highlight" : ""}`}>
            <TableHeader>
                <TableColumn>Gold</TableColumn>
                <TableColumn>Silver</TableColumn>
                <TableColumn>Bronze</TableColumn>
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