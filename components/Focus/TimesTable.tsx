import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@heroui/react";
import { formatTime, getEventFullName } from "@/app/lib/functions";
import '@/styles/quiz.css'

export default function TimeTables({times, showTime} : {times: any, showTime: boolean}) {
    return (
        <Table isStriped aria-labelledby="Times table" className={showTime ? 'flash-highlight' : ''}>
            <TableHeader>
                <TableColumn className="lg:text-lg text-xs text-center">Event</TableColumn>
                <TableColumn className="lg:text-lg text-xs text-center">NR</TableColumn>
                <TableColumn className="lg:text-lg text-xs text-center">CR</TableColumn>
                <TableColumn className="lg:text-lg text-xs text-center">WR</TableColumn>
                <TableColumn className="lg:text-lg text-xs text-center">Result</TableColumn>
            </TableHeader>
            <TableBody>
                {
                    times.map((event: any, index:number) => (
                        <TableRow key={index} className="select-none">
                            <TableCell className="flex justify-center items-center gap-3 lg:text-lg text-xs text-center">
                                <span className={`cubing-icon event-${event.event_id} ${showTime ? '' : 'blur-md'}`}></span>
                                <span className={showTime ? '' : 'blur-lg'}>{getEventFullName(event.event_id)}</span>
                            </TableCell>
                            <TableCell className="lg:text-lg text-xs text-center"><span className={showTime ? '' : 'blur-lg'}>{event.country_rank ?? '-'}</span></TableCell>
                            <TableCell className="lg:text-lg text-xs text-center"><span className={showTime ? '' : 'blur-lg'}>{event.continent_rank ?? '-'}</span></TableCell>
                            <TableCell className="lg:text-lg text-xs text-center"><span className={showTime ? '' : 'blur-lg'}>{event.world_rank ?? '-'}</span></TableCell>
                            <TableCell className="lg:text-lg text-xs text-center"><span className={showTime ? '' : 'blur-lg'}>{event.best ? formatTime(event.best, event.event_id) : '-'} {event.type === "average" ? "(Average)" : "(Single)"}</span></TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
}