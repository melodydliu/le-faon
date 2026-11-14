/**
 * The colorway a visitor last picked for each piece, shared between the catalog cards
 * and the piece page, so choosing "Ivory" on a card opens the page on Ivory.
 *
 * Lives in memory for the visit only (it survives client-side navigation, not a reload).
 * On the server it is always empty, so prerendered pages show each piece's first colorway.
 */

const chosen = new Map<string, string>();

export function getChosenColorway(slug: string, available: { id: string }[]): string {
  const id = chosen.get(slug);
  return id && available.some((c) => c.id === id) ? id : available[0].id;
}

export function setChosenColorway(slug: string, id: string) {
  chosen.set(slug, id);
}
