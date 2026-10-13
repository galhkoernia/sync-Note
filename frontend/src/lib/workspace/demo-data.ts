export type DemoUser = {
  id: string;
  name: string;
  initials: string;
};

export type DemoDocument = {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  authorId: string;
};

export type WorkspaceView = "Home" | "Search" | "Recent" | "Documents";

export const demoUsers: DemoUser[] = [
  { id: "galuh", name: "Galuh Kurnia", initials: "GK" },
  { id: "ekawati", name: "Ekawati", initials: "E" },
];

export const demoDocuments: DemoDocument[] = [
  {
    id: "weekly",
    title: "A little room for the week",
    content:
      "A clear mind starts with a little space. These are the things I want to focus on this week.\n\nMake progress\n\nRefine the SyncNote writing experience. Keep navigation quiet, make the editor comfortable, and leave room for ideas to grow.\n\nLearn something\n\nRevisit React state patterns and take notes on what makes a component easy to maintain.\n\nLeave space\n\nCollect open questions before the next planning session with Ekawati. Not everything needs an answer today.",
    updatedAt: "2026-10-13T08:00:00+07:00",
    authorId: "galuh",
  },
  {
    id: "project",
    title: "SyncNote · interface notes",
    content:
      "The goal is a dependable, quiet writing space.\n\nKeep the first version focused on readable typography, clear document navigation, and honest feedback.\n\nQuestions to explore with Ekawati\n\nHow can we make the transition between reading and writing feel effortless?\nWhat belongs in the toolbar, and what can wait?\n\nThis is demo content. Persistence and collaboration are future integration points.",
    updatedAt: "2026-10-12T14:00:00+07:00",
    authorId: "galuh",
  },
  {
    id: "learning",
    title: "Learning journal",
    content:
      "Small ideas worth returning to.\n\nTypeScript\n\nUse explicit types at boundaries. Keep local UI models separate from future API contracts.\n\nAccessibility\n\nGood keyboard navigation and visible focus are part of the writing experience.",
    updatedAt: "2026-10-11T09:00:00+07:00",
    authorId: "ekawati",
  },
];

export const documentTitle = (doc: DemoDocument) =>
  doc.title.trim() || "Untitled document";

export const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(new Date(date));
