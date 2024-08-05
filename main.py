import os
import dotenv
import datasets
import google.generativeai as genai

dotenv.load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)

dataset = datasets.load_dataset("HuggingFaceM4/datikz")
