/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, useScroll } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { DiscordDashboard } from './components/DiscordDashboard';
import { LocationMap } from './components/LocationMap';
import { Footer } from './components/Footer';
import { initialProfile, projectsData, skillCategories, experienceData, testimonialsData } from './data/portfolioData';

export default function App() {
  const [profile] = useState(initialProfile);
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Scroll Progress Indicator Bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-50 origin-left"
      />

      {/* Navbar */}
      <Navbar profile={profile} />

      {/* Main Content Sections */}
      <main>
        <Hero profile={profile} />
        <Projects projects={projectsData} />
        <Skills categories={skillCategories} />
        <Experience items={experienceData} />
        <Testimonials testimonials={testimonialsData} />
        <Contact profile={profile} />
        <DiscordDashboard />
        <LocationMap />
      </main>

      {/* Footer */}
      <Footer profile={profile} />
    </div>
  );
}

