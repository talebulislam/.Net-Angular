// Plan data structure with actual resource links
const plan = [
  {
    week: 1,
    title: "C# Fundamentals & OOP",
    days: [
      {
        day: 1,
        title: "C# Basics & Syntax",
        topics: [
          "Data types, variables, operators",
          "Control structures (if, switch, loops)",
          "Methods and parameters",
          "Arrays and strings",
        ],
        resources: [
          {
            title: "Official C# Docs: Basic Syntax",
            url: "https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/",
          },
          {
            title: "Pluralsight: C# Fundamentals",
            url: "https://www.pluralsight.com/paths/csharp",
          },
          {
            title: "Book: C# 10 in a Nutshell",
            url: "https://www.oreilly.com/library/view/c-10-in/9781098121952/",
          },
        ],
      },
      {
        day: 2,
        title: "Object-Oriented Programming",
        topics: [
          "Classes and objects",
          "Encapsulation (access modifiers)",
          "Inheritance and polymorphism",
          "Abstraction and interfaces",
        ],
        resources: [
          {
            title: "Microsoft OOP Tutorial",
            url: "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/tutorials/oop",
          },
          {
            title: "Udemy: C# OOP Concepts",
            url: "https://www.udemy.com/course/oop-c-sharp/",
          },
          {
            title: "Book: Head First C#",
            url: "https://www.oreilly.com/library/view/head-first-c/9781491976692/",
          },
        ],
      },
      {
        day: 3,
        title: "Advanced C# Features",
        topics: [
          "Generics and collections",
          "Delegates and events",
          "Lambda expressions",
          "Extension methods",
        ],
        resources: [
          {
            title: "C# Advanced Topics Guide",
            url: "https://www.c-sharpcorner.com/article/advanced-C-Sharp/",
          },
          {
            title: "YouTube: Advanced C# Concepts",
            url: "https://www.youtube.com/watch?v=7G4I5k9eC0s",
          },
          {
            title: "GitHub: C# Design Patterns",
            url: "https://github.com/davidfowl/DesignPatterns",
          },
        ],
      },
      {
        day: 4,
        title: "Exception Handling",
        topics: [
          "try-catch-finally blocks",
          "Custom exception classes",
          "Exception handling best practices",
          "Error logging strategies",
        ],
        resources: [
          {
            title: "Microsoft Exception Handling Docs",
            url: "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/exceptions/",
          },
          {
            title: "Blog: Exception Handling in C#",
            url: "https://blog.submain.com/csharp-exception-handling-best-practices/",
          },
          {
            title: "Pluralsight: Error Handling",
            url: "https://www.pluralsight.com/courses/error-handling-csharp-exception",
          },
        ],
      },
      {
        day: 5,
        title: "Memory Management",
        topics: [
          "Stack vs Heap memory",
          "Garbage collection",
          "IDisposable interface",
          "Using statement",
        ],
        resources: [
          {
            title: "Memory Management in .NET",
            url: "https://learn.microsoft.com/en-us/dotnet/standard/garbage-collection/",
          },
          {
            title: "Book: CLR via C#",
            url: "https://www.amazon.com/CLR-via-4th-Developer-Reference/dp/0735667454",
          },
          {
            title: "Article: GC Best Practices",
            url: "https://devblogs.microsoft.com/dotnet/fundamentals-of-gc/",
          },
        ],
      },
      {
        day: 6,
        title: "Practice & Review",
        topics: [
          "Coding challenges on HackerRank",
          "OOP design exercises",
          "Review week concepts",
          "Mock interview questions",
        ],
        resources: [
          {
            title: "LeetCode: C# Problems",
            url: "https://leetcode.com/problemset/all/?search=.NET&page=1",
          },
          {
            title: "Design Patterns Repository",
            url: "https://refactoring.guru/design-patterns/csharp",
          },
          {
            title: "C# Interview Questions PDF",
            url: "https://www.c-sharpcorner.com/article/top-50-c-sharp-interview-questions-and-answers/",
          },
        ],
      },
    ],
  },
  {
    week: 2,
    title: ".NET Core & ASP.NET Basics",
    days: [
      {
        day: 7,
        title: ".NET Core Fundamentals",
        topics: [
          ".NET ecosystem overview",
          "CLI commands",
          "Project structure",
          "Dependency management",
        ],
        resources: [
          {
            title: "Microsoft .NET Docs",
            url: "https://learn.microsoft.com/en-us/dotnet/core/",
          },
          {
            title: "Pluralsight: .NET Core Path",
            url: "https://www.pluralsight.com/paths/net-core",
          },
          {
            title: "Book: .NET Core in Action",
            url: "https://www.manning.com/books/dotnet-core-in-action",
          },
        ],
      },
      {
        day: 8,
        title: "ASP.NET Core Introduction",
        topics: [
          "Middleware pipeline",
          "Dependency injection",
          "Configuration system",
          "Environments (dev, prod)",
        ],
        resources: [
          {
            title: "ASP.NET Core Fundamentals",
            url: "https://learn.microsoft.com/en-us/aspnet/core/fundamentals/",
          },
          {
            title: "YouTube: ASP.NET Core Tutorial",
            url: "https://www.youtube.com/watch?v=C5cnZ-gZy2I",
          },
          {
            title: "GitHub: Sample Projects",
            url: "https://github.com/dotnet/aspnetcore/tree/main/src/ProjectTemplates",
          },
        ],
      },
      {
        day: 9,
        title: "MVC Pattern",
        topics: [
          "Controllers and actions",
          "Razor views and layouts",
          "Model binding",
          "Tag Helpers",
        ],
        resources: [
          {
            title: "Microsoft MVC Docs",
            url: "https://learn.microsoft.com/en-us/aspnet/core/mvc/overview",
          },
          {
            title: "Udemy: ASP.NET Core MVC",
            url: "https://www.udemy.com/course/complete-aspnet-core-21-course/",
          },
          {
            title: "Blog: MVC Best Practices",
            url: "https://www.telerik.com/blogs/asp-net-core-mvc-best-practices",
          },
        ],
      },
      {
        day: 10,
        title: "Web API Development",
        topics: [
          "REST principles",
          "API controllers",
          "Routing and HTTP methods",
          "Content negotiation",
        ],
        resources: [
          {
            title: "Building Web APIs Tutorial",
            url: "https://learn.microsoft.com/en-us/aspnet/core/web-api/",
          },
          {
            title: "Postman Collection Examples",
            url: "https://www.postman.com/explore/collections",
          },
          {
            title: "Swagger/OpenAPI Integration",
            url: "https://learn.microsoft.com/en-us/aspnet/core/tutorials/web-api-help-pages-using-swagger",
          },
        ],
      },
      {
        day: 11,
        title: "Middleware & Filters",
        topics: [
          "Custom middleware",
          "Action filters",
          "Exception filters",
          "Middleware vs Filters",
        ],
        resources: [
          {
            title: "Middleware Documentation",
            url: "https://learn.microsoft.com/en-us/aspnet/core/fundamentals/middleware/",
          },
          {
            title: "Article: Custom Filters",
            url: "https://code-maze.com/action-filters-aspnetcore/",
          },
          {
            title: "GitHub: Middleware Samples",
            url: "https://github.com/dotnet/aspnetcore/tree/main/src/Middleware",
          },
        ],
      },
      {
        day: 12,
        title: "Practice & Review",
        topics: [
          "Build a CRUD API",
          "Implement custom middleware",
          "Review dependency injection",
          "API testing with Postman",
        ],
        resources: [
          {
            title: "API Design Guidelines",
            url: "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
          },
          {
            title: "Postman Learning Center",
            url: "https://learning.postman.com/",
          },
          {
            title: ".NET Core Interview Q&A",
            url: "https://www.fullstack.cafe/blog/dot-net-core-interview-questions",
          },
        ],
      },
    ],
  },
  {
    week: 3,
    title: "Database & ORM (Entity Framework)",
    days: [
      {
        day: 13,
        title: "Entity Framework Core",
        topics: [
          "ORM concepts",
          "DbContext and DbSet",
          "Migrations workflow",
          "Database providers",
        ],
        resources: [
          {
            title: "EF Core Documentation",
            url: "https://learn.microsoft.com/en-us/ef/core/",
          },
          {
            title: "Pluralsight: EF Core Path",
            url: "https://www.pluralsight.com/paths/entity-framework-core",
          },
          {
            title: "Book: EF Core in Action",
            url: "https://www.manning.com/books/entity-framework-core-in-action",
          },
        ],
      },
      {
        day: 14,
        title: "Data Modeling",
        topics: [
          "Entity relationships (1:1, 1:M, M:M)",
          "Fluent API configuration",
          "Inheritance strategies",
          "Data annotations",
        ],
        resources: [
          {
            title: "Data Modeling Guide",
            url: "https://learn.microsoft.com/en-us/ef/core/modeling/",
          },
          {
            title: "Blog: EF Core Relationships",
            url: "https://www.entityframeworktutorial.net/efcore/entity-framework-core-conventions.aspx",
          },
          {
            title: "GitHub: Modeling Examples",
            url: "https://github.com/dotnet/efcore/tree/main/samples",
          },
        ],
      },
      {
        day: 15,
        title: "Querying Data",
        topics: [
          "LINQ syntax",
          "Eager vs lazy loading",
          "Explicit loading",
          "Raw SQL queries",
        ],
        resources: [
          {
            title: "Querying Data in EF Core",
            url: "https://learn.microsoft.com/en-us/ef/core/querying/",
          },
          {
            title: "LINQ Cheat Sheet",
            url: "https://download.microsoft.com/download/4/0/3/4038F4A3-6B6A-45B1-9C3A-6B2367D5A07F/LINQ%20Cheat%20Sheet.pdf",
          },
          {
            title: "Performance Best Practices",
            url: "https://learn.microsoft.com/en-us/ef/core/performance/",
          },
        ],
      },
      {
        day: 16,
        title: "Database Performance",
        topics: [
          "Indexing strategies",
          "Query optimization",
          "Change tracking",
          "Bulk operations",
        ],
        resources: [
          {
            title: "EF Core Performance Docs",
            url: "https://learn.microsoft.com/en-us/ef/core/performance/",
          },
          {
            title: "Article: Query Optimization",
            url: "https://dev.to/azure/optimizing-entity-framework-core-queries-2mcb",
          },
          {
            title: "Tools: MiniProfiler",
            url: "https://miniprofiler.com/dotnet/",
          },
        ],
      },
      {
        day: 17,
        title: "Repository Pattern",
        topics: [
          "Pattern implementation",
          "Unit of work",
          "Generic repository",
          "Testing repositories",
        ],
        resources: [
          {
            title: "Repository Pattern Guide",
            url: "https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/infrastructure-persistence-layer-design",
          },
          {
            title: "GitHub: Implementation",
            url: "https://github.com/ardalis/Specification",
          },
          {
            title: "Blog: Pros and Cons",
            url: "https://www.thereformedprogrammer.net/is-the-repository-pattern-useful-with-entity-framework-core/",
          },
        ],
      },
      {
        day: 18,
        title: "Practice & Review",
        topics: [
          "Implement CRUD with EF",
          "Optimize slow queries",
          "Database migration exercise",
          "Design data model for app",
        ],
        resources: [
          {
            title: "EF Core Samples",
            url: "https://github.com/dotnet/efcore/tree/main/samples",
          },
          {
            title: "SQL Performance Tuning",
            url: "https://www.red-gate.com/simple-talk/databases/sql-server/performance-sql-server/optimizing-sql-server-query-performance/",
          },
          {
            title: "Interview Questions: EF",
            url: "https://www.c-sharpcorner.com/article/top-50-entity-framework-interview-questions/",
          },
        ],
      },
    ],
  },
  {
    week: 4,
    title: "Advanced .NET & Architecture",
    days: [
      {
        day: 19,
        title: "Dependency Injection",
        topics: [
          "DI container",
          "Service lifetimes",
          "Constructor injection",
          "Advanced scenarios",
        ],
        resources: [
          {
            title: "Microsoft DI Docs",
            url: "https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection",
          },
          {
            title: "Article: DI Best Practices",
            url: "https://blog.ploeh.dk/2014/06/10/pure-di/",
          },
          {
            title: "Pluralsight: DI Course",
            url: "https://www.pluralsight.com/courses/aspdotnet-core-dependency-injection",
          },
        ],
      },
      {
        day: 20,
        title: "Testing in .NET",
        topics: [
          "xUnit/NUnit frameworks",
          "Mocking with Moq",
          "Test-driven development",
          "Integration testing",
        ],
        resources: [
          {
            title: "Testing in .NET Guide",
            url: "https://learn.microsoft.com/en-us/dotnet/core/testing/",
          },
          {
            title: "YouTube: Testing Tutorials",
            url: "https://www.youtube.com/watch?v=ub3P8c87cwk",
          },
          {
            title: "GitHub: Testing Examples",
            url: "https://github.com/dotnet/testing",
          },
        ],
      },
      {
        day: 21,
        title: "Logging & Monitoring",
        topics: [
          "ILogger interface",
          "Logging providers",
          "Structured logging",
          "Application insights",
        ],
        resources: [
          {
            title: "Logging in ASP.NET Core",
            url: "https://learn.microsoft.com/en-us/aspnet/core/fundamentals/logging/",
          },
          { title: "Serilog Documentation", url: "https://serilog.net/" },
          {
            title: "Azure Monitor Guide",
            url: "https://learn.microsoft.com/en-us/azure/azure-monitor/app/asp-net-core",
          },
        ],
      },
      {
        day: 22,
        title: "Caching Strategies",
        topics: [
          "In-memory caching",
          "Distributed caching",
          "Cache invalidation",
          "Response caching",
        ],
        resources: [
          {
            title: "Caching in ASP.NET Core",
            url: "https://learn.microsoft.com/en-us/aspnet/core/performance/caching/",
          },
          {
            title: "Redis with .NET",
            url: "https://learn.microsoft.com/en-us/azure/azure-cache-for-redis/cache-dotnet-core-quickstart",
          },
          {
            title: "Blog: Caching Patterns",
            url: "https://code-maze.com/caching-aspnet-core/",
          },
        ],
      },
      {
        day: 23,
        title: "Security Practices",
        topics: [
          "Authentication (JWT, OAuth)",
          "Authorization policies",
          "HTTPS enforcement",
          "Security headers",
        ],
        resources: [
          {
            title: "ASP.NET Core Security",
            url: "https://learn.microsoft.com/en-us/aspnet/core/security/",
          },
          {
            title: "OWASP Top 10 for .NET",
            url: "https://owasp.org/www-project-top-ten/",
          },
          {
            title: "IdentityServer4 Docs",
            url: "https://identityserver4.readthedocs.io/",
          },
        ],
      },
      {
        day: 24,
        title: "Clean Architecture",
        topics: [
          "Layered architecture",
          "Domain-driven design",
          "CQRS pattern",
          "MediatR library",
        ],
        resources: [
          {
            title: "Microsoft Architecture Guide",
            url: "https://learn.microsoft.com/en-us/dotnet/architecture/",
          },
          {
            title: "GitHub: Clean Architecture",
            url: "https://github.com/ardalis/CleanArchitecture",
          },
          {
            title: "Book: Domain-Driven Design",
            url: "https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215",
          },
        ],
      },
    ],
  },
  {
    week: 5,
    title: "Angular Fundamentals",
    days: [
      {
        day: 25,
        title: "TypeScript Essentials",
        topics: [
          "Types and interfaces",
          "Classes and decorators",
          "Modules and namespaces",
          "Generics",
        ],
        resources: [
          {
            title: "TypeScript Handbook",
            url: "https://www.typescriptlang.org/docs/handbook/intro.html",
          },
          {
            title: "Pluralsight: TypeScript Path",
            url: "https://www.pluralsight.com/paths/typescript",
          },
          {
            title: "Book: Effective TypeScript",
            url: "https://effectivetypescript.com/",
          },
        ],
      },
      {
        day: 26,
        title: "Angular Setup & Components",
        topics: [
          "Angular CLI",
          "Component lifecycle",
          "Templates and interpolation",
          "Component communication",
        ],
        resources: [
          { title: "Angular Getting Started", url: "https://angular.io/start" },
          {
            title: "Tour of Heroes Tutorial",
            url: "https://angular.io/tutorial",
          },
          {
            title: "Component Interaction Guide",
            url: "https://angular.io/guide/component-interaction",
          },
        ],
      },
      {
        day: 27,
        title: "Directives & Pipes",
        topics: [
          "Built-in directives",
          "Attribute vs structural",
          "Custom directives",
          "Pure vs impure pipes",
        ],
        resources: [
          {
            title: "Directives Documentation",
            url: "https://angular.io/guide/attribute-directives",
          },
          {
            title: "Pipes Documentation",
            url: "https://angular.io/guide/pipes",
          },
          {
            title: "Blog: Custom Directive Guide",
            url: "https://www.digitalocean.com/community/tutorials/angular-custom-directives-angular",
          },
        ],
      },
      {
        day: 28,
        title: "Dependency Injection",
        topics: [
          "Angular DI system",
          "Providers and injectors",
          "Hierarchical injectors",
          "Services",
        ],
        resources: [
          {
            title: "Angular DI Docs",
            url: "https://angular.io/guide/dependency-injection",
          },
          {
            title: "Article: DI in Angular",
            url: "https://angular.io/guide/dependency-injection-in-action",
          },
          {
            title: "YouTube: DI Explained",
            url: "https://www.youtube.com/watch?v=0L2n8Tg2FwI",
          },
        ],
      },
      {
        day: 29,
        title: "Routing & Navigation",
        topics: [
          "Router configuration",
          "Route parameters",
          "Child routes",
          "Route guards",
        ],
        resources: [
          {
            title: "Router Documentation",
            url: "https://angular.io/guide/router",
          },
          {
            title: "Pluralsight: Routing Course",
            url: "https://www.pluralsight.com/courses/angular-routing",
          },
          {
            title: "GitHub: Routing Examples",
            url: "https://github.com/angular/angular/tree/main/packages/router",
          },
        ],
      },
      {
        day: 30,
        title: "Practice & Review",
        topics: [
          "Build multi-route application",
          "Create custom pipe",
          "Implement services",
          "Angular interview questions",
        ],
        resources: [
          {
            title: "Angular Style Guide",
            url: "https://angular.io/guide/styleguide",
          },
          {
            title: "Angular Interview Questions",
            url: "https://github.com/sudheerj/angular-interview-questions",
          },
          {
            title: "Code Challenge Platform",
            url: "https://stackblitz.com/@angular",
          },
        ],
      },
    ],
  },
  {
    week: 6,
    title: "Advanced Angular",
    days: [
      {
        day: 31,
        title: "Reactive Forms",
        topics: [
          "FormControl and FormGroup",
          "Form validation",
          "Dynamic forms",
          "Custom validators",
        ],
        resources: [
          {
            title: "Reactive Forms Guide",
            url: "https://angular.io/guide/reactive-forms",
          },
          {
            title: "Blog: Form Best Practices",
            url: "https://blog.angular-university.io/introduction-to-angular-2-forms-template-driven-vs-model-driven/",
          },
          {
            title: "GitHub: Form Examples",
            url: "https://github.com/angular/angular/tree/main/packages/forms",
          },
        ],
      },
      {
        day: 32,
        title: "HTTP Client & RxJS",
        topics: [
          "HttpClient module",
          "Observables vs promises",
          "RxJS operators",
          "Error handling",
        ],
        resources: [
          { title: "HTTP Client Docs", url: "https://angular.io/guide/http" },
          { title: "Learn RxJS Website", url: "https://www.learnrxjs.io/" },
          {
            title: "Article: HTTP Best Practices",
            url: "https://blog.angular-university.io/angular-http/",
          },
        ],
      },
      {
        day: 33,
        title: "State Management",
        topics: [
          "NgRx library",
          "Actions and reducers",
          "Effects",
          "Selectors",
        ],
        resources: [
          { title: "NgRx Documentation", url: "https://ngrx.io/docs" },
          {
            title: "Pluralsight: NgRx Course",
            url: "https://www.pluralsight.com/courses/ngrx-getting-started",
          },
          {
            title: "GitHub: NgRx Examples",
            url: "https://github.com/ngrx/platform",
          },
        ],
      },
      {
        day: 34,
        title: "Angular Modules",
        topics: [
          "Feature modules",
          "Lazy loading",
          "Shared modules",
          "Module organization",
        ],
        resources: [
          {
            title: "NgModules Guide",
            url: "https://angular.io/guide/ngmodules",
          },
          {
            title: "Article: Module Architecture",
            url: "https://angular.io/guide/module-types",
          },
          {
            title: "Angular Performance Tips",
            url: "https://web.dev/angular-performance-checklist/",
          },
        ],
      },
      {
        day: 35,
        title: "Testing Angular Apps",
        topics: [
          "Jasmine and Karma",
          "Component testing",
          "Service testing",
          "End-to-end testing",
        ],
        resources: [
          {
            title: "Testing Documentation",
            url: "https://angular.io/guide/testing",
          },
          {
            title: "Blog: Angular Testing Guide",
            url: "https://testing-angular.com/",
          },
          {
            title: "GitHub: Testing Recipes",
            url: "https://github.com/testing-library/angular-testing-library",
          },
        ],
      },
      {
        day: 36,
        title: "Practice & Review",
        topics: [
          "Build NgRx-powered feature",
          "Create reactive form",
          "Write component tests",
          "Mock API requests",
        ],
        resources: [
          {
            title: "Angular Testing Course",
            url: "https://testing-angular.com/",
          },
          {
            title: "RxJS Marbles Testing",
            url: "https://rxjs.dev/guide/testing/marble-testing",
          },
          {
            title: "Interview Questions: Angular",
            url: "https://github.com/sudheerj/angular-interview-questions",
          },
        ],
      },
    ],
  },
  {
    week: 7,
    title: "Full-Stack Integration",
    days: [
      {
        day: 37,
        title: "Authentication Flow",
        topics: [
          "JWT authentication",
          "Auth guards",
          "HTTP interceptors",
          "Token refresh",
        ],
        resources: [
          {
            title: "Angular Auth Tutorial",
            url: "https://jasonwatmore.com/post/2020/04/29/angular-9-user-registration-and-login-example-tutorial",
          },
          {
            title: "ASP.NET Core JWT Guide",
            url: "https://jasonwatmore.com/post/2021/04/30/net-5-jwt-authentication-tutorial-with-example-api",
          },
          {
            title: "Article: Secure Auth Flow",
            url: "https://auth0.com/blog/complete-guide-to-angular-user-authentication/",
          },
        ],
      },
      {
        day: 38,
        title: "API Communication",
        topics: [
          "REST client services",
          "Error handling",
          "Loading states",
          "Request cancellation",
        ],
        resources: [
          {
            title: "API Communication Guide",
            url: "https://angular.io/guide/http",
          },
          {
            title: "GitHub: Service Layer",
            url: "https://github.com/angular/angular/tree/main/packages/common/http",
          },
          {
            title: "Blog: API Client Patterns",
            url: "https://blog.angular-university.io/angular-http/",
          },
        ],
      },
      {
        day: 39,
        title: "Real-time Features",
        topics: [
          "SignalR integration",
          "WebSockets",
          "Real-time updates",
          "Notifications",
        ],
        resources: [
          {
            title: "SignalR Documentation",
            url: "https://learn.microsoft.com/en-us/aspnet/core/signalr/",
          },
          {
            title: "Angular + SignalR Demo",
            url: "https://code-maze.com/netcore-signalr-angular/",
          },
          {
            title: "Pluralsight: Real-time Apps",
            url: "https://www.pluralsight.com/courses/asp-dot-net-core-signalr",
          },
        ],
      },
      {
        day: 40,
        title: "File Operations",
        topics: [
          "File uploads",
          "Download endpoints",
          "Cloud storage",
          "Progress tracking",
        ],
        resources: [
          {
            title: "File Upload in Angular",
            url: "https://www.npmjs.com/package/ng2-file-upload",
          },
          {
            title: "ASP.NET Core File Handling",
            url: "https://learn.microsoft.com/en-us/aspnet/core/mvc/models/file-uploads",
          },
          {
            title: "Azure Blob Storage Guide",
            url: "https://learn.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-dotnet",
          },
        ],
      },
      {
        day: 41,
        title: "Deployment Strategies",
        topics: [
          "Docker containers",
          "CI/CD pipelines",
          "Cloud deployment",
          "Environment configuration",
        ],
        resources: [
          {
            title: "Docker for .NET Apps",
            url: "https://learn.microsoft.com/en-us/dotnet/core/docker/",
          },
          {
            title: "Azure DevOps Pipelines",
            url: "https://learn.microsoft.com/en-us/azure/devops/pipelines/",
          },
          {
            title: "Angular Deployment Guide",
            url: "https://angular.io/guide/deployment",
          },
        ],
      },
      {
        day: 42,
        title: "Practice & Review",
        topics: [
          "Implement auth workflow",
          "Build real-time feature",
          "Create file upload",
          "Deploy to cloud",
        ],
        resources: [
          {
            title: "Full-Stack Project Ideas",
            url: "https://www.freecodecamp.org/news/project-ideas-full-stack/",
          },
          {
            title: "Deployment Checklist",
            url: "https://angular.io/guide/deployment",
          },
          {
            title: "Interview Scenarios",
            url: "https://github.com/danielrbradley/full-stack-interview",
          },
        ],
      },
    ],
  },
  {
    week: 8,
    title: "System Design & Optimization",
    days: [
      {
        day: 43,
        title: "Performance Optimization",
        topics: [
          "Angular change detection",
          "Lazy loading modules",
          "API response caching",
          "Database indexing",
        ],
        resources: [
          {
            title: "Angular Performance Guide",
            url: "https://web.dev/angular-performance-checklist/",
          },
          {
            title: ".NET Performance Tips",
            url: "https://learn.microsoft.com/en-us/dotnet/core/performance/",
          },
          {
            title: "Tools: Application Insights",
            url: "https://learn.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview",
          },
        ],
      },
      {
        day: 44,
        title: "Microservices Architecture",
        topics: [
          "Monolith vs microservices",
          "API gateways",
          "Service communication",
          "Distributed transactions",
        ],
        resources: [
          {
            title: "Microsoft Microservices Guide",
            url: "https://learn.microsoft.com/en-us/dotnet/architecture/microservices/",
          },
          {
            title: "NGINX: Microservices",
            url: "https://www.nginx.com/resources/library/microservices-reference-architecture/",
          },
          {
            title: "Book: Building Microservices",
            url: "https://samnewman.io/books/building_microservices/",
          },
        ],
      },
      {
        day: 45,
        title: "Messaging Systems",
        topics: [
          "Message brokers (RabbitMQ)",
          "Event-driven architecture",
          "Publish/subscribe",
          "Message queues",
        ],
        resources: [
          {
            title: "RabbitMQ Tutorials",
            url: "https://www.rabbitmq.com/getstarted.html",
          },
          {
            title: "Azure Service Bus Docs",
            url: "https://learn.microsoft.com/en-us/azure/service-bus-messaging/",
          },
          {
            title: "Event Sourcing Patterns",
            url: "https://learn.microsoft.com/en-us/azure/architecture/patterns/event-sourcing",
          },
        ],
      },
      {
        day: 46,
        title: "Cloud Services",
        topics: [
          "Azure/AWS fundamentals",
          "Serverless functions",
          "Managed databases",
          "Cloud storage",
        ],
        resources: [
          {
            title: "Azure Fundamentals",
            url: "https://learn.microsoft.com/en-us/azure/fundamentals/",
          },
          {
            title: "AWS for .NET Developers",
            url: "https://aws.amazon.com/developer/language/net/",
          },
          {
            title: "Cloud Comparison Guide",
            url: "https://www.cloudflare.com/learning/cloud/what-is-multi-cloud/",
          },
        ],
      },
      {
        day: 47,
        title: "Design Patterns",
        topics: [
          "Factory, Singleton",
          "Strategy, Observer",
          "Repository, Unit of Work",
          "Adapter, Facade",
        ],
        resources: [
          {
            title: "Design Patterns in C#",
            url: "https://refactoring.guru/design-patterns/csharp",
          },
          {
            title: "Angular Design Patterns",
            url: "https://angular.io/guide/architecture",
          },
          {
            title: "Refactoring Guru Patterns",
            url: "https://refactoring.guru/design-patterns",
          },
        ],
      },
      {
        day: 48,
        title: "Practice & Review",
        topics: [
          "Design a scalable system",
          "Optimize performance issues",
          "Implement messaging",
          "Cloud deployment exercise",
        ],
        resources: [
          {
            title: "System Design Primer",
            url: "https://github.com/donnemartin/system-design-primer",
          },
          {
            title: "Cloud Architecture Patterns",
            url: "https://learn.microsoft.com/en-us/azure/architecture/patterns/",
          },
          {
            title: "Interview Case Studies",
            url: "https://github.com/checkcheckzz/system-design-interview",
          },
        ],
      },
    ],
  },
  {
    week: 9,
    title: "Final Review & Interviews",
    days: [
      {
        day: 49,
        title: "Behavioral Interview Prep",
        topics: [
          "STAR technique",
          "Common questions",
          "Company research",
          "Questions to ask",
        ],
        resources: [
          {
            title: "Behavioral Questions List",
            url: "https://www.themuse.com/advice/30-behavioral-interview-questions-you-should-be-ready-to-answer",
          },
          {
            title: "STAR Method Guide",
            url: "https://www.themuse.com/advice/star-interview-method",
          },
          {
            title: "Interview Success Tips",
            url: "https://hbr.org/2021/11/10-common-job-interview-questions-and-how-to-answer-them",
          },
        ],
      },
      {
        day: 50,
        title: "Technical Questions Review",
        topics: [
          "C#/.NET questions",
          "Angular concepts",
          "Database/SQL questions",
          "Algorithm challenges",
        ],
        resources: [
          {
            title: "Top 100 .NET Questions",
            url: "https://www.fullstack.cafe/blog/dot-net-core-interview-questions",
          },
          {
            title: "Angular Interview Guide",
            url: "https://github.com/sudheerj/angular-interview-questions",
          },
          {
            title: "LeetCode Problems",
            url: "https://leetcode.com/problemset/all/?search=.NET&page=1",
          },
        ],
      },
      {
        day: 51,
        title: "System Design Practice",
        topics: [
          "Design URL shortener",
          "Design payment system",
          "Design chat application",
          "Design recommendation engine",
        ],
        resources: [
          {
            title: "System Design Interview Book",
            url: "https://www.amazon.com/System-Design-Interview-Insiders-Guide/dp/B08CMF2CQF",
          },
          {
            title: "YouTube: Design Interviews",
            url: "https://www.youtube.com/c/GauravSensei",
          },
          {
            title: "GitHub: Design Resources",
            url: "https://github.com/donnemartin/system-design-primer",
          },
        ],
      },
      {
        day: 52,
        title: "Coding Challenges",
        topics: [
          "Data structures practice",
          "Algorithm implementation",
          "Problem-solving patterns",
          "Time complexity analysis",
        ],
        resources: [
          {
            title: "LeetCode .NET Problems",
            url: "https://leetcode.com/problemset/all/?search=.NET&page=1",
          },
          {
            title: "HackerRank Angular Tests",
            url: "https://www.hackerrank.com/tests/angular",
          },
          {
            title: "Cracking the Coding Interview",
            url: "https://www.crackingthecodinginterview.com/",
          },
        ],
      },
      {
        day: 53,
        title: "Portfolio Review",
        topics: [
          "Highlight key projects",
          "GitHub profile optimization",
          "Resume refinement",
          "Online presence",
        ],
        resources: [
          {
            title: "Technical Resume Guide",
            url: "https://www.freecodecamp.org/news/writing-a-killer-software-engineering-resume-b11c91ef699d/",
          },
          {
            title: "GitHub Profile Tips",
            url: "https://www.freecodecamp.org/news/how-to-write-a-killer-github-profile-readme/",
          },
          {
            title: "Portfolio Examples",
            url: "https://github.com/emmabostian/developer-portfolios",
          },
        ],
      },
      {
        day: 54,
        title: "Mock Interviews",
        topics: [
          "Technical mock interview",
          "System design mock",
          "Behavioral mock",
          "Feedback session",
        ],
        resources: [
          { title: "Pramp Platform", url: "https://www.pramp.com/" },
          { title: "Interviewing.io", url: "https://interviewing.io/" },
          {
            title: "Peer Mock Interviews",
            url: "https://leetcode.com/discuss/interview-question?currentPage=1&orderBy=hot&query=",
          },
        ],
      },
    ],
  },
  {
    week: 10,
    title: "Final Preparation",
    days: [
      {
        day: 55,
        title: "Weak Areas Review",
        topics: [
          "Focus on challenging topics",
          "Revisit problem areas",
          "Practice targeted exercises",
          "Create cheat sheets",
        ],
        resources: [
          { title: "Personal Notes", url: "#" },
          { title: "Anki Flashcards", url: "https://apps.ankiweb.net/" },
          { title: "Topic Summaries", url: "#" },
        ],
      },
      {
        day: 56,
        title: "Interview Workflow",
        topics: [
          "Coding environment setup",
          "Whiteboarding practice",
          "Live coding strategies",
          "Problem-solving approach",
        ],
        resources: [
          {
            title: "Coding Environment Guide",
            url: "https://code.visualstudio.com/docs",
          },
          {
            title: "Whiteboarding Tips",
            url: "https://www.freecodecamp.org/news/the-ultimate-guide-to-whiteboard-interviews/",
          },
          {
            title: "Problem Solving Framework",
            url: "https://leetcode.com/discuss/general-discussion/665604/Important-and-Useful-links-from-all-over-the-LeetCode",
          },
        ],
      },
      {
        day: 57,
        title: "Company Research",
        topics: [
          "Tech stack analysis",
          "Product understanding",
          "Recent news/updates",
          "Engineering culture",
        ],
        resources: [
          {
            title: "Company Tech Blogs",
            url: "https://github.com/kilimchoi/engineering-blogs",
          },
          {
            title: "Glassdoor Reviews",
            url: "https://www.glassdoor.com/index.htm",
          },
          { title: "LinkedIn Connections", url: "https://www.linkedin.com/" },
        ],
      },
      {
        day: 58,
        title: "Mindset & Wellness",
        topics: [
          "Stress management",
          "Confidence building",
          "Sleep optimization",
          "Positive visualization",
        ],
        resources: [
          {
            title: "Interview Anxiety Guide",
            url: "https://www.mindtools.com/pages/article/interview-nerves.htm",
          },
          {
            title: "Mindfulness Techniques",
            url: "https://www.headspace.com/",
          },
          {
            title: "Healthy Habits Checklist",
            url: "https://www.healthline.com/health/healthy-habits",
          },
        ],
      },
      {
        day: 59,
        title: "Final Review Session",
        topics: [
          "Quick concept review",
          "Flashcard practice",
          "Common pitfalls",
          "Success mindset",
        ],
        resources: [
          { title: "Personal Notes", url: "#" },
          { title: "Quick Reference Sheets", url: "#" },
          {
            title: "Success Stories",
            url: "https://www.freecodecamp.org/news/software-engineer-interview-questions/",
          },
        ],
      },
      {
        day: 60,
        title: "Interview Day Prep",
        topics: [
          "Technical checklist",
          "Logistics planning",
          "Interview attire",
          "Relaxation techniques",
        ],
        resources: [
          {
            title: "Day-of Checklist",
            url: "https://www.themuse.com/advice/interview-checklist-how-to-prepare-for-an-interview",
          },
          {
            title: "Success Visualization",
            url: "https://www.psychologytoday.com/us/basics/visualization",
          },
          {
            title: "Interview Affirmations",
            url: "https://www.themuse.com/advice/affirmations-to-help-you-get-through-job-interviews",
          },
        ],
      },
    ],
  },
];

window.roadmapPlan = plan;
