from openai import OpenAI
from dotenv import load_dotenv
import os
import json

# Load environment variables
load_dotenv()

# Create OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Read Publix deals from text file
with open("deals.txt", "r") as file:
    deals = file.read()

# -----------------------------
# STEP 1: Convert deals into ingredients
# -----------------------------

ingredient_prompt = f"""
Convert these grocery deals into simple cooking ingredients.

Deals:
{deals}

Return ONLY a comma-separated ingredient list.
"""

ingredient_response = client.chat.completions.create(
    model="gpt-4.1-mini",
    messages=[
        {
            "role": "user",
            "content": ingredient_prompt
        }
    ]
)

ingredients = ingredient_response.choices[0].message.content

print("\nINGREDIENTS:")
print(ingredients)

# -----------------------------
# STEP 2: Generate recipes as JSON
# -----------------------------

recipe_prompt = f"""
Create 3 easy dinner recipes using these ingredients:

{ingredients}

Assume common pantry staples are available:
salt, pepper, olive oil, butter, garlic powder, flour, rice, pasta.

Return ONLY valid JSON.

Use this exact structure:

{{
  "recipes": [
    {{
      "title": "Recipe Name",
      "cook_time": "30 minutes",
      "ingredients": ["ingredient 1", "ingredient 2"],
      "instructions": [
        "Step 1",
        "Step 2"
      ]
    }}
  ]
}}
"""

recipe_response = client.chat.completions.create(
    model="gpt-4.1-mini",
    response_format={"type": "json_object"},
    messages=[
        {
            "role": "system",
            "content": "You are a JSON API. Always return valid JSON only."
        },
        {
            "role": "user",
            "content": recipe_prompt
        }
    ]
)

recipes_text = recipe_response.choices[0].message.content

# Print raw AI response for debugging
print("\nRAW AI RESPONSE:")
print(recipes_text)

# Convert JSON text into Python data
recipes_data = json.loads(recipes_text)

# Extract recipes array
recipes = recipes_data["recipes"]

# Save recipes to recipes.json
with open("recipes.json", "w") as json_file:
    json.dump(recipes, json_file, indent=2)

print("\nRecipes saved to recipes.json")