"use client";

import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
  hideHeader?: boolean;
}

export default function AppLayout({ children, hideHeader = false }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {!hideHeader && (
        <header className="border-b border-[var(--line)]/60 bg-[var(--bg)]/80 backdrop-blur-sm sticky top-0 z-30 no-print">
          <div className="max-w-3xl mx-auto px-5 py-4 flex items-center justify-between">
            <div className="flex items-baseline gap-2.5">
              <span className="font-display text-lg leading-none text-[var(--ink)]">
                Silent Success Society
              </span>
              <span className="text-[10px] tracking-[0.18em] uppercase text-[var(--ink-muted)] hidden sm:inline">
                Initiation Guide
              </span>
            </div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--ink-muted)]">
              v.01
            </div>
          </div>
        </header>
      )}
      <main className="animate-fade-in">{children}</main>
      <footer className="max-w-3xl mx-auto px-5 py-10 text-center text-xs text-[var(--ink-soft)] no-print">
        <p>
          이 진단은 신상을 묻지 않습니다. 답변은 기본적으로 사용자의 브라우저에만 저장됩니다.
        </p>
      </footer>
    </div>
  );
}
