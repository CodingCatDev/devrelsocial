import { createCanvas, SKRSContext2D } from "@napi-rs/canvas"; // For canvas.

// This function accepts 6 arguments:
// - ctx: the context for the canvas
// - text: the text we wish to wrap
// - x: the starting x position of the text
// - y: the starting y position of the text
// - maxWidth: the maximum width, i.e., the width of the container
// - lineHeight: the height of one line (as defined by us)
export const wrapText = function (
  ctx: SKRSContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  // First, split the words by spaces
  let words = text.split(" ");
  // Then we'll make a few variables to store info about our line
  let line = "";
  let testLine = "";
  // wordArray is what we'l' return, which will hold info on
  // the line text, along with its x and y starting position
  let wordArray = [];
  // totalLineHeight will hold info on the line height
  let totalLineHeight = 0;

  // Next we iterate over each word
  for (var n = 0; n < words.length; n++) {
    // And test out its length
    testLine += `${words[n]} `;
    var metrics = ctx.measureText(testLine);
    var testWidth = metrics.width;
    // If it's too long, then we start a new line
    if (testWidth > maxWidth && n > 0) {
      wordArray.push([line, x, y]);
      y += lineHeight;
      totalLineHeight += lineHeight;
      line = `${words[n]} `;
      testLine = `${words[n]} `;
    } else {
      // Otherwise we only have one line!
      line += `${words[n]} `;
    }
    // Whenever all the words are done, we push whatever is left
    if (n === words.length - 1) {
      wordArray.push([line, x, y]);
    }
  }

  // And return the words in array, along with the total line height
  // which will be (totalLines - 1) * lineHeight
  return [wordArray, totalLineHeight];
};

export const generateMainImage = async function ({
  gradientColors,
  articleName,
  articleCategory,
  emoji,
}: {
  gradientColors?: string[];
  articleName: string;
  articleCategory: string;
  emoji: any;
}) {
  articleCategory = articleCategory.toUpperCase();
  // gradientColors is an array [ c1, c2 ]
  if (typeof gradientColors === "undefined") {
    gradientColors = ["#ff067e", "#5e1286"]; // Backup values
  }

  // Create canvas
  const canvas = createCanvas(1500, 500);
  const ctx = canvas.getContext("2d");

  // Add gradient - we use createLinearGradient to do this TODO:pass in json?
  let grd = ctx.createLinearGradient(0, 0, 1500, 500);
  grd.addColorStop(0, gradientColors[0]);
  grd.addColorStop(1, gradientColors[1]);
  ctx.fillStyle = grd;
  // Fill our gradient
  ctx.fillRect(0, 0, 1500, 500);

  // Write our Emoji onto the canvas
  ctx.fillStyle = "white";
  ctx.font = "95px AppleEmoji";
  ctx.fillText(emoji, 85, 700);

  // Add our title text
  ctx.font = "95px Nunito";
  ctx.fillStyle = "white";
  let wrappedText = wrapText(ctx, articleName, 0, 500, 1200, 100) as any;
  wrappedText[0]?.forEach(function (item: any) {
    // We will fill our text which is item[0] of our array, at coordinates [x, y]
    // x will be item[1] of our array
    // y will be item[2] of our array, minus the line height (wrappedText[1]), minus the height of the emoji (200px)
    ctx.fillText(item[0], item[1], item[2] - wrappedText[1] - 200); // 200 is height of an emoji
  });

  // Add our category text to the canvas
  ctx.font = "50px InterMedium";
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.fillText(articleCategory, 0, 500 - wrappedText[1] - 100); // 853 - 200 for emoji, -100 for line height of 1

  // Set canvas as to png
  try {
    return await canvas.encode("png");
  } catch (e) {
    console.error(e);
    throw "Could not create png image this time.";
  }
};
