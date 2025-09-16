# Martin's Movies

A modern movie browsing application built with Nuxt 3 and Tailwindcss CSS, featuring movie search, pagination, and watch tracking functionality, Change Layout views (List, Grid)

## Setup

##### Environment Requirement
- Node v20+
- The moviedb API Key - You can sign up for a free account to get an API key. https://developers.themoviedb.org/3/getting-started/introduction

1. **Clone the repository**
2. **Install dependencies**


    ```bash
        # npm
        npm install

        # pnpm
        pnpm install

        # yarn
        yarn install

        # bun
        bun install
    ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your TMDB API key:
   ```
   TMDB_API_KEY=your_actual_api_key_here
   ```

4. **Get TMDB API Key**
   - Visit [The Movie Database API](https://developers.themoviedb.org/3/getting-started/introduction)
   - Create an account and request an API key
   - Add the API key to your `.env` file

5. **Run the development server**
   ```bash
   npm run dev
   ```

## Project Structure
```
movie-app/
├── assets/
│   └── scss/
│       └── app.css              # Global styles and custom SCSS
│       └──common/
│           └── _button.scss
│           └── _global.scss
│           └── _loading.scss
│       └──components/
│           └── _filter-select.scss
│           └── _hero-banner.scss
│           └── _movie-card.scss
│           └── _pagination.scss
│           └── _search-bar.scss
│       └──layout/
│           └── _header.scss
│           └── _mobile-menu.scss
│       └──widget/
│           └── widget-social.scss
│   └── img                       # Place Holder Image
├── components/
│   └── AppHeader.vue             # Global Header component
│   └── AppFooter.vue             # Global Footer component
│   └── HeaderMobileNav.vue       # Mobile Menu component
│   └── HeaderNav.vue             # Global Header component
│   └── HeroBanner.vue            # Hero Banner component
│   └── MovieGrid.vue             # Movie Grid Layout component
│   └── VideoModal.vue            # Video Modal component
│   ├── MovieCard.vue             # Individual movie card component
│   ├── Pagination.vue            # Pagination navigation component
│   └── SearchBar.vue             # Search input component
│   └── common
│       └── LoadingSpinner.vue    # Loading Spiner component
│   └── widget
│       └── WidgetAbout.vue       # Footer Widget component
│       └── WidgetBlog.vue        # Footer Widget component
│       └── WidgetLinks.vue       # Footer Widget component
│       └── WidgetSocial.vue      # Footer Widget component
├── composables/
│   ├── useMovies.js              # Movie API logic
│   └── useWatchedMovies.js       # Watch tracking logic
├── layouts/
│   └── default.vue               # Default page layout
├── pages/
│   └── index.vue                 # Main movie listing page
├── nuxt.config.ts                # Nuxt configuration
├── package.json                  # Dependencies and scripts
└── .env.example                  # Environment variables template
└── tailwind.config.js            # Custom Tailwind CSS variables
```
