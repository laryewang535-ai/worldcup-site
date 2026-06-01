import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How this informational hub handles analytics placeholders, affiliate clicks, and minimal personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
      <article className="prose prose-slate max-w-3xl dark:prose-invert">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Privacy Policy</h1>
        <p className="text-sm text-slate-500">Last updated: May 13, 2026</p>

        <h2>Overview</h2>
        <p>
          This website is an informational resource about the 2026 finals schedule, standings, and neutral
          editorial content. We do not operate user accounts. We do not sell personal information.
        </p>

        <h2>Information we collect</h2>
        <p>
          Depending on how you deploy the site, infrastructure providers (such as Vercel) may log routine
          technical data like IP addresses, user agents, and timestamps for security and reliability. We do
          not operate a first-party database in this template build.
        </p>

        <h2>Cookies and similar technologies</h2>
        <p>
          If you enable advertising tools such as Google AdSense, those vendors may set cookies or use
          similar technologies according to their own policies. You should disclose those integrations when you
          wire them in production.
        </p>

        <h2>Affiliate links</h2>
        <p>
          Product links may include affiliate tracking parameters. Purchases may generate a commission at no
          additional cost to you.
        </p>

        <h2>Children</h2>
        <p>
          This site is intended for a general audience. If you add remarketing or personalized ads, ensure
          compliance with applicable regulations.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy can be routed through the{" "}
          <a className="text-brand-accent hover:underline" href="/contact">
            contact page
          </a>
          .
        </p>
      </article>
    </div>
  );
}
