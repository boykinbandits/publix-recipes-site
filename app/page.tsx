import recipes from "../recipes.json";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-5xl font-bold mb-10 text-center">
        Publix AI Recipes
      </h1>

      <div className="grid gap-8 max-w-4xl mx-auto">
        {recipes.map((recipe, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-3xl font-bold mb-2">{recipe.title}</h2>

            <p className="text-gray-600 mb-4">
              Cook Time: {recipe.cook_time}
            </p>

            <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
            <ul className="list-disc ml-6 space-y-1 mb-6">
              {recipe.ingredients.map((ingredient, i) => (
                <li key={i}>{ingredient}</li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold mb-2">Instructions</h3>
            <ol className="list-decimal ml-6 space-y-2">
              {recipe.instructions.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </main>
  );
}