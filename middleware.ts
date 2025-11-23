import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Minimal middleware that allows all requests to continue.
export function middleware(_request: NextRequest) {
  return NextResponse.next()
}

// Optionally, you can scope middleware using a matcher. By default it runs on all paths.
// export const config = {
//   matcher: ['/((?!_next|.*\..*).*)'],
// }
