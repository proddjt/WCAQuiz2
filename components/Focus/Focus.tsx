"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardBody } from "@heroui/card";
import Flag from "react-world-flags";
import { useDisclosure } from "@heroui/modal";
import { Button } from "@heroui/button";
import LazyLoad from "react-lazyload";
import { FocusPerson } from "@/types";

import { MdPersonSearch } from "react-icons/md";
import { MdOutlineContentPasteSearch } from "react-icons/md";
import { RiTimerFill } from "react-icons/ri";
import { FaInfoCircle } from "react-icons/fa";

import TimeTables from "@/components/Focus/TimesTable";
import Modale from "@/components/Focus/Modale";
import ErrorAlert from "@/components/ErrorAlert";
import TimeAlert from "@/components/TimeAlert";
import SkipAlert from "@/components/SkipAlert";
import SkipModale from "@/components/SkipModale";
import RevealModale from "@/components/RevealModale";
import FocusSearchBar from "@/components/FocusSearchBar";
import FinalModale from "@/components/Reveal/FinalModale";

import { getIdYear } from "@/app/lib/functions";
import { formatSecondsTime } from "@/app/lib/functions";
import { checkRevealAnswer } from "@/app/lib/functions";
import { useTranslation } from "react-i18next";

export default function Focus ({person, mode} : {person: FocusPerson, mode: string | null}) {

    const [time, setTime] = useState(60);
    const [attempts, setAttempts] = useState(1);

    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isTimeFinished, setIsTimeFinished] = useState(false);
    const [isSkip, setIsSkip] = useState(false);
    const [isSearchDisabled, setIsSearchDisabled] = useState(false);

    const [showNation, setShowNation] = useState(false);
    const [showYear, setShowYear] = useState(false);
    const [showId, setShowId] = useState(false);
    const [showGender, setShowGender] = useState(false);
    const [showComps, setShowComps] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [showName, setShowName] = useState(false);
    const [blur, setBlur] = useState("blur-2xl");
    const [blackWhite, setBlackWhite] = useState(true);
    const [hasWon, setHasWon] = useState(false);

    const [year, setYear] = useState<string>("");
    const [rest, setRest] = useState<string>("");

    const countdownRef = useRef<NodeJS.Timeout | null>(null);

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {isOpen: isSkipOpen, onOpen: onSkipOpen, onOpenChange: onSkipOpenChange} = useDisclosure();
    const {isOpen: isRevealOpen, onOpen: onRevealOpen, onOpenChange: onRevealOpenChange} = useDisclosure();
    const {isOpen: isFinalOpen, onOpen: onFinalOpen, onOpenChange: onFinalOpenChange} = useDisclosure();

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
                setBlackWhite(false);
                setBlur("blur-xl");
                showAlert();
                break;
            case 3:
                setShowComps(true);
                setBlur("blur-md");
                showAlert();
                break;
            case 4:
                setShowTime(true);
                setBlur("blur-sm");
                showAlert();
                break;
            case 5:
                setShowYear(true);
                setBlur("blur-xs");
                showAlert();
                break;
            case 6:
                stopGame();
                break;
        }
    }

    const {t} = useTranslation();

    function timeFinished() {
        if (attempts === 6) return;
        setIsTimeFinished(true);
        setTimeout(() => setIsTimeFinished(false), 3000);
    }

    function skipAnswer(){
        setAttempts(attempts + 1);
        setTime(60);
    }

    function revealAnswer(){
        setAttempts(6);
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

    function stopGame(currentAttempts?: number){
        const finalAttempts = currentAttempts ?? attempts;
        setIsSearchDisabled(true);
        setShowNation(true);
        setShowYear(true);
        setShowId(true);
        setShowGender(true);
        setShowComps(true);
        setShowName(true);
        setShowTime(true);
        setBlur("");
        setBlackWhite(false);
        stopCountdown();
        setTime(60);
        if (finalAttempts < 6) {
            setHasWon(true);
        }
        else{
            setHasWon(false);
        }
        onFinalOpen();
    }

    function showAlert() {
        if (isTimeFinished) return;
        if (attempts === 11) return;
        setIsAlertOpen(true);
        setTimeout(() => setIsAlertOpen(false), 3000);
    }

    function handleAnswer(answer: string){
        setTime(60);
        const result = checkRevealAnswer(person?.id, answer);
        if (!result) {
            setAttempts(attempts + 1);
        }else{
            stopGame();
        }
    }

    function startAgain(){
        window.location.reload();
    }

    useEffect(() => {
        if (attempts === 6) return;
        if (time === 0) {
            timeFinished();
            setAttempts(attempts + 1)
            setTime(60);
        }
    }, [time]);

    useEffect(() => {
        if (person){
            const [y, r] = getIdYear(person?.id);
            setYear(y);
            setRest(r);
        }
        setAttempts(1);
        setShowNation(false);
        setShowYear(false);
        setShowId(false);
        setShowGender(false);
        setShowComps(false);
        setShowName(false);
        setBlur("blur-2xl");
        setBlackWhite(true);
        startCountdown();
        setIsSearchDisabled(false);
        setTime(60);
        hints();
    }, [person]);

    useEffect(() => {
        hints();
    }, [attempts]);

    return (
        <div className="flex justify-center items-center flex-col gap-5 select-none w-full">
            <section className="w-full flex lg:flex-row flex-col justify-center lg:items-end items-center">
                <div className="lg:w-1/6 w-full order-1">
                    <p className="text-xl">{t("score")}: {6-attempts}</p>
                </div>
                <div className="lg:w-4/6 w-full lg:order-2 order-3">
                    <FocusSearchBar mode={mode} handleAnswer={handleAnswer} isSearchDisabled={isSearchDisabled}/>
                </div>
                <div className="lg:w-1/6 w-full lg:order-3 order-2">
                    <p className="text-xl">{t("time")}: {formatSecondsTime(time)}</p>
                </div>
            </section>
            <section className="w-full flex lg:flex-row flex-col justify-center items-center gap-5">
                <Button variant="faded" className="lg:w-auto w-full" color="warning" onPress={onSkipOpen} isDisabled={isSearchDisabled}>{t("skip")}</Button>
                <Button variant="faded" className="lg:w-auto w-full" color="danger" onPress={onRevealOpen} isDisabled={isSearchDisabled}>{t("reveal")}</Button>
                <Button variant="faded" className="lg:w-auto w-full" color="primary" onPress={() => startAgain()} isDisabled={!isSearchDisabled}>{t("start_new")}</Button>
            </section>
            <h2 className="font-semibold text-3xl lg:mb-5 mb-8 flex justify-center items-center lg:gap-5 gap-1 lg:flex-row flex-col">
                {
                    showName ? person?.name : "************"
                }
                <Button isIconOnly size="sm" variant="ghost" onPress={onOpen}><FaInfoCircle /></Button>
            </h2>
            <LazyLoad className="flex justify-center items-center">
                <img src={person?.avatarUrl} alt="Avatar" className={`lg:h-[600px] lg:w-auto w-8/10 ${blur} ${blackWhite ? "grayscale" : ""} my-20`}/>
            </LazyLoad>
            <h3 className="font-semibold text-2xl mt-5 text-[#FF5800] bg-[#351200] px-4 py-1 rounded-xl flex justify-center items-center gap-2">{t("personal_info")} <MdPersonSearch /></h3>
            <div className="flex justify-center items-center gap-5 lg:flex-row flex-col">
                <Card className={`${showNation ? "flash-highlight" : ""} lg:w-auto w-full`}>
                    <CardBody className="flex justify-center items-center">
                        <p className="flex text-center justify-center items-center lg:text-lg text-md gap-1">{t("nation")}: <span className="flex items-center justify-center gap-2"><span className={showNation ? "" : "blur-md"}>{person?.country_name}</span>
                            {
                                showNation && <Flag code={ person?.country } width={20} height={15}/>
                            }
                            </span>
                        </p>
                    </CardBody>
                </Card>
                <Card className={`${showYear || showId ? "flash-highlight" : ""} lg:w-auto w-full`}>
                    <CardBody>
                        <p className="lg:text-lg text-md text-center">WCA ID: <span className={showYear ? "" : "blur-md"}>{year}</span><span className={showId ? "" : "blur-md"}>{rest}</span></p>
                    </CardBody>
                </Card>
                <Card className={`${showGender ? "flash-highlight" : ""} lg:w-auto w-full`}>
                    <CardBody>
                        <p className="lg:text-lg text-md text-center">{t("gender")}: <span className={showGender ? "" : "blur-md"}>{person?.gender === "m" ? "Male" : "Female"}</span></p>
                    </CardBody>
                </Card>
            </div>
            <h3 className="font-semibold text-2xl mt-5 text-[#0051BA] bg-[#001530] px-4 py-1 rounded-xl flex justify-center items-center gap-2">{t("comp_info")} <MdOutlineContentPasteSearch /></h3>
            <Card className={`${showComps ? "flash-highlight" : ""}`}>
                <CardBody>
                    <p className="flex text-center lg:text-lg text-md jusitfy-center items-center gap-2">{t("comp_numb")}: <span className={showComps ? "" : "blur-md"}>{person?.numberOfCompetitions}</span></p>
                </CardBody>
            </Card>
            <h3 className="font-semibold text-2xl mt-5 text-[#029347] bg-[#002713] px-4 py-1 rounded-xl flex justify-center items-center gap-2">{t("best_result")} <RiTimerFill /></h3>
            <TimeTables times={person?.personal_records} showTime={showTime} />

            <Modale isOpen={isOpen} onOpenChange={onOpenChange} />
            <SkipModale isSkipOpen={isSkipOpen} onSkipOpenChange={onSkipOpenChange} skipAnswer={skipAnswer} />
            <RevealModale isRevealOpen={isRevealOpen} onRevealOpenChange={onRevealOpenChange} revealAnswer={revealAnswer} />
            <FinalModale isFinalOpen={isFinalOpen} onFinalOpenChange={onFinalOpenChange} name={person?.name} points={6-attempts} hasWon={hasWon}/>

            <ErrorAlert isAlertOpen={isAlertOpen} />
            <TimeAlert isTimeFinished={isTimeFinished} />
            <SkipAlert isSkip={isSkip} />
        </div>
    );
}
