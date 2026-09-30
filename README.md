# Ngongotaha Panel & Paint - Production Platform

> Mobile-first, luxury automotive web platform and custom admin management system for **Ngongotaha Panel & Paint**, located in Ngongotahā, Rotorua, New Zealand.

---

## 🚗 Confirmed Business Details
- **Business Name**: Ngongotaha Panel & Paint
- **Type**: Auto Body Shop (Panel Beating, Spray Painting, Rust Repair, Bumper Fixes)
- **Address**: 142 Oturoa Road, Ngongotahā, Rotorua 3072, New Zealand
- **Phone / WhatsApp**: +64 27 684 1468
- **Google Rating**: 4.4 Stars (7 verified reviews)
- **Confirmed Services**:
  1. Panel beating and panel repair
  2. Spray painting and paint finishes
  3. Rust repair (including chassis rust & WoF compliance)
  4. Dent and ding repair
  5. Bumper repair (including emergency temporary fixes)
- **Confirmed Customer Strengths**: Excellent workmanship, fair pricing, fast turnaround (often same-day or next-day), kind and thorough service.
- **Editable Placeholders**: Owner name `[Darren - Shop Owner]`, opening hours per day, prices, email `[contact@ngongotahapanelpaint.co.nz]`.

---

## 🛠️ Technology Stack
- **Framework**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **3D Canvas**: Three.js + React Three Fiber (`@react-three/fiber`) + Drei (`@react-three/drei`)
- **Motion**: Framer Motion
- **Backend / Database**: Supabase (PostgreSQL, Auth, Storage) with zero-config local store fallback
- **Forms & Validation**: React Hook Form + Zod
- **Icons**: Lucide React

---

## 📱 Features & Highlights
1. **Interactive 3D Hero**: Procedural sports car with studio lighting and interactive metallic paint clearcoat switcher (7 finishes). Automatically switches to lightweight high-resolution photo showcase on low-end or battery-saving devices.
2. **Trust Bar**: 4.4 Google rating badge, same-day/next-day turnaround, and fair pricing metrics.
3. **Confirmed Services**: Interactive cards with turnaround tags and popup detail modal with quote pre-fill action.
4. **Before/After Draggable Slider**: Touch-friendly comparison slider featuring workshop prep vs fresh clearcoat.
5. **4-Step Process Timeline**: Clear timeline showing how customers go from photo upload to collecting their car.
6. **Portfolio Gallery**: Masonry grid with category filtering and swipeable lightbox modal (includes real workshop photos).
7. **Verified Google Reviews**: Honest 4.4 star rating and exact quotes from real verified customers (Alison W., Zachariah J., Janice G., Tracy J., Jane W.).
8. **Online Quote Request Form**: Vehicle make/model/year, damage description, multi-photo camera upload previews, and anti-spam honeypot.
9. **Insurance & FAQ**: Accordion for private/insurance claims, Warrant of Fitness rust compliance, and repair questions.
10. **Location & Live Hours**: Embedded Google Map for 142 Oturoa Road, real-time "Open Now / Closed" badge calculated against NZ timezone (`Pacific/Auckland`).
11. **Mobile Bottom Actions**: Sticky bottom bar with 1-tap "Call", "WhatsApp", and "Free Quote".
12. **Custom Admin Panel (`/admin`)**:
    - Mobile-first bottom tab bar and desktop sidebar
    - **Dashboard**: Quote metrics, quick shortcuts
    - **Quotes Inbox**: Filter by status, view damage photos, add internal notes, 1-tap call/WhatsApp, export to CSV
    - **Site Content Editor**: Headline, subtext, trust bar, top announcement banner
    - **Services Manager**: Add, edit, delete repair services
    - **Gallery Manager**: Upload photos, tag categories, delete
    - **Before/After Manager**: Pair management
    - **Reviews Manager**: Toggle visibility, add manual reviews, edit Google link
    - **FAQ Manager**: Add, edit, delete Q&As
    - **Settings**: Editable daily hours with placeholder labels, holiday notice, SEO meta tags
    - **1-Click Demo Access**: Instant testing without configuring Supabase Auth first

---

## 🚀 Getting Started

### Local Development
```bash
# Start Next.js development server
npm run dev

# Open http://localhost:3000 in your browser
# Open http://localhost:3000/admin for the Owner Admin Portal
```

### Type Checking
```bash
npx tsc --noEmit
```

### Supabase Setup
Run the SQL schema located in `supabase/schema.sql` in your Supabase SQL editor to create all tables, Row Level Security policies, and storage buckets.

---

## 📄 License
Private commercial project for Ngongotaha Panel & Paint.
