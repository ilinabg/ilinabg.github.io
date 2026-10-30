# ilinabhayagrossman.com

Personal website of Ilina Bhaya-Grossman, built with Jekyll (AcademicPages theme) and hosted on GitHub Pages.

## Editing

- Home page: `_pages/about.md`
- Research: `_pages/publications.md`
- Public Engagement: `_pages/media.md`
- Top menu: `_data/navigation.yml`
- Name, bio, sidebar links: `_config.yml`

Thumbnails: put a small copy (about 480 px wide) in `images/thumbs/` and pass it as `thumb=` next to the full image in the thumbnail include.

## Preview locally

One-time setup (only needed once per machine, or if the `mysite` conda env's Ruby is reinstalled). The gem wrapper scripts expect a `ruby` binary next to them that conda doesn't create, so add the missing symlink:

```
ln -sf ../../../bin/ruby /Users/ilinabg/miniconda3/envs/mysite/share/rubygems/bin/ruby
```

Then, to serve:

```
conda activate mysite
bundle exec jekyll serve
```

Then open http://localhost:4000.

## Publish

Push to `main`. The GitHub Action in `.github/workflows/jekyll.yml` builds and deploys the site automatically.
