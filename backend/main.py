import os
import dotenv
import datasets
import google.generativeai as genai
import io
import base64
import hashlib
import json
import concurrent.futures

dotenv.load_dotenv()
GOOGLE_GENERATIVE_AI_API_KEY = os.getenv("GOOGLE_GENERATIVE_AI_API_KEY")

genai.configure(api_key=GOOGLE_GENERATIVE_AI_API_KEY)

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

def process_image(entry):
    """Process a single image and generate a prompt."""
    image = entry.get("image")
    image_hash = hash_image(image)
    model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest")
    response = model.generate_content(
        [
            "Write a very detailed prompt of this image. Your response should be one paragraph long, and should describe the image in detail just like an image generation prompt. Include every number, symbol, and letter from the image in your description.",
            image,
        ]
    )
    prompt = response.text
    return {
        "hash": image_hash,
        "code": entry["code"],
        "prompt": prompt,
    }

def process_images(dataset):
    """Process images in the dataset and generate prompts."""
    processed_data = load_processed_data("output.json")
    processed_hashes = {data["hash"] for data in processed_data}
    tasks = []

    with concurrent.futures.ThreadPoolExecutor() as executor:
        for i, entry in enumerate(dataset["train"], start=1):
            if len(tasks) >= 10 - len(processed_data):
                break

            code = entry.get("code")
            code_length = len(code)

            if code_length < 200 or code_length > 2000:
                print(f"Skipping Image {i}: Invalid code length.")
                continue

            image = entry.get("image")
            image_hash = hash_image(image)

            if image_hash in processed_hashes:
                print(f"Skipping Image {i}: Already processed.")
                continue

            future = executor.submit(process_image, entry)
            tasks.append(future)

        for future in concurrent.futures.as_completed(tasks):
            try:
                result = future.result()
                processed_data.append(result)
                save_processed_data("output.json", processed_data)
                print(f"Processed Image: {result['prompt']}")
            except Exception as e:
                print(f"Error processing image: {e}")

if __name__ == "__main__":
    process_images(dataset)
