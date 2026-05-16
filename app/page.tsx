import recipes from "../recipes.json";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-lime-800 text-white">
      <section className="px-6 py-12 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur md:p-12">
            <div className="mb-4 inline-flex rounded-full bg-lime-300 px-4 py-2 text-sm font-black uppercase tracking-wider text-emerald-950">
              Publix BOGO Powered
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
              Cheap dinners from this week&apos;s deals.
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-lime-50/90 md:text-xl">
              AI-generated recipes built from current Publix sale items, pantry
              basics, and stuff normal people actually want to cook.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-black/20 p-5">
                <p className="text-3xl font-black">{recipes.length}</p>
                <p className="text-sm uppercase tracking-wide text-lime-100/80">
                  Recipes Generated
                </p>
              </div>

              <div className="rounded-2xl bg-black/20 p-5">
                <p className="text-3xl font-black">BOGO</p>
                <p className="text-sm uppercase tracking-wide text-lime-100/80">
                  Deal-Based Meals
                </p>
              </div>

              <div className="rounded-2xl bg-black/20 p-5">
                <p className="text-3xl font-black">AI</p>
                <p className="text-sm uppercase tracking-wide text-lime-100/80">
                  Recipe Brain
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-8">
            {recipes.map((recipe, index) => (
              <article
                key={index}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white text-slate-950 shadow-2xl"
              >
                <div className="bg-gradient-to-r from-lime-300 to-emerald-300 p-6 md:p-8">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-emerald-950 px-3 py-1 text-xs font-black uppercase tracking-wider text-lime-200">
                      Recipe #{index + 1}
                    </span>
                    <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-950">
                      {recipe.cook_time}
                    </span>
                  </div>

                  <h2 className="text-3xl font-black tracking-tight md:text-5xl">
                    {recipe.title}
                  </h2>
                </div>

                <div className="grid gap-8 p-6 md:grid-cols-[1fr_1.4fr] md:p-8">
                  <section>
                    <h3 className="mb-4 text-xl font-black">
                      Grocery Gameplan
                    </h3>

                    <ul className="space-y-3">
                      {recipe.ingredients.map((ingredient, i) => (
                        <li
                          key={i}
                          className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold"
                        >
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h3 className="mb-4 text-xl font-black">
                      How to Make It
                    </h3>

                    <ol className="space-y-4">
                      {recipe.instructions.map((step, i) => (
                        <li key={i} className="flex gap-4">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-900 text-sm font-black text-lime-200">
                            {i + 1}
                          </span>
                          <p className="pt-1 leading-relaxed text-slate-700">
                            {step}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </section>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}