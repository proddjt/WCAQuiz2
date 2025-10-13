import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@heroui/react";
import { sortEventDataAsArray, formatTime } from "@/app/lib/functions";
import { useTranslation } from "react-i18next";

export default function TimeTables({times, showSingle, showAverage, showEvent} : {times: any, showSingle: boolean, showAverage: boolean, showEvent: boolean}) {
    const orderedEvents = sortEventDataAsArray(times);
    const {t} = useTranslation();
    return (
        <Table isStriped aria-labelledby="Times table">
            <TableHeader>
                <TableColumn>{t("event")}</TableColumn>
                <TableColumn>NR</TableColumn>
                <TableColumn>CR</TableColumn>
                <TableColumn>WR</TableColumn>
                <TableColumn>{t("single")}</TableColumn>
                <TableColumn>{t("average")}</TableColumn>
                <TableColumn>WR</TableColumn>
                <TableColumn>CR</TableColumn>
                <TableColumn>NR</TableColumn>
            </TableHeader>
            <TableBody>
                {
                    orderedEvents.map((event: any, index:number) => (
                        <TableRow key={index} className="select-none">
                            <TableCell className="flex justify-start items-center gap-3">
                                <span className={`cubing-icon event-${event[0]} ${showEvent ? '' : 'blur-md'}`}></span>
                                <span className={showEvent ? '' : 'blur-lg'}>{event[1].event_name}</span>
                            </TableCell>
                            <TableCell><span className={showSingle ? '' : 'blur-lg'}>{event[1].single?.country_rank ?? '-'}</span></TableCell>
                            <TableCell><span className={showSingle ? '' : 'blur-lg'}>{event[1].single?.continent_rank ?? '-'}</span></TableCell>
                            <TableCell><span className={showSingle ? '' : 'blur-lg'}>{event[1].single?.world_rank ?? '-'}</span></TableCell>
                            <TableCell><span className={showSingle ? '' : 'blur-lg'}>{event[1].single?.best ? formatTime(event[1].single?.best, event[0]) : '-'}</span></TableCell>
                            <TableCell><span className={showAverage ? '' : 'blur-lg'}>{event[1].average?.best ? formatTime(event[1].average?.best, event[0]) : '-'}</span></TableCell>
                            <TableCell><span className={showAverage ? '' : 'blur-lg'}>{event[1].average?.world_rank ?? '-'}</span></TableCell>
                            <TableCell><span className={showAverage ? '' : 'blur-lg'}>{event[1].average?.continent_rank ?? '-'}</span></TableCell>
                            <TableCell><span className={showAverage ? '' : 'blur-lg'}>{event[1].average?.country_rank ?? '-'}</span></TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
}