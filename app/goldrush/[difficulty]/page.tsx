"use server";

import { fetchGoldrushComp } from "@/app/lib/data";
import Loading from "./loading";
import Goldrush from "@/components/Goldrush/Goldrush";
import { Gara } from "@/types";

export default async function GoldrushQuiz(props: { params: Promise<{difficulty: string }> }) {
    const { difficulty } = await props.params;
    let comp: GoldrushComp | null | undefined= null;

    if (difficulty) {
        try {
            comp = await fetchGoldrushComp(difficulty);
        } catch (error) {
            console.error("Errore nel fetch: ", error);
        }
    } else {
        console.warn('Parametro mancante: difficulty');
    }   
    
    if (!comp) return <Loading />
    
    return(
        <>
            <Goldrush comp={comp}/>
        </>
    )
}