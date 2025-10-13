"use client";

import { useEffect, useState, useRef } from "react";
import { checkRevealAnswer, formatSecondsTime, getIdYear } from "@/app/lib/functions";
import LazyLoad from 'react-lazyload';

import Flag from 'react-world-flags'
import {Card, CardBody, Button, useDisclosure} from "@heroui/react";
import CompTable from "@/components/Reveal/CompTable";
import MedalTable from "@/components/Reveal/MedalTable";
import RecordTable from "@/components/Reveal/RecordTable";
import TimeTables from "@/components/Reveal/TimeTables";
import SearchBar from "@/components/SearchBar";

import { MdPersonSearch } from "react-icons/md";
import { MdOutlineContentPasteSearch } from "react-icons/md";
import { FaMedal } from "react-icons/fa";
import { RiTimerFill } from "react-icons/ri";
import { FaInfoCircle } from "react-icons/fa";
import Modale from "@/components/Reveal/Modale";

import ErrorAlert from "@/components/ErrorAlert";
import TimeAlert from "@/components/TimeAlert";
import SkipAlert from "@/components/SkipAlert";
import SkipModale from "@/components/SkipModale";
import RevealModale from "@/components/RevealModale";
import FinalModale from "@/components/Reveal/FinalModale";

import '@/styles/quiz.css';
import { RevealPerson } from "@/types";
import { useTranslation } from "react-i18next";

export default function Reveal({person, mode} : {person: RevealPerson, mode: string | null}) {
    const [year, setYear] = useState<string>("");
    const [rest, setRest] = useState<string>("");
    
    const [showSingle, setShowSingle] = useState(false);
    const [showAverage, setShowAverage] = useState(false);
    const [showEvent, setShowEvent] = useState(false);
    const [showRecords, setShowRecords] = useState(false);
    const [showCompList, setShowCompList] = useState(false);
    const [showMedals, setShowMedals] = useState(false);
    const [showNation, setShowNation] = useState(false);
    const [showYear, setShowYear] = useState(false);
    const [showId, setShowId] = useState(false);
    const [showGender, setShowGender] = useState(false);
    const [showComps, setShowComps] = useState(false);
    const [showName, setShowName] = useState(false);
    const [showPhoto, setShowPhoto] = useState(false);

    const [attempts, setAttempts] = useState(1);
    const [time, setTime] = useState(90);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isTimeFinished, setIsTimeFinished] = useState(false);
    const [isSkip, setIsSkip] = useState(false);
    const [isSearchDisabled, setIsSearchDisabled] = useState(false);
    const [hasWon, setHasWon] = useState(false);

    const {t} = useTranslation();

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {isOpen: isSkipOpen, onOpen: onSkipOpen, onOpenChange: onSkipOpenChange} = useDisclosure();
    const {isOpen: isRevealOpen, onOpen: onRevealOpen, onOpenChange: onRevealOpenChange} = useDisclosure();
    const {isOpen: isFinalOpen, onOpen: onFinalOpen, onOpenChange: onFinalOpenChange} = useDisclosure();

    const countdownRef = useRef<NodeJS.Timeout | null>(null);
    function showAlert() {
        if (isTimeFinished) return;
        if (attempts === 11) return;
        setIsAlertOpen(true);
        setTimeout(() => setIsAlertOpen(false), 3000);
    }

    function skipAnswer(){
        setAttempts(attempts + 1);
        setTime(90);
    }

    function revealAnswer(){
        setAttempts(11);
    }

    function timeFinished() {
        if (attempts === 11) return;
        setIsTimeFinished(true);
        setTimeout(() => setIsTimeFinished(false), 3000);
    }

    function hints(){
        switch (attempts) {
            case 1:
                if (mode==="IT") setShowNation(true);
                break;
            case 2:
                if (mode==="IT") setShowGender(true);
                else {
                    setShowNation(true);
                    setShowGender(true);
                }
                showAlert();
                break;
            case 3:
                setShowComps(true);
                showAlert();
                break;
            case 4:
                setShowMedals(true);
                showAlert();
                break;
            case 5:
                setShowRecords(true);
                showAlert();
                break;
            case 6:
                setShowEvent(true);
                showAlert();
                break;
            case 7:
                setShowYear(true);
                showAlert();
                break;
            case 8:
                setShowCompList(true);
                showAlert();
                break;
            case 9:
                setShowAverage(true);
                showAlert();
                break;
            case 10:
                setShowSingle(true);
                showAlert();
                break;
            case 11:
                stopGame();
                break;
        }
    }

    function stopGame(currentAttempts?: number){
        const finalAttempts = currentAttempts ?? attempts;
        setIsSearchDisabled(true);
        setShowSingle(true);
        setShowAverage(true);
        setShowEvent(true);
        setShowRecords(true);
        setShowCompList(true);
        setShowMedals(true);
        setShowNation(true);
        setShowYear(true);
        setShowId(true);
        setShowGender(true);
        setShowComps(true);
        setShowName(true);
        setShowPhoto(true);
        stopCountdown();
        setTime(90);
        if (finalAttempts < 11) {
            setHasWon(true);
        }
        else{
            setHasWon(false);
        }
        onFinalOpen();
    }
    
    function handleAnswer(answer: string){
        setTime(90);
        const result = checkRevealAnswer(person?.id, answer);
        if (!result) {
            setAttempts(attempts + 1);
        }else{
            stopGame();
        }
    }

    function startCountdown() {
        if (countdownRef.current) {
            clearInterval(countdownRef.current);
        }
        countdownRef.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
    }, 1000);
    }

    function stopCountdown() {
        if (countdownRef.current) {
            clearInterval(countdownRef.current);
            countdownRef.current = null;
        }
    }

    function startAgain(){
        window.location.reload();
    }

    useEffect(() => {
        if (attempts === 11) return;
        if (time === 0) {
            timeFinished();
            setAttempts(attempts + 1)
            setTime(90);
        }
    }, [time]);

    useEffect(() => {
        if (person){
            const [y, r] = getIdYear(person?.id);
            setYear(y);
            setRest(r);
        }
        setAttempts(1);
        setShowSingle(false);
        setShowAverage(false);
        setShowEvent(false);
        setShowRecords(false);
        setShowCompList(false);
        setShowMedals(false);
        setShowNation(false);
        setShowYear(false);
        setShowId(false);
        setShowGender(false);
        setShowComps(false);
        setShowName(false);
        setShowPhoto(false);
        setIsSearchDisabled(false);
        setTime(90);
        setIsTimeFinished(false);
        setIsAlertOpen(false);
        startCountdown();
        hints();
    }, [person]);
    
    useEffect(() => {
        hints();
    }, [attempts]);
    
    return(
        <div className="flex justify-center items-center flex-col gap-3 select-none w-full">
            <section className="w-full flex lg:flex-row flex-col justify-center lg:items-end items-center">
                <div className="lg:w-1/6 w-full order-1">
                    <p className="text-xl">{t("score")}: {11-attempts}</p>
                </div>
                <div className="lg:w-4/6 w-full lg:order-2 order-3">
                    <SearchBar mode={mode} handleAnswer={handleAnswer} isSearchDisabled={isSearchDisabled}/>
                </div>
                <div className="lg:w-1/6 w-full lg:order-3 order-2">
                    <p className="text-xl">{t("time")}: {formatSecondsTime(time)}</p>
                </div>
            </section>
            <section className="w-full flex justify-center items-center gap-5">
                <Button variant="faded" color="warning" onPress={onSkipOpen} isDisabled={isSearchDisabled}>{t("skip")}</Button>
                <Button variant="faded" color="danger" onPress={onRevealOpen} isDisabled={isSearchDisabled}>{t("reveal")}</Button>
                <Button variant="faded" color="primary" onPress={() => startAgain()} isDisabled={!isSearchDisabled}>{t("start_new")}</Button>
            </section>
            
            <h2 className="font-semibold text-3xl lg:mb-15 mb-8 flex justify-center items-center lg:gap-5 gap-1 lg:flex-row flex-col">
                {
                    showName ? person?.name : "************"
                }
                <Button isIconOnly size="sm" variant="ghost" onPress={onOpen}><FaInfoCircle /></Button>
            </h2>
            <LazyLoad>
                <img src={person?.avatarUrl} alt="Immagine avatar persona" className={`${showPhoto ? "" : "blur-xl grayscale"} lg:h-[300px] h-[180px]`}/>
            </LazyLoad>
            <h3 className="font-semibold text-2xl mt-15 text-[#FF5800] bg-[#351200] px-4 py-1 rounded-xl flex justify-center items-center gap-2">{t("personal_info")} <MdPersonSearch /></h3>
            <div className="flex lg:flex-nowrap flex-wrapjustify-center items-center lg:gap-20 gap-2">
                <Card className={showNation ? "flash-highlight" : ""}>
                    <CardBody>
                        <p className="flex lg:flex-row flex-col text-center justify-center items-center lg:text-md text-sm gap-1">{t("nation")}: <span className="flex items-center justify-center gap-2"><span className={showNation ? "" : "blur-md"}>{person?.country_name}</span>
                            {
                                showNation && <Flag code={ person?.country } width={20} height={15}/>
                            }
                            </span>
                        </p>
                    </CardBody>
                </Card>
                <Card className={showYear || showId ? "flash-highlight" : ""}>
                    <CardBody>
                        <p className="lg:text-md text-sm text-center">WCA ID: <span className={showYear ? "" : "blur-md"}>{year}</span><span className={showId ? "" : "blur-md"}>{rest}</span></p>
                    </CardBody>
                </Card>
                <Card className={showGender ? "flash-highlight" : ""}>
                    <CardBody>
                        <p className="lg:text-md text-sm text-center">{t("gender")}: <span className={showGender ? "" : "blur-md"}>{person?.gender === "m" ? "Male" : "Female"}</span></p>
                    </CardBody>
                </Card>
            </div>
            <h3 className="font-semibold text-2xl mt-15 text-[#0051BA] bg-[#001530] px-4 py-1 rounded-xl flex justify-center items-center gap-2">{t("comp_info")} <MdOutlineContentPasteSearch /></h3>
            <div className="flex lg:flex-nowrap flex-wrap justify-center items-center lg:gap-20 gap-2 w-full">
                <div className="lg:w-1/2 w-full flex justify-center items-center flex-col gap-5">
                    <Card className={showComps ? "flash-highlight" : ""}>
                        <CardBody>
                            <p className="flex text-center lg:text-md text-sm jusitfy-center items-center gap-2">{t("comp_numb")}: <span className={showComps ? "" : "blur-md"}>{person?.numberOfCompetitions}</span></p>
                        </CardBody>
                    </Card>
                    <CompTable ids={person?.competitionIds} showCompsList={showCompList} />
                </div>
                <div className="lg:w-1/2 w-full flex justify-center items-center flex-col gap-5">
                    <Card className={showComps ? "flash-highlight" : ""}>
                        <CardBody>
                            <p className="flex text-center lg:text-md text-sm jusitfy-center items-center gap-2">{t("champ_numb")}: <span className={showComps ? "" : "blur-md"}>{person?.numberOfChampionships}</span></p>
                        </CardBody>
                    </Card>
                    <CompTable ids={person?.championshipIds} showCompsList={showCompList} />
                </div>
            </div>
            <h3 className="font-semibold text-2xl mt-15 text-[#C62535] bg-[#2c070b] px-4 py-1 rounded-xl flex justify-center items-center gap-2">{t("med_and_rec")} <FaMedal /></h3>
            <div className="flex lg:flex-row flex-col justify-center items-center lg:gap-20 gap-2 w-full">
                <div className="lg:w-1/2 w-full flex justify-center items-center">
                    <MedalTable medals={person?.medals} showMedals={showMedals}/>
                </div>
                <div className="lg:w-1/2 w-full flex justify-center items-center">
                    <RecordTable records={person?.records} showRecords={showRecords}/>
                </div>
            </div>
            <h3 className="font-semibold text-2xl mt-15 text-[#029347] bg-[#002713] px-4 py-1 rounded-xl flex justify-center items-center gap-2">{t("results")} <RiTimerFill /></h3>
            <div className={`${showSingle || showAverage || showEvent ? "flash-highlight" : ""} flex justify-start items-start w-full overflow-x-auto`}>
                <TimeTables times={person?.personal_records} showAverage={showAverage} showSingle={showSingle} showEvent={showEvent}/>
            </div>

            <Modale isOpen={isOpen} onOpenChange={onOpenChange} />
            <SkipModale isSkipOpen={isSkipOpen} onSkipOpenChange={onSkipOpenChange} skipAnswer={skipAnswer} />
            <RevealModale isRevealOpen={isRevealOpen} onRevealOpenChange={onRevealOpenChange} revealAnswer={revealAnswer} />
            <FinalModale isFinalOpen={isFinalOpen} onFinalOpenChange={onFinalOpenChange} name={person?.name} points={11-attempts} hasWon={hasWon}/>

            <ErrorAlert isAlertOpen={isAlertOpen} />
            <TimeAlert isTimeFinished={isTimeFinished} />
            <SkipAlert isSkip={isSkip} />
        </div>
    )
}