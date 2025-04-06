import Head from 'next/head';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Hobbies from '../components/Hobbies';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>Linxun | 区块链技术爱好者 | 智能合约开发者</title>
        <meta name="description" content="Linxun的个人网站 - 区块链技术爱好者、智能合约开发者、计算机科学学生" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="overflow-x-hidden">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Hobbies />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
