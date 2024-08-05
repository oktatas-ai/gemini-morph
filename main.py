import os
import dotenv
import datasets
import google.generativeai as genai
import io
import base64
import hashlib
import json

dotenv.load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)

dataset = datasets.load_dataset("HuggingFaceM4/datikz")

def encode_image(image):
    """Encode a PIL image to a base64 string."""
    with io.BytesIO() as buffered:
        image.save(buffered, format="PNG")
        return base64.b64encode(buffered.getvalue()).decode("utf-8")

def hash_image(image):
    """Generate a hash for the given image."""
    with io.BytesIO() as buffered:
        image.save(buffered, format="PNG")
        return hashlib.md5(buffered.getvalue()).hexdigest()

def load_processed_data(file_path):
    """Load existing processed data from a JSON file."""
    try:
        with open(file_path, "r") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []

def save_processed_data(file_path, data):
    """Save processed data to a JSON file."""
    with open(file_path, "w") as f:
        json.dump(data, f, indent=4)
