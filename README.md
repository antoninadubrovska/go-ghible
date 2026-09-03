# React + TypeScript + Vite



Go Ghibli
Miniprojekt 1, TypeScript + React
Mål
Huvudsyftet med uppgiften är att repetera gamla tekniker, och integrera TypeScript i ett lite större projekt.
Repetera React
Träna TypeScript
Använda AJAX
Validera variablernas värden
Skapa snygga CSS-stilar

Uppgift
Din uppgift är att bygga en frontend-app där man kan läsa om filmer av Studio Ghibli. Följande features förväntas finnas:

Filmdata hämtas från Studio Ghibli API
TypeScript ska användas till:
samtliga variabler, inklusive state
samtliga funktioner: parametrar och returtyp
type alias som beskriver datan från API:et
Datan valideras med Zod (gås igenom på lektion)
Användare ska kunna söka efter filmer baserat på deras engelska titel. (Sökning sker i den hämtade datan, inte genom nya API-anrop)
Det ska vara snyggt!
Filmerna ska sorteras efter premiärår, med den senaste först
För varje film ska visas: engelsk titel, beskrivning, (minst) en trevlig bild, regissörens namn.
Användare ska kunna "favoritmarkera" filmer. Markerade filmer kan visas i en separat vy som kallas "favoriter".
Användare kan ändra ordningen på filmer i favorit-vyn.
Användare kan toggla om man har sett en film eller inte i favorit-vyn.

Håll nere scope - håll det enkelt och stilrent! Less is more!

Prioritera - gör det viktigaste först!

Bedömning och feedback?
Du som vill ha feedback från läraren kan utnyttja lektionstid (när vi inte har genomgång) till att be om feedback.


hierarchy:

Film
 │
 └── UserFilm
       │
       └── FavoriteFilm


















This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
