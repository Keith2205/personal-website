// Work-in-progress projects, shown under the pinboard on the Projects page.
//
// Fields:
//   title       - project name.
//   description - a sentence or two on what it is.
//   tech        - optional; tags shown on the card, e.g. ['Python', 'FastAPI'].
//   repo        - optional; link to the source, e.g. a GitHub URL.
//   milestones  - the steps to finish it, in order. Set done: true as each one
//                 lands. The progress bar is worked out from these, so it can
//                 never disagree with the list.
//
// When a project is finished, remove it from here and give it a page in
// src/content/projects/ so it moves onto the pinboard.

export interface Milestone {
  label: string;
  done: boolean;
}

export interface WipProject {
  title: string;
  description: string;
  tech?: string[];
  repo?: string;
  milestones: Milestone[];
}

export const wip: WipProject[] = [
  {
    title: 'Smart Priority Board',
    description:
      'A task manager that sorts your work with the Eisenhower Matrix, urgent against important, with AI that will rank tasks and pick what to focus on each day.',
    tech: ['Java', 'Spring Boot', 'MongoDB', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    repo: 'https://github.com/Keith2205/smart-priority-board',
    milestones: [
      { label: 'Secure accounts: JWT login, hashed passwords, rate limiting', done: true },
      { label: 'Task API with automatic quadrant sorting and status tracking', done: true },
      { label: 'Frontend: priority matrix, Kanban board, profile and activity log', done: true },
      { label: 'AI features with Claude: task ranking, quadrant checks, daily focus list', done: false },
      { label: 'Drag and drop between quadrants', done: false },
    ],
  },
];

/** Milestones done, the total, and the whole-number percentage. */
export function progressOf(project: WipProject) {
  const total = project.milestones.length;
  const done = project.milestones.filter((m) => m.done).length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  return { done, total, percent };
}
