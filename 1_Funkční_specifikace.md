# Funkční specifikace aplikace Tréninkový deník

---

## Obsah
1. [Datový konceptuální model](#datový-konceptuální-model)
    - [Entity a jejich atributy](#entity-a-jejich-atributy)
    - [Vztahy mezi entitami](#vztahy-mezi-entitami)
2. [Charakteristika funkčností aplikace](#charakteristika-funkčností-aplikace)
3. [Specifikace uživatelských rolí a oprávnění](#specifikace-uživatelských-rolí-a-oprávnění)
4. [Uživatelské grafické rozhraní a jeho funkčnosti](#uživatelské-grafické-rozhraní-a-jeho-funkčnosti)

---

## Datový konceptuální model

Aplikace pracuje s daty reprezentovanými jako entity s následujícími vztahy:

### Entity a jejich atributy

- **Workout (Trénink):**
  - `date`: Datum tréninku (string, formát dd.mm.rrrr)
  - `time`: Čas začátku tréninku (string, formát HH:mm)
  - `duration`: Trvání v minutách (integer)
  - `exercise`: Typ cvičení (string, např. "Běh")

- **WorkoutCollection (Správa tréninků):**
  - **Atributy:**
    - `workouts`: Kolekce záznamů typu `Workout`
  - **Funkce:**
    - Přidávání, mazání a úpravy záznamů
    - Filtrování podle data, času nebo typu cvičení
    - Ukládání a načítání dat z `localStorage`

- **UserAction (Akce uživatele):**
  - **Atributy:**
    - `actionType`: Typ akce ("Import", "Export", "Edit")
    - `timestamp`: Datum a čas provedení akce

### Vztahy mezi entitami

- `Workout` je součástí `WorkoutCollection`.
- `UserAction` interaguje s `WorkoutCollection`.

---

## Charakteristika funkčností aplikace

### Hlavní funkce

1. **Správa tréninků:**
   - Přidávání nových tréninků pomocí formuláře.
   - Úprava nebo mazání existujících záznamů.
   - Filtrování záznamů podle měsíce nebo typu cvičení.

2. **Vizualizace dat:**
   - Grafické znázornění celkového času jednotlivých typů cvičení pomocí knihovny Chart.js.
   - Dynamická aktualizace grafu při změně dat.

3. **Export a import dat:**
   - Export záznamů do JSON souboru pro zálohování.
   - Import záznamů z JSON souboru.

4. **Ukládání a načítání dat:**
   - Automatické ukládání záznamů do `localStorage`.
   - Načtení existujících záznamů při spuštění aplikace.

---

## Specifikace uživatelských rolí a oprávnění

### Role: Uživatel

- **Oprávnění:**
  - Vytvářet nové záznamy
  - Upravit nebo smazat existující záznamy
  - Exportovat a importovat data
  - Filtrovat data

- **Omezení:**
  - Přístup pouze k datům uloženým lokálně v `localStorage`.

---

## Uživatelské grafické rozhraní a jeho funkčnosti

### Hlavní stránka

- Obsahuje formulář pro přidávání nových záznamů.
- Tabulka s historií tréninků.
- Interaktivní graf s daty o trénincích.

### Sekce

1. **Formulář:**
   - Pole pro zadání datumu, času, trvání a typu cvičení.
   - Tlačítko "Přidat trénink".

2. **Tabulka historie:**
   - Zobrazuje datum, čas, trvání a typ každého tréninku.
   - Checkboxy pro výběr záznamů k úpravě nebo mazání.

3. **Grafická vizualizace:**
   - Barový graf zobrazující celkový čas podle typů cvičení.

4. **Export/Import:**
   - Tlačítka "Export do JSON" a "Import JSON" pro správu dat.

### Návrh vzhledu

1. **Formulář:**
   - Pole a tlačítka zarovnaná vertikálně.

2. **Tabulka:**
   - Jednoduchá tabulka s řádky reprezentujícími jednotlivé záznamy.

3. **Graf:**
   - Interaktivní barový graf umístěný pod tabulkou.
