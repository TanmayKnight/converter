import type { Metadata } from 'next';
import JwtDebuggerClient from './client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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

                <h3 className="text-xl font-bold mt-8 mb-4">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full not-prose">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>The Anatomy of a Token</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>A JWT is just a long string separated by dots (.). It has three parts:</p>
                                <ol className="list-decimal pl-6 space-y-2">
                                    <li><strong>Header</strong> (Red): Defines the algorithm (e.g., HS256) and token type.</li>
                                    <li><strong>Payload</strong> (Purple): Contains the "Claims" (data). This includes the User ID (<code>sub</code>), Expiration (<code>exp</code>), and custom roles.</li>
                                    <li><strong>Signature</strong> (Blue): The verification hash. This ensures the token hasn't been tampered with.</li>
                                </ol>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>Security Warning: Decode != Decrypt</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    <strong>Crucial Mistake:</strong> Many developers think JWTs are encrypted. They are not! They are merely <strong>Encoded</strong> (Base64Url).
                                </p>
                                <div className="bg-destructive/10 p-4 rounded-lg border-l-4 border-destructive my-2">
                                    <p className="text-sm font-bold text-foreground">Never put passwords or private secrets in a JWT payload!</p>
                                    <p className="text-sm mt-1">Anyone who intercepts the token can decode it and read the data. The <em>Signature</em> only prevents modification, not reading.</p>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                        <AccordionTrigger>When to Use JWT?</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 text-muted-foreground">
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Authorization</strong>: Once logged in, the user sends the JWT in the <code>Authorization: Bearer</code> header to access protected routes.</li>
                                    <li><strong>Exchange</strong>: Securely transmitting user data between microservices.</li>
                                </ul>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FAQPage',
                        mainEntity: [
                            {
                                '@type': 'Question',
                                name: 'What is a JWT?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'JWT (JSON Web Token) is an open standard (RFC 7519) for compact, URL-safe means of representing claims to be transferred between two parties, typically used for authentication.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'Is JWT data encrypted?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'No. JWTs are encoded (Base64), not encrypted. Their contents can be read by anyone. Do not store sensitive information like passwords in a JWT.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'What are the three parts of a JWT?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'A JWT consists of three parts separated by dots: the Header (algorithm), the Payload (data claims), and the Signature (verification).'
                                }
                            }
                        ]
                    }),
                }}
            />
        </div>
    );
}
