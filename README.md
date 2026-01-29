# Inlämningsuppgift 1 – Webbshop (FED25D)

Detta projekt är en webbshop byggd som en del av **Inlämningsuppgift 1** i kursen Frontend Development.  
Webbshopen är byggd med **Vanilla JavaScript**, **HTML** och **Sass**, och uppfyller samtliga krav enligt uppgiftsbeskrivningen.

## 🔧 Tekniker
- HTML5 (en enda HTML-fil)
- Vanilla JavaScript (ES Modules)
- Sass (CSS)
- Vite
- GitHub Pages

## 🛒 Funktionalitet

### Generellt
- Webbshopen består av **en sida (index.html)**  
- Responsiv design (mobil, tablet, desktop)
- Tillgänglig navigering (tangentbord, formulär, knappar)
- Produkter är hårdkodade i JavaScript

### Produkter
- Minst 10 produkter
- Varje produkt har:
  - namn
  - pris
  - kategori
  - rating
- Filtrering på kategori
- Sortering på:
  - namn
  - pris
  - rating

### Varukorg
- Realtidsuppdatering av totalsumma
- Endast valda produkter visas i varukorgen
- Visuell feedback vid ändring av totalsumma
- Öka/minska antal per produkt
- Ta bort produkter

### Rabatter & specialregler
- Måndagsrabatt: −10 % före kl. 10
- Helgpåslag: +15 % (fredag kl. 15 → måndag kl. 03)
- Mängdrabatt: −10 % vid minst 10 av samma sort
- Tisdagsrabatt: −25 kr på jämna veckor
- Rabattkod:  
  `a_damn_fine-cup_of-coffee` → hela beställningen blir 0 kr
- Fettisdagen:
  - priser visas i rött
  - bakgrundsbild ändras
- Alla hjärtans dag:
  - hjärtformad munk läggs automatiskt till

### Frakt & leverans
- Fri frakt vid fler än 15 produkter
- Annars: 25 kr + 10 % av totalbelopp
- Leveranstid:
  - Standard: 30 min
  - Helg: 90 min
  - Natt (00–05): 45 min
  - Fredag 11–13: leverans kl. 15:00 (veckomöte)

### Checkout & formulär
- Fullständig formulärvalidering
- Betalsätt:
  - Kort
  - Faktura (personnummer krävs och valideras)
- Faktura ej tillgänglig vid totalsumma över 800 kr
- Checkbox för GDPR (obligatorisk)
- Nyhetsbrev är ikryssad som default
- Beställningsknappen aktiveras först när formuläret är korrekt ifyllt
- Beställningen rensas automatiskt efter 15 minuter om den inte slutförs

## 🚀 Deployment
Projektet är deployat via **GitHub Pages** med GitHub Actions.

🔗 **Live version:**  
_(lägg in GitHub Pages-länken här)_

## 📦 Installation (lokalt)
```bash
npm install
npm run dev
