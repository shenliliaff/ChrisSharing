# Reading Search Sidebar Redirect

## Goal

Search results for reading notes must open the independent reading site so its
reading-notes sidebar is displayed instead of the main site's notes sidebar.

## Design

`scripts/prepare-reading.mjs` will continue to generate `/reading-search/`
pages so VuePress can index the reading-note content. Each generated page will
also redirect the browser to the corresponding Docsify route:

`/reading/index.html#/<article-file-name>`

The generated page keeps its title and body so the VuePress search index remains
unchanged. The redirect is client-side, allowing the search result to be
indexed while sending a visitor to the reading site after they open it.

## Validation

Run `pnpm docs:build` and inspect a generated reading-search page to verify it
contains the expected Docsify route. The build must complete successfully.
