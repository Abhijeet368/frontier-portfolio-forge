<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Portfolio architecture
- Keep all user-editable identity, copy, skills, project entries, and contact links in `src/content/portfolio.ts` so the owner can update the site in one place.
- Use separate file-based routes for home, about, work, and contact with shared navigation in FrontierShell so each page is directly shareable.
- Serve downloaded original artwork through asset pointers and keep all visual styling in the global semantic design system for consistent presentation.
