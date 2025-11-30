"use client";

import { Button, Card, CardBody, useDisclosure } from "@heroui/react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaInfoCircle, FaMedal } from "react-icons/fa";

import { checkGoldrushAnswer, formatSecondsTime } from "@/app/lib/functions";
import { Gara } from "@/types";
import Modale from "./Modale";
import SkipModale from "../SkipModale";
import RevealModale from "../RevealModale";
import FinalModale from "./FinalModale";
import SkipAlert from "../SkipAlert";
import { MdOutlineContentPasteSearch } from "react-icons/md";
import PodiumTable from "./PodiumTable";
import CompetitorsTable from "./CompetitorsTable";
import WrongAlert from "./WrongAlert";
import CorrectAlert from "./CorrectAlert";

export default function Goldrush({comp}: {comp: Gara}) {
    const [showThird, setShowThird] = useState(false);
    const [showSecond, setShowSecond] = useState(false);
    const [showList, setShowList] = useState(false);
    const [showFirst, setShowFirst] = useState(false);
    const [stage, setStage] = useState<number>(0);
    const [correctAnswers, setCorrectAnswers] = useState<number>(0);
    const [hasWon, setHasWon] = useState(false);
    const [time, setTime] = useState(comp?.time * 60);
    const [isTimeFinished, setIsTimeFinished] = useState(false);
    const [isSkip, setIsSkip] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isWrong, setIsWrong] = useState(false);
    const [isSearchDisabled, setIsSearchDisabled] = useState(false);
    const [guessedEvents, setGuessedEvents] = useState<Object>(
        comp?.events.reduce((acc, event) => ({ ...acc, [event]: false }), {}) || {}
    );
    const countdownRef = useRef<NodeJS.Timeout | null>(null);

    const {t} = useTranslation();

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {isOpen: isSkipOpen, onOpen: onSkipOpen, onOpenChange: onSkipOpenChange} = useDisclosure();
    const {isOpen: isGoldrushOpen, onOpen: onGoldrushOpen, onOpenChange: onGoldrushOpenChange} = useDisclosure();
    const {isOpen: isFinalOpen, onOpen: onFinalOpen, onOpenChange: onFinalOpenChange} = useDisclosure();
    
    function showCorrectAlert() {
        if (isTimeFinished) return;
        if (stage === 4) return;
        setIsCorrect(true);
        setTimeout(() => setIsCorrect(false), 3000);
    }

    function showWrongAlert() {
        if (isTimeFinished) return;
        if (stage === 4) return;
        setIsWrong(true);
        setTimeout(() => setIsWrong(false), 3000);
    }

    function showSkipAlert() {
        if (isTimeFinished) return;
        if (stage === 4) return;
        setIsSkip(true);
        setTimeout(() => setIsSkip(false), 3000);
    }

    function revealAnswer(){
        setStage(4);
    }

    function timeFinished() {
        setStage(4)
        if (correctAnswers === comp.podiums.length) return;
        setIsTimeFinished(true);
        setTimeout(() => setIsTimeFinished(false), 3000);
    }

    function skipAnswer() {
        if (stage === 3) {
            setTime(0)
            timeFinished();
            stopGame(4);
        }
        else if (stage === 2) setTime((comp.time * 60) * 0.3)
        else if (stage === 1) setTime((comp.time * 60) * 0.5)
        else if (stage === 0) setTime((comp.time * 60) * 0.6)
        showSkipAlert();
    }

    function hints(){
        switch (stage) {
            case 0:
                break;
            case 1:
                setShowThird(true)
                showSkipAlert();
                break;
            case 2:
                setShowSecond(true);
                showSkipAlert();
                break;
            case 3:
                setShowList(true)
                showSkipAlert();
                break;
            case 4:
                stopGame(stage);
                break;
        }
    }

    function stopGame(currentStage?: number){
        const finalStage = currentStage ?? stage;
        setIsSearchDisabled(true);
        setShowSecond(true);
        setShowThird(true);
        setShowList(true);
        setGuessedEvents(comp.events.reduce((acc, event) => ({ ...acc, [event]: true }), {}));
        stopCountdown();
        if (finalStage < 4) {
            setHasWon(true);
        }
        else{
            setHasWon(false);
        }
        onFinalOpen();
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
        setShowSecond(false);
        setShowThird(false);
        setShowList(false);
        setStage(0);
        setCorrectAnswers(0);
        setIsTimeFinished(false);
        startCountdown();
    }, [comp]);

    useEffect(() => {
        if (stage === 4) return;
        if (time === 0) {
            timeFinished();
            setStage(4);
        }
    }, [time]);

    function handleAnswer(answer: string, event: string){
        const result = checkGoldrushAnswer(answer, event, comp?.podiums);
        if (!result) {
            showWrongAlert();
        }else{
            setCorrectAnswers(prev => prev + 1);
            setGuessedEvents(prev => ({ ...prev, [event]: true }));
        }
    }

    useEffect(() => {
        if (time === (comp.time * 60) * 0.6){
            setStage(1);
            showSkipAlert();
        }
        else if (time === (comp.time * 60) * 0.5){
            setStage(2);
            showSkipAlert();
        } else if (time === (comp.time * 60) * 0.3){
            setStage(3);
            showSkipAlert();
        }
        else if (time === 0){
            timeFinished();
        }
    }, [time])

    useEffect(() => {
        if (correctAnswers === comp.podiums.length) {
            stopGame(stage);
        } else if (correctAnswers > 0) {
            showCorrectAlert();
        }
    }, [correctAnswers]);

    useEffect(() => {
        if (stage === 4) return
        hints(); 
    }, [stage]);
    
    return(
        <div className="flex justify-center items-center flex-col gap-3 select-none w-full">
            <section className="w-full flex lg:flex-row flex-col justify-center lg:items-end items-center">
                <div className="lg:w-1/6 w-full order-1">
                    <p className="text-xl">{t("score")}: {correctAnswers}/{comp.podiums.length}</p>
                </div>
                <div className="lg:w-1/6 w-full lg:order-3 order-2">
                    <p className="text-xl">{t("time")}: {formatSecondsTime(time)}</p>
                </div>
            </section>
            <section className="w-full flex lg:flex-row flex-col justify-center items-center gap-5">
                <Button variant="faded" className="lg:w-auto w-full" color="warning" onPress={onSkipOpen} isDisabled={isSearchDisabled}>{t("skip")}</Button>
                <Button variant="faded" className="lg:w-auto w-full" color="danger" onPress={onGoldrushOpen} isDisabled={isSearchDisabled}>{t("reveal")}</Button>
                <Button variant="faded" className="lg:w-auto w-full" color="primary" onPress={() => startAgain()} isDisabled={!isSearchDisabled}>{t("start_new")}</Button>
            </section>
            
            <h2 className="font-semibold text-3xl mb-5 flex justify-center items-center lg:gap-5 gap-1 lg:flex-row flex-col">
                {comp?.nome}
                <Button isIconOnly size="sm" variant="ghost" onPress={onOpen}><FaInfoCircle /></Button>
            </h2>
            <h3 className="font-semibold text-2xl mt-5 text-[#FF5800] bg-[#351200] px-4 py-1 rounded-xl flex justify-center items-center gap-2">{t("competition_info")} <MdOutlineContentPasteSearch /></h3>
            <div className="flex lg:flex-nowrap flex-wrapjustify-center items-center lg:gap-20 gap-2 flex-col lg:flex-row">
                <Card>
                    <CardBody>
                        <p className="flex lg:flex-row flex-col text-center justify-center items-center lg:text-md text-sm gap-1">{t("where")}: <span className="flex items-center justify-center gap-2">{comp?.location}</span>
                        </p>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <p className="flex lg:flex-row flex-col text-center justify-center items-center lg:text-md text-sm gap-1">{t("duration")}: <span className="flex items-center justify-center gap-2">{comp?.data}</span>
                        </p>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <p className="flex lg:flex-row flex-col text-center justify-center items-center lg:text-md text-sm gap-1">{t("part_number")}: <span className="flex items-center justify-center gap-2">{comp?.competitors.count}</span>
                        </p>
                    </CardBody>
                </Card>
            </div>
            <h3 className="font-semibold text-2xl mt-5 text-[#0051BA] bg-[#001530] px-4 py-1 rounded-xl flex justify-center items-center gap-2">{t("podiums_comps")} <FaMedal /></h3>
            <div className="flex lg:flex-nowrap flex-wrap justify-center items-center lg:gap-20 gap-10 w-full">
                <div className="lg:w-2/3 w-full flex justify-center items-center">
                    <PodiumTable podiums={comp?.podiums} competitors={comp?.competitors.competitors} showThird={showThird} showSecond={showSecond} showFirst={showFirst} handleAnswer={handleAnswer} guessedEvents={guessedEvents}/>
                </div>
                <div className="lg:w-1/3 w-full flex justify-center items-center">
                    <CompetitorsTable competitors={comp?.competitors.competitors} showList={showList}/>
                </div>
            </div>

            <Modale isOpen={isOpen} onOpenChange={onOpenChange} />
            <SkipModale isSkipOpen={isSkipOpen} onSkipOpenChange={onSkipOpenChange} skipAnswer={skipAnswer} />
            <RevealModale isRevealOpen={isGoldrushOpen} onRevealOpenChange={onGoldrushOpenChange} revealAnswer={revealAnswer} />
            <FinalModale isFinalOpen={isFinalOpen} podiumsLeft={comp.podiums.length-correctAnswers} onFinalOpenChange={onFinalOpenChange} time={time} hasWon={hasWon}/>

            <SkipAlert isSkip={isSkip} />
            <WrongAlert isWrong={isWrong} />
            <CorrectAlert isCorrect={isCorrect} podiumsLeft={comp.podiums.length-correctAnswers} />
        </div>
    )
}
