import { BannerImageInput, DataId, DataType } from "@/models/banner";
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
      wordArray.push({ line, x, y });
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
      wordArray.push({ line, x, y });
    }
  }

  // And return the words in array, along with the total line height
  // which will be (totalLines - 1) * lineHeight
  return { wordArray, totalLineHeight };
};

export const generateMainImage = async function (imageInput: BannerImageInput) {
  // Create canvas
  const canvas = createCanvas(1500, 500);
  const ctx = canvas.getContext("2d");

  // Add gradient - we use createLinearGradient to do this
  let grd = ctx.createLinearGradient(0, 0, 1500, 500);

  const gradientWidget = imageInput?.widgets
    ?.filter((w) => w?.type == DataType.background)
    ?.at(0)?.data?.data;
  console.log("setting gradient background colors", gradientWidget?.colors);
  gradientWidget?.colors?.forEach((c, i) => {
    grd.addColorStop(
      ((1500 / gradientWidget?.colors.length) * (i + 1)) / 1500,
      c
    );
  });
  ctx.fillStyle = grd;
  // Fill our gradient
  ctx.fillRect(0, 0, 1500, 500);

  // // Write our Emoji onto the canvas
  // ctx.fillStyle = "white";
  // ctx.font = "95px AppleEmoji";
  // ctx.fillText(emoji, 85, 700);

  // Add our title text
  ctx.font = "95px Nunito";
  ctx.fillStyle = "white";

  const textWidgets = imageInput?.widgets?.filter(
    (w) => w?.type === DataType.text
  );

  textWidgets?.forEach((w) => {
    const textWidget = w?.data;

    if (
      !textWidget?.value ||
      !textWidget?.top ||
      !textWidget?.left ||
      !textWidget?.size
    ) {
      return;
    }

    const { wordArray, totalLineHeight } = wrapText(
      ctx,
      textWidget?.value,
      textWidget?.left,
      textWidget?.top,
      textWidget?.size,
      100
    );
    // We will fill our text which is item[0] of our array, at coordinates [x, y]
    // x will be item[1] of our array
    // y will be item[2] of our array, minus the line height (wrappedText[1]), minus the height of the emoji (200px)
    wordArray?.forEach((word) => {
      ctx.fillText(word.line, word.x, word.y - totalLineHeight - 200); // 200 is height of an emoji
    });
  });
  // Set canvas as to png
  try {
    return await canvas.encode("png");
  } catch (e) {
    console.error(e);
    throw "Could not create png image this time.";
  }
};
