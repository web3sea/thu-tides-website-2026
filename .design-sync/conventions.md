# Thu Tides conventions

Thu Tides is a travel, underwater and aerial photography studio working with coastal hotels, dive resorts and liveaboards in Indonesia and the Philippines. Designs should feel calm, bright and editorial: generous whitespace, light-weight type, photography doing the talking.

## Setup: no provider needed
Components render with no wrapper. Styling comes entirely from `styles.css` (Tailwind v4 output plus the site's tokens); load nothing else. Dark mode is the `.dark` class on an ancestor, never `prefers-color-scheme` alone. Toasts need one `<Toaster />` mounted once, then call `toast()` from `sonner`.

## Styling idiom: Tailwind utilities on the shadcn token set
Style layout glue with Tailwind classes. Only classes present in `styles.css` exist, so stay within these families (all verified in the compiled stylesheet):
- Colour tokens (as `bg-*`, `text-*`, `border-*`, `ring-*`): `background`, `foreground`, `card`, `card-foreground`, `popover`, `primary`, `primary-foreground`, `secondary`, `secondary-foreground`, `muted`, `muted-foreground`, `accent`, `accent-foreground`, `destructive`, `border`, `input`, `ring`, `white`, `black`. Opacity suffixes `/5` to `/95` work on `white`, `black`, `foreground`, `background`, `muted-foreground`, `brand-cerulean`.
- Brand palette: `brand-cerulean` (#0B7AA1, the accent), `brand-cerulean-2` (hover), `brand-sage-dry`, `brand-olive-leaf`, `brand-sand`, `brand-sand-light`, `brand-sand-dark`. Use cerulean for one accent per screen, sand tones for warm surfaces. `primary` is the shadcn yellow used by default buttons and badges; prefer `variant="brand"` on `Button` for the studio look.
- Site utilities from `globals.css`: `section-padding`, `section-space-sm|md|lg`, `card-padding-sm|md|lg`, `gap-space-xs|sm|md|lg|xl`, `image-container`, `image-container-md|lg`, `hover-lift`, `hover-scale`, `hover-scale-small`, `transition-fast|normal|slow`, `focus-ring`, `animate-fade-in|slide-up|slide-left|slide-right|scale-in|gentle-pulse`.
- Radius: `rounded-lg|xl|2xl|3xl|4xl` (buttons and badges are `rounded-4xl` pills; cards `rounded-2xl`). Spacing scale `0.5` to `32`, `gap/p/px/py/m/mx/my/space-x/space-y`, responsive prefixes `sm: md: lg: xl:`.
- Type: `text-xs` to `text-7xl`, `font-light|normal|medium|semibold|bold`, `tracking-tight|tighter|wide|widest`, `leading-tight|relaxed`. Body font is Noto Sans via `--font-sans`; `font-mono` is Geist Mono.

## Typography: use the component, not raw headings
`Typography variant="..."` carries the type scale: `hero-title`, `hero-subtitle`, `section-title`, `subsection-title`, `case-intro`, `case-body`, `body-lg`, `body`, `body-sm`, `metadata`, `label`, `caption`, `caption-sm`, `quote`, `quote-sm`, `accent-primary`, `accent-secondary`; plus `align` (`left|center|right|justify`) and `color` (`default|muted|primary|accent`). Shorthands `H1`, `H2`, `H3`, `P`, `Caption`, `Quote` map to the hero/section/subsection/body/caption/quote variants. Known quirk: `accent-primary`/`accent-secondary` inherit the foreground colour; add `text-brand-cerulean` or `text-brand-olive-leaf` yourself.

## Component notes
- `Button` variants: `default`, `brand`, `secondary`, `outline`, `ghost`, `link`, `destructive`; sizes `xs`, `sm`, `default`, `lg`, `icon`, `icon-xs`, `icon-sm`, `icon-lg`. Render as a link with `render={<a href="..." />}` (Base UI render prop), not `asChild`.
- `Badge` variants: `default`, `secondary`, `destructive`, `outline`, `ghost`, `link`.
- `Card` + `CardHeader`/`CardTitle`/`CardDescription`/`CardAction`/`CardContent`/`CardFooter`; `size="sm"` tightens padding; a leading `<img>` child bleeds to the top edge.
- Forms: wrap each control in `Field` with `FieldLabel`, `FieldDescription`, `FieldError`; group with `FieldSet`/`FieldLegend`/`FieldGroup`. Invalid state needs `data-invalid` on `Field` and `aria-invalid` on the control. `InputGroup` composes `InputGroupInput`/`InputGroupTextarea` with `InputGroupAddon` (`align="inline-start|inline-end|block-start|block-end"`), `InputGroupText`, `InputGroupButton`.
- `Select` and `Combobox` are Base UI compounds: `Select` > `SelectTrigger` > `SelectValue`, `SelectContent` > `SelectGroup`/`SelectLabel`/`SelectItem`/`SelectSeparator`. `AlertDialog` and `DropdownMenu` follow the same Trigger/Content/Item pattern.
- Page sections (`HeroWithImage`, `HeroWithImageAndCTA`, `GigaHero`, `OceanQuote`, `CaseStudySection`, `CaseStudyFlow`, `PortfolioSection`, `ServicesSection`, `TestimonialsSection`, `Navigation`, `Footer`, ...) are full-width blocks meant to stack directly in a page; give them the whole row. Image props take URLs; site assets live at `https://www.thutides.com/<file>.webp`.
- `GlassCard` (`variant="default|strong|minimal"`, `padding="sm|md|lg"`) only reads on a dark or photographic background.
- Motion: wrap blocks in `ScrollReveal` / `ScrollRevealStagger` for the site's reveal-on-scroll; `HeroWithImage` animates on load (`animationTrigger="load"`).

## Where the truth lives
Read `styles.css` for tokens and utilities, `guidelines/DESIGN_SYSTEM.md` and `guidelines/COMPONENT_API.md` for the studio's own guidance, and each `components/<group>/<Name>/<Name>.prompt.md` for props and examples.

## Idiomatic example
```tsx
<section className="section-padding bg-background">
  <div className="mx-auto max-w-5xl space-y-6">
    <Typography variant="metadata">Dive resort · Philippines</Typography>
    <Typography variant="section-title">Evolution Divers, Malapascua</Typography>
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Underwater season launch</CardTitle>
          <CardDescription>Thresher sharks at Monad Shoal, first light</CardDescription>
          <CardAction><Badge variant="secondary">Dive resort</Badge></CardAction>
        </CardHeader>
        <CardContent><Typography variant="body">Three mornings of diving, one afternoon of aerials.</Typography></CardContent>
        <CardFooter className="gap-2">
          <Button variant="brand">View case study</Button>
          <Button variant="ghost">Share</Button>
        </CardFooter>
      </Card>
    </div>
  </div>
</section>
```
