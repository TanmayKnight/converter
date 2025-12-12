import type { Metadata } from 'next';
import JwtDebuggerClient from './client';

export const metadata: Metadata = {
    title: 'JWT Debugger - Decode & Inspector | UnitMaster',
    description: 'Free online JWT Debugger. Decode JSON Web Tokens, inspect headers and payloads, and debug claims instantly. Client-side secure.',
    keywords: ['jwt debugger', 'decode jwt', 'jwt inspector', 'json web token', 'jwt decoder online'],
};

export default function JwtDebuggerPage() {
    return <JwtDebuggerClient />;
}
