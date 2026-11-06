# Working with MDX Content

This document outlines guidelines and custom integrations available when writing or maintaining `.mdx` content files for the LearnSeerah platform.

## For translators

Read the [translator guide](translations.md) before editing. Copy source files
into the matching language folder with the same filenames. Translate visible
text while preserving frontmatter keys, slugs, IDs, links, numeric values, and MDX
structure. Lessons also need their matching translated sections and consistent
unit names; see [lesson structure](../lesson-authoring.md).

Keep Quran components and their verse references unchanged: the app loads the
verse translation for the current locale. Preserve quoted Arabic, honorifics,
CSS classes, and component props. Translate surrounding explanations rather than
replacing these components with an AI-generated verse translation.

Use MDX comments for lesson markers and keep their positions and IDs:

```mdx
{/* page */}
{/* quiz: q1 */}
{/* quiz */}
```

Do not use HTML comments for these markers. Review each complete file, including
frontmatter and questions, before pushing. For AI-assisted drafts, use the
[prompt templates](translation-prompts.md) and perform the same human review.

## Using the Quran Component in MDX

You can now use the `<Quran />` component inside MDX files. It automatically detects the current locale of the application and displays the appropriate translated verse text.

---

### How to use in MDX files

You have multiple ways to specify which verses to show:

#### 1. Using Surah and Ayah (Recommended)
This is the most readable way. You can specify a single verse or a range.

**Single Verse:**
```mdx
<Quran surah="1" ayah="1" />
```

**Verse Range:**
```mdx
<Quran surah="33" ayah="56-57" />
```

#### 2. Using Verses Prop
If you prefer the `surah:ayah` format directly:

```mdx
<Quran verses="33:56-57" />
```

### Arabic Text Rendering inside other languages

For Arabic text rendering like Quotes, Hadith and other text, use the following components:

```markdown
# Quran like Uthmani / Naskh-based font:
<span className="font-quran"></span> // for single line
<p className="font-quran"></p> // for multiple lines

# Modern Sans-Arabic font:
<span className="font-ar"></span> // for single line
<p className="font-ar"></p> // for multiple lines
```

Example:
```mdx
<span className="font-quran">من تعلم لغة قوم أمن مكرهم</span>
```

This will render the text in Arabic script with the appropriate font.
