import React from 'react';

export const CodeforcesIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        role="img"
        aria-label="Codeforces"
    >
        <rect x="1.5" y="9" width="4.5" height="12" rx="1.5" fill="#C1C1C1" className="group-hover:fill-[#FFD700] transition-colors" /> {/* Dynamic color handled in parent or here? standard is bars */}
        {/* Correct Codeforces Brand Colors */}
        <rect x="1.5" y="12" width="6" height="12" fill="#445f9d" />
        <rect x="9" y="6" width="6" height="18" fill="#1f8dd6" />
        <rect x="16.5" y="1.5" width="6" height="22.5" fill="#bb2e29" />
    </svg>
);

export const CodeforcesLogo = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M4.5 7.5C5.32843 7.5 6 8.17157 6 9V21C6 21.8284 5.32843 22.5 4.5 22.5C3.67157 22.5 3 21.8284 3 21V9C3 8.17157 3.67157 7.5 4.5 7.5Z" fill="#F44336" />
        <path d="M12 4.5C12.8284 4.5 13.5 5.17157 13.5 6V21C13.5 21.8284 12.8284 22.5 12 22.5C11.1716 22.5 10.5 21.8284 10.5 21V6C10.5 5.17157 11.1716 4.5 12 4.5Z" fill="#2196F3" />
        <path d="M19.5 0C20.3284 0 21 0.671573 21 1.5V21C21 21.8284 20.3284 22.5 19.5 22.5C18.6716 22.5 18 21.8284 18 21V1.5C18 0.671573 18.6716 0 19.5 0Z" fill="#FFC107" />
    </svg>
)

// Easier to use a simple path for Codeforces bars
export const CodeforcesBrandIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
        <path fill="#FFC107" d="M18 1.5c.83 0 1.5.67 1.5 1.5v18c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5v-18c0-.83.67-1.5 1.5-1.5z" />
        <path fill="#2196F3" d="M12 6c.83 0 1.5.67 1.5 1.5v15c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5v-15c0-.83.67-1.5 1.5-1.5z" />
        <path fill="#F44336" d="M6 10.5c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5v-9c0-.83.67-1.5 1.5-1.5z" />
    </svg>
);

export const LeetCodeBrandIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fill="#FFA116" d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
);
