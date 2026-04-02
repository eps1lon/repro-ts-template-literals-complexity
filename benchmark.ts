// Example type definitions for Next.js routes

type SearchOrHash = `?${string}` | `#${string}`;
type WithProtocol = `${string}:${string}`;

type Suffix = "" | SearchOrHash;

type SafeSlug<S extends string> = S extends `${string}/${string}`
  ? never
  : S extends `${string}${SearchOrHash}`
    ? never
    : S extends ""
      ? never
      : S;

type StaticRoutes =
  | `/next`
  | `/next.js`
  | `/notifications/account-being-deleted`
  | `/notifications/account-deletion`
  | `/notifications/authentication-failed`
  | `/notifications/cannot-delete-account`
  | `/notifications/deletion-confirmed`
  | `/notifications/domain-misconfigured`
  | `/notifications/email-confirmed`
  | `/notifications/email-signup-confirmed`
  | `/notifications/remove-membership`
  | `/notifications/token-expired`
  | `/product-tour`
  | `/reinvent`
  | `/report`
  | `/report-abuse`
  | `/report_abuse`
  | `/signup`
  | `/signup/email`
  | `/signup/enterprise`
  | `/signup/enterprise/team`
  | `/space`
  | `/sso-api`
  | `/sso/access/request`
  | `/support/articles`
  | `/sw.js`
  | `/teams`
  | `/template`
  | `/templates`
  | `/templates/edge-functions`
  | `/unavailable-in-your-location`
  | `/update-cli`
  | `/upgrade`;

// comment out union constituents to see exponential impact of dynamic routes
// 6 routes ->  5  ->  4   -> 3
// tsc on M3:
// 45s      -> 24s -> 12s  -> 6s
// tsgo on M3:
// 9s.      -> 5s  -> 2.5s -> 0.08s
type DynamicRoutes<T extends string = string> =
  | `/${SafeSlug<T>}/${SafeSlug<T>}/${SafeSlug<T>}`
  | `/${SafeSlug<T>}/${SafeSlug<T>}/integrations/${SafeSlug<T>}/${SafeSlug<T>}/resources/${SafeSlug<T>}/${SafeSlug<T>}/billing`
  | `/${SafeSlug<T>}/${SafeSlug<T>}/integrations/${SafeSlug<T>}/${SafeSlug<T>}/resources/${SafeSlug<T>}/${SafeSlug<T>}/schema`
  | `/${SafeSlug<T>}/${SafeSlug<T>}/integrations/${SafeSlug<T>}/${SafeSlug<T>}/resources/${SafeSlug<T>}/${SafeSlug<T>}/settings`
  | `/${SafeSlug<T>}/${SafeSlug<T>}/integrations/${SafeSlug<T>}/${SafeSlug<T>}/resources/${SafeSlug<T>}/${SafeSlug<T>}/usage`
  | `/${SafeSlug<T>}/~/integrations/${SafeSlug<T>}/${SafeSlug<T>}/billing`;

type RouteImpl<T> =
  | StaticRoutes
  | SearchOrHash
  | `${StaticRoutes}${SearchOrHash}`
  | (T extends `${DynamicRoutes<infer _>}${Suffix}` ? T : never);

function Link<RouteType>(href: RouteImpl<RouteType>): void {}

Link("/api/ai-playground/sandbox"); // OK
Link("/new/~/integrations/vercel/front/billing"); // OK
Link("/new/~/integrations/vercel/front/billig"); // Bad
