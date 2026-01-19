# QR Generator Premium 🚀

Nowoczesny i stylowy generator kodów QR zbudowany w React + Vite. Pozwala na pełną personalizację ramek, tekstów "SCAN ME", czytelnych linków oraz eksport do wysokiej jakości formatu PNG (również z przezroczystym tłem).

## Funkcje
- ✨ **Podgląd na żywo**: Wszystkie zmiany są widoczne natychmiast.
- 🖼 **Custom Framing**: Dodawaj napisy nad lub pod kodem QR.
- 📐 **Pełna kontrola rozmiaru**: Regulacja wielkości tekstów do 6rem.
- 🎨 **Personalizacja kolorów**: Wybierz kolory dla kodu i opisu.
- 🏁 **Przezroczystość**: Opcja eksportu z przezroczystym tłem.
- 📱 **Responsive Design**: Działa świetnie na każdym urządzeniu.

## Hosting na Cloudflare Pages

Ten projekt jest w pełni kompatybilny z **Cloudflare Pages** i zoptymalizowany pod **Bun**. Aby go zahostować:

1. Wgraj kod na swoje repozytorium GitHub.
2. W panelu Cloudflare wybierz **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**.
3. Wybierz swoje repozytorium.
4. W ustawieniach budowania (**Build settings**) użyj:
   - **Framework preset**: `Vite`
   - **Build command**: `bun run build`
   - **Build output directory**: `dist`
5. W sekcji **Environment variables** (opcjonalnie) dodaj:
   - `BUN_VERSION`: `latest`
6. Kliknij **Save and Deploy**.

## Instalacja lokalna

1. Zainstaluj **Bun** (jeśli nie masz): [bun.sh](https://bun.sh)
2. Zainstaluj zależności:
   ```bash
   bun install
   ```
3. Uruchom serwer deweloperski:
   ```bash
   bun run dev
   ```
