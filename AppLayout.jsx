import Navbar from './Navbar';
import Footer from './Footer';

/**
 * AppLayout — root shell for all pages.
 * Wraps page content between a persistent Navbar and Footer.
 */
export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
