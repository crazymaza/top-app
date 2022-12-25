import { AdvantageProps } from './AdvantageProps';
import styles from './Advantage.module.css';
import { Htag } from '../htag/Htag';
import { Ptag } from '../ptag/Ptag';
import CheckIcon from './check.svg';

export const Advantage = ({ title, description }: AdvantageProps): JSX.Element => {
    return (
        <div className={styles.advantage}>
            <CheckIcon className={styles.icon} />
            <hr className={styles.border} />
            <Htag tag='h3' className={styles.title}>{title}</Htag>
            <Ptag size='l' className={styles.descr}>{description}</Ptag>
        </div>
    );
};