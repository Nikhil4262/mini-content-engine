const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generatePrompt = async (productName, description) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const prompt = `
Generate a professional product photography prompt.

Product: ${productName}
Description: ${description}

Return only the image prompt.
`;

    const result = await model.generateContent(prompt);
    return result.response.text().trim();

  } catch (error) {
    console.log("Gemini failed. Using fallback prompt.");

    return `Ultra-realistic premium product photography of ${productName}. ${description}. Luxury commercial advertising, soft natural lighting, clean background, shallow depth of field, 8K, highly detailed.`;
  }
};