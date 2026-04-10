import React from 'react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="selection:bg-primary selection:text-on-primary bg-background min-h-screen text-on-surface font-body">
      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-50 bg-[#0a0e14]/40 backdrop-blur-xl border-b border-[#20262f]/15 shadow-[0_0_40px_rgba(0,209,255,0.1)]">
        <nav className="flex justify-between items-center px-8 py-4 w-full max-w-7xl mx-auto font-['Inter'] tracking-tight">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-[#69daff] to-[#00cffc] bg-clip-text text-transparent">
            DAKH EDU SOLUTIONS
          </Link>
        </nav>
      </header>

      <main className="pt-32 pb-20 px-6 md:px-8 max-w-7xl mx-auto">
        {/* Hero Header */}
        <section className="text-center mb-24">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-widest uppercase">
            Privacy Policy
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-on-surface">
            Privacy <span className="text-primary">Policy</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Your privacy is important to us at DAKH EDU SOLUTIONS. Learn how we protect and manage your dimensional data.
          </p>
        </section>

        {/* Bento Layout for Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Side Navigation Links (Desktop) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-40 h-fit">
            <nav className="space-y-4">
              <a className="block text-primary font-medium hover:translate-x-2 transition-transform" href="#introduction">1. Introduction</a>
              <a className="block text-on-surface-variant hover:text-primary transition-colors" href="#collection">2. Information We Collect</a>
              <a className="block text-on-surface-variant hover:text-primary transition-colors" href="#usage">3. How We Use Information</a>
              <a className="block text-on-surface-variant hover:text-primary transition-colors" href="#sharing">4. Data Sharing Policy</a>
              <a className="block text-on-surface-variant hover:text-primary transition-colors" href="#cookies">5. Cookies Policy</a>
              <a className="block text-on-surface-variant hover:text-primary transition-colors" href="#security">6. Data Security</a>
              <a className="block text-on-surface-variant hover:text-primary transition-colors" href="#rights">7. User Rights</a>
              <a className="block text-on-surface-variant hover:text-primary transition-colors" href="#third-party">8. Third-Party Services</a>
              <a className="block text-on-surface-variant hover:text-primary transition-colors" href="#children">9. Children’s Privacy</a>
              <a className="block text-on-surface-variant hover:text-primary transition-colors" href="#updates">10. Policy Updates</a>
              <a className="block text-on-surface-variant hover:text-primary transition-colors" href="#contact">11. Contact Info</a>
            </nav>
          </aside>

          {/* Main Content Panels */}
          <div className="lg:col-span-9 space-y-12">
            {/* Introduction */}
            <article className="glass-panel p-8 md:p-12 rounded-xl border border-outline-variant/10 shadow-[0_0_40px_rgba(0,209,255,0.05)]" id="introduction">
              <div className="flex items-center gap-4 mb-6">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
                <h2 className="text-2xl font-bold">1. Introduction</h2>
              </div>
              <p className="text-on-surface-variant leading-relaxed mb-6">
                Welcome to DAKH EDU SOLUTIONS ("the Platform," "we," "us," or "our"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy describes how we collect, use, and share information across our educational ecosystem.
              </p>
              <p className="text-on-surface-variant leading-relaxed">
                By accessing or using our services, you signify that you have read, understood, and agree to our collection, storage, use, and disclosure of your personal information as described in this Privacy Policy.
              </p>
            </article>

            {/* Information We Collect */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="collection">
              <article className="glass-panel p-8 rounded-xl border border-outline-variant/10 hover:border-primary/30 transition-all group">
                <h2 className="text-xl font-bold mb-4">2. Information We Collect</h2>
                <ul className="space-y-3 text-on-surface-variant text-sm">
                  <li className="flex items-start gap-2"><span className="text-primary">•</span> Personal Identifiers: Name, email, and contact details.</li>
                  <li className="flex items-start gap-2"><span className="text-primary">•</span> Academic Progress: Quiz results, course completion, and activity logs.</li>
                  <li className="flex items-start gap-2"><span className="text-primary">•</span> Technical Data: IP addresses, browser types, and device information.</li>
                </ul>
              </article>
              <article className="glass-panel p-8 rounded-xl border border-outline-variant/10 hover:border-secondary/30 transition-all group" id="usage">
                <h2 className="text-xl font-bold mb-4">3. How We Use Information</h2>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  We utilize your data to personalize your learning journey, provide technical support, and continuously improve our curriculum algorithms. We may also use non-identifying data for platform-wide analytics and trend forecasting.
                </p>
              </article>
            </div>

            {/* Data Sharing & Cookies */}
            <article className="glass-panel p-8 md:p-12 rounded-xl border border-outline-variant/10" id="sharing">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-6">4. Data Sharing Policy</h2>
                  <p className="text-on-surface-variant leading-relaxed">
                    We do not sell your personal data. We only share information with trusted partners who assist us in operating our platform, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
                  </p>
                </div>
                <div className="flex-1" id="cookies">
                  <h2 className="text-2xl font-bold mb-6">5. Cookies Policy</h2>
                  <p className="text-on-surface-variant leading-relaxed">
                    Our platform uses "cookies" to enhance user experience. These small text files help us remember your preferences and keep you logged in. You can choose to disable cookies through your browser settings, though some platform features may not function correctly.
                  </p>
                </div>
              </div>
            </article>

            {/* Data Security & User Rights */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <article className="md:col-span-7 glass-panel p-8 rounded-xl border border-outline-variant/10 bg-gradient-to-br from-surface-container-high to-surface-dim" id="security">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">verified_user</span>
                  6. Data Security
                </h2>
                <p className="text-on-surface-variant leading-relaxed mb-4">
                  We implement a variety of security measures to maintain the safety of your personal information. We use industry-standard encryption (SSL/TLS) for data in transit and robust firewall protections for data at rest.
                </p>
                <div className="p-4 bg-surface-container-lowest rounded-lg border border-outline-variant/10">
                  <p className="text-xs text-secondary italic">"Our commitment to security ensures that your educational assets remain private and protected within our dimensional laboratory."</p>
                </div>
              </article>
              <article className="md:col-span-5 glass-panel p-8 rounded-xl border border-outline-variant/10" id="rights">
                <h2 className="text-2xl font-bold mb-6">7. User Rights</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/20 text-primary p-2 rounded-full"><span className="material-symbols-outlined text-sm">edit</span></div>
                    <span className="text-sm font-medium">Edit your profile anytime</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-tertiary/20 text-tertiary p-2 rounded-full"><span className="material-symbols-outlined text-sm">delete</span></div>
                    <span className="text-sm font-medium">Request account deletion</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-secondary/20 text-secondary p-2 rounded-full"><span className="material-symbols-outlined text-sm">download</span></div>
                    <span className="text-sm font-medium">Export your personal data</span>
                  </div>
                </div>
              </article>
            </div>

            {/* Third-Party & Children */}
            <article className="glass-panel p-8 md:p-12 rounded-xl border border-outline-variant/10" id="third-party">
              <h2 className="text-2xl font-bold mb-8">8. Third-Party Services</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 rounded-lg bg-surface-container-low border border-outline-variant/5">
                  <p className="text-xs font-bold text-on-surface uppercase tracking-widest mb-1">Database</p>
                  <p className="text-primary font-headline">Supabase</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-surface-container-low border border-outline-variant/5">
                  <p className="text-xs font-bold text-on-surface uppercase tracking-widest mb-1">Payments</p>
                  <p className="text-primary font-headline">Stripe</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-surface-container-low border border-outline-variant/5">
                  <p className="text-xs font-bold text-on-surface uppercase tracking-widest mb-1">Analytics</p>
                  <p className="text-primary font-headline">GA4</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-surface-container-low border border-outline-variant/5">
                  <p className="text-xs font-bold text-on-surface uppercase tracking-widest mb-1">Hosting</p>
                  <p className="text-primary font-headline">Vercel</p>
                </div>
              </div>
              <p className="mt-8 text-sm text-on-surface-variant leading-relaxed">
                We leverage these high-tier providers to ensure stability and performance. Each provider maintains their own strict compliance standards (GDPR, SOC2).
              </p>
            </article>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Children's Privacy */}
              <article className="glass-panel p-8 rounded-xl border border-outline-variant/10" id="children">
                <h2 className="text-xl font-bold mb-4">9. Children’s Privacy</h2>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  DAKH EDU SOLUTIONS does not knowingly collect any personal identifiable information from children under the age of 13. If you think that your child provided this kind of information on our website, please contact us immediately.
                </p>
              </article>
              {/* Policy Updates */}
              <article className="glass-panel p-8 rounded-xl border border-outline-variant/10" id="updates">
                <h2 className="text-xl font-bold mb-4">10. Policy Updates</h2>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "last updated" date at the top.
                </p>
              </article>
            </div>

            {/* Contact Information */}
            <article className="glass-panel p-8 md:p-12 rounded-xl border-2 border-primary/20 bg-primary/5 text-center" id="contact">
              <h2 className="text-2xl font-black mb-4">11. Contact Information</h2>
              <p className="text-on-surface-variant mb-8">Have questions about your data? Reach out to our dedicated privacy team through the following channels:</p>
              <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                <a className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-on-primary font-black rounded-full hover:scale-105 active:scale-95 transition-transform shadow-[0_0_20px_rgba(105,218,255,0.4)]" href="mailto:dakhedusolution@gmail.com">
                  <span className="material-symbols-outlined">mail</span>
                  dakhedusolution@gmail.com
                </a>
                <a className="inline-flex items-center gap-3 px-8 py-4 border-2 border-primary/30 text-primary font-black rounded-full hover:scale-105 active:scale-95 transition-transform" href="https://wa.me/918667399640">
                  <span className="material-symbols-outlined">chat</span>
                  WhatsApp: +91 8667399640
                </a>
              </div>
            </article>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 mt-20 bg-[#0a0e14] border-t border-[#20262f]/15">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto space-y-8 md:space-y-0 text-center md:text-left">
          <div className="text-lg font-black text-[#00D1FF]">
            DAKH EDU SOLUTIONS
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <Link className="text-sm font-['Inter'] text-[#00D1FF] hover:text-[#ffffff] transition-colors hover:translate-y-[-2px]" to="/privacy-policy">Privacy Policy</Link>
            <a className="text-sm font-['Inter'] text-[#ffffff]/50 hover:text-[#ffffff] transition-colors hover:translate-y-[-2px]" href="#">Terms of Service</a>
            <a className="text-sm font-['Inter'] text-[#ffffff]/50 hover:text-[#ffffff] transition-colors hover:translate-y-[-2px]" href="#">Security</a>
            <a className="text-sm font-['Inter'] text-[#ffffff]/50 hover:text-[#ffffff] transition-colors hover:translate-y-[-2px]" href="#">Contact</a>
          </div>
          <p className="text-sm font-['Inter'] text-[#ffffff]/50">
            © 2024 DAKH EDU SOLUTIONS. Dimensional Intelligence.
          </p>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .glass-panel {
            background: rgba(32, 38, 47, 0.4);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
        }
      ` }} />
    </div>
  );
}
