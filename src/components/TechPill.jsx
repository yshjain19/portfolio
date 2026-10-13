export default function TechPill({ name, type }) {
  const renderIcon = () => {
    switch (type) {
      case 'next':
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.632 17.518L9.227 7.027H7.135v9.945h1.722v-7.46l7.357 9.421a10.05 10.05 0 0 1-1.42 1.415l-.962-.83z" />
          </svg>
        );
      case 'js':
      case 'javascript':
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#f7df1e">
            <rect width="24" height="24" rx="3" fill="#f7df1e" />
            <path d="M6 18.5c1.2 0 2-.6 2-1.9V10h1.8v6.6c0 2.2-1.4 3.4-3.8 3.4-1.2 0-2.3-.4-3-1l.9-1.5c.6.5 1.3.8 2.1.8zm7.5-.2c.7.4 1.7.7 2.7.7 1.4 0 2.3-.7 2.3-1.8 0-1-.6-1.5-2.2-2.1-2.1-.8-3.2-1.8-3.2-3.4 0-2 1.6-3.4 4-3.4 1.2 0 2.2.3 2.8.7l-.8 1.5c-.5-.3-1.2-.6-2-.6-1.3 0-2.1.7-2.1 1.6 0 .9.6 1.4 2.1 2 2.2.8 3.3 1.8 3.3 3.5 0 2.1-1.6 3.6-4.3 3.6-1.4 0-2.6-.4-3.4-.9l.8-1.5z" fill="#000" />
          </svg>
        );
      case 'react':
        return (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2">
            <circle cx="12" cy="12" r="2.5" fill="#38bdf8"></circle>
            <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(0 12 12)"></ellipse>
            <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)"></ellipse>
            <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)"></ellipse>
          </svg>
        );
      case 'node':
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#22c55e">
            <path d="M12 2l9 5.2v10.4L12 22l-9-5.2V7.2L12 2zm0 2.3L4.8 8.5v7l7.2 4.2 7.2-4.2v-7L12 4.3z" />
          </svg>
        );
      case 'express':
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        );
      case 'mongo':
      case 'mongodb':
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#16a34a">
            <path d="M12 1.5s-4.5 4-4.5 10.5c0 5 3.5 9 4.5 10.5 1-1.5 4.5-5.5 4.5-10.5 0-6.5-4.5-10.5-4.5-10.5zm0 18.5c-.7-1.3-3-4.5-3-8.5 0-4.2 2.5-7.4 3-8 0 0 .1.1.1.2v16.3h-.1z" />
          </svg>
        );
      case 'html':
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#f97316">
            <path d="M3 2l1.8 20.2L12 24l7.2-1.8L21 2H3zm14.8 5.7h-7.6l.2 2.3h7.1l-.7 7.6-4.8 1.3-4.8-1.3-.3-3.6h2.2l.2 1.8 2.7.7 2.7-.7.3-3.5H7.7l-.7-6.9h11.1l-.3 2.3z" />
          </svg>
        );
      case 'css':
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#38bdf8">
            <path d="M3 2l1.8 20.2L12 24l7.2-1.8L21 2H3zm14.8 5.7h-7.6l.2 2.3h7.1l-.7 7.6-4.8 1.3-4.8-1.3-.3-3.6h2.2l.2 1.8 2.7.7 2.7-.7.3-3.5H7.7l-.7-6.9h11.1l-.3 2.3z" />
          </svg>
        );
      case 'bootstrap':
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#a855f7">
            <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm4.8 4v10h4.4c2.2 0 3.8-1.1 3.8-2.9 0-1.2-.7-2.1-1.8-2.5 1-.4 1.5-1.3 1.5-2.3 0-1.6-1.3-2.3-3.4-2.3H8.8zm2.4 1.9h1.7c1 0 1.6.4 1.6 1.1 0 .8-.7 1.2-1.7 1.2h-1.6V8.9zm0 4.1h2c1.1 0 1.8.4 1.8 1.3 0 .9-.8 1.4-1.9 1.4h-1.9V13z" />
          </svg>
        );
      case 'api':
      case 'rest':
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        );
      case 'cpp':
        return (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="#3b82f6">
            <path d="M11 4C6.58 4 3 7.58 3 12s3.58 8 8 8c3.92 0 7.19-2.82 7.84-6.53h-2.58C15.68 15.66 13.56 17.5 11 17.5c-3.04 0-5.5-2.46-5.5-5.5s2.46-5.5 5.5-5.5c2.56 0 4.68 1.84 5.26 4.03h2.58C18.19 6.82 14.92 4 11 4zm8 7v-2h-1.5v2H16v1.5h1.5v2H19v-2h1.5V11H19zm4 0v-2h-1.5v2H20v1.5h1.5v2H23v-2h1.5V11H23z" />
          </svg>
        );
      case 'github':
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <span className="inline-tech-badge">
      <span className="inline-tech-badge__icon">{renderIcon()}</span>
      <span className="inline-tech-badge__text">{name}</span>
    </span>
  );
}
