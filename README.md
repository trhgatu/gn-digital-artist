# 🦇 GN. — Art & Soul

> **GN VISIONS**
> _"Draw first for yourself, for half of your soul."_

A dark, gothic, and horror-themed digital portfolio for **GN**, a digital artist specializing in horror lore, monsters, and intricate inking. This experiential website is designed to be an immersive, chilling dive into the artist's psyche.

<img width="1879" height="849" alt="image" src="https://github.com/user-attachments/assets/8a100345-f1b5-437c-8cda-7cd599856b55" />

## ✨ Key Features

- **Interactive WebGL Flashlight Shader**: A custom Three.js Fragment Shader that cloaks the screen in an inky #050505 void, creating a smooth "flashlight" effect that reveals a gothic underlying texture dynamically trailing the user's mouse in Normalized Device Coordinates (NDC).
- **Immersive 3D Centerpiece**: A floating, slowly-revolving 3D Ring model (`GothicComponent`) rendered via React Three Fiber, standing as the primary focal point of the Hero section.
- **Cinematic Post-Processing**: Real-time render effects including Noise, heavy Vignette, and Chromatic Aberration to mimic the grittiness of horror cinema.
- **Macabre Typography**: Combines modern Swiss geometric utility (`Geist`) with classic, razor-sharp serif elegance (`Cinzel`) using css `mix-blend-mode: difference` for high-contrast visibility.
- **Silken Smooth Scrolling**: Studio-Freight Lenis combined with GSAP ScrollTrigger ensures an unearthly smooth scroll momentum devoid of native browser chunkiness.
- **Modern 3-Column Grid**: Carefully engineered structural layout separating the imposing "ART & SOUL" title, the centerpiece Ring, and the mysterious quote into breathing columns.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **3D Engine**: [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/) + [@react-three/drei](https://github.com/pmndrs/drei) + [@react-three/postprocessing](https://github.com/pmndrs/react-postprocessing)
- **Animations**: [GSAP](https://gsap.com/) & [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scroll**: [Lenis](https://lenis.studiofreight.com/)
- **Code Quality**: ESLint, TypeScript, Prettier
- **Hooks**: [Husky](https://typicode.github.io/husky/) + lint-staged

---

_Designed & Developed by [Trhgatu](https://thatu.is-a.dev)_
