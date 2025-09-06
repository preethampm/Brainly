import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../icons/Logo';
import { ArrowRightIcon, BookOpenIcon, ShareIcon, TagIcon } from '@heroicons/react/24/outline';
import AnimatedBackground from '../components/AnimatedBackground';

import { GitHubIcon } from '../icons/GitHubIcon';

const LandingPage: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white relative">
      <AnimatedBackground />
      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Logo />
            <span className="ml-3 text-xl font-bold">Brainly</span>
          </div>
          <nav className="space-x-4 flex items-center">
            <a href="https://github.com/preethampm/Brainly" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400">
              <GitHubIcon />
            </a>
            <Link to="/signin" className="hover:text-purple-400">Sign In</Link>
            <Link to="/signup" className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md">Sign Up</Link>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Your Digital Brain, Unleashed</h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8">Capture, organize, and share your knowledge effortlessly.</p>
          <Link to="/signup" className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-md text-lg font-semibold">Get Started for Free <ArrowRightIcon className="inline-block h-5 w-5 ml-2" /></Link>
          <div className="mt-12">
            <img src="/dashboard-placeholder.svg" alt="Dashboard preview" className="mx-auto rounded-lg shadow-2xl" />
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-800 py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">Why Brainly?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <BookOpenIcon className="h-12 w-12 mx-auto mb-4 text-purple-400" />
                <h3 className="text-2xl font-bold mb-2">Capture Everything</h3>
                <p className="text-gray-400">Save articles, videos, and tweets with a single click. Your personal library, always available.</p>
              </div>
              <div className="text-center">
                <TagIcon className="h-12 w-12 mx-auto mb-4 text-purple-400" />
                <h3 className="text-2xl font-bold mb-2">Organize with Tags</h3>
                <p className="text-gray-400">Use tags to categorize your content and find what you need in seconds.</p>
              </div>
              <div className="text-center">
                <ShareIcon className="h-12 w-12 mx-auto mb-4 text-purple-400" />
                <h3 className="text-2xl font-bold mb-2">Share with the World</h3>
                <p className="text-gray-400">Share your curated knowledge with a single link. Perfect for creators and educators.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-24 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Build Your Digital Brain?</h2>
          <p className="text-xl text-gray-400 mb-8">Sign up for free and start your journey of knowledge curation.</p>
          <Link to="/signup" className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-md text-lg font-semibold">Create Your Brainly Account</Link>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 py-8">
          <div className="container mx-auto px-6 text-center text-gray-400">
            <p>&copy; 2025 Brainly. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
