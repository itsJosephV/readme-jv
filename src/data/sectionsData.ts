import {type SectionProps} from "@/types";

const sectionsData: SectionProps[] = [
  {
    id: "1",
    title: "Acknowledgements",
    content: `
## Acknowledgements
 - [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)
 - [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)
`,
  },
  {
    id: "2",
    title: "API Reference",
    content: `
## API Reference

#### Get all items

\`\`\`http
  GET /api/items
\`\`\`

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| \`api_key\` | \`string\` | **Required**. Your API key |

#### Get item

\`\`\`http
  GET /api/items/$\{id}
\`\`\`

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| \`id\`      | \`string\` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.
`,
  },
  {
    id: "3",
    title: "Authors",
    content: `
## Authors
- [@itsJosephV](https://www.github.com/itsJosephV)
`,
  },
  {
    id: "4",
    title: "Badges",
    content: `
## Badges

Add badges from somewhere like: [shields.io](https://shields.io/)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)
`,
  },
  {
    id: "5",
    title: "Contributing",
    content: `
## Contributing

Contributions are always welcome!

See \`contributing.md\` for ways to get started.

Please adhere to this project's \`code of conduct\`.
`,
  },
  {
    id: "6",
    title: "Deployment",
    content: `
## Deployment

To deploy this project run

\`\`\`bash
  npm run deploy
\`\`\`
`,
  },
  {
    id: "7",
    title: "Demo",
    content: `
## Demo 
Insert gif or link to demo
`,
  },
  {
    id: "8",
    title: "Documentation",
    content: `
## Documentation

[Documentation](https://linktodocumentation)
`,
  },
  {
    id: "9",
    title: "Environment Variables",
    content: `
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

\`API_KEY\`

\`ANOTHER_API_KEY\`
`,
  },
  {
    id: "10",
    title: "Features",
    content: `
## Features

- Light/dark mode toggle
- Live previews
- Fullscreen mode
- Cross platform
`,
  },
  {
    id: "11",
    title: "Feedback",
    content: `
## Feedback

If you have any feedback, please reach out to us at fake@fake.com
`,
  },
  {
    id: "12",
    title: "Github Profile - Intro",
    content: `
# Hi, I'm Joseph! 👽
`,
  },
  {
    id: "13",
    title: "Github Profile - About",
    content: `
## 🧑‍💻 About Me
I'm a full stack developer...
`,
  },
  {
    id: "14",
    title: "Github Profile - Skills",
    content: `
## 🛠 Skills
Javascript, HTML, CSS...
`,
  },
  {
    id: "15",
    title: "Github Profile - Links",
    content: `
## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://katherineoelsner.com/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/)
`,
  },
  {
    id: "16",
    title: "Github Profile - Other",
    content: `
## Other Common Github Profile Sections
👩‍💻 I'm currently working on...

🧠 I'm currently learning...

👯‍♀️ I'm looking to collaborate on...

🤔 I'm looking for help with...

💬 Ask me about...

📫 How to reach me...

😄 Pronouns...

⚡️ Fun fact...
`,
  },
  {
    id: "17",
    title: "Installation",
    content: `
## Installation

Install my-project with npm

\`\`\`bash
  npm install my-project
  cd my-project
\`\`\`
`,
  },
  {
    id: "18",
    title: "Lessons",
    content: `
## Lessons Learned

What did you learn while building this project? What challenges did you face and how did you overcome them?
`,
  },
  {
    id: "19",
    title: "License",
    content: `
## License

[MIT](https://choosealicense.com/licenses/mit/)
`,
  },
  {
    id: "20",
    title: "Logo",
    content: `
![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)
`,
  },
  {
    id: "21",
    title: "Optimizations",
    content: `
## Optimizations

What optimizations did you make in your code? E.g. refactors, performance improvements, accessibility
`,
  },
  {
    id: "22",
    title: "Project Title",
    content: `
# Project Title
A brief description for this project and who is it for 
`,
  },
  {
    id: "23",
    title: "Run Locally",
    content: `
## Run Locally

Clone the project

\`\`\`bash
  git clone https://link-to-project
\`\`\`

Go to the project directory

\`\`\`bash
  cd my-project
\`\`\`

Install dependencies

\`\`\`bash
  npm install
\`\`\`

Start the server

\`\`\`bash
  npm run start
\`\`\`
`,
  },
  {
    id: "24",
    title: "Roadmap",
    content: `
## Roadmap

- Additional browser support

- Add more integrations
`,
  },
  {
    id: "25",
    title: "Screenshots",
    content: `
## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)
`,
  },
  {
    id: "26",
    title: "Support",
    content: `
## Support

For support, email fake@fake.com or join our Slack channel.
`,
  },
  {
    id: "27",
    title: "Tasks",
    content: `
## Tasks
- [x] Add icons
- [x] Update libraries
- [ ] Implements something
  `,
  },
  {
    id: "28",
    title: "Tech",
    content: `
## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express
`,
  },
  {
    id: "29",
    title: "Usage/Examples",
    content: `
## Usage/Examples

\`\`\`javascript
import Component from 'my-project'

function App() {
  return <Component />
}
\`\`\`
`,
  },
  {
    id: "30",
    title: "FAQ",
    content: `
## FAQ

#### Question 1

Answer 1

#### Question 2

Answer 2
`,
  },

  {
    id: "32",
    title: "Running Tests",
    content: `
## Running Tests

To run tests, run the following command

\`\`\`bash
  npm run test
\`\`\`
`,
  },
];

export {sectionsData};
