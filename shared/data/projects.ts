export type ProjectCategory = "des-gothic" | "monster" | "visual-char";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  src: string;
  // size determines the grid span in the asymmetrical layout
  size: "small" | "medium" | "large";
}

export const projects: Project[] = [
  // --- DES-GOTHIC (Found 13 files) ---
  {
    id: "dg-1",
    title: "The Silent Watcher",
    category: "des-gothic",
    src: "/assets/projects/des-gothic/dg1.png",
    size: "large",
  },
  {
    id: "dg-2",
    title: "Blood Ritual",
    category: "des-gothic",
    src: "/assets/projects/des-gothic/dg2.png",
    size: "medium",
  },
  {
    id: "dg-3",
    title: "Cursed Chalice",
    category: "des-gothic",
    src: "/assets/projects/des-gothic/dg3.png",
    size: "medium",
  },
  {
    id: "dg-4",
    title: "Hollow Crown",
    category: "des-gothic",
    src: "/assets/projects/des-gothic/dg4.png",
    size: "large",
  },
  {
    id: "dg-5",
    title: "Nocturne in D Minor",
    category: "des-gothic",
    src: "/assets/projects/des-gothic/dg5.png",
    size: "small",
  },
  {
    id: "dg-6",
    title: "Fallen Seraph",
    category: "des-gothic",
    src: "/assets/projects/des-gothic/dg6.png",
    size: "large",
  },
  {
    id: "dg-7",
    title: "Veil of Shadows",
    category: "des-gothic",
    src: "/assets/projects/des-gothic/dg7.png",
    size: "medium",
  },
  {
    id: "dg-8",
    title: "Gothic Spire",
    category: "des-gothic",
    src: "/assets/projects/des-gothic/dg8.png",
    size: "medium",
  },
  {
    id: "dg-9",
    title: "The Abbess",
    category: "des-gothic",
    src: "/assets/projects/des-gothic/dg9.png",
    size: "small",
  },
  {
    id: "dg-10",
    title: "Stained Glass",
    category: "des-gothic",
    src: "/assets/projects/des-gothic/dg10.jpg",
    size: "medium",
  },
  {
    id: "dg-11",
    title: "Midnight Gargoyle",
    category: "des-gothic",
    src: "/assets/projects/des-gothic/dg11.jpg",
    size: "small",
  },
  {
    id: "dg-12",
    title: "The Crypt",
    category: "des-gothic",
    src: "/assets/projects/des-gothic/dg12.jpg",
    size: "large",
  },
  {
    id: "dg-13",
    title: "Echoes of the Void",
    category: "des-gothic",
    src: "/assets/projects/des-gothic/dg13.jpg",
    size: "medium",
  },

  // --- MONSTER ---
  {
    id: "m-1",
    title: "Asaktra",
    category: "monster",
    src: "/assets/projects/monsters/asaktra.png",
    size: "large",
  },
  {
    id: "m-2",
    title: "Belican Acedia",
    category: "monster",
    src: "/assets/projects/monsters/belican-acedia.jpg",
    size: "small",
  },
  {
    id: "m-3",
    title: "Butler",
    category: "monster",
    src: "/assets/projects/monsters/butler.jpg",
    size: "medium",
  },
  {
    id: "m-4",
    title: "Cat Cuu Linh",
    category: "monster",
    src: "/assets/projects/monsters/cat-cuu-linh.jpg",
    size: "medium",
  },
  {
    id: "m-5",
    title: "Chimera",
    category: "monster",
    src: "/assets/projects/monsters/chimera.jpg",
    size: "large",
  },
  {
    id: "m-6",
    title: "Coeden",
    category: "monster",
    src: "/assets/projects/monsters/coeden.png",
    size: "large",
  },
  {
    id: "m-7",
    title: "Imerion Almost",
    category: "monster",
    src: "/assets/projects/monsters/imerion-almost.jpg",
    size: "medium",
  },
  {
    id: "m-8",
    title: "Momos",
    category: "monster",
    src: "/assets/projects/monsters/momos.jpg",
    size: "small",
  },
  {
    id: "m-9",
    title: "Nihilia",
    category: "monster",
    src: "/assets/projects/monsters/nihilia.jpg",
    size: "medium",
  },
  {
    id: "m-10",
    title: "Qixiao",
    category: "monster",
    src: "/assets/projects/monsters/qixiao.png",
    size: "large",
  },
  {
    id: "m-11",
    title: "Tekina",
    category: "monster",
    src: "/assets/projects/monsters/tekina.png",
    size: "medium",
  },
  {
    id: "m-12",
    title: "Veles Mabuz",
    category: "monster",
    src: "/assets/projects/monsters/veles-mabuz.png",
    size: "large",
  },
  {
    id: "m-13",
    title: "Zueh",
    category: "monster",
    src: "/assets/projects/monsters/zueh.png",
    size: "medium",
  },

  // --- VISUAL & CHAR ---
  {
    id: "vc-1",
    title: "Kantel Board",
    category: "visual-char",
    src: "/assets/projects/visuals/Kantel board.png",
    size: "large",
  },
];
