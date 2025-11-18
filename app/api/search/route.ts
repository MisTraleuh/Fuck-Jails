// Pour l'export statique (GitHub Pages), on retourne une réponse statique
// car GitHub Pages ne supporte pas les routes API dynamiques
export const dynamic = 'force-static'

export async function GET() {
  // Retourner une réponse statique pour l'export
  // Cette route sera pré-rendue comme une page statique
  return new Response(JSON.stringify({ error: 'Search API not available in static export' }), {
    status: 404,
    headers: { 'Content-Type': 'application/json' },
  })
}
