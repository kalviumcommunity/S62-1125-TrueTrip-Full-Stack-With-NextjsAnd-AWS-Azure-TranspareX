// components/PageWrapper.tsx
import React from "react";

type PageWrapperProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function PageWrapper({
  title,
  subtitle,
  children,
}: PageWrapperProps) {
  return (
    <section className="flex justify-center">
      <div className="w-full max-w-4xl bg-white/95 border border-pink-100 rounded-3xl shadow-sm px-6 py-6 md:px-8 md:py-8 space-y-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1">{title}</h1>
          {subtitle && (
            <p className="text-sm md:text-base text-slate-600">{subtitle}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
