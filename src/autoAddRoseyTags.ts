import type { RehypePlugin } from "@astrojs/markdown-remark";
import { visit } from "unist-util-visit";
import type { Element } from "hast";
import slugify from "slugify";

const generateRoseyID = (text: string) => {
  if (!text) {
    return "";
  }
  const lowerCaseText = text.toLowerCase();
  // Remove all markdown links, and replace with just text
  const formattedText = lowerCaseText.replaceAll(
    /(?:__[*#])|\[(.*?)\]\(.*?\)/gm,
    /$1/
  );
  return slugify(formattedText, { remove: /['".*,:\/]/g });
};

const textElementTagNames = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "li"];

export const autoAddRoseyTags: RehypePlugin = () => {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type != "element") {
        return;
      }

      const element = node as Element;

      if (!isTextElement(element)) {
        return;
      }

      const elementsFirstChild = element.children[0];

      if (!elementsFirstChild) {
        return;
      }

      if (elementsFirstChild.type == "text") {
        element.properties!["data-rosey"] = generateRoseyID(
          elementsFirstChild.value
        );
      }
    });
  };
};

const isTextElement = (element: Element) =>
  textElementTagNames.map((textElementTagName) => {
    if (element?.tagName == textElementTagName) {
      return true;
    } else {
      return false;
    }
  });
