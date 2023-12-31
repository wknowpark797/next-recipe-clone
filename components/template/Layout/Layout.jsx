import Head from 'next/head';
import Header from '../../organisms/Header/Header';
import clsx from 'clsx';
import Footer from '@/components/organisms/Footer/Footer';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Breadcrumb } from '@/components/molecules/Breadcrumb/Breadcrumb';
import { useGlobalData } from '@/hooks/useGlobalContext';
import { motion, AnimatePresence, cubicBezier } from 'framer-motion';
import styles from './Layout.module.scss';

function Layout({ children }) {
	const { Theme } = useGlobalData();
	const router = useRouter();
	const [Path, setPath] = useState([]);
	const [IsShow, setIsShow] = useState(true);

	// Layout은 항상 mount가 된 상태 - 라우터만 변경
	useEffect(() => {
		const arr = router.asPath.split('/');
		setPath(arr);
		setIsShow(false);
		setTimeout(() => setIsShow(true), 500);
	}, [router]);

	return (
		<AnimatePresence mode='wait'>
			<motion.div key={router.pathname}>
				<Head>
					<meta
						name='description'
						content='Generated by create next app'
					/>
					<meta
						name='viewport'
						content='width=device-width, initial-scale=1'
					/>
					<link rel='icon' href='/favicon.ico' />
				</Head>

				<main className={clsx(styles.layout, Theme)}>
					<Header />

					<section className={clsx(styles.content)}>
						<Breadcrumb data={Path} isActive={IsShow} />
						{children}
					</section>

					<Footer />

					{/* 페이지가 바뀔 때 나타날 프레임 */}
					<motion.div
						className='in'
						initial={{ scaleX: 0 }}
						animate={{ scaleX: 0 }}
						exit={{ scaleX: 1 }}
						transition={{
							duration: 0.7,
							ease: [cubicBezier(0.25, 0.1, 0.03, 0.99)],
						}}
					></motion.div>

					{/* 페이지가 바뀐 후 사라질 프레임 */}
					<motion.div
						className='out'
						initial={{ scaleX: 1 }}
						animate={{ scaleX: 0 }}
						exit={{ scaleX: 0 }}
						transition={{
							duration: 0.7,
							ease: [cubicBezier(0.25, 0.1, 0.03, 0.99)],
						}}
					></motion.div>
				</main>
			</motion.div>
		</AnimatePresence>
	);
}

export default Layout;
