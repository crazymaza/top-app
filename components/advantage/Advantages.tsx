import { AdvantageProps, AdvantagesProps } from './AdvantageProps';
import { Advantage } from './Advantage';

export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
    return (
        <>
            {advantages.map((advantage: AdvantageProps) => (
                <Advantage key={advantage._id} {...advantage} />
            ))}
        </>
    );
};