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
Nach dem Push: Repo-Settings → Pages → Branch `main`, Ordner `/ (root)` auswählen.

Die Domain **flomado.de** ist bereits als Custom Domain vorbereitet (`CNAME`-Datei im Repo, alle Meta-Tags/Sitemap/robots.txt zeigen darauf). Damit sie tatsächlich funktioniert, fehlen noch zwei Schritte außerhalb des Repos:

1. **DNS beim Domain-Anbieter einrichten** (für `flomado.de` ohne `www`):
   - 4× **A-Record** auf `@`/Root, zeigend auf:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Optional 4× **AAAA-Record** (IPv6) auf `@`, zeigend auf:
     `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - Falls du auch `www.flomado.de` erreichbar haben willst: **CNAME**-Record `www` → `phlipztv.github.io`
2. **GitHub Repo-Settings → Pages**: unter "Custom domain" `flomado.de` eintragen und speichern (GitHub erkennt die `CNAME`-Datei ggf. automatisch), dann warten bis das DNS-Check grün ist und **"Enforce HTTPS"** aktivieren (das SSL-Zertifikat kann bis zu 24h dauern).

## SEO / Auffindbarkeit
Vorbereitet für Suchmaschinen:
- `robots.txt` + `sitemap.xml` (zeigen auf `flomado.de`)
- Meta-Description, Open-Graph- & Twitter-Card-Tags (fürs Teilen in Social Media/Messengern)
- `Person`-Structured-Data (JSON-LD) mit Name, Berufen und Social-Links, für bessere Darstellung in Google
- `favicon.svg`

### Noch offen (außerhalb des Repos)
1. Bei Google Search Console die Domain `flomado.de` verifizieren und `sitemap.xml` einreichen.
2. Link zur Website in Instagram-Bio, SoundCloud-Profil und YouTube-Kanal ergänzen — das bringt oft mehr als alles Technische.
