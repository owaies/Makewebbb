import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { PageTransition } from './components/PageTransition';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { WorkPage } from './pages/WorkPage';
import { TeamPage } from './pages/TeamPage';
import { ContactPage } from './pages/ContactPage';

function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-5xl flex-col items-center justify-center px-5 py-24 text-center" aria-labelledby="not-found-title">
      <p className="font-mono text-sm uppercase tracking-widest text-primary">404 · Page not found</p>
      <h1 id="not-found-title" className="mt-4 text-4xl font-semibold tracking-tight">This page doesn’t exist.</h1>
      <p className="mt-4 max-w-lg text-muted-foreground">The address may be incorrect, or the page may have moved.</p>
      <Link to="/" className="mt-8 inline-flex rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80">
        Return home
      </Link>
    </main>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <PageTransition transitionKey={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </PageTransition>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <CustomCursor />
        <div className="relative flex min-h-screen flex-col bg-background text-foreground antialiased selection:bg-primary/30 selection:text-primary transition-colors duration-300">
          <Navigation />
          <div className="flex-1 flex flex-col">
            <AnimatedRoutes />
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
