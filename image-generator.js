import OpenAI from "openai";

const openai = new OpenAI();


async function generateImage(prompt) {
  const response = await openai.images.generate({
    prompt: prompt,
    // Adjust these options as desired
    n: 1, // Number of images to generate (default: 1)
    size: "1024x1024", // Image size (default: 1024x1024)
    quality: "standard", // Image quality (options: "standard" or "hd")
  });

  const imageUrl = response.data[0].url;
  return imageUrl;
}

// Example usage
const prompt = "AI Image of dragon";

generateImage(prompt)
  .then(imageUrl => console.log(imageUrl))
  .catch(error => console.error(error));