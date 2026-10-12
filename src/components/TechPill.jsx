export default function TechPill({ name, type }) {
  const renderIcon = () => {
    switch (type) {
      case 'next':
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.632 17.518L9.227 7.027H7.135v9.945h1.722v-7.46l7.357 9.421a10.05 10.05 0 0 1-1.42 1.415l-.962-.83z" />
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
      case 'mongo':
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#16a34a">
            <path d="M12 1.5s-4.5 4-4.5 10.5c0 5 3.5 9 4.5 10.5 1-1.5 4.5-5.5 4.5-10.5 0-6.5-4.5-10.5-4.5-10.5zm0 18.5c-.7-1.3-3-4.5-3-8.5 0-4.2 2.5-7.4 3-8 0 0 .1.1.1.2v16.3h-.1z" />
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
