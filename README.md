# Shirobako Calendar

## TODOs

- [x] Finish the "Flashback" page (probably rename it, too)
- [x] Remove manual image optimization
- [x] Remove "flashback" special rules
- [ ] Add a switch for 12/24h.
- [x] Switch to MDX to make an image carousel.
- [x] Match linter config with t3-app's (currently massively overkill)
- [ ] Fix image height for horizontal mobile devices.
- [ ] Add sunrise/-down to calendar pages
- [ ] Fix date formats
- [ ] Add links to dates where applicable
- [ ] Fix 2014-11-23 thumbnail

## FAQ

### Isn't a Next.js App for a static site with fairly little interactivity like this overkill?

Probably. Something like Astro would be more fitting for the job.

Next.js is just what I know and can probably make most things work with it, even if it is not the right tool for the job.

### The calendar detail pages look a lot like Nextra. Why not just use that?

In hindsight, I probably should have. It did not look like it would be fitting when I was starting out, but I ended up designing the navigation after Nextra's and opted into using MDX components at some point, too.
