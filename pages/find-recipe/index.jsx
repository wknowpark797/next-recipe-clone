import Head from 'next/head';
import styles from './style.module.scss';
import clsx from 'clsx';

export default function Recipe() {
	return (
		<>
			<Head>
				<title>Recipe Page</title>
			</Head>

			<div className={styles.box}></div>
		</>
	);
}
