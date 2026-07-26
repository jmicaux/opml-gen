# OPML generator

Static rebuild of my old `opml-gen.ovh` website.  A lightweight web app that generates an OPML 2.0 file in your browser from a list of RSS feed URLs. 

![stack](https://img.shields.io/badge/stack-vanilla_JS-f7df1e) ![no build](https://img.shields.io/badge/build-none-brightgreen) ![output](https://img.shields.io/badge/output-OPML_2.0-3b82f6)

If you enjoy this tool, you can support it:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy_me_a_coffee-ffdd00?style=flat-square&logo=buymeacoffee&logoColor=1a1a1a)](https://buymeacoffee.com/jmicaux)

## Features

- **Paste and generate** — turn a list of RSS feed URLs into a valid OPML 2.0 file, entirely
  in the browser.
- **Fully static** — no build step, no server, no dependencies.

## Install & usage

Open `index.html` in a browser. No server is required.

## Project structure

```
opml-gen/
├── index.html   # page markup
├── styles.css   # page styles
├── app.js       # OPML generation logic
├── assets/      # opml-icon.png (recovered from the Internet Archive)
└── README.md
```

## License

Licensed under the [PolyForm Noncommercial License 1.0.0](LICENSE.md): you are free to fork,
modify and share this project **for noncommercial purposes**, as long as you keep the
attribution (`Required Notice: Copyright jmicaux`). Commercial use is not permitted.

## Credits

Built with the help of [Claude](https://claude.ai/code).
