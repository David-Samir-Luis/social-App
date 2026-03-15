<div align="center">
 
# 🌐 Social App
 
### A full-featured social media platform built with Angular 20
 
[![Angular](https://img.shields.io/badge/Angular-20-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![RxJS](https://img.shields.io/badge/RxJS-7.0-B7178C?style=for-the-badge&logo=reactivex&logoColor=white)](https://rxjs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://social-app-yk1b.vercel.app/#/feed)
 
<br/>
 
[🚀 Live Demo](https://social-app-yk1b.vercel.app/#/feed) &nbsp;&nbsp;•&nbsp;&nbsp; [💻 Source Code](https://github.com/David-Samir-Luis/social-App)
 
<br/>
 
</div>
 
---
 
## 📖 About The Project
 
Social App is a **production-ready social media web application** built entirely from scratch using Angular 20. It integrates a real REST API and handles complex state management across a full social platform — from authentication and user profiles to posts, comments, notifications, and more.
 
> Built as a capstone project to demonstrate real-world Angular engineering skills including reactive programming, component architecture, HTTP interceptors, and modern Angular patterns.
 
---

 
## ⚡ Features
 
<details>
<summary><b>👤 Authentication & User System</b></summary>
<br/>
 
- ✅ Signup & Signin with **JWT token management**
- ✅ Route protection via **custom Auth Guards** (`hasTokenGuard` / `isLoginedGuard`)
- ✅ Auto-logout when token expires (error interceptor)
- ✅ Change password with **strong regex validation**
- ✅ Upload **profile photo & cover photo** with privacy settings
- ✅ Remove cover photo
- ✅ View & edit your own profile
- ✅ Browse other users' profiles (`/profile/:id`)
- ✅ **Follow / Unfollow** with optimistic UI feedback
- ✅ Friends list & follow suggestions with **live search**
 
</details>
 
<details>
<summary><b>📝 Posts System</b></summary>
<br/>
 
- ✅ Create posts with **image upload** & privacy control
- ✅ Edit & delete your own posts **inline**
- ✅ **Infinite scroll** feed powered by Intersection Observer
- ✅ **3 feed modes** — Following / My Posts / Community
- ✅ **Optimistic like UI** — updates instantly without waiting for API
- ✅ Bookmark / Unbookmark posts
- ✅ Saved posts tab on profile
- ✅ Share posts & **copy shareable link** to clipboard
- ✅ View who liked a post
- ✅ Post details page (`/details/:id`)
 
</details>
 
<details>
<summary><b>💬 Comments & Replies</b></summary>
<br/>
 
- ✅ Create, edit & delete comments
- ✅ Like / Unlike comments
- ✅ **Nested replies** system
- ✅ Collapsible comment sections per post
 
</details>
 
<details>
<summary><b>🔔 Notifications System</b></summary>
<br/>
 
- ✅ Paginated notifications list
- ✅ **Real-time unread badge** — background polling every 5s
- ✅ Filter by **All / Unread** tabs
- ✅ Mark single notification as read
- ✅ Mark all as read at once
 
</details>
 
<details>
<summary><b>🎨 UI & UX</b></summary>
<br/>
 
- ✅ **Full-screen image viewer** on any image click
- ✅ Custom **TimeAgo pipe** — auto-updates every 60s via RxJS `timer()`
- ✅ Live **user search** with `SearchUserPipe`
- ✅ Toastr feedback notifications
- ✅ Loading states on all pages
- ✅ Delete confirmation modal
- ✅ Smooth **view transitions** between pages
- ✅ Scroll position restoration
- ✅ 404 Not Found page
- ✅ Dark **glassmorphism** UI
 
</details>
 
---
 
## 🛠️ Built With
 
| Category | Technology |
|----------|-----------|
| **Framework** | Angular 20 — Standalone components, `@if` / `@for` / `@defer` |
| **Language** | TypeScript |
| **Reactive Programming** | RxJS — Streams, `timer()`, subscription management |
| **Routing** | Angular Router — Dynamic routes, query params, hash routing |
| **Forms** | Reactive Forms — Cross-field validators |
| **HTTP** | Angular HttpClient + 2 custom interceptors |
| **Styling** | Tailwind CSS + Flowbite |
| **Notifications** | ngx-toastr |
| **Icons** | Font Awesome |
| **Deployment** | Vercel |
 
---
 
## 🏗️ Project Structure
 
```
src/app/
│
├── 📁 core/                     # App-wide singletons
│   ├── auth/
│   │   ├── guards/              # hasTokenGuard, isLoginedGuard
│   │   └── services/            # AuthService
│   ├── interceptors/            # headerInterceptor, errorInterceptor
│   ├── models/                  # IPost, ISuggestedUser interfaces
│   └── services/                # PostsService, UserService, UserDataService
│
├── 📁 features/                 # Feature pages
│   ├── feed/                    # Home feed (posts area + sidebars)
│   ├── profile/                 # User profile page
│   ├── notification/            # Notifications page
│   ├── details/                 # Single post details
│   ├── friends/                 # Friends / following list
│   ├── suggestions/             # Follow suggestions
│   ├── change-password/
│   ├── login/
│   ├── register/
│   └── not-found/
│
├── 📁 layouts/
│   ├── main-layout/             # Navbar + full-screen image viewer
│   └── auth-layout/             # Auth pages wrapper
│
└── 📁 shared/
    ├── pipes/                   # TimeAgoPipe, SearchUserPipe
    └── ui/                      # Reusable components
        ├── single-post/         # Post card with all interactions
        ├── loading/
        ├── delete-alert/
        ├── form-input/
        ├── suggested-user/
        └── search-friends-input/
```
 
---
 
## 🔬 Engineering Highlights
 
```
🔐  2 HTTP Interceptors
    ├── headerInterceptor  →  Auto-injects JWT Bearer token on every request
    └── errorInterceptor   →  Catches expired tokens, redirects to login + toastr alert
 
⚡  Optimistic UI
    └── Likes update instantly in the UI before the API responds, then sync with server
 
♾️  Infinite Scroll
    └── IntersectionObserver watches a scroll trigger element to load the next page
 
⏱️  TimeAgo Pipe
    └── RxJS timer(0, 60000) auto-updates relative timestamps every minute
 
🔔  Notification Polling
    └── setInterval polls every 5s, cleaned up with clearInterval in ngOnDestroy
 
🖼️  Image Upload
    └── FileReader API previews images before upload via FormData
 
🔀  Hash Routing
    └── withHashLocation() configured for clean Vercel SPA deployment
 
✨  View Transitions
    └── withViewTransitions() for smooth page-to-page animations
```
 
---
 
## 🚀 Getting Started
 
### Prerequisites
 
- **Node.js** v18+
- **Angular CLI** 20
 
```bash
npm install -g @angular/cli
```
 
### Installation
 
```bash
# 1. Clone the repository
git clone https://github.com/David-Samir-Luis/social-App.git
 
# 2. Navigate into the project
cd social-App
 
# 3. Install dependencies
npm install
 
# 4. Start the dev server
ng serve
```
 
Then open **[http://localhost:4200](http://localhost:4200)** in your browser.
 
### Production Build
 
```bash
ng build --configuration production
```
 
---
 
## 🌐 API
 
This app connects to the **Route Posts REST API**:
 
```
Base URL: https://route-posts.routemisr.com
```
 
Configured in `src/environments/environment.ts`.
 
---
 
<div align="center">
 
Made with ❤️ by **David Samir**
 
⭐ If you like this project, give it a star on GitHub!
 
</div>