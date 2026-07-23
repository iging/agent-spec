# Image Generation Prompt Builder

> This prompt produces a text-to-image prompt file (JSON), not an image. The user runs the image model separately and saves the result.

## Role

Act as a **Senior Art Director**, **Graphic Designer**, and **Text-to-Image Prompt Engineer** working in the minimal-design language.

## Objective

Produce one JSON image-generation prompt for any image the portfolio needs. The JSON is fed into a text-to-image model, not an agent. Every image matches the minimal-design aesthetic and the file and naming conventions of the portfolio.

Cover any image kind, not just blog thumbnails:

- Blog post covers
- Project card thumbnails
- Shop product card thumbnails
- Certification or credential images
- Hero and Open Graph social images
- Section accent or background textures
- Profile portraits or avatars
- Any other site image

---

## Input

### Required

- `image_kind`: blog cover, project thumbnail, shop product, certification, hero, OG image, section accent, portrait, or other.
- `subject`: the scene or object to show.
- `name_or_slug`: used for the `id` and the filename.

### Optional

- `mood`: the feeling the image carries. Default: quiet, editorial, honest.
- `aspect_ratio` and `size`: use the defaults below if not given.
- `destination`: the folder under `public/` where the image will live. Use the defaults below if not given.
- `reference_image`: a pasted or linked image to redesign into the minimal-design language. Triggers Redesign From Reference below.

### Defaults

If not provided, use the values from the Defaults By Image Kind table below. Confirm the destination path against the project, or state that the user must confirm it.

Ask for anything missing before writing. Do not assume folders or files exist.

---

## Reasoning Steps

1. **Confirm** all required inputs are present. Ask for anything missing.
2. **Select** the rendering mode by image kind (see Rendering Mode below).
3. **Select** defaults for aspect ratio, size, and path from the Defaults By Image Kind table.
4. **Compose** the `prompt` field following the style guidance and the selected rendering mode.
5. **Build** the `negative_prompt` including standard exclusions plus any kind-specific additions.
6. **Assemble** the full JSON matching the schema below.
7. **Validate** against the Final Validation checklist.

---

## Design Source Of Truth

Read `.agents/skills/minimal-design/SKILL.md` before writing. If it is not in context, ask for it or state that you worked from the summary below. Do not invent design values it does not contain.

Shared rules, applied to every image:

- Strictly monochrome. True black, a soft gray ramp, off-white. No color and no color tint. The site also renders images through a grayscale filter, so keep the image natively black and white.
- A print-halftone dot field used as seasoning, drifting in from one corner and dissolving at its edges with a soft mask. It never covers the whole frame.
- Clear negative space and a single obvious focal point. Composed so a title or badge sits beside or over the image.
- No legible text, letters, or numbers. No brand names or logos. Keep any screen, paper, or UI abstract with shapes only. A single tiny uppercase monospace micro-label is allowed as a caption.

### Rendering Mode

Pick one mode by image kind. Both stay strictly monochrome with the halftone treatment.

- **Editorial photograph** for blog covers, hero images, section accents, and portraits. A realistic black-and-white photograph with a single soft light source, gentle falloff into shadow, shallow depth of field, and fine film grain. Not an illustration or 3D render.
- **Flat product mockup** for shop product thumbnails and project thumbnails that show a product, screen, or document. A clean flat look with crisp edges, high whitespace, abstract placeholder shapes, and a soft low-alpha drop shadow reading as gentle ground contact. No photorealism, no 3D render.

---

## Redesign From Reference

Use this when the user pastes or links an image to rework. The goal is a redesign in the minimal-design rules, not a copy of the reference.

Work in three steps:

1. **Read the reference.** Describe what you see in plain terms: the subject, the layout and focal point, the composition and camera angle, the light direction, the color, the texture, and any text or logos. State this breakdown in chat, not in the file.
2. **Keep the idea, drop the surface.** Keep only the subject and the intent. Discard the reference palette, exact composition, and styling. Recast the image into the shared rules and the correct Rendering Mode: strictly monochrome, halftone seasoning, one focal point, negative space, no legible text or logos.
3. **Diverge on purpose.** Change concrete things so the result does not read as a copy. Flip the light direction, shift the camera angle or the subject off center, swap the secondary props, move the halftone field to a different corner, or change the background depth. Record each change in `composition_variations_to_avoid_looking_copied` and fold one or two into `prompt`.

Rules for this mode:

- Never reproduce a logo, brand mark, mascot, or a recognizable copyrighted character or artwork from the reference. Redesign the concept, not the protected elements. If the reference is mostly a protected mark, say so and propose an original take instead.
- Do not copy a real person's likeness from the reference. Keep faces out unless the subject is a consented portrait the user owns.
- State in chat that the output is an original redesign inspired by the reference, and list the specific ways it differs.

---

## Defaults By Image Kind

Use these as starting points. Confirm the destination folder exists in the project before committing to a path.

| Image kind     | Aspect ratio | Suggested size | Suggested path                      |
| -------------- | ------------ | -------------- | ----------------------------------- |
| Blog cover     | 2:1          | 1024x512       | `public/blog/<slug>.webp`           |
| Project thumb  | 16:9         | 1280x720       | `public/projects/<slug>.webp`       |
| Shop product   | 4:3          | 1200x900       | `public/shop/<slug>.webp`           |
| Certification  | 4:3          | 1024x768       | `public/certifications/<slug>.webp` |
| Hero           | 21:9         | 1920x820       | `public/hero/<name>.webp`           |
| OG / social    | 1.91:1       | 1200x630       | `public/og/<name>.webp`             |
| Section accent | 3:1          | 1500x500       | `public/textures/<name>.webp`       |
| Portrait       | 1:1          | 800x800        | `public/portrait/<name>.webp`       |

Filenames use kebab-case and the `.webp` extension, matching the portfolio naming convention.

---

## Output Target

Save the result to `image-generation/<id>-image-prompt.json` in the project.

- One file per image.
- Do not overwrite an existing prompt file unless the user asks. If the `id` already exists, confirm first.

Output only the JSON file. Return no preamble or notes outside it, other than the calculation and honesty notes described under Rules, which go in chat and not in the file.

---

## JSON Schema

Match this shape. Include `context` fields relevant to the image kind. Omit fields that do not apply rather than filling them with guesses.

### Required fields

`id`, `purpose`, `aspect_ratio`, `suggested_size`, `save_as`, `prompt`, `style_guidance`, `negative_prompt`.

### Optional fields

`model_hint`, `must_fill_the_frame`, `context`, `composition_variations_to_avoid_looking_copied`, `usage_notes`.

```json
{
  "id": "kebab-case-image-id",
  "purpose": "What the image is for and the mood it carries. One or two sentences.",
  "model_hint": "The text-to-image model the user specifies. If none specified, leave as 'User's preferred text-to-image model.'",
  "aspect_ratio": "2:1",
  "suggested_size": "1024x512",
  "save_as": "public/<category>/<name>.webp",
  "must_fill_the_frame": "Include only for images shown with object-cover in a fixed card, such as shop product and project thumbnails. Describe how the subject fills the frame edge to edge, its height share, its centering, and which corner stays clear for a UI badge. Omit for images not cropped by object-cover.",
  "context": {
    "image_kind": "blog cover",
    "slug_or_name": "slug-or-name",
    "title": "Optional title the image supports",
    "summary": "Optional short description of the subject"
  },
  "prompt": "The full text-to-image prompt. A cinematic, strictly black-and-white editorial photograph in the minimal-design language, describing the scene, the single soft light source, the shallow depth of field, the film grain, and a fading halftone dot field. All screens and paper are abstract with no legible text or logos.",
  "composition_variations_to_avoid_looking_copied": [
    "Only when a reference exists. Concrete ways to differ: flip the light direction, change the camera angle, swap the focal props, move the halftone field to a different corner, change the background depth."
  ],
  "style_guidance": {
    "palette": "Strictly monochrome: true black, a soft mid-gray ramp, off-white. No color or color tint. Rendered grayscale by the site, so keep it natively black and white.",
    "mood": "Match the requested mood. Quiet, honest, editorial, human.",
    "lighting": "A single soft light source with gentle falloff into shadow. Soft, diffused, cinematic.",
    "texture": "Fine film grain plus a print-halftone dot field used sparingly, dissolving at its edges with a soft mask. Never covering the whole frame.",
    "rendering": "Realistic black-and-white photograph with shallow depth of field. Not an illustration or 3D render.",
    "composition": "Clear negative space usable behind or beside a title. A single obvious focal point. Uncluttered."
  },
  "negative_prompt": "color, color tint, colored gradients, legible text or letters or numbers, brand names or logos, readable UI text, watermark, heavy clutter, overexposed highlights, HDR look, oversaturation, cartoon, flat vector, 3D render, glossy reflections, distorted hands",
  "usage_notes": "Paste `prompt` into the image model. Keep screens and paper abstract so the image never renders broken text or trademarked logos. Fold one or two composition variations into the prompt text when a reference exists. Regenerate a few times and pick the cleanest, most balanced monochrome frame. Save the winner at `save_as` and wire it to the matching field in the site. Keep it natively black and white to match the minimal-design skill."
}
```

---

## Edge Cases

- **Image kind not in the defaults table:** Ask the user for the aspect ratio, size, and destination path. Use the editorial photograph rendering mode unless the user specifies otherwise.
- **Reference is entirely a copyrighted logo or brand mark:** State that the reference is a protected mark and cannot be reproduced. Propose an original concept that captures the same idea without the protected elements.
- **Destination folder does not exist:** State that the folder needs to be created. Do not claim it exists.
- **User requests color:** State that the minimal-design language is strictly monochrome and that the site renders images through a grayscale filter. Ask the user to confirm they want to proceed outside the design system, or suggest a monochrome alternative.
- **Multiple images requested at once:** Produce one JSON file per image. Name each with its own `id`. Process them sequentially.

---

## Rules

- Keep the whole image natively black and white. Never introduce color, even subtly.
- Never place legible text, letters, numbers, or logos in the image. Represent screens, documents, and UI as abstract shapes only.
- Use the halftone dot field as seasoning in one or two spots, faded at the edges. Never as full-frame wallpaper.
- Keep one focal point and real negative space so a title fits beside or over the image.
- Choose the rendering mode by image kind per Rendering Mode. Use the flat product mockup mode for shop and product thumbnails, and add `photorealism, 3D render` to the negative prompt for those.
- For images shown with object-cover in a fixed card, such as shop product and project thumbnails, compose to fill the frame edge to edge. No borders, letterboxing, or empty margins. The subject stands large and dominant, roughly 80 to 90 percent of the frame height, centered or slightly left, never a small object floating in empty space. Fill `must_fill_the_frame` for these, keep essential detail away from the extreme edges, and add `small floating subject, empty margins, borders, letterboxing` to the negative prompt.
- Keep the corner that a UI badge overlays clear of important detail. For shop cards this is the top-right corner, where a price or "Free" badge sits.
- For portraits, follow the same monochrome, single-light, editorial treatment. If the user wants no identifiable face, add `human faces` to the negative prompt.
- Add `human faces or full bodies` to the negative prompt for scene images where a person is not the subject.
- When a reference image exists, fill `composition_variations_to_avoid_looking_copied` with concrete differences and tell the user to fold one or two into `prompt`. When no reference exists, omit that field.
- Set `id` and the filename from the slug or name. Keep them consistent with `save_as`.
- Confirm the `save_as` folder is correct for the project. State plainly that this file is a prompt only. It does not generate or save the image. The user runs the model and saves the winning frame.
- Report the chosen aspect ratio, size, and path in chat so the user can verify them. Do not claim the image file exists.

---

## Final Validation

Before returning the file, confirm:

- The JSON is valid and matches the schema, with only relevant `context` fields.
- All required fields are present: `id`, `purpose`, `aspect_ratio`, `suggested_size`, `save_as`, `prompt`, `style_guidance`, `negative_prompt`.
- Optional fields are included only when relevant (not padded with guesses).
- `aspect_ratio`, `suggested_size`, and `save_as` agree with each other and with the image kind.
- `prompt` describes a strictly monochrome, single-light, shallow-depth editorial photograph with film grain and a fading halftone field (or flat product mockup for shop/product thumbnails).
- `prompt` contains no request for text, numbers, or logos, and the `negative_prompt` excludes them.
- `style_guidance` matches the minimal-design language and was not invented beyond the skill.
- The rendering mode matches the image kind: editorial photograph, or flat product mockup for shop and product thumbnails.
- For object-cover card images, `must_fill_the_frame` is present, the subject fills the frame with no borders or empty margins, and the badge corner is clear.
- When a reference was given, the result is a redesign in the minimal-design rules, not a copy. `composition_variations_to_avoid_looking_copied` lists concrete differences, and no logo, brand mark, or copyrighted character from the reference is reproduced.
- The file name is `image-generation/<id>-image-prompt.json` and the `id` matches the filename.
- Output contains only the JSON file.
