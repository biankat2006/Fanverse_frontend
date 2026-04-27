# Fanverse Central frontend

## A projektről:
```markdown
A Fanverse Central egy modern, közösségorientált platform, amelyet Timári Bianka és Fülöp Attila Ákos készített el. Az oldal elsődleges célja, hogy központi találkozóhelyet biztosítson a rajongói alkotások, független fejlesztések és a kreatív közösségek számára.

Az inspiráció:
Az oldal fejlesztése során a készítők a népszerű Game Jolt platformot vették alapul. Ez az inspiráció visszaköszön a felhasználóbarát felületben, a tartalomközpontú felépítésben és abban a szemléletmódban, amely a független alkotók támogatását helyezi a középpontba.

A Fanverse Central nem csupán egy weboldal, hanem egy digitális otthon mindazok számára, akik szeretnének elmerülni a rajongói univerzumok világában, legyen szó játékról, művészetről vagy közösségi élményekről.

Az oldalt itt lehet megtekinteni: [Fanverse Central](https://fanversecentral.netlify.app/)
```
---
## Készítette:
- Fülöp Attila Ákos(Backend, SQL adatbázis, Frontend)
- Timári Bianka(Frontend, SQL adatbázis, Backend)
---
## Projekt szerkezet

```markdown
├── public/
│   └── vite.svg
├── src/
│   ├── assets
│       └──  react.svg
│   ├── components
│       ├── Button.jsx
│       ├── GameCard.jsx
│       ├── Images.jsx
│       ├── Input.jsx
│       ├── NavBar.jsx
│       └── Table.jsx
│   ├── context
│       └── AuthContext.jsx
│   ├── cssfolder
│       ├── admin.css
│       ├── gamePage.css
│       ├── login.css
│       ├── mainPage.css
│       ├── navbar.css
│       └── register.css
│   ├── pages
│       ├── Admin.jsx
│       ├── GamePage.jsx
│       ├── Login.jsx
│       ├── MainPage.jsx
│       ├── Profile.jsx
│       ├── Register.jsx
│       └── SearchPage.jsx
│   ├── photos(ezt a mappát át vette a backend mert ezzel teszteltünk   hogy  megjelennek e a képek)
│       ├── background.jpg
│       ├── banner.webp
│       ├── fnafGame.webp
│       ├── logo.png
│       └── pfp.jpg
│   ├── api.js
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── netlify.toml
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```
---

## Design (Figma)

A figma terv gépes nézete:

![Figma terv gépes nézete](https://snipboard.io/8AzWTd.jpg)

A figma terv mobilos nézete:

![Figma terv mobilos nézete](https://snipboard.io/Ay1pUx.jpg)

A figma terv: [Figma terv](https://www.figma.com/design/BbSlQu3Q6b5zKCKN3D3yWq/Untitled?node-id=0-1&p=f&t=Qby5mh8YeWMNbpI0-0)

---

Ez az oldal elérése: [Fanverse Central](https://fanversecentral.netlify.app)

### Main page

Itt látható az összes játék.
Ide fog bedobni az oldal elsőnek

![Main page](https://snipboard.io/EHplwf.jpg)

### Bejelentkezés/Regisztráció

Itt be lehet lépni vagy csinálni egy új fiókot ha nincs.

Bejelentkezés:
![Login](https://snipboard.io/B83hmX.jpg)

Regisztráció:
![Register](https://snipboard.io/SyP45s.jpg)

### Game page

Itt lehet letölteni, szivezni(like) a játékot ha be vagy jelentkezve.

![game page teteje](https://snipboard.io/CcZDTx.jpg)
![game page alja](https://snipboard.io/iZ05Rv.jpg)

### Profile page

Itt a felhasználó meg tudja változtatni a profil képét és a felhasználó nevét és utánna be kell újra jelentkeznie

![profil oldal](https://snipboard.io/BYNbDJ.jpg)

A kép mentése gomb akkor jelenik meg ha más profil képet is raktak be:

![profil kép szerk.](https://snipboard.io/t4hAFC.jpg)

### Kereső panel

A felhasználó rá tud keresni játékokra is

![keresés](https://snipboard.io/ARW0T9.jpg)

### Admin panel

Itt az adminok tudják szerkeszteni az adott felhasználó vagy játékok egyes adatait ha az nem meg felelő

![Felhasználók](https://snipboard.io/1cXJbl.jpg)
![Játékok](https://snipboard.io/fOFXGQ.jpg)
---
## Teszt adatok
### Teszt admin
email: bianka@bianka.com
username: bianka2006_

### Teszt felhasználó
email: tesztuser@teszt.com
username: tesztuser_

