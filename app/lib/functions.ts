import { Podium } from "@/types";

export function sortEventDataAsArray(data: Record<string, any>): [string, any][] {
  const preferredOrder = [
    "333", "222", "444", "555", "666", "777",
    "333bf", "333fm", "333oh", "clock", "minx",
    "pyram", "skewb", "sq1", "444bf", "555bf", "333mbf", "333ft", "magic", "mmagic"
  ];

  const eventNames: Record<string, string> = {
    "222": "2x2x2 Cube",
    "333": "3x3x3 Cube",
    "444": "4x4x4 Cube",
    "555": "5x5x5 Cube",
    "666": "6x6x6 Cube",
    "777": "7x7x7 Cube",
    "333bf": "3x3x3 Blindfolded",
    "333fm": "3x3x3 Fewest Moves",
    "333oh": "3x3x3 One-Handed",
    "clock": "Clock",
    "minx": "Megaminx",
    "pyram": "Pyraminx",
    "skewb": "Skewb",
    "sq1": "Square-1",
    "444bf": "4x4x4 Blindfolded",
    "555bf": "5x5x5 Blindfolded",
    "333mbf": "3x3x3 Multi-Blind",
    "333ft": "3x3x3 With Feet",
    "magic": "Rubik's Magic",
    "mmagic": "Master Magic"
  };

  const allKeys = Object.keys(data);

  const sortedKeys = allKeys.sort((a, b) => {
    const indexA = preferredOrder.indexOf(a);
    const indexB = preferredOrder.indexOf(b);

    const isAInPreferred = indexA !== -1;
    const isBInPreferred = indexB !== -1;

    if (isAInPreferred && isBInPreferred) {
      return indexA - indexB;
    } else if (isAInPreferred) {
      return -1;
    } else if (isBInPreferred) {
      return 1;
    } else {
      return a.localeCompare(b);
    }
  });

  const result: [string, any][] = sortedKeys.map((key) => {
    const fullName = eventNames[key] ?? key;
    return [key, { ...data[key], event_name: fullName }];
  });

  return result;
}

export function getEventFullName(eventId: any): string {
  const eventNames: Record<string, string> = {
    "222": "2x2x2 Cube",
    "333": "3x3x3 Cube",
    "444": "4x4x4 Cube",
    "555": "5x5x5 Cube",
    "666": "6x6x6 Cube",
    "777": "7x7x7 Cube",
    "333bf": "3x3x3 Blindfolded",
    "333fm": "3x3x3 Fewest Moves",
    "333oh": "3x3x3 One-Handed",
    "clock": "Clock",
    "minx": "Megaminx",
    "pyram": "Pyraminx",
    "skewb": "Skewb",
    "sq1": "Square-1",
    "444bf": "4x4x4 Blindfolded",
    "555bf": "5x5x5 Blindfolded",
    "333mbf": "3x3x3 Multi-Blind",
    "333ft": "3x3x3 With Feet",
    "magic": "Rubik's Magic",
    "mmagic": "Master Magic"
  };

  return eventNames[eventId] ?? eventId;
}


export function sortEventsByYearAndName(events: string[]): string[] {
    return events.sort((a, b) => {
        const yearA = parseInt(a.slice(-4));
        const yearB = parseInt(b.slice(-4));

        if (yearA !== yearB) {
        return yearA - yearB;
        }

        return a.localeCompare(b);
    });
}

export function formatTime(value: number | string, eventId: any): string {
    const str = value?.toString();

    // Caso speciale: 333mbd (Multi-Blind)
    if (eventId === "333mbf") {
        const padded = str.padStart(9, '0');
        const DD = parseInt(padded.slice(0, 2), 10);
        const TTTTT = parseInt(padded.slice(2, 7), 10);
        const MM = parseInt(padded.slice(7, 9), 10);

        const difference = 99 - DD;
        const missed = MM;
        const solved = difference + missed;
        const attempted = solved + missed;

        const minutes = Math.floor(TTTTT / 60);
        const seconds = TTTTT % 60;

        return `${solved}/${attempted} ${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    // Caso speciale: 333fm
    if (eventId === "333fm") {
        if (str.length === 4) {
            return `${str.slice(0, -2)}.${str.slice(-2)}`;
        } else if (str.length === 2) {
            return str;
        } else {
            return str;
        }
    }

    // Formattazione standard in centisecondi
    const centiseconds = typeof value === 'number' ? value : parseInt(value, 10);

    const hours = Math.floor(centiseconds / 360000);
    const minutes = Math.floor((centiseconds % 360000) / 6000);
    const seconds = Math.floor((centiseconds % 6000) / 100);
    const hundredths = centiseconds % 100;

    const cs = hundredths.toString().padStart(2, '0');
    const s = seconds.toString().padStart(2, '0');
    const m = minutes.toString().padStart(2, '0');

    if (hours > 0) {
        return `${hours}:${m}:${s}.${cs}`;
    } else if (minutes > 0) {
        return `${minutes}:${s}.${cs}`;
    } else {
        return `${seconds}.${cs}`;
    }
}

export function getIdYear(id: string): [string, string] {
    const year = id.slice(0,4);
    const rest = id.slice(4, 10);
    return [year, rest];
}

export function formatSecondsTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const paddedSeconds = remainingSeconds.toString().padStart(2, '0');
  return `${minutes}:${paddedSeconds}`;
}

export function checkRevealAnswer(guessId: string, answerId: string){
    return guessId === answerId
}

export function checkGoldrushAnswer(guessId: string, guessEvent: string, podiums: Podium[]){
  return podiums.some(podium => podium.event === guessEvent && podium.first?.id === guessId);
}

export function getBestRankedRecord(personalRecords: Array<any>) {
  const allRecords = [];

  for (const eventId in personalRecords) {
    const event = personalRecords[eventId];
    if (event.single) {
      allRecords.push({ ...event.single, type: 'single' });
    }
    if (event.average) {
      allRecords.push({ ...event.average, type: 'average' });
    }
  }

  function getEffectiveRank(rank: number) {
    return rank === 0 ? Infinity : rank;
  }

  allRecords.sort((a, b) => {
    const aCountry = getEffectiveRank(a.country_rank);
    const bCountry = getEffectiveRank(b.country_rank);
    if (aCountry !== bCountry) {
      return aCountry - bCountry;
    }

    const aContinent = getEffectiveRank(a.continent_rank);
    const bContinent = getEffectiveRank(b.continent_rank);
    if (aContinent !== bContinent) {
      return aContinent - bContinent;
    }

    const aWorld = getEffectiveRank(a.world_rank);
    const bWorld = getEffectiveRank(b.world_rank);
    return aWorld - bWorld;
  });

  const best = allRecords[0];
  const tiedRecords = allRecords.filter(r =>
    getEffectiveRank(r.country_rank) === getEffectiveRank(best.country_rank) &&
    getEffectiveRank(r.continent_rank) === getEffectiveRank(best.continent_rank) &&
    getEffectiveRank(r.world_rank) === getEffectiveRank(best.world_rank)
  );

  return tiedRecords;
}

export function checkLower(a: string, b: string) {
  return a < b;
}

export function formatMonthBefore(date: any) {
    var d = new Date(date),
        month = '' + (d.getMonth()),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (parseFloat(month) < 10)  
        month = '0' + month;
    if (parseFloat(month) == 0)
        month = '12'
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

export function formatYearsBefore(date: any, limit: number) {
    var d = new Date(date),
        month = '' + (d.getMonth()),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (parseFloat(month) < 10)  
        month = '0' + month;
    if (parseFloat(month) == 0)
        month = '12'
    if (day.length < 2) 
        day = '0' + day;

    return [year-limit, month, day].join('-');
}

export function formatData(dataString: string) {
  const mesi = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
  ];

  const [anno, mese, giorno] = dataString.split('-');
  const nomeMese = mesi[parseInt(mese, 10) - 1];

  return `${giorno} ${nomeMese} ${anno}`;
}

export function weightedRandomIndex(arrayLength: number, difficulty: string) {
    const weights = [];
    for (let i = 0; i < arrayLength; i++) {
        if (difficulty == "hd") weights[i] = i > (2 * arrayLength) / 3 ? 3 : 1;
        else weights[i] = 1
    }
    const totalWeight = weights.reduce((sum, w) => sum + w, 0);

    let random = Math.random() * totalWeight;

    for (let i = 0; i < arrayLength; i++) {
        if (random < weights[i]) return i;
        random -= weights[i];
    }

    return arrayLength - 1;
}