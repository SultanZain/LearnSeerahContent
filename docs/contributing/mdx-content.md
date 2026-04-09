# Working with MDX Content

This document outlines guidelines and custom integrations available when writing or maintaining `.mdx` content files for the LearnSeerah platform.

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