Place your favicon files in this folder so Vite will serve them at the root URL.

Recommended filenames (browsers look for these names):
- favicon.ico          -> /favicon.ico
- favicon-32x32.png    -> /favicon-32x32.png
- apple-touch-icon.png -> /apple-touch-icon.png

How to create a favicon from a PNG (ImageMagick):
1) Install ImageMagick (https://imagemagick.org)
2) Convert PNG to ICO:
   magick convert your-image.png -resize 64x64 favicon.ico
3) Also create a 32x32 PNG for better compatibility:
   magick convert your-image.png -resize 32x32 favicon-32x32.png

After placing files, reload your dev server page (hard refresh). If using Vite preview/build, restart the preview:

npm run dev    # dev server
npm run preview # preview built assets

If you want, upload the image file here and I can place it into `public/` for you.
