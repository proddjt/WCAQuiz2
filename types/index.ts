import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type FocusPerson = Object & {
  id: string,
  name: string,
  country: string,
  country_name: string,
  gender: string,
  numberOfCompetitions: number,
  personal_records: Array<any>,
  records: Object,
  avatarUrl: string
}

export type RevealPerson = Object & {
  id: string,
  name: string,
  country: string,
  country_name: string,
  gender: string,
  numberOfCompetitions: number,
  numberOfChampionships: number,
  competitionIds: Array<string>,
  championshipIds: Array<string>,
  medals: Object,
  personal_records: Object,
  records: Object,
  avatarUrl: string
}