# IMPROVEMENT LIST

## Performance
 - [ ] splitting styles for crucial and ones that can be deferred to load (or move to style block in HTML since as of now there aren't too many of them) avoid render blocking requests
 - [x] remove big background images and replace with css gradients
 - [ ] increase cache lifespan of resources like styles

## Accessibility
- [ ] check contrast of text against background to satisfy at least AA standard
- [ ] aria-labels and roles could be provided for elements like snackbars
- [ ] check if all elements are focusable and have proper indicators

## SEO
 - [ ] meta-data like description, title could be added to head
 - [ ] open graph tags could be added for better social sharing
 - [ ] add structured data (JSON-LD)
 - [ ] add canonical URL
 - [ ] if it's existing content and some pages have been moved around proper  301 redirection shall be done so whole positioning is not lost

## Design
- [ ] choose better font ;)
- [ ] introduce minimal design system with font, spacing colors hierarchy
- [ ] micro interactions like hovers, elevations could be used
- [ ] add favicon to increase site identity
