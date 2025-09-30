"use server";

import { fetchFocusPerson } from "@/app/lib/data";
import Loading from "./loading";
import Focus from "@/components/Focus/Focus";

export default async function FocusPage(props: { params: Promise<{ mode: string }> }) {
    const { mode } = await props.params;
    let person = null;

    if (mode) {
        try {
            person = await fetchFocusPerson({mode});
        } catch (error) {
            console.error("Errore nel fetch: ", error);
        }
    } else {
        console.warn('Parametro mancante: mode');
    }


    if (!person) return <Loading />
    
    return (
        <>
            <Focus person={person} mode={mode} />
        </>
    );
}