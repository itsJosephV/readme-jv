import {type SectionProps} from "@/types";

const sectionsData: SectionProps[] = [
  {
    id: "1",
    title: "Project Title",
    content: "# Project Title\nA brief description for this project and who is it for",
  },
  {
    id: "2",
    title: "Acknowledgements",
    content:
      "## Acknowledgements\n\n- [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)\n- [Awesome README](https://github.com/matiassingers/awesome-readme)\n- [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)",
  },
  {
    id: "3",
    title: "Authors",
    content: "## Authors\n\n- [@itsJosephV](https://www.github.com/itsJosephV) ",
  },
  {id: "4", title: "Demo", content: "## Demo\n\nInsert gif or link to demo"},
  {id: "5", title: "Code", content: "`inline code`"},
  {id: "6", title: "Code Block", content: "```\ncode block\n```"},
  {
    id: "7",
    title: "Image",
    content:
      "![Alt text](https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Github-desktop-logo-symbol.svg/2048px-Github-desktop-logo-symbol.svg.png)",
  },
  {id: "9", title: "List", content: "# List\n- Item 1\n- Item 2\n- Item 3\n"},
  {id: "8", title: "Link", content: "[Link text](https://example.com)"},
  {id: "10", title: "Ordered List", content: "1. First item\n2. Second item\n3. Third item"},
  {id: "11", title: "Blockquote", content: "> This is a blockquote."},
  {
    id: "12",
    title: "Checkbox List",
    content: "## Check List\n- [x] Checked item\n- [ ] Unchecked item",
  },
  {
    id: "13",
    title: "Table",
    content: "| Header 1 | Header 2 |\n| --------- | --------- |\n| Cell 1    | Cell 2    |",
  },
  {id: "14", title: "Horizontal Rule", content: "---"},
  {id: "15", title: "Inline HTML", content: "<div>Inline HTML</div>"},
];

export {sectionsData};
