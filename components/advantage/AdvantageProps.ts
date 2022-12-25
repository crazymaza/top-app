import { PageAdvantage } from "../../interfaces/page.interface";

export interface AdvantageProps extends PageAdvantage { }

export interface AdvantagesProps {
    advantages: AdvantageProps[];
}