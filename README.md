# flomado. — Portfolio

Persönliche Landingpage von flomado. — DJ, Posterdesigner und angehender Filmemacher.

## Inhalt
- `index.html` — die komplette Seite (HTML/CSS/JS in einer Datei, keine Build-Tools nötig)
- `editor/` — lokaler Baukasten zum Verschieben von Abschnitten/Elementen (siehe unten)

## Lokal ansehen
Muss über einen lokalen Server laufen (nicht per Doppelklick öffnen, sonst funktionieren `fetch`-Aufrufe wie im Baukasten nicht):

```
python3 -m http.server
```

Dann `http://localhost:8000/index.html` öffnen.

## Baukasten — Elemente frei verschieben
Unter `editor/index.html` (bei laufendem lokalen Server: `http://localhost:8000/editor/`) öffnet sich ein visueller Editor:
- Lädt automatisch die echte `index.html`.
- Abschnitte und Elemente lassen sich im Canvas oder im Ebenen-Panel (rechts) per Drag &amp; Drop neu anordnen.
- Nur Reihenfolge/Position ändert sich — Design (CSS) und Skripte bleiben beim Export unangetastet, damit nichts kaputtgehen kann.
- Button „Exportieren & herunterladen" lädt eine neue `index.html` herunter — damit die bestehende Datei ersetzen und committen.

## Mit GitHub Pages veröffentlichen
Nach dem Push: Repo-Settings → Pages → Branch `main`, Ordner `/ (root)` auswählen. Die Seite ist danach unter `https://<dein-username>.github.io/flomado/` erreichbar.
