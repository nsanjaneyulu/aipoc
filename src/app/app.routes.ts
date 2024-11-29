import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./core/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then((c) => c.HomeComponent),
  },

  {
    path: 'presentations',
    loadComponent: () =>
      import('./features/presentations/presentations.component').then(
        (c) => c.PresentationsComponent
      ),
    children: [
      {
        path: 'persentation-summary',
        loadComponent: () =>
          import('./features/overview/overview.component').then(
            (c) => c.OverviewComponent
          ),
      },
    ],
  },
  {
    path: 'aiprojects',
    loadComponent: () =>
      import('./features/aiproject/aiproject.component').then(
        (c) => c.AiprojectComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './features/otherprojects/otherproject/otherproject.component'
          ).then((c) => c.OtherprojectComponent),
      },
      {
        path: 'summary/:id',
        loadComponent: () =>
          import('./features/overview/overview.component').then(
            (c) => c.OverviewComponent
          ),
      },
    ],
  },

  {
    path: 'copilotpractice',
    loadComponent: () =>
      import('./features/copilotpractices/copilot.component').then(
        (c) => c.CopilotComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './features/copilotpractices/copilotpractices/copilotpractices.component'
          ).then((c) => c.CopilotpracticesComponent),
      },
      {
        path: 'summary/:id',
        loadComponent: () =>
          import(
            './features/copilotpractices/copilotoverviw/copilotoverviw.component'
          ).then((c) => c.CopilotoverviwComponent),
      },
    ],
  },
  {
    path: 'otherprojects',
    loadComponent: () =>
      import('./features/otherprojects/otherproject.component').then(
        (c) => c.OtherprojectComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './features/otherprojects/otherproject/otherproject.component'
          ).then((c) => c.OtherprojectComponent),
      },
      {
        path: 'summary/:id',
        loadComponent: () =>
          import('./features/overview/overview.component').then(
            (c) => c.OverviewComponent
          ),
      },
    ],
  },
  {
    path: 'videos',
    loadComponent: () =>
      import('./features/videos/videos.component').then(
        (c) => c.VideosComponent
      ),
    children: [
      {
        path: 'persentation-summary',
        loadComponent: () =>
          import('./features/overview/overview.component').then(
            (c) => c.OverviewComponent
          ),
      },
    ],
  },
  {
    path: 'searchresult',
    loadComponent: () =>
      import('./features/search/search.component').then(
        (c) => c.SearchComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/search/searchlist/searchlist.component').then(
            (c) => c.SearchlistComponent
          ),
      },
      {
        path: 'summary/:id',
        loadComponent: () =>
          import('./features/overview/overview.component').then(
            (c) => c.OverviewComponent
          ),
      },
    ],
  },
  {
    path: 'servicecatelog',
    loadComponent: () =>
      import('./features/serviceCatelog/serviceCatelog.component').then(
        (c) => c.ServiceCatelogComponent
      ),
    children: [
      {
        path: 'persentation-summary',
        loadComponent: () =>
          import('./features/overview/overview.component').then(
            (c) => c.OverviewComponent
          ),
      },
    ],
  },
  // { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '**',
    loadComponent: () =>
      import('./features/pagenotfound/pagenotfound.component').then(
        (c) => c.PagenotfoundComponent
      ),
  },
];
