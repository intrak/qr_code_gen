# QR Generator Premium 🚀

[Wersja polska poniżej](#wersja-polska)

A modern and stylish QR code generator built with React + Vite. It allows for full customization of frames, "SCAN ME" labels, readable links, and high-quality PNG export (including transparent background support).

## Features
- ✨ **Live Preview**: All changes are visible instantly.
- 🖼 **Custom Framing**: Add labels above or below the QR code.
- 📐 **Full Size Control**: Adjust text sizes up to 6rem.
- 🎨 **Color Customization**: Choose colors for the code and captions.
- 🏁 **Transparency**: Option to export with a transparent background.
- 📱 **Responsive Design**: Works great on any device.

## Hosting on Cloudflare Pages

This project is fully compatible with **Cloudflare Pages** and optimized for **Bun**. To host it:

1. Upload the code to your GitHub repository.
2. In the Cloudflare dashboard, select **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**.
3. Select your repository.
4. In **Build settings**, use:
   - **Framework preset**: `Vite`
   - **Build command**: `bun run build`
   - **Build output directory**: `dist`
5. In the **Environment variables** section (optional), add:
   - `BUN_VERSION`: `latest`
6. Click **Save and Deploy**.

### Deploy from CLI (Wrangler)

Since `wrangler.json` is configured, you can deploy directly from your terminal using Bun:

1. **Build the app**:
   ```bash
   bun run build
   ```
2. **Deploy to Cloudflare**:
   ```bash
   bun run deploy
   ```
   *(This runs `bun x wrangler deploy` under the hood)*

## Local Installation

1. Install **Bun** (if you don't have it): [bun.sh](https://bun.sh)
2. Install dependencies:
   ```bash
   bun install
   ```
3. Run the development server:
   ```bash
   bun run dev
   ```

---

# Wersja polska

Nowoczesny i stylowy generator kodów QR zbudowany w React + Vite. Pozwala na pełną personalizację ramek, tekstów "SCAN ME", czytelnych linków oraz eksport do wysokiej jakości formatu PNG (również z przezroczystym tłem).

## Funkcje
- ✨ **Podgląd na żywo**: Wszystkie zmiany są widoczne natychmiast.
- 🖼 **Custom Framing**: Dodawaj napisy nad lub pod kodem QR.
- 📐 **Pełna kontrola rozmiaru**: Regulacja wielkości tekstów do 6rem.
- 🎨 **Personalizacja kolorów**: Wybierz kolory dla kodu i opisu.
- 🏁 **Przezroczystość**: Opcja eksportu z przezroczystym tłem.
- 📱 **Responsive Design**: Działa świetnie na każdym urządzeniu.

## Instalacja lokalna

1. Zainstaluj **Bun**: [bun.sh](https://bun.sh)
2. Zainstaluj zależności: `bun install`
3. Uruchom: `bun run dev`

### Deploy z terminala (Wrangler)

Ponieważ plik `wrangler.json` jest skonfigurowany, możesz wrzucić aplikację bezpośrednio z terminala używając Bun:

1. **Zbuduj aplikację**:
   ```bash
   bun run build
   ```
2. **Wyślij na Cloudflare**:
   ```bash
   bun run deploy
   ```
   *(Ta komenda uruchamia pod spodem `bun x wrangler deploy`)*
