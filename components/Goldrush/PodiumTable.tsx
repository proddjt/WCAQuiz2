import { getEventFullName, sortEventDataAsArray } from "@/app/lib/functions";
import { guessedEvent, Podium } from "@/types";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@heroui/react";
import { useTranslation } from "react-i18next";
import GoldrushSearchBar from "./GoldrushSearchBar";

export default function PodiumTable({podiums, competitors, showThird, showSecond, showFirst, handleAnswer, guessedEvents} : {podiums: Podium[], competitors: any, showThird: boolean, showSecond: boolean, showFirst: boolean, handleAnswer: Function, guessedEvents: any}) {
    const {t} = useTranslation();
    return (
        <Table isStriped aria-labelledby="Podiums table" className={`${showFirst || showSecond || showThird ? "flash-highlight" : ""} h-[500px] max-w-[100vw] overflow-x-scroll`}>
            <TableHeader>
                <TableColumn>{t("event")}</TableColumn>
                <TableColumn>{t("first")}</TableColumn>
                <TableColumn>{t("second")}</TableColumn>
                <TableColumn>{t("third")}</TableColumn>
            </TableHeader>
            <TableBody>
                {
                    podiums.map((podium: Podium) => (
                        <TableRow key={podium.event}>
                            <TableCell>
                                <span className={`cubing-icon event-${podium.event}`}></span>
                                <span> {getEventFullName(podium.event)}</span>
                            </TableCell>
                            {
                                podium.first ?
                                    guessedEvents[podium.event] ?
                                    <TableCell>
                                        {competitors?.find((competitor: any) => competitor.id === podium.first?.id)?.name}
                                    </TableCell>
                                    :
                                    <TableCell className="min-w-[200px]">
                                        <GoldrushSearchBar event={podium.event} handleAnswer={handleAnswer} isSearchDisabled={false} />
                                    </TableCell>
                                :
                                <TableCell>N/A</TableCell>
                            }
                            {
                                podium.second ?
                                <TableCell><span className={showSecond ? '' : 'blur-md'}>{competitors?.find((competitor: any) => competitor.id === podium.second?.id)?.name}</span></TableCell>
                                :
                                <TableCell>N/A</TableCell>
                            }
                            {
                                podium.third ?
                                <TableCell><span className={showThird ? '' : 'blur-md'}>{competitors?.find((competitor: any) => competitor.id === podium.third?.id)?.name}</span></TableCell>
                                :
                                <TableCell>N/A</TableCell>
                            }
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
}
