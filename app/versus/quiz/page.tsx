"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { fetchVersusFirstPerson, fetchVersusSecondPerson } from "@/app/lib/data";
import Loading from "./loading";
import ProfileCard from "@/components/Versus/PersonCard";
import { checkLower, getEventFullName } from "@/app/lib/functions";
import CorrectAlert from "@/components/CorrectAlert";
import { Button } from "@heroui/button";
import { FaInfoCircle } from "react-icons/fa";
import { useDisclosure } from "@heroui/modal";
import Modale from "@/components/Versus/Modale";
import FinalModale from "@/components/Versus/FinalModale";
import ErrorModale from "@/components/ErrorModale";

export default function VersusQuiz() {
    const [person, setPerson] = useState<any>(null);
    const [secondPerson, setSecondPerson] = useState<any>(null);
    const [tempPerson, setTempPerson] = useState<any>(null);
    const [score, setScore] = useState(0);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isWrong, setIsWrong] = useState(false);
    const [isShown, setIsShown] = useState(false);
    const mode = useSearchParams().get("mode");
    const event = useSearchParams().get("event");
    const result = useSearchParams().get("result");

    const { t } = useTranslation();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isOpen: isFinalOpen, onOpen: onFinalOpen, onOpenChange: onFinalOpenChange } = useDisclosure();
    const { isOpen: isErrorOpen, onOpen: onErrorOpen, onOpenChange: onErrorOpenChange } = useDisclosure();

    function checkAnswer(a: string, b: string){
        if (checkLower(a, b)){
            const fetch = async () => {
                try {
                    const data = await fetchVersusSecondPerson({ mode, event, result, firstPersonID: tempPerson.id, firstPersonResult: tempPerson.result });
                    setTempPerson(data);
                } catch (error) {
                    onErrorOpen();
                }
            }
            fetch();
            setIsCorrect(true);
            setIsShown(true);
            setScore(score + 1);
            setTimeout(() => {
                setIsCorrect(false);
                setIsShown(false);
                setPerson(secondPerson);
                setSecondPerson(tempPerson);
            }, 5000)
        } else {
            stopGame();
        }
    }

    function stopGame() {
        setIsWrong(true);
        setIsShown(true);
        onFinalOpen();
    }

    function startAgain(){
        window.location.reload();
    }

    useEffect(() => {
        setIsCorrect(false);
        setIsWrong(false);
        setIsShown(false);
        setScore(0);
        if (mode && event && result) {
            const fetch = async () => {
                try {
                const data1 = await fetchVersusFirstPerson({ mode, event, result });
                setPerson(data1);
                const data2 = await fetchVersusSecondPerson({ mode, event, result, firstPersonID: data1?.id, firstPersonResult: data1?.result });
                setSecondPerson(data2);
                const tempData = await fetchVersusSecondPerson({ mode, event, result, firstPersonID: data2?.id, firstPersonResult: data2?.result });
                setTempPerson(tempData);
                } catch (error) {
                    onErrorOpen();
                }
            }
            fetch();
        } else {
            console.warn('Parametri mancanti: mode o event o result');
        }
    }, []);

    if (!person || !secondPerson) return <Loading />

    return (
        <>
        
        <div className="flex justify-center items-center lg:gap-5 gap-10 flex-col">
            <Button variant="faded" color="primary" onPress={() => startAgain()} isDisabled={!isWrong}>Start new</Button>
            <section className="flex justify-center items-center gap-5 flex-col">
                <h2 className="font-bold lg:text-5xl text-xl">{t("score")}: {score}</h2>
                <div className="flex justify-center items-center lg:gap-5 gap-1 lg:flex-row flex-col">
                    <h2 className="font-bold lg:text-5xl text-xl">{result === "single" ? t("versus_heading_single") : t("versus_heading_average")} {getEventFullName(event)}?</h2>
                    <Button isIconOnly size="sm" variant="ghost" onPress={onOpen}><FaInfoCircle /></Button>
                </div>
            </section>
            <section className="flex justify-center items-center lg:flex-row flex-col lg:gap-50 gap-20">
                <button onClick={() => {if(!isWrong) checkAnswer(person.result, secondPerson.result)}}>
                    <ProfileCard 
                        name={person.name}
                        title={person.id}
                        handle={person.country_name}
                        avatarUrl={person.has_avatar ? person.avatarUrl : `/user_placeholder.jpeg`}
                        event={event}
                        enableTilt={true}
                        enableMobileTilt={false}
                        mobileTiltSensitivity={2}
                        result={result}
                        time={person.result}
                        isShown
                    />
                </button>
                {
                    secondPerson && (
                        <button onClick={() => {if(!isWrong) checkAnswer(secondPerson.result, person.result)}}>
                            <ProfileCard 
                                name={secondPerson.name}
                                title={secondPerson.id}
                                handle={secondPerson.country_name}
                                avatarUrl={secondPerson.has_avatar ? secondPerson.avatarUrl : `/user_placeholder.jpeg`}
                                event={event}
                                enableTilt={true}
                                enableMobileTilt={false}
                                mobileTiltSensitivity={2}
                                result={result}
                                time={secondPerson.result}
                                isShown={isShown}
                            />
                        </button>
                    )
                }
            </section>
        </div>

        <Modale isOpen={isOpen} onOpenChange={onOpenChange} />
        <FinalModale isFinalOpen={isFinalOpen} onFinalOpenChange={onFinalOpenChange} points={score} />
        <ErrorModale isErrorOpen={isErrorOpen} onErrorOpenChange={onErrorOpenChange} />

        <CorrectAlert isCorrect={isCorrect} />
        </>
    );
}
