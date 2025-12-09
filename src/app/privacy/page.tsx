export default function PrivacyPolicy() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <p className="mb-4 text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

            <div className="prose dark:prose-invert max-w-none space-y-6">
                <section>
                    <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
                    <p>
                        Welcome to UnitMaster. We respect your privacy and are committed to protecting your personal data.
                        This privacy policy allows you to understand what data we collect and how it is used.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">2. Data Collection</h2>
                    <p>
                        We do not collect personal identification information (PII) such as names or emails unless you voluntarily provide them (e.g., contacting us).
                        However, we may automatically collect non-personal information such as browser type, device type, and referring URLs to improve our service.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">3. Cookies and Tracking</h2>
                    <p>
                        We use local storage to save your preferences (e.g., recent units). We may also use third-party cookies for:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li><strong>Analytics:</strong> Google Analytics or similar tools to understand site usage.</li>
                        <li><strong>Advertising:</strong> Third-party vendors, including Google, use cookies to serve ads based on your prior visits to our website or other websites.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">4. Third-Party Advertising</h2>
                    <p>
                        We use Google AdSense to display ads. Google uses the DART cookie enables it to serve ads to our users based on their visit to our site and other sites on the Internet.
                        Users may opt-out of the use of the DART cookie by visiting the Google Ad and Content Network privacy policy.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">5. Changes to This Policy</h2>
                    <p>
                        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">6. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us.
                    </p>
                </section>
            </div>
        </div>
    );
}
