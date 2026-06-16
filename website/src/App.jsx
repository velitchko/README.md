import { useState, useEffect } from 'react';
import { Github, Sun, Moon, Linkedin, User, BookOpen, FileText, Copy, Check } from 'lucide-react';
import './index.css';

function App() {
  const [theme, setTheme] = useState('dark');
  const [copied, setCopied] = useState(false);

  const bibtex = `@inproceedings{filipov2026readme,
  booktitle = {EuroVis 2026 - Panels and Tutorials},
  editor    = {Sedlmair, Michael and Hoellt, Thomas and van den Elzen, Stef},
  title     = {{README.md: A Tutorial on Reproducible Visualization Research}},
  author    = {Filipov, Velitchko and Isenberg, Tobias and Lex, Alexander},
  year      = {2026},
  publisher = {The Eurographics Association},
  ISBN      = {978-3-03868-304-9},
  DOI       = {10.2312/evt.20261000}
}`;

  const highlightBibtex = (text) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      const isLast = i === lines.length - 1;
      const nl = isLast ? null : '\n';

      // @type{key,
      const entryMatch = line.match(/^(@\w+)(\{)(.+?)(,?)$/);
      if (entryMatch) {
        return (
          <span key={i}>
            <span className="bib-type">{entryMatch[1]}</span>
            <span className="bib-punct">{entryMatch[2]}</span>
            <span className="bib-entrykey">{entryMatch[3]}</span>
            <span className="bib-punct">{entryMatch[4]}</span>
            {nl}
          </span>
        );
      }

      // Closing brace
      if (line.trim() === '}') {
        return <span key={i}><span className="bib-punct">{'}'}</span>{nl}</span>;
      }

      // field = {value},
      const fieldMatch = line.match(/^(\s*)(\w+)(\s*=\s*)(\{.*\})(,?)$/);
      if (fieldMatch) {
        return (
          <span key={i}>
            {fieldMatch[1]}
            <span className="bib-field">{fieldMatch[2]}</span>
            <span className="bib-punct">{fieldMatch[3]}</span>
            <span className="bib-value">{fieldMatch[4]}</span>
            <span className="bib-punct">{fieldMatch[5]}</span>
            {nl}
          </span>
        );
      }

      return <span key={i}>{line}{nl}</span>;
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(bibtex).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <a href="#" className="logo">
            <span>README</span><span>.md</span>
          </a>
          <div className="header-right">
            <nav className="nav">
              <a href="#about">About</a>
              <a href="#schedule">Schedule</a>
              <a href="#organizers">Organizers</a>
              <a href="#resources">Resources</a>
            </nav>
            <button 
              className="theme-toggle" 
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-badge">Tutorial</div>
          <h1>
            <code>README.md</code>
          </h1>
          <p className="hero-title">
            A Tutorial on Reproducible Visualization Research
          </p>
          <p className="hero-subtitle">
            Practical guidance and resources for creating reproducible visualization research from the start.
          </p>
          <div className="event-details">
            <strong>EuroVis 2026</strong> · Nottingham, UK · Friday, 12 June · 09:00 · Room G1
          </div>
        </section>

        <section id="about">
          <h2><span className="section-mark">#</span> About</h2>
          <p>
            Reproducibility is fundamental to scientific progress, yet most published visualization 
            research remains difficult or impossible to reproduce. This 100-minute tutorial provides 
            practical guidance on creating reproducible research from the start.
          </p>
          <p>
            We cover reproducibility challenges across software artifacts, empirical studies, and the 
            research process itself. Participants will learn workflows for version control, documentation, 
            dependency management, and gain exposure to the GRSI certification process and reVISit 2 
            framework for study replication.
          </p>
        </section>

        <section id="schedule">
          <h2><span className="section-mark">#</span> Schedule</h2>
          
          <div className="schedule-intro">
            <p>The tutorial is structured in three parts with interactive polling, live demonstrations, 
            and open discussion.</p>
            <p className="schedule-note">* Times are preliminary and may change</p>
          </div>

          <table className="schedule-table">
            <tbody>
              <tr>
                <td className="schedule-time">9:00–9:05</td>
                <td className="schedule-event">Welcome & Introduction</td>
              </tr>
              <tr>
                <td className="schedule-time">9:05–9:25</td>
                <td className="schedule-event">
                  <strong>Part I: Why Reproducibility Matters?</strong>
                  <ul className="schedule-bullets">
                    <li>The cost of irreproducibility</li>
                    <li>Reproducibility vs. replicability</li>
                    <li>Five core aspects: version control, documentation, dependencies, LLM/AI, deployment</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="schedule-time">9:25–9:45</td>
                <td className="schedule-event">
                  <strong>Part II: How to Approach Reproducible Research</strong>
                  <ul className="schedule-bullets">
                    <li>GRSI certification process</li>
                    <li>Archival platforms and pre-registration</li>
                    <li>Making reproducibility easy for reviewers</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="schedule-time">9:45–10:05</td>
                <td className="schedule-event">
                  <strong>Part III: Replicating Studies</strong>
                  <ul className="schedule-bullets">
                    <li>Replicability in perceptual studies</li>
                    <li>Provenance tracking</li>
                    <li>Live walkthrough: reVISit 2 framework</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="schedule-time">10:05–10:20</td>
                <td className="schedule-event">Discussion (Q&A)</td>
              </tr>
              <tr>
                <td className="schedule-time">10:20–10:25</td>
                <td className="schedule-event">Comments & Closing</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section id="organizers">
          <h2><span className="section-mark">#</span> Organizers</h2>
          <div className="organizers-list">
            <div className="organizer">
              <div>
                <a href="https://orcid.org/0000-0001-9592-2179" target="_blank" rel="noopener noreferrer" className="organizer-name">
                  Velitchko Filipov
                </a>
                <div className="organizer-affiliation">TU Wien, Austria</div>
                <div className="organizer-links">
                  <a href="https://orcid.org/0000-0001-9592-2179" target="_blank" rel="noopener noreferrer" className="organizer-link">
                    <User size={14} /> 0000-0001-9592-2179
                  </a>
                  <a href="https://www.linkedin.com/in/velitchko-filipov/" target="_blank" rel="noopener noreferrer" className="organizer-link">
                    <Linkedin size={14} /> LinkedIn
                  </a>
                </div>
              </div>
            </div>
            
            <div className="organizer">
              <div>
                <a href="https://orcid.org/0000-0001-7953-8644" target="_blank" rel="noopener noreferrer" className="organizer-name">
                  Tobias Isenberg
                </a>
                <div className="organizer-affiliation">Université Paris-Saclay, CNRS, Inria, LISN, France</div>
                <div className="organizer-links">
                  <a href="https://orcid.org/0000-0001-7953-8644" target="_blank" rel="noopener noreferrer" className="organizer-link">
                    <User size={14} /> 0000-0001-7953-8644
                  </a>
                  <a href="https://www.linkedin.com/in/tobiasisenberg/" target="_blank" rel="noopener noreferrer" className="organizer-link">
                    <Linkedin size={14} /> LinkedIn
                  </a>
                </div>
              </div>
            </div>
            
            <div className="organizer">
              <div>
                <a href="https://orcid.org/0000-0001-6930-5468" target="_blank" rel="noopener noreferrer" className="organizer-name">
                  Alexander Lex
                </a>
                <div className="organizer-affiliation">TU Graz, Austria & University of Utah, USA</div>
                <div className="organizer-links">
                  <a href="https://orcid.org/0000-0001-6930-5468" target="_blank" rel="noopener noreferrer" className="organizer-link">
                    <User size={14} /> 0000-0001-6930-5468
                  </a>
                  <a href="https://www.linkedin.com/in/alexander-lex-83961533/" target="_blank" rel="noopener noreferrer" className="organizer-link">
                    <Linkedin size={14} /> LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="resources" className="resources-section">
          <h2><span className="section-mark">#</span> Resources</h2>
          <p>
            All materials—templates, checklists, guides, and example projects—are available in our 
            GitHub repository.
          </p>
          <div className="resources-buttons">
            <a
              href="https://github.com/velitchko/README.md"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              <Github size={18} />
              <span className="btn-label">Repository</span>
            </a>
            <a
              href="https://diglib.eg.org/items/9f2385fa-db96-42f7-9f64-f6c914dac274"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-paper"
            >
              <FileText size={18} />
              <span className="btn-label">Paper</span>
            </a>
            <a
              href="https://velitchko.github.io/blog/readme-2026"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-blog"
            >
              <BookOpen size={18} />
              <span className="btn-label">Read more...</span>
            </a>
          </div>

          <div className="bibtex-block">
            <div className="bibtex-header">
              <span className="bibtex-label">BibTeX Citation</span>
              <button className="bibtex-copy" onClick={handleCopy} aria-label="Copy BibTeX">
                {copied ? <Check size={15} /> : <Copy size={15} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="bibtex-code"><code className="bibtex-highlighted">{highlightBibtex(bibtex)}</code></pre>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
