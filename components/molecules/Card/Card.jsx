import { Pic } from '@/components/atoms/pic/Pic';
import { Title } from '@/components/atoms/text/Title';
import clsx from 'clsx';
import styles from './Card.module.scss';

export function Card({ txt, imgSrc, className, url, type }) {
	return (
		<article className={clsx(styles.card, className, styles[type])}>
			{imgSrc && <Pic imgSrc={imgSrc} />}
			{txt && (
				<Title type={'subTitle'} tag={'h3'} url={url}>
					{txt}
				</Title>
			)}
		</article>
	);
}
