// Life timeline for the About page, rendered as a git log (oldest first).
//
// Fields:
//   date    - when it happened, shown above the message (free text, e.g. "2018–2020").
//             Ignored for branch entries, which show "branch: <name>" instead.
//   message - the commit line, e.g. "init: born in Mumbai, India".
//   body    - a sentence or two of detail shown under the message.
//   branch  - optional; set to a branch name to render this as a side-branch entry.
//   release - optional; set to true for the final milestone (the tagged release).

export interface TimelineEntry {
  date: string;
  message: string;
  body: string;
  branch?: string;
  release?: boolean;
}

export const timeline: TimelineEntry[] = [
  {
    date: '2002',
    message: 'init: born in Mumbai, India',
    body: 'Where it all started.',
  },
  {
    date: '~2005–2008',
    message: 'feat: early years in Pune',
    body: 'Started out at Daffodils, a preschool in Pune, before the family moved back to Mumbai, where I finished kindergarten at Christ Church School.',
  },
  {
    date: '~2008–2018',
    message: 'feat: childhood in Mumbai Central',
    body: 'Grew up in Bane Compound, a colony where every door opened onto one long shared hallway and the neighbours were basically family. We celebrated everything (Diwali, Holi, Ganesh Chaturthi, Christmas, New Year), played cricket and football in the parking lot (sorry about the side mirrors), and spent winter nights around a small bonfire with antakshari and late-night stories.',
  },
  {
    date: '2009–2018',
    message: "feat: St. Mary's School (ICSE), Mazagaon",
    body: "Mom chose an ICSE school for me over the state board (SSC), and I'm grateful she did. It's where I made lifelong friends, picked up basketball, football and badminton, and finished grade 10.",
  },
  {
    date: '',
    branch: 'side-quests',
    message: 'add: stage, sport & debate',
    body: 'Inter-school football, inter-house debates, and elocutions in English, Hindi and Marathi. In dramatics, I went from backstage crew to a front-stage role as a cop, and at Immaculata, our inter-school fest, I was on the security team.',
  },
  {
    date: '2018–2020',
    message: 'feat: KC College, Churchgate',
    body: 'Did grades 11 and 12 at junior college, on a vocational track in electronics. I cleared JEE Mains, which made me eligible for JEE Advanced, the exam for the IITs, but I chose to go all-in on studying in the US instead.',
  },
  {
    date: '2020–2022',
    message: 'feat: Amity University Mumbai',
    body: 'In 2020 I got into Washington State, Iowa and Rutgers, and then COVID hit and the plan to go abroad fell apart. I started a B.Tech in Computer Science at Amity University Mumbai instead, where two friends showed me another route: transferring abroad partway through a degree.',
  },
  {
    date: '2022',
    message: 'merge: transfer to Rutgers',
    body: 'Two years into the four-year B.Tech, I took that route and transferred to Rutgers: the same university that had said yes two years before.',
  },
  {
    date: '2022–2026',
    message: 'rebase: Rutgers, Computer Science',
    body: 'Not all my credits transferred, so I retook courses like calculus and writing, which pushed my graduation back. Outside class, I dove into American college life: Rutgers football game days, student events, and music festivals like Elements, which turned my playlist into an odd mix of techno, house and country.',
  },
  {
    date: 'May 2026 · tag v1.0',
    message: 'release: B.S. Computer Science',
    release: true,
    body: "I loved going deeper into CS, but what surprised me most was everything else the American college system made me take. Courses like sociology changed how I see things and made my writing better. That's where the two sides of this site really came together. Now I'm looking for my first software engineering role.",
  },
];
