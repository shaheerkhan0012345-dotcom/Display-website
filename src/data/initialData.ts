import { CreatorProfile, Project } from '../types';

export const initialCreatorProfile: CreatorProfile = {
  name: "Alex Dev & Creator",
  handle: "@alex_builds_ai",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
  bio: "⚡ Creating AI Studio web apps & creative tools. Copy my exact build prompts below & test live demos!",
  instagramUrl: "https://instagram.com/alex_builds_ai",
  youtubeUrl: "https://youtube.com",
  githubUrl: "https://github.com",
  websiteUrl: "https://ai.studio/build",
  customNotice: "💡 Tip: Click 'Copy Prompt' on any card and paste it directly into AI Studio or ChatGPT to rebuild the project instantly!"
};

export const initialProjects: Project[] = [
  {
    id: "proj-pixlio",
    title: "Pixlio — Crafting Digital Products",
    description: "Ultra-luxurious, minimalist, editorial-grade creative portfolio website.",
    category: "Landing Pages",
    prompt: `You are a world-class principal frontend engineer and UI/UX creative developer. Build a ultra-luxurious, minimalist, editorial-grade creative portfolio website in React, TypeScript, Tailwind CSS, GSAP, and Motion (Framer Motion).

---

### 1. DESIGN SYSTEM & VISUAL BRANDING (CRITICAL)

- *Palette*:
  - *Canvas Background*: Pure White (#FFFFFF).
  - *Text & Headings*: Charcoal / Jet Black (#111827 / #0A0A0A).
  - *Accent Color*: Electric Crimson Red (#DC2626 / Tailwind bg-red-600 / text-red-600).
  - *Subtle Containers*: Light Warm Gray (#F9FAFB / bg-neutral-50) with thin hairlines (border-neutral-100 / border-neutral-200/80).
- *Typography*:
  - Pair a crisp sans-serif font (e.g. Plus Jakarta Sans / Inter) with monospace details (font-mono) for dates and metadata.
  - Headings must use tight letter-spacing (tracking-tight), heavy bold weights (font-bold / font-extrabold), and high contrast sizes (text-4xl sm:text-5xl md:text-6xl).
- *Signature Section Eyebrow Component*:
  - Every section MUST start with an eyebrow label containing a *red pulsing dot indicator*:
    <span className="w-2 h-2 rounded-full bg-red-600 inline-block animate-pulse" />
  - Text: Uppercase, bold, tracked out (text-xs font-bold tracking-widest text-neutral-700 uppercase). Example: • SERVICES, • TESTIMONIALS, • AWARDS, • BLOGS, • CLIENTS.
- *Signature Red Pill Action Buttons*:
  - Rounded full (rounded-full) red pill buttons (bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2.5 shadow-md shadow-red-600/20 active:scale-95 transition-all).
  - Inside the button on the left, include a small white translucent circle with a directional arrow icon:
    <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-red-600 transition-colors"><ArrowRight className="w-3.5 h-3.5" /></span>

---

### 2. PAGE STRUCTURE & SECTIONS LAYOUT

Build the single-page web app using the following section hierarchy:

#### SECTION 1: HERO & WORK SHOWCASE
- Bold intro headline with crimson red accent highlights.
- Interactive category filter tabs ("All", "UI/UX", "Brand", "3D") with smooth spring state transitions.
- Interactive project showcase grid with 3D tilt interaction on mouse move (rotateX, rotateY calculated from mouse offset), hover spotlight effects, and click-to-open detailed project modals.

#### SECTION 2: SERVICES
- *Heading*: "Services & Solutions." with red eyebrow.
- *Card Grid*: 3D perspective flip reveal on scroll using GSAP (rotateX: -25deg to 0deg, transformPerspective: 1000).
- *Interactive Icons*: Abstract vector SVG icons featuring subtle floating sine-wave ambient animations (gsap.to(y: -6, rotate: 3, repeat: -1, yoyo: true)).
- *Interactivity*: Clicking a service opens a side drawer / modal with detailed capability checklists and deliverables.

#### SECTION 3: TESTIMONIALS
- *Layout*: Asymmetric split grid (3 columns avatar photo on left, quote + author details on right).
- *Animations*: Avatar scales in with an elastic spring rebound (back.out(1.6)), and the blockquote wipes in with a subtle x-axis offset and blur filter clear (filter: blur(0px)).
- *Controls*: Next/Prev round arrow buttons with active pagination dots.

#### SECTION 4: AWARDS & RECOGNITION
- *Layout*: Clean editorial table list divided by thin hair-lines.
- *Top Accent Line*: Animated divider line at the top that expands horizontally on scroll (scaleX: 0 to 1 with transform-origin: left).
- *Table Rows*: Staggered horizontal slide-in animation (x: 60 to 0).
- *Row Columns*: Award Title (left), Description + Floating Trophy Badge (middle), Year in bold monospace font (right).
- *Hover*: Row background shifts to light neutral (bg-neutral-50/80), title shifts to red (text-red-600), and year shifts left slightly.

#### SECTION 5: BLOGS & CREATIVE NOTES ("From My Desk")
- *Eyebrow*: Red dot + "BLOGS".
- *Top Row*: Left side headline ("From My Desk: Blogs & Creative Notes."), right side Red Pill button ("View All").
- *Grid Layout*:
  - *Left Featured Card*: Takes 6 columns, large 4:3 aspect ratio studio image (e.g. laptop mockup on dark background).
  - *Right Stack*: Takes 6 columns, split into two 1:1 aspect ratio square cards (phone mockup, neon laptop studio photo).
- *Card Styling*: Rounded corners (rounded-2xl), dark image container, date tag in font-mono, bold title that shifts to red on hover.
- *3D Tilt Effect*: Gentle 3D perspective rotation on hover based on cursor position.
- *Interactivity*:
  - Clicking any blog card opens a full-screen blurred modal with category badge, reading time, featured banner, and multi-paragraph article content.
  - Clicking "View All" opens a full drawer listing all archived posts with quick search/filtering.

#### SECTION 6: CLIENTS MARQUEE (INFINITE LOOP)
- *Layout*: Full-width border section containing an infinite continuous horizontal scrolling marquee.
- *Edge Fades*: Soft gradient masks on both left and right edges (bg-gradient-to-r and bg-gradient-to-l from #FFFFFF to transparent) so logos enter and exit smoothly.
- *Logos*: Minimalist custom vector SVG icons (Orbit, Delta, Sync, Spark, Infinity Loop, Target Ring, Magic Glow, Aura Star).
- *Motion*: GSAP seamless horizontal loop (xPercent: -33.33333, infinite duration).
- *Hover Behavior*: Pauses marquee animation on hover. Logo cards lift up (-translate-y-2), scale up (scale-110), and glow with an elevated card shadow (shadow-xl border-neutral-300). NO distracting text popups on hover.

#### SECTION 7: FOOTER ("Let's Create Together")
- *Split 3-Column Architecture*:
  1. *Left Column*:
     - Email link: hello@loganfo.ster in large bold text (hover:text-red-600).
     - Social stack: Instagram, Behance (hover:text-red-600).
     - Bottom navigation menu: Home, About, Project, Blog, Contact with smooth scrolling triggers.
  2. *Center Column*:
     - Vertical portrait photo of the artist/designer lit with dramatic red and orange studio lighting.
     - Enclosed in a sleek aspect ratio box (aspect-[3/4] rounded-2xl overflow-hidden shadow-xl).
  3. *Right Column*:
     - Massive editorial headline: "Let’s Create Together." (text-4xl sm:text-5xl lg:text-6xl font-bold).
     - Action: Red Pill Button ("Contact Me") with arrow circle icon.
- *Contact Modal*:
  - Clicking "Contact Me" opens a sleek form modal (Name, Email, Message) with real state validation and a smooth "Message Sent!" confirmation view.
- *Sub-Footer*:
  - Bottom bar with copyright year tag and credit notice.

---

### 3. TECHNICAL REQUIREMENTS & LIBRARIES

1. *Framework*: React 18+ with TypeScript.
2. *Styling*: Tailwind CSS utility classes.
3. *Animations*:
   - *GSAP & ScrollTrigger*: Smooth scroll reveals, timeline sequences, stagger cards, drawing lines, and marquee loops.
   - *Motion (motion/react)*: Modals and drawer overlay entrances (AnimatePresence, spring scales, fade-ins).
4. *Icons*: lucide-react (ArrowRight, X, Mail, Sparkles, Tag, Clock, etc.).
5. *Quality Assurance*:
   - Zero hardcoded mock strings in logic components.
   - Smooth event listeners cleanup on component unmount (gsap.context()).
   - Mobile-first responsive sizing (sm:, md:, lg:, xl:).`,
    liveUrl: "https://graphic-designer-portfolio-inky.vercel.app/",
    thumbnailUrl: "/pixilio.png",
    tags: ["React", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion", "Portfolio"],
    isFeatured: true,
    views: 5000,
    likes: 340,
    createdAt: "2026-07-28",
    difficulty: "Advanced"
  },
  {
    id: "proj-jack-3d",
    title: "Jack -- 3D Creator",
    description: "Immersive 3D portfolio showcasing web development, photography, and graphic design with interactive 3D models and stunning visuals.",
    category: "Landing Pages",
    prompt: `Build a 3D Creator portfolio landing page for "Jack" using React, TypeScript, Tailwind CSS, Framer Motion, and Lucide React. The page has a dark theme (#0C0C0C background) with the font Kanit (Google Fonts, weights 300-900). The page title is "Jack -- 3D Creator".

GLOBAL STYLES
Background: #0C0C0C on html, body, #root, and the main wrapper
Font family: 'Kanit', sans-serif
Global reset: box-sizing border-box, margin 0, padding 0
CSS class .hero-heading: gradient text using background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%) with -webkit-background-clip: text and -webkit-text-fill-color: transparent
Main wrapper has overflowX: 'clip'
SECTION ORDER
HeroSection
MarqueeSection
AboutSection
ServicesSection
ProjectsSection
1. HERO SECTION
Full viewport height (h-screen), flex column layout with overflowX: clip.

Navbar: Horizontal nav bar with 4 links -- "About", "Price", "Projects", "Contact" -- evenly spaced with justify-between. Text color #D7E2EA, font-medium, uppercase, tracking-wider. Sizes: text-sm md:text-lg lg:text-[1.4rem]. Padding: px-6 md:px-10 pt-6 md:pt-8. Hover: opacity 70% with 200ms transition.

Hero Heading: Massive h1 with text "Hi, i'm jack" (lowercase "i", curly apostrophe via &apos;). Uses the .hero-heading gradient text class. Font-black, uppercase, tracking-tight, leading-none, whitespace-nowrap, w-full. Font sizes: text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]. Margin top: mt-6 sm:mt-4 md:-mt-5. Wrapped in overflow-hidden container.

Bottom bar: Flexbox justify-between items-end with pb-7 sm:pb-8 md:pb-10:

Left: paragraph text "a 3d creator driven by crafting striking and unforgettable projects", color #D7E2EA, font-light, uppercase, tracking-wide, leading-snug. Font size: clamp(0.75rem, 1.4vw, 1.5rem). Max-width: max-w-[160px] sm:max-w-[220px] md:max-w-[260px].
Right: ContactButton component (see below)
Hero Portrait: Centered absolutely. Uses a Magnet component (mouse-following magnetic effect) wrapping an image. Image URL: https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png. Magnet settings: padding 150, strength 3, activeTransition "transform 0.3s ease-out", inactiveTransition "transform 0.6s ease-in-out". Positioning: absolute left-1/2 -translate-x-1/2 z-10. Width: w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px]. On mobile: top-1/2 -translate-y-1/2. On sm+: sm:top-auto sm:translate-y-0 sm:bottom-0.

FadeIn animations: Navbar fades in with delay 0, y -20. Heading: delay 0.15, y 40. Left text: delay 0.35, y 20. Contact button: delay 0.5, y 20. Portrait: delay 0.6, y 30.

2. MARQUEE SECTION
Two rows of images that scroll horizontally based on page scroll position. Background #0C0C0C. Padding: pt-24 sm:pt-32 md:pt-40 pb-10.

21 GIF images from motionsites.ai (exact URLs):


https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif
https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif
https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif
https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif
https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif
https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif
https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif
https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif
https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif
https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif
https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif
https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif
https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif
https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif
https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif
https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif
https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif
https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif
https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif
https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif
https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif
Row 1: first 11 images, tripled for seamless scrolling. Moves RIGHT on scroll (translateX(offset - 200)).
Row 2: remaining 10 images, tripled. Moves LEFT on scroll (translateX(-(offset - 200))).
Scroll offset calculated as: (window.scrollY - sectionTop + window.innerHeight) * 0.3
Each image tile: 420px x 270px, rounded-2xl, object-cover, lazy loaded.
Gap between tiles: gap-3. Gap between rows: gap-3.
Uses willChange: 'transform' for performance. Scroll listener is passive.
3. ABOUT SECTION
Full-height centered section with min-h-screen, padding px-5 sm:px-8 md:px-10 py-20.

Four decorative 3D images positioned absolutely in corners:

Top-left: Moon icon -- https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png -- w-[120px] sm:w-[160px] md:w-[210px], positioned top-[4%] left-[1%] sm:left-[2%] md:left-[4%]. FadeIn: delay 0.1, x -80, y 0, duration 0.9.
Bottom-left: 3D object -- https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png -- w-[100px] sm:w-[140px] md:w-[180px], positioned bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]. FadeIn: delay 0.25, x -80, y 0, duration 0.9.
Top-right: Lego icon -- https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png -- w-[120px] sm:w-[160px] md:w-[210px], positioned top-[4%] right-[1%] sm:right-[2%] md:right-[4%]. FadeIn: delay 0.15, x 80, y 0, duration 0.9.
Bottom-right: 3D group -- https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png -- w-[130px] sm:w-[170px] md:w-[220px], positioned bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]. FadeIn: delay 0.3, x 80, y 0, duration 0.9.
Heading: "About me" using .hero-heading gradient text, font-black, uppercase, leading-none, tracking-tight, centered. Font size: clamp(3rem, 12vw, 160px). FadeIn: delay 0, y 40.

Animated paragraph: Uses a character-by-character scroll-driven opacity animation. Text: "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!" -- color #D7E2EA, font-medium, centered, leading-relaxed, max-w-[560px], font size clamp(1rem, 2vw, 1.35rem). Each character animates from opacity 0.2 to 1 based on scroll progress, with scroll offset ['start 0.8', 'end 0.2'].

Contact button below the text block. Gap between heading/text: gap-10 sm:gap-14 md:gap-16. Gap between text block and button: gap-16 sm:gap-20 md:gap-24.

4. SERVICES SECTION
White background (#FFFFFF), with rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] top corners. Padding: px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32.

Heading: "Services" in #0C0C0C, font-black, uppercase, centered, font size clamp(3rem, 12vw, 160px). Margin bottom: mb-16 sm:mb-20 md:mb-28.

5 service items in a vertical list, max-w-5xl, centered:

01 - 3D Modeling: "Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations."
02 - Rendering: "High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life."
03 - Motion Design: "Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences."
04 - Branding: "Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence."
05 - Web Design: "Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience."
Each item: horizontal layout with number (font-black, font size clamp(3rem, 10vw, 140px), color #0C0C0C) on the left and name + description stacked vertically on the right. Name: font-medium, uppercase, font size clamp(1rem, 2.2vw, 2.1rem). Description: font-light, leading-relaxed, max-w-2xl, font size clamp(0.85rem, 1.6vw, 1.25rem), opacity 0.6. Items separated by 1px borders (rgba(12, 12, 12, 0.15)). Padding: py-8 sm:py-10 md:py-12. Staggered FadeIn: each item delays by i * 0.1.

5. PROJECTS SECTION
Dark background (#0C0C0C), rounded top corners rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px], pulled up with -mt-10 sm:-mt-12 md:-mt-14, z-10.

Heading: "Project" (singular) using .hero-heading gradient, same styling as other headings.

3 sticky-stacking project cards that scale down as you scroll past them (card stacking effect using Framer Motion useScroll and useTransform). Each card is sticky top-24 md:top-32 inside an h-[85vh] container.

Scale calculation: targetScale = 1 - (totalCards - 1 - index) * 0.03. Each card offset by top: \${index * 28}px.

Each card has: rounded-[40px] sm:rounded-[50px] md:rounded-[60px], border-2 border-[#D7E2EA], background #0C0C0C, padding p-4 sm:p-6 md:p-8.

Card layout:

Top row: Number (huge, same style as services), category label, project name, and a "Live Project" ghost button (rounded-full, border-2 #D7E2EA, uppercase, tracking-widest).
Bottom row: Two-column image grid -- left column (40% width) has 2 stacked images, right column (60%) has 1 tall image. All images have heavy border radius rounded-[40px] sm:rounded-[50px] md:rounded-[60px]. Left top image height: clamp(130px, 16vw, 230px). Left bottom image height: clamp(160px, 22vw, 340px).
Project data with CloudFront image URLs:

Project 01 - "Nextlevel Studio" (Client):

Col1 image 1: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85
Col1 image 2: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85
Col2 image: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85
Project 02 - "Aura Brand Identity" (Personal):

Col1 image 1: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85
Col1 image 2: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85
Col2 image: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85
Project 03 - "Solaris Digital" (Client):

Col1 image 1: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85
Col1 image 2: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85
Col2 image: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85
REUSABLE COMPONENTS
ContactButton: Rounded-full pill button with gradient background linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%), inner box-shadow 0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset, white 2px outline with -3px offset. Text: white, font-medium, uppercase, tracking-widest. Sizes: px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4, text text-xs sm:text-sm md:text-base. Label: "Contact Me".

LiveProjectButton: Ghost/outline pill button. Rounded-full, border-2 border-[#D7E2EA], text color #D7E2EA, font-medium, uppercase, tracking-widest. Sizes: px-8 py-3 sm:px-10 sm:py-3.5, text text-sm sm:text-base. Hover: bg-[#D7E2EA]/10. Label: "Live Project".

FadeIn: Framer Motion wrapper using whileInView with viewport={{ once: true, margin: "50px", amount: 0 }}. Accepts delay, duration (default 0.7), x (default 0), y (default 30). Easing: [0.25, 0.1, 0.25, 1]. Uses motion.create() for dynamic element types.

Magnet: Mouse-following magnetic hover effect. Tracks mouse position relative to element center, applies translate3d transform divided by strength factor. Activates when cursor is within padding distance of element edge. Smooth transition in (0.3s ease-out) and out (0.6s ease-in-out). Uses willChange: 'transform'.

AnimatedText: Character-by-character scroll-reveal text animation. Each character goes from opacity 0.2 to 1 based on its position in the text relative to scroll progress. Uses Framer Motion useScroll targeting the paragraph element with offset ['start 0.8', 'end 0.2']. Each character uses invisible placeholder + absolute positioned animated span.

KEY DEPENDENCIES
react, react-dom (^18.3.1)
framer-motion (^12.38.0)
lucide-react (^0.344.0)
tailwindcss (^3.4.1)
vite, typescript
RESPONSIVE BREAKPOINTS
All sections use Tailwind's default breakpoints (sm: 640px, md: 768px, lg: 1024px) with mobile-first approach. Heavy use of clamp() for fluid typography. The entire design scales gracefully from mobile to ultra-wide screens.`,
    liveUrl: "https://3d-portfolio-green-seven.vercel.app/",
    thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    tags: ["3D", "Three.js", "React", "Portfolio", "Photography"],
    isFeatured: true,
    views: 4000,
    likes: 250,
    createdAt: "2026-07-28",
    difficulty: "Advanced"
  },
  {
    id: "proj-rheon",
    title: "RHEON Digital Marketing",
    description: "A hyper-premium, production-ready digital marketing agency website featuring interactive 3D parallax and glassmorphism.",
    category: "Landing Pages",
    prompt: `Please act as an elite Frontend Engineer. Your task is to build a hyper-premium, production-ready digital marketing agency website named "RHEON".
This must be a 10/10 execution. Do not use placeholder text. Do not cut corners. Follow these architectural blueprints exactly.
1. Global Tech Stack & Environment
Framework: React 19 + TypeScript, bundled with Vite.
Styling: Tailwind CSS v4.
Animation Core: gsap (GreenSock) combined with gsap/ScrollTrigger.
Micro-Interactions: motion/react (Framer Motion).
Icons: lucide-react.
Fonts: "Inter" (primary sans-serif) and "Outfit" (display font for headings). Configure these in Tailwind.
Root Styles (index.css):
Create a .grid-bg class that uses a linear-gradient to draw an 80px by 80px engineering wireframe grid (rgba(0,0,0,0.04) for the lines). In App.tsx, layer this grid behind a bg-radial from-transparent via-white/85 to-white div to fade the edges seamlessly into the white background.
2. Deep Component Architecture & Blueprints
A. Navbar.tsx (Sticky Top Navigation)
Container: sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100/60 z-40 h-20.
Logo (Left):
Text: "RHEON" in font-display font-extrabold text-xl tracking-widest text-neutral-900.
Icon: A 3x3 mosaic grid (w-6 h-6). It contains 9 dots (w-1.5 h-1.5 rounded-xs). By default, they alternate between neutral-950 and neutral-400. On group hover, specific dots turn indigo-500 and scale up (scale-120).
Desktop Links (Center): "Services", "About", "Learn", "Work", "Career", "Contact" (text-xs, font-semibold, neutral-500).
The first 4 links trigger a Framer Motion dropdown (AnimatePresence) on hover.
The dropdowns are absolute white cards (w-72 shadow-xl rounded-xl p-3).
Inside the dropdowns, map items like: "Search Engine Optimization" (Target icon, bg-neutral-50 square).
Actions (Right): A lucide-react Search icon button, and a "Let's Talk" outline button (border-neutral-250 hover:border-neutral-900 rounded-full px-[18px] py-[9px] text-xs font-bold).
Mobile State: A hamburger menu that opens a Framer Motion slide-out drawer from the right side.
B. App.tsx Hero Section (The Masterpiece)
Ambient Background:
Create two huge absolute divs.
Top-Left: w-[450px] h-[450px] bg-amber-200/20 blur-[130px] rounded-full.
Bottom-Right: w-[500px] h-[500px] bg-emerald-100/20 blur-[140px] rounded-full.
GSAP Animation: Animate these infinitely. x: '+=40', y: '-=30' for 8 seconds, yoyo: true, repeat: -1.
Promo Badge: A small pill at the top center.
Main Headline:
Text: "Digital Marketing Services".
Classes: font-display font-medium text-7xl lg:text-8xl text-neutral-900 tracking-tight leading-[1.02].
GSAP Entrance: Wrap each word in an overflow-hidden span. Start the words at y: "115%" and stagger animate them to y: "0%" over 1.4 seconds (ease: power4.out).
Subheadline:
Text: "Through careful keyword research and white hat SEO practices, we can help you achieve higher organic rankings and increased visibility in search results."
Classes: max-w-xl mx-auto text-[15px] text-neutral-500.
Primary CTA: A black pill button (bg-neutral-950 text-white px-8 py-3.5) saying "Free Proposal" with an ArrowRight icon. Wrap in Framer Motion for a whileTap={{scale: 0.97}} effect.
Live Activity Ticker: Below the button, a small mono-font pill: "Active Service Session: Local Sandbox Live" with a pulsing green dot (animate-pulse).
Parallax: Attach a ScrollTrigger to the Hero container. As the user scrolls down, move the hero content down (y: 80) and rotate the ambient blobs to simulate physical 3D depth.
C. StrategistSection.tsx (Bento Grid & Stats)
Top Layout:
A massive grey rounded rectangle (bg-neutral-50/60 border-neutral-100 min-h-[460px]).
Background is a faint bento-grid pattern of empty squares.
In the center: A photographic card holding a portrait image (aspect-[3/4] max-w-md shadow-2xl rounded-3xl).
3D Mouse Move: Attach a mousemove event to the container that calculates the mouse distance from the center and applies rotateX and rotateY via GSAP (transformPerspective: 1200) to the portrait image.
Floating Cards: Overlap the portrait with two white cards. Top right: "50+ Projects". Bottom left: "500+ Personal Projects". Use GSAP ScrollTrigger to count up the numbers from 0 to 50 and 500 when they enter the viewport.
Bottom Layout (3 Column Metric Cards):
Three tall cards (bg-gradient-to-br from-white to-neutral-50/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] min-h-[320px] rounded-3xl).
Top right corner of each card has a blurred circle (bg-indigo-500/10 blur-[40px]) that appears on hover.
Content Card 1: "Conversion Rate Optimization", Title: "Multiple Location Orthodontic Practice", Metrics: "+226% Top 5 Rankings", "+122% Monthly Leads".
Use GSAP ScrollTrigger to count up these percentages dynamically from 0.
D. GrowthSection.tsx (Data & Dashboard)
Layout: A CSS Grid (12 cols). Left side (5 cols) is text, right side (7 cols) is an image dashboard.
Left Column:
Title: "Driving business growth." (Mask-reveal animation on scroll).
Copy: "Digital marketing services provide businesses of all sizes with an opportunity to market their brand 24/7 at a low cost..."
Metrics row: Three numbers using a custom RollingNumber odometer animation component (built with Framer Motion translating Y-axis arrays of digits 0-9). The numbers: "+285% SEO Traf. Boost", "+45k Qualified Reach", "+124% Conversion Rate".
Button: "Analyze My Traffic" with a pulsing yellow Zap icon.
Right Column:
A glossy dashboard image (aspect-[16/11] rounded-3xl shadow-2xl).
Add the same 3D Mouse Move tilt effect from the Strategist section.
Add two absolute floating parallax badges overlapping the edges of the image. Left badge: "SEO Campaign / +285%". Right badge: "Reach / +45.2k". Use ScrollTrigger scrub to move them vertically at different speeds to create a parallax float effect as the user scrolls.
E. WorkSection.tsx (Portfolio)
Header: "Our latest work" with an "Explore More" button.
Grid: A 2x2 grid of portfolio cards.
Card Design:
aspect-square rounded-2xl overflow-hidden.
Image fills the container.
On hover, reveal a glassmorphism pill badge at the top right: "View Story [ArrowUpRight]".
Below the image, a meta row: Title on the left (e.g., "IUNIK", "Water Bank"), and tags on the right (e.g., ["Marketing"], ["PPC", "SEO"]). The tags are text-[10px] rounded-full border bg-neutral-50/85. On group hover of the card, the tags turn black with white text.
Animation: Use GSAP clipPath: "inset(0% 100% 0% 0%)" to inset(0% 0% 0% 0%) to reveal the images sliding in from left to right as the user scrolls down to them.
3. State & Interactivity Guidelines
You must create state variables in App.tsx: [proposalOpen, setProposalOpen], [contactOpen], [searchOpen].
Build Framer Motion <AnimatePresence> modals that consume these states. They should have a fixed bg-black/40 backdrop-blur-sm overlay and a centered white card UI.
Pass the state setters (e.g., onOpenProposal) down to EVERY component. Whenever any "Explore", "Let's Talk", or "Free Proposal" button is clicked, trigger the modals. This makes the UI feel fully alive and interactive.
Ensure all GSAP contexts are wrapped in a const ctx = gsap.context(() => {...}) and cleaned up with return () => ctx.revert(); inside useEffect to prevent React 19 StrictMode double-render bugs.
Please begin coding this masterpiece. Ensure every padding, font weight, border radius, and animation matches these exact specifications.`,
    liveUrl: "https://rheon-marketing-agent-portofio-webs.vercel.app/",
    thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    tags: ["React", "TypeScript", "GSAP", "Digital Marketing", "Vite"],
    isFeatured: true,
    views: 3000,
    likes: 420,
    createdAt: "2026-07-28",
    difficulty: "Advanced"
  },
  {
    id: "proj-3",
    title: "SaaS Analytics Dashboard",
    description: "Full-scale metric tracking dashboard with interactive revenue charts, live subscription logs, and user churn breakdown.",
    category: "Dashboards",
    prompt: `Design a comprehensive SaaS Founder Analytics Dashboard in React, Recharts, and Tailwind CSS.
Features:
- Metric Cards: MRR, ARR, Active Subscribers, Churn Rate, LTV, CAC
- Interactive Recharts line chart comparing Monthly Revenue vs Operating Costs
- Regional User Distribution bar chart and conversion funnel
- Live activity stream of simulated recent signups, upgrades, and cancellations
- Filterable customer table with search, status badges (Active, Trial, Churned), and export CSV
- Ultra-clean modern light UI with indigo and slate color palette.`,
    liveUrl: "https://saas-dashboard-demo.example.com",
    githubUrl: "https://github.com/example/saas-dashboard",
    instagramPostUrl: "https://instagram.com/p/saas-analytics",
    thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    tags: ["Recharts", "SaaS", "Dashboard", "Tailwind CSS"],
    isFeatured: true,
    views: 1890,
    likes: 475,
    createdAt: "2026-07-24",
    difficulty: "Intermediate"
  }
];
