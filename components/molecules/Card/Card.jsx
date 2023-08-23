import { Pic } from '@/components/atoms/pic/Pic';
import styles from './Card.module.scss';
import clsx from 'clsx';
import Title from '@/components/atoms/text/Title';

function Card({ txt, imgSrc, className }) {
	return (
		<article className={clsx(styles.card)}>
			<Pic imgSrc={imgSrc} />
			<Title></Title>
		</article>
	);
}

export default Card;
