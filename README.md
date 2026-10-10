# TechFaizan Portfolio

A light, responsive portfolio and private content studio for Faizan Ahmed Syed. The public site presents projects as detailed case studies and includes research, certifications, events, education, experience, updates, club activity, contact details, and a downloadable resume. The private `/admin` route manages all content and media without code changes.

## Technology

- Next.js 16, React 19, and TypeScript
- Framer Motion for restrained, accessible animation
- Supabase Auth, Postgres, and Storage for the CMS
- Resend-compatible contact delivery with a safe email fallback
- Vercel deployment with Cloudflare-managed DNS

## Run locally

```bash
npm install
npm run dev
```

The public portfolio works immediately using the verified fallback content in `lib/default-content.ts`. Copy `.env.example` to `.env.local` to enable the admin CMS.

## Configure the admin studio

1. Create a Supabase project.
2. Open the Supabase SQL editor and run `supabase/migrations/001_portfolio_cms.sql`.
3. In Authentication, create the administrator email/password user. Keep public sign-up disabled.
4. Copy that user's UUID from Authentication → Users.
5. Add it to the allow-list in the SQL editor:

```sql
insert into public.admin_users (user_id)
values ('YOUR_AUTH_USER_UUID');
```

6. Add the project URL and anon key to `.env.local`:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

7. Restart the development server and sign in at `/admin`.

The database policies allow anyone to read published portfolio content, but only a signed-in account listed in `admin_users` can change content or upload/delete files. Do not expose the Supabase service-role key in Vercel or in browser code.

## Optional contact delivery

Without email credentials, the contact form opens a prepared email in the visitor's mail application. For direct delivery, add:

```dotenv
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=faizanahmedsyed1@gmail.com
CONTACT_FROM_EMAIL=Portfolio <portfolio@your-verified-domain.com>
```

Verify the sending domain in Resend before deploying these values.

## Deploy on Vercel

1. Import `TezorInnovate/TechFaizan` into Vercel and keep the framework preset as Next.js.
2. Add the Supabase variables, and optionally the Resend variables, for Production and Preview.
3. Deploy and attach `www.techfaizan.com` in Vercel.
4. Keep the existing Cloudflare DNS records pointed to Vercel and SSL mode on Full (strict).

The included `vercel.json` adds baseline security headers. `/admin` is excluded from search indexing and is not linked in the primary navigation.

## Content workflow

- Use drafts for unfinished entries and enable **Published** when ready.
- Mark important projects or updates as **Featured** to surface them on the homepage.
- Upload images with descriptive alt text; use MP4/WebM for videos.
- Paste YouTube, Instagram, LinkedIn, GitHub, DOI, paper, and live-demo URLs in an item's links panel. Empty links are never shown publicly.
- Upload a PDF in **Profile & resume** to activate the public resume download button.
- Export a JSON backup from the admin header after significant edits.

## Verification

```bash
npm run typecheck
npm run build
```
