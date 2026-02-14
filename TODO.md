# TODO

## Font Awesome Metadata Pipeline

- [ ] Pull in the Font Awesome package(s) needed to access full icon metadata (including Pro where applicable).
- [ ] Create a separate package in the monorepo dedicated to building the icon registry metadata.
- [ ] Move metadata generation logic out of `packages/ui/scripts/generate-fa-registry.ts` into that new package.
- [ ] Ensure the new package outputs a `fa-registry.json` containing at least:
	- icon name,
	- searchable keywords,
	- available styles,
	- source/licence hints where possible.
- [ ] Add scripts in the new package for:
	- generating metadata,
	- validating output shape,
	- writing output for consumption by `@luaris/ui`.
- [ ] Wire `@luaris/ui` to consume the generated registry from the new package output.
- [ ] Add docs describing how to refresh metadata and how Pro metadata is supplied.
