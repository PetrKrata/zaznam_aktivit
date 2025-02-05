# Technická specifikace aplikace Tréninkový deník

---

## Obsah
1. [Datový logický model](#datový-logický-model)
   - [Entity a vztahy](#entity-a-vztahy)
   - [Diagram](#diagram)
2. [Popis architektury a jejích částí](#popis-architektury-a-jejích-částí)
   - [Hlavní vrstvy architektury](#hlavní-vrstvy-architektury)
   - [Datové toky](#datové-toky)
   - [Popis tříd](#popis-tříd)
3. [Použité technologie a funkčnosti jednotlivých částí](#použité-technologie-a-funkčnosti-jednotlivých-částí)
   - [Frontend](#frontend)
   - [Datová vrstva](#datová-vrstva)
   - [Vizualizace](#vizualizace)
   - [Sekce aplikace](#sekce-aplikace)

---

## Datový logický model

Aplikace pracuje s daty strukturovanými do následujících entit:

### Entity a vztahy

- **Workout (Trénink):**
  - `date`: Datum tréninku (string, formát YYYY-MM-DD).
  - `time`: Čas zahájení tréninku (string, formát HH:mm).
  - `duration`: Délka tréninku v minutách (integer).
  - `exercise`: Typ cvičení (např. "Běh").

- **WorkoutCollection (Správa tréninků):**
  - `workouts`: Kolekce záznamů typu `Workout`.

- **UserAction (Akce uživatele):**
  - `actionType`: Řetězec (např. "Edit", "Delete", "Import").
  - `timestamp`: Časová značka akce (string).

### Diagram

- `Workout (1:N) -> WorkoutCollection`
- `UserAction (1:N) -> WorkoutCollection`

---

## Popis architektury a jejích částí

Aplikace je navržena jako **Single Page Application (SPA)** s lokálním uložištěm dat v prohlížeči (`localStorage`).

### Hlavní vrstvy architektury

1. **Frontend (prezentace):**
   - HTML, CSS, JavaScript.
   - Zajišťuje uživatelské rozhraní a interakci.
   - Spravuje zobrazení dat
