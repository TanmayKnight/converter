import type { Metadata } from 'next';
import JwtDebuggerClient from './client';

export const metadata: Metadata = {
    title: 'JWT Debugger - Decode & Inspector | UnitMaster',
    description: 'Free online JWT Debugger. Decode JSON Web Tokens, inspect headers and payloads, and debug claims instantly. Client-side secure.',
    keywords: ['jwt debugger', 'decode jwt', 'jwt inspector', 'json web token', 'jwt decoder online'],
};

export default function JwtDebuggerPage() {
    return (
        <div className="space-y-8">
            <JwtDebuggerClient />

            <div className="container mx-auto px-4 py-12 max-w-5xl prose prose-neutral dark:prose-invert">
                <h2>Understanding JSON Web Tokens (JWT)</h2>
                <p>
                    JWT (pronounced "jot") is the open standard (RFC 7519) for securely transmitting information between parties as a JSON object.
                    It is the backbone of modern Stateless Authentication.
                </p>

                <h3>The Anatomy of a Token</h3>
                <p>
                    A JWT is just a long string separated by dots (.). It has three parts:
                </p>
                <ol>
                    <li><strong>Header</strong> (Red): Defines the algorithm (e.g., HS256) and token type.</li>
                    <li><strong>Payload</strong> (Purple): Contains the "Claims" (data). This includes the User ID (<code>sub</code>), Expiration (<code>exp</code>), and custom roles.</li>
                    <li><strong>Signature</strong> (Blue): The verification hash. This ensures the token hasn't been tampered with.</li>
                </ol>

                <h3>Security Warning: Decode != Decrypt</h3>
                <p>
                    <strong>Crucial Mistake:</strong> Many developers think JWTs are encrypted. They are not! They are merely <strong>Encoded</strong> (Base64Url).
                </p>
                <div className="bg-destructive/10 p-4 rounded-lg border-l-4 border-destructive my-6 not-prose">
                    <p className="text-sm font-bold">Never put passwords or private secrets in a JWT payload!</p>
                    <p className="text-sm mt-1">Anyone who intercepts the token can decode it and read the data (as you can see in this tool). The <em>Signature</em> only prevents them from changing it, not from reading it.</p>
                </div>

                <h3>When to Use JWT?</h3>
                <ul>
                    <li><strong>Authorization</strong>: Once logged in, the user sends the JWT in the <code>Authorization: Bearer</code> header to access protected routes.</li>
                    <li><strong>Information Exchange</strong>: Securely transmitting user data between microservices.</li>
                </ul>
            </div>
        </div>
    );
}
