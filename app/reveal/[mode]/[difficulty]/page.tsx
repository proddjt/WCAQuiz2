"use server";

import { fetchRevealPerson } from "@/app/lib/data";
import Loading from "./loading";
import Reveal from "@/components/Reveal/Reveal";

export default async function RevealQuiz({params} : {params: {mode: string, difficulty: string}}) {
    const { mode, difficulty } = await params;
    let person = null

    if (mode && difficulty) {
        try {
            person = await fetchRevealPerson({ mode, difficulty });
        } catch (error) {
            console.error("Errore nel fetch: ", error);
        }
    } else {
        console.warn('Parametro mancante: mode o difficulty');
    }   
    
    if (!person) return <Loading />
    
    return(
        <>
            <Reveal person={person} mode={mode}/>
        </>
    )
}