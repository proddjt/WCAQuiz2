import { avatar } from "@heroui/theme";
import { getBestRankedRecord } from "./functions";

export async function fetchRevealPerson({difficulty, mode}: {difficulty: string, mode: string}) {
    const events = ["222", "333", "333fm", "333oh", "444", "555", "666", "777", "clock", "minx", "pyram", "skewb", "sq1", "333bf"]
    const type = ["single", "average"]
    let personList = null
    let person = null
    let check = false;
    const unofficialUrl = "https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master"
    const officialUrl = "https://www.worldcubeassociation.org/api/v0/persons/"
    while (!check) {
            if(difficulty == 'ez') {
                const response = await fetch(`${unofficialUrl}/api/rank/${mode}/${type[Math.floor(Math.random()*type.length)]}/${events[Math.floor(Math.random()*events.length)]}.json`);
                const data = await response.json();
                personList = data.items.slice(0, 19);
                while (!person){
                    const id = personList[Math.floor(Math.random()*personList.length)]["personId"];
                    const response = await fetch(`${unofficialUrl}/api/persons/${id}.json`);
                    const data = await response.json();
                    if (data.numberOfCompetitions > 30){
                        person = data;
                    }
                }
            }else if (difficulty == 'md') {
                const response = await fetch(`${unofficialUrl}/api/rank/${mode}/${type[Math.floor(Math.random()*type.length)]}/${events[Math.floor(Math.random()*events.length)]}.json`);
                const data = await response.json();
                personList = data.items.slice(20, 49);
                while (!person){
                    const id = personList[Math.floor(Math.random()*personList.length)]["personId"];
                    const response = await fetch(`${unofficialUrl}/api/persons/${id}.json`);
                    const data = await response.json();
                    if (data.numberOfCompetitions > 20){
                        person = data;
                    }
                }
            }else{
                const response = await fetch(`${unofficialUrl}/api/rank/${mode}/${type[Math.floor(Math.random()*type.length)]}/${events[Math.floor(Math.random()*events.length)]}.json`);
                const data = await response.json();
                personList = data.items.slice(50, 99);
                while (!person){
                    const id = personList[Math.floor(Math.random()*personList.length)]["personId"];
                    const response = await fetch(`${unofficialUrl}/api/persons/${id}.json`);
                    const data = await response.json();
                    if (data.numberOfCompetitions > 15){
                        person = data;
                    }
                }
            }
            if (personList){
                check = true;
            }
    }
    const response = await fetch(`${officialUrl}${person.id}`);
    const data = await response.json();
    const personQuiz = {
        id: person.id,
        name: person.name,
        country: person.country,
        country_name: data.person.country.name,
        gender: data.person.gender,
        numberOfCompetitions: person.numberOfCompetitions,
        numberOfChampionships: person.numberOfChampionships,
        competitionIds: person.competitionIds,
        championshipIds: person.championshipIds,
        medals: person.medals,
        personal_records: data.personal_records,
        records: data.records,
        avatarUrl: data.person.avatar.url
    }
    return personQuiz
}

export async function fetchFocusPerson({mode}: {mode: string}) {
    let personList = null
    let person = null
    let check = false;
    const unofficialUrl = "https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master"
    const officialUrl = "https://www.worldcubeassociation.org/api/v0/persons/"
    while (!check) {
        const response = await fetch(`${unofficialUrl}/api/rank/${mode}/single/333.json`);
        const data = await response.json();
        const totalPages = Math.ceil(data.total / data.pagination.size);
        const newResponse = await fetch(`${unofficialUrl}/api/rank/${mode}/single/333.json?page=${Math.floor(Math.random() * totalPages) + 1}`);
        const newData = await newResponse.json();
        personList = newData.items;
        while (!person){
            const id = personList[Math.floor(Math.random()*personList.length)]["personId"];
            const response = await fetch(`${unofficialUrl}/api/persons/${id}.json`);
            const data = await response.json();
            if (data.numberOfCompetitions >= 15){
                const defResponse = await fetch(`${officialUrl}${id}`);
                const defData = await defResponse.json();
                if (!defData.person.avatar.is_default){
                    person = {
                        id: data.id,
                        name: data.name,
                        country: data.country,
                        country_name: defData.person.country.name,
                        gender: defData.person.gender,
                        numberOfCompetitions: data.numberOfCompetitions,
                        personal_records: getBestRankedRecord(defData.personal_records),
                        records: defData.records,
                        avatarUrl: defData.person.avatar.url
                    }
                }
            }
        }
        if (personList){
            check = true;
        }
    }
    return person
}

export async function fetchVersusFirstPerson({mode, event, result}: {mode: string, event: string, result: string}) {
    let person = null
    let check = false;
    const unofficialUrl = "https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master"
    const officialUrl = "https://www.worldcubeassociation.org/api/v0/persons/"
    while (!check) {
        const response = await fetch(`${unofficialUrl}/api/rank/${mode}/${result}/${event}.json`);
        const data = await response.json();
        const totalPages = Math.ceil(data.total / data.pagination.size);
        const newResponse = await fetch(`${unofficialUrl}/api/rank/${mode}/${result}/${event}.json?page=${Math.floor(Math.random() * totalPages) + 1}`);
        const newData = await newResponse.json();
        const id = newData.items[Math.floor(Math.random()*newData.items.length)]["personId"];
        const defResponse = await fetch(`${officialUrl}${id}`);
        const defData = await defResponse.json();
        person = {
            id: defData.person.id,
            name: defData.person.name,
            result: defData.personal_records[event][result].best,
            has_avatar: !defData.person.avatar.is_default,
            avatarUrl: defData.person.avatar.url,
            country_name: defData.person.country.name,
            country_iso: defData.person.country.iso2,
        }
        if (person){
            check = true;
        }
    }
    return person
}

export async function fetchVersusSecondPerson({mode, event, result, firstPersonID, firstPersonResult}: {mode: any, event: any, result: any, firstPersonID: string, firstPersonResult: string}) {
    let person = null
    let check = false;
    const unofficialUrl = "https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master"
    const officialUrl = "https://www.worldcubeassociation.org/api/v0/persons/"
    while (!check) {
        const response = await fetch(`${unofficialUrl}/api/rank/${mode}/${result}/${event}.json`);
        const data = await response.json();
        const totalPages = Math.ceil(data.total / data.pagination.size);
        const newResponse = await fetch(`${unofficialUrl}/api/rank/${mode}/${result}/${event}.json?page=${Math.floor(Math.random() * totalPages) + 1}`);
        const newData = await newResponse.json();
        const id = newData.items[Math.floor(Math.random()*newData.items.length)]["personId"];
        if (id != firstPersonID){
            const defResponse = await fetch(`${officialUrl}${id}`);
            const defData = await defResponse.json();
            if (defData.personal_records[event][result].best != firstPersonResult){
                person = {
                    id: defData.person.id,
                    name: defData.person.name,
                    result: defData.personal_records[event][result].best,
                    has_avatar: !defData.person.avatar.is_default,
                    avatarUrl: defData.person.avatar.url,
                    country_name: defData.person.country.name,
                    country_iso: defData.person.country.iso2,
                }
            }
            if (person){
                check = true;
            }
        }
    }
    return person
}

export async function fetchSearchBar(name: string, mode: string) {
    const modeToContinentMap: Record<string, string> = {
        "europe": "_Europe",
        "asia": "_Asia",
        "africa": "_Africa",
        "north-america": "_North America",
        "south-america": "_South America"
    };
    const response = await fetch(`https://www.worldcubeassociation.org/api/v0/search/users?q=${name}&persons_table=true`);
    const data = await response.json();
    if (!data?.result || !Array.isArray(data.result)) return [];
    const filtered = data.result.filter((person: any) => {
        if (mode === "world") return true;
        if (mode === "IT") return person.country?.id === "Italy";

        const expectedContinent = modeToContinentMap[mode];
        return person.country?.continent_id === expectedContinent;
    });
    return filtered
}