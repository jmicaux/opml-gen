# Contributing to OPML Generator

Thanks for your interest in improving OPML Generator! It's a tiny, dependency-free static
app — contributions that keep it simple are very welcome.

## Getting started

No build step, no dependencies, no server. Just open `index.html` in a browser. To avoid
`file://` quirks you can serve the folder:

```bash
python -m http.server 8000   # then open http://localhost:8000
```

## Coding conventions

- **Vanilla JavaScript**, no framework, no build tooling, no runtime dependencies.
- Match the existing style (2-space indent, single quotes, small focused functions).
- Everything runs client-side; keep output rendering safe (use `textContent`, and keep
  `escapeXml` on every value written into the generated OPML).

## Submitting changes

1. Create a feature branch from `main`.
2. Keep the change focused and describe the *why* in the PR.
3. Add a `CHANGELOG.md` entry for user-facing changes and bump the version.

## Reporting bugs

Open a [GitHub issue](https://github.com/jmicaux/opml-gen/issues) with steps to reproduce
and a sample of the feed URLs involved. For security issues, see [SECURITY.md](SECURITY.md).

## License

By contributing, you agree that your contributions are licensed under the
[PolyForm Noncommercial License 1.0.0](LICENSE.md) — noncommercial use only.
