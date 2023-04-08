# Who is Hiring Dashboard

Built with [Svelte](https://svelte.dev/) and [SvelteKit](https://kit.svelte.dev/).

Pulls posts from user [whoishiring](https://news.ycombinator.com/user?id=whoishiring) on Hacker News, and provides useful tools for sorting and saving settings / filters to localStorage.

## Running Locally

The app will work locally, including saving localStorage tasks to the localhost domain.

```bash
npx degit "arxpoetica/who-is-hiring-dashboard" who-is-hiring
```

npm install
npm run dev

Jump over to [localhost:5173](http://localhost:5173/).

### Development

To watch global PostCSS / CSS and SVG changes:

```bash
npm run watch
```

Pull requests welcome.

TODO: Optimize filtering / search on the page. Currently just processing all items in array, which is under performant. We could do a number of things, such as paginate results, lazyload below the fold, etc.
