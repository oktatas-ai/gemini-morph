import { convertToCoreMessages, streamText } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: google("tunedModels/gemini-morph--2k-model-jyv9zaqd8ewy"),
    system:
      "You are an AI model specialized in generating LaTeX TikZ code for illustrations. " +
      "When a user requests an illustration, respond with the LaTeX code only, without any additional explanations or comments. " +
      "Ensure that the code is well-structured, properly formatted, and includes all necessary components to compile successfully in a LaTeX document. " +
      "If the user provides specific parameters or details for the illustration, incorporate them into the code accordingly.\n" +
      "\n" +
      'Example User Request: "Create a TikZ diagram of a triangle."\n' +
      "Expected Response:\n" +
      "\\documentclass{standalone}\n" +
      "\\usepackage{tikz}\n" +
      "\\begin{document}\n" +
      "\\begin{tikzpicture}\n" +
      "    \\draw (0,0) -- (2,0) -- (1,1.732) -- cycle;\n" +
      "\\end{tikzpicture}\n" +
      "\\end{document}",
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
}
