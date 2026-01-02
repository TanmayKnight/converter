export default function TermsOfService() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
            <p className="mb-4 text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

            <div className="prose dark:prose-invert max-w-none space-y-6">
                <section>
                    <h2 className="text-xl font-semibold mb-2">1. Terms</h2>
                    <p>
                        By accessing this website, accessed from UnitMaster, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">2. Use License</h2>
                    <p>
                        Permission is granted to temporarily download one copy of the materials on UnitMaster's Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">3. Disclaimer</h2>
                    <p>
                        All the materials on UnitMaster's Website are provided "as is". UnitMaster makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, UnitMaster does not make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.
                    </p>
                    <p className="mt-2 text-sm text-yellow-600 bg-yellow-50 dark:bg-yellow-900/10 dark:text-yellow-400 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800">
                        <strong>Note for Finance Calculators:</strong> Financial calculators are for illustrative purposes only. They do not constitute financial advice. Always consult with a qualified financial advisor before making investment or loan decisions.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">4. Limitations</h2>
                    <p>
                        UnitMaster or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on UnitMaster's Website, even if UnitMaster or an authorize representative of this Website has been notified, orally or written, of the possibility of such damage.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">5. Contact</h2>
                    <p>
                        If you have any questions about these Terms, please contact us at <a href="mailto:curiousmindshex@gmail.com" className="hover:text-primary transition-colors">curiousmindshex@gmail.com</a>.
                    </p>
                </section>
            </div>
        </div >
    );
}
