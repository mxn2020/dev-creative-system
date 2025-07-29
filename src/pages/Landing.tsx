// src/pages/Landing.tsx

import React, { useState, useEffect } from 'react';
import { CheckCircle, Trophy, Heart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container, Button, Card, CardContent, Header, Nav, Section, Span, H1, H2, P, Div, Footer } from '../lib/dev-container';
import { useAuth } from '../components/auth/AuthProvider';
import type { ComponentRegistryId } from '../registry/componentRegistry';

// Helper functions to ensure type safety for dynamic IDs
const getFeatureCardId = (index: number): ComponentRegistryId => {
  const ids: ComponentRegistryId[] = ['feature-card-0', 'feature-card-1', 'feature-card-2', 'feature-card-3'];
  return ids[index] || 'noID';
};

const getStatCardId = (index: number): ComponentRegistryId => {
  const ids: ComponentRegistryId[] = ['stat-card-0', 'stat-card-1', 'stat-card-2', 'stat-card-3'];
  return ids[index] || 'noID';
};

const getBenefitCardId = (index: number): ComponentRegistryId => {
  const ids: ComponentRegistryId[] = ['noID', 'noID', 'noID', 'noID'];
  return ids[index] || 'noID';
};

export const Landing: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: <CheckCircle className="w-8 h-8 text-green-500" />,
      emoji: "✅",
      title: "Fun Task Lists",
      description: "Create colorful to-do lists with emoji icons and fun animations that make completing tasks exciting!"
    },
    {
      icon: <Trophy className="w-8 h-8 text-yellow-500" />,
      emoji: "🏆",
      title: "Earn Rewards",
      description: "Complete tasks to earn stars, unlock achievements, and collect fun badges to show off your progress!"
    },
    {
      icon: <Heart className="w-8 h-8 text-pink-500" />,
      emoji: "💖",
      title: "Kid-Friendly Design",
      description: "Bright colors, cute animations, and simple controls designed specifically for young learners!"
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      emoji: "👨‍👩‍👧‍👦",
      title: "Family Sharing",
      description: "Parents can help create tasks and celebrate achievements together with their little ones!"
    }
  ];

  const stats = [
    { emoji: "😊", value: "100%", label: "Happy Kids" },
    { emoji: "⭐", value: "1000+", label: "Stars Earned" },
    { emoji: "🎯", value: "95%", label: "Tasks Done" },
    { emoji: "🎉", value: "Daily", label: "Fun Time" }
  ];

  const benefits = [
    {
      emoji: "🌈",
      title: "Colorful Categories",
      description: "Organize tasks with rainbow colors - homework in blue, chores in green, fun activities in pink!"
    },
    {
      emoji: "🎵",
      title: "Celebration Sounds",
      description: "Hear happy sounds and see confetti when you complete tasks - making success feel amazing!"
    },
    {
      emoji: "📊",
      title: "Progress Tracking",
      description: "Watch your progress grow with fun charts and see how many tasks you've completed!"
    },
    {
      emoji: "🎁",
      title: "Surprise Rewards",
      description: "Unlock special surprises and collect virtual stickers as you complete more and more tasks!"
    }
  ];

  return (
    <Container componentId="landing-page-root">
      <Div 
        devId="main-wrapper" 
        devName="Main Wrapper" 
        devDescription="Main page wrapper with rainbow gradient background"
        className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400"
      >
        {/* Header */}
        <Header 
          devId="main-header" 
          devName="Main Header" 
          devDescription="Cute header with kid-friendly navigation"
          className="container mx-auto px-4 py-6"
        >
          <Nav 
            devId="main-nav" 
            devName="Main Navigation" 
            devDescription="Primary navigation bar with playful design"
            className="flex items-center justify-between"
          >
            <Div 
              devId="logo-section" 
              devName="Logo Section" 
              devDescription="Cute logo with emoji and app name"
              className="flex items-center space-x-3"
            >
              <Div devId="noID" className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl">📝</span>
              </Div>
              <Span 
                devId="brand-name" 
                devName="Brand Name" 
                devDescription="KidsTodo app brand name"
                className="text-2xl font-bold text-white drop-shadow-lg"
              >
                KidsTodo ✨
              </Span>
            </Div>
            <Div 
              devId="nav-actions" 
              devName="Navigation Actions" 
              devDescription="Navigation buttons with kid-friendly styling"
              className="flex items-center space-x-4"
            >
              {isAuthenticated ? (
                <Div 
                  devId="user-section" 
                  devName="User Section" 
                  devDescription="Welcome section for logged in kids"
                  className="flex items-center space-x-4"
                >
                  <Span 
                    devId="welcome-message" 
                    devName="Welcome Message" 
                    devDescription="Friendly welcome message"
                    className="text-white font-medium drop-shadow"
                  >
                    Hi {user?.name?.split(' ')[0]}! 👋
                  </Span>
                  <Link to="/dashboard">
                    <Button 
                      devId="nav-dashboard-button"
                      devName="Navigation Dashboard Button"
                      devDescription="Colorful dashboard button for kids"
                      className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white px-6 py-2 rounded-full font-bold shadow-lg transform hover:scale-105 transition-all"
                    >
                      🎯 My Tasks
                    </Button>
                  </Link>
                </Div>
              ) : (
                <Div 
                  devId="auth-buttons" 
                  devName="Authentication Buttons" 
                  devDescription="Fun login and signup buttons"
                  className="flex items-center space-x-3"
                >
                  <Link to="/login">
                    <Button 
                      devId="nav-login-button"
                      devName="Navigation Login Button"
                      devDescription="Friendly login button"
                      className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 px-4 py-2 rounded-full font-medium transition-all"
                    >
                      Sign In 🔑
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button 
                      devId="nav-register-button"
                      devName="Navigation Register Button"
                      devDescription="Exciting get started button"
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-6 py-2 rounded-full font-bold shadow-lg transform hover:scale-105 transition-all"
                    >
                      Start Fun! 🚀
                    </Button>
                  </Link>
                </Div>
              )}
            </Div>
          </Nav>
        </Header>

        {/* Hero Section */}
        <Container componentId="hero-section">
          <Section 
            devId="hero-content" 
            devName="Hero Content" 
            devDescription="Main hero section with exciting title and call-to-action"
            className="container mx-auto px-4 py-20 text-center"
          >
            <Div 
              devId="hero-content-wrapper" 
              devName="Hero Content Wrapper" 
              devDescription="Animated wrapper for hero content"
              className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <Div devId="noID" className="text-6xl mb-6 animate-bounce">
                🌟📝🎉
              </Div>
              <H1 
                devId="hero-title" 
                devName="Hero Title" 
                devDescription="Exciting main title for kids"
                className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg"
              >
                Make Tasks 
                <Span 
                  devId="noID" 
                  devName="Fun Highlight" 
                  devDescription="Highlighted 'FUN' text with rainbow gradient"
                  className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent"
                >
                  {' '}FUN!
                </Span>
              </H1>
              <P 
                devId="hero-description" 
                devName="Hero Description" 
                devDescription="Kid-friendly description of the app"
                className="text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow"
              >
                The most exciting todo app for kids! Complete tasks, earn stars, unlock achievements, 
                and have a blast while getting things done! ✨
              </P>
              <Div 
                devId="hero-cta-buttons" 
                devName="Hero CTA Buttons" 
                devDescription="Colorful call-to-action buttons"
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                {isAuthenticated ? (
                  <Link to="/dashboard">
                    <Button 
                      devId="hero-start-building"
                      devName="Start Playing Button"
                      devDescription="Primary button to start using the app"
                      className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 hover:from-green-500 hover:via-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl transform hover:scale-105 transition-all"
                    >
                      🎯 Start Playing!
                    </Button>
                  </Link>
                ) : (
                  <Link to="/register">
                    <Button 
                      devId="hero-start-building"
                      devName="Start Playing Button"
                      devDescription="Primary button to start using the app"
                      className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 hover:from-green-500 hover:via-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl transform hover:scale-105 transition-all"
                    >
                      🎯 Start Playing!
                    </Button>
                  </Link>
                )}
                <Button 
                  devId="noID"
                  devName="Learn More Button"
                  devDescription="Secondary button to learn more about features"
                  className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/30 px-8 py-4 rounded-full font-bold text-lg transition-all"
                >
                  🤔 Learn More
                </Button>
              </Div>
            </Div>
          </Section>
        </Container>

        {/* Fun Stats Section */}
        <Container componentId="stats-section">
          <Section 
            devId="stats-content" 
            devName="Stats Content" 
            devDescription="Fun statistics section with emoji icons"
            className="container mx-auto px-4 py-12"
          >
            <Div 
              devId="stats-grid" 
              devName="Stats Grid" 
              devDescription="Grid of fun statistics"
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {stats.map((stat, index) => (
                <Card 
                  key={index} 
                  devId={getStatCardId(index)}
                  devName={`${stat.label} Stat Card`}
                  devDescription={`Fun statistic showing ${stat.label}: ${stat.value}`}
                  className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  <CardContent devId="noID" className="p-0">
                    <Div devId="noID" className="text-4xl mb-2">{stat.emoji}</Div>
                    <Div devId="noID" className="text-2xl font-bold text-white mb-1">{stat.value}</Div>
                    <Div devId="noID" className="text-white/80 font-medium">{stat.label}</Div>
                  </CardContent>
                </Card>
              ))}
            </Div>
          </Section>
        </Container>

        {/* Features Section */}
        <Container componentId="features-section">
          <Section devId="noID" className="container mx-auto px-4 py-20">
            <Div devId="noID" className="text-center mb-16">
              <Div devId="noID" className="text-5xl mb-4">🎨✨🎪</Div>
              <H2 devId="noID" className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
                Amazing Features Just for You!
              </H2>
              <P devId="noID" className="text-white/90 max-w-2xl mx-auto text-lg">
                Discover all the cool things you can do with KidsTodo! 🌟
              </P>
            </Div>
            <Div devId="noID" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card 
                  key={index} 
                  devId={getFeatureCardId(index)}
                  devName={`${feature.title} Feature Card`}
                  devDescription={`Feature card for ${feature.title}: ${feature.description}`}
                  className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <CardContent devId="noID" className="p-0">
                    <Div devId="noID" className="text-4xl mb-4 text-center">{feature.emoji}</Div>
                    <h3 className="text-xl font-bold text-white mb-3 text-center">{feature.title}</h3>
                    <P devId="noID" className="text-white/80 text-center leading-relaxed">{feature.description}</P>
                  </CardContent>
                </Card>
              ))}
            </Div>
          </Section>
        </Container>

        {/* Benefits Section */}
        <Container componentId="noID">
          <Section devId="noID" className="container mx-auto px-4 py-20">
            <Div devId="noID" className="text-center mb-16">
              <Div devId="noID" className="text-5xl mb-4">🎁🌈🎊</Div>
              <H2 devId="noID" className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
                Why Kids Love KidsTodo!
              </H2>
              <P devId="noID" className="text-white/90 max-w-2xl mx-auto text-lg">
                Here's what makes our app super special and fun to use every day! 💫
              </P>
            </Div>
            <Div devId="noID" className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <Card 
                  key={index} 
                  devId={getBenefitCardId(index)}
                  devName={`${benefit.title} Benefit Card`}
                  devDescription={`Benefit card explaining ${benefit.title}: ${benefit.description}`}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all shadow-lg hover:shadow-xl"
                >
                  <CardContent devId="noID" className="p-0">
                    <Div devId="noID" className="flex items-center mb-4">
                      <Div devId="noID" className="text-4xl mr-4">{benefit.emoji}</Div>
                      <h3 className="text-2xl font-bold text-white">{benefit.title}</h3>
                    </Div>
                    <P devId="noID" className="text-white/80 text-lg leading-relaxed">{benefit.description}</P>
                  </CardContent>
                </Card>
              ))}
            </Div>
          </Section>
        </Container>

        {/* Sample Tasks Preview */}
        <Container componentId="noID">
          <Section devId="noID" className="container mx-auto px-4 py-20">
            <Div devId="noID" className="text-center mb-16">
              <Div devId="noID" className="text-5xl mb-4">👀📱✨</Div>
              <H2 devId="noID" className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
                See How It Works!
              </H2>
              <P devId="noID" className="text-white/90 max-w-2xl mx-auto text-lg">
                Here's what your task list might look like! 🎯
              </P>
            </Div>
            <Div devId="noID" className="max-w-md mx-auto">
              <Card devId="noID" devName="Sample Task Card" devDescription="Preview of how tasks look in the app" className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl">
                <CardContent devId="noID" className="p-0">
                  <Div devId="noID" className="space-y-4">
                    <Div devId="noID" className="flex items-center p-3 bg-green-400/20 rounded-xl border border-green-400/30">
                      <Div devId="noID" className="text-2xl mr-3">✅</Div>
                      <Div devId="noID" className="flex-1">
                        <Div devId="noID" className="text-white font-medium line-through">Brush my teeth</Div>
                        <Div devId="noID" className="text-green-300 text-sm">Completed! +10 stars ⭐</Div>
                      </Div>
                    </Div>
                    <Div devId="noID" className="flex items-center p-3 bg-blue-400/20 rounded-xl border border-blue-400/30">
                      <Div devId="noID" className="text-2xl mr-3">📚</Div>
                      <Div devId="noID" className="flex-1">
                        <Div devId="noID" className="text-white font-medium">Do homework</Div>
                        <Div devId="noID" className="text-blue-300 text-sm">School • Due today</Div>
                      </Div>
                    </Div>
                    <Div devId="noID" className="flex items-center p-3 bg-pink-400/20 rounded-xl border border-pink-400/30">
                      <Div devId="noID" className="text-2xl mr-3">🎮</Div>
                      <Div devId="noID" className="flex-1">
                        <Div devId="noID" className="text-white font-medium">Play outside</Div>
                        <Div devId="noID" className="text-pink-300 text-sm">Fun • 30 minutes</Div>
                      </Div>
                    </Div>
                  </Div>
                </CardContent>
              </Card>
            </Div>
          </Section>
        </Container>

        {/* CTA Section */}
        <Container componentId="cta-section">
          <Section devId="noID" className="container mx-auto px-4 py-20">
            <Div devId="noID" className="bg-gradient-to-r from-yellow-400/20 via-pink-500/20 to-purple-600/20 rounded-3xl p-12 text-center border border-white/20 shadow-2xl">
              <Div devId="noID" className="text-6xl mb-6">🚀🌟🎉</Div>
              <H2 devId="noID" className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
                Ready to Start Your Adventure?
              </H2>
              <P devId="noID" className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
                Join thousands of kids who are having fun while getting their tasks done! 
                Start your journey today and become a task-completing superhero! 🦸‍♀️🦸‍♂️
              </P>
              <Div devId="noID" className="flex flex-col sm:flex-row gap-4 justify-center">
                {isAuthenticated ? (
                  <Link to="/dashboard">
                    <Button 
                      devId="noID"
                      devName="Start Adventure Button"
                      devDescription="Primary CTA button to start using the app"
                      className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 hover:from-green-500 hover:via-blue-600 hover:to-purple-700 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl transform hover:scale-105 transition-all"
                    >
                      🎯 Go to My Tasks!
                    </Button>
                  </Link>
                ) : (
                  <Link to="/register">
                    <Button 
                      devId="noID"
                      devName="Start Adventure Button"
                      devDescription="Primary CTA button to start using the app"
                      className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 hover:from-green-500 hover:via-blue-600 hover:to-purple-700 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl transform hover:scale-105 transition-all"
                    >
                      🚀 Start My Adventure!
                    </Button>
                  </Link>
                )}
                <Button 
                  devId="noID"
                  devName="Tell Parents Button"
                  devDescription="Secondary CTA button for parental involvement"
                  className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/30 px-10 py-4 rounded-full font-bold text-lg transition-all"
                >
                  👨‍👩‍👧‍👦 Tell My Parents!
                </Button>
              </Div>
            </Div>
          </Section>
        </Container>

        {/* Footer */}
        <Footer 
          devId="main-footer" 
          devName="Main Footer" 
          devDescription="Cute footer with kid-friendly links"
          className="container mx-auto px-4 py-8 border-t border-white/20"
        >
          <Div devId="noID" className="flex flex-col md:flex-row justify-between items-center">
            <Div devId="noID" className="text-white/80 mb-4 md:mb-0 text-center md:text-left">
              © 2024 KidsTodo ✨ Made with 💖 for amazing kids everywhere!
            </Div>
            <Div devId="noID" className="flex space-x-6">
              <a href="#" className="text-white/80 hover:text-white transition-colors font-medium">🛡️ Safety</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors font-medium">👨‍👩‍👧‍👦 Parents</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors font-medium">❓ Help</a>
            </Div>
          </Div>
        </Footer>
      </Div>
    </Container>
  );
};