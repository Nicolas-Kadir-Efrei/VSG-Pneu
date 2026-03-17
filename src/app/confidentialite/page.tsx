import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de Confidentialité - VSG PNEUS',
  description: 'Politique de confidentialité et protection des données personnelles de VSG PNEUS. Conformité RGPD.',
}

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Politique de Confidentialité</h1>
          
          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Responsable du traitement</h2>
              <div className="space-y-2">
                <p><strong>Responsable :</strong> KAER VSG PNEUS</p>
                <p><strong>Adresse :</strong> 192 Rue de Paris, 94190 Villeneuve-Saint-Georges</p>
                <p><strong>Téléphone :</strong> 01 43 89 68 08</p>
                <p><strong>Email :</strong> contact@vsg-pneus.fr</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Données collectées</h2>
              <p>Dans le cadre de nos services, nous sommes amenés à collecter les données personnelles suivantes :</p>
              
              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="font-semibold">Formulaires de contact et devis :</h3>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Nom et prénom</li>
                    <li>Numéro de téléphone</li>
                    <li>Adresse email (optionnelle)</li>
                    <li>Informations sur le véhicule</li>
                    <li>Nature de la demande</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold">Navigation sur le site :</h3>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Adresse IP</li>
                    <li>Type de navigateur</li>
                    <li>Pages visitées</li>
                    <li>Durée de visite</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Finalités du traitement</h2>
              <p>Vos données personnelles sont collectées et traitées pour les finalités suivantes :</p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>Traitement de vos demandes de rendez-vous et devis</li>
                <li>Communication avec nos clients</li>
                <li>Amélioration de nos services</li>
                <li>Respect de nos obligations légales</li>
                <li>Statistiques de fréquentation du site (données anonymisées)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Base légale</h2>
              <p>Le traitement de vos données personnelles repose sur :</p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li><strong>Votre consentement</strong> pour les formulaires de contact</li>
                <li><strong>L'exécution du contrat</strong> pour la prestation de services</li>
                <li><strong>L'intérêt légitime</strong> pour l'amélioration de nos services</li>
                <li><strong>L'obligation légale</strong> pour la comptabilité et facturation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Destinataires des données</h2>
              <p>Vos données personnelles sont destinées :</p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>Au personnel habilité de VSG PNEUS</li>
                <li>À nos prestataires techniques (hébergement, maintenance)</li>
                <li>Aux autorités compétentes en cas d'obligation légale</li>
              </ul>
              <p className="mt-4">
                Nous ne vendons, ne louons, ni ne cédons vos données personnelles à des tiers à des fins commerciales.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Durée de conservation</h2>
              <div className="space-y-3">
                <p><strong>Données de contact :</strong> 3 ans après le dernier contact</p>
                <p><strong>Données de facturation :</strong> 10 ans (obligation légale)</p>
                <p><strong>Données de navigation :</strong> 13 mois maximum</p>
                <p><strong>Cookies :</strong> Selon les paramètres définis</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Vos droits</h2>
              <p>Conformément au RGPD, vous disposez des droits suivants :</p>
              
              <div className="mt-4 space-y-3">
                <div>
                  <h3 className="font-semibold">Droit d'accès :</h3>
                  <p>Vous pouvez demander l'accès à vos données personnelles.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold">Droit de rectification :</h3>
                  <p>Vous pouvez demander la correction de données inexactes.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold">Droit à l'effacement :</h3>
                  <p>Vous pouvez demander la suppression de vos données dans certains cas.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold">Droit à la limitation :</h3>
                  <p>Vous pouvez demander la limitation du traitement.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold">Droit à la portabilité :</h3>
                  <p>Vous pouvez récupérer vos données dans un format structuré.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold">Droit d'opposition :</h3>
                  <p>Vous pouvez vous opposer au traitement pour motif légitime.</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <h3 className="font-semibold text-orange-800">Comment exercer vos droits ?</h3>
                <p className="text-orange-700 mt-2">
                  Pour exercer vos droits, contactez-nous par téléphone au 01 43 89 68 08 
                  ou par email à contact@vsg-pneus.fr en précisant votre demande et en joignant 
                  une copie de votre pièce d'identité.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Sécurité des données</h2>
              <p>Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données :</p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>Chiffrement des données sensibles</li>
                <li>Accès restreint aux données personnelles</li>
                <li>Sauvegardes régulières et sécurisées</li>
                <li>Formation du personnel à la protection des données</li>
                <li>Mise à jour régulière des systèmes de sécurité</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Cookies</h2>
              <p>Notre site utilise des cookies pour :</p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>Assurer le bon fonctionnement du site</li>
                <li>Mémoriser vos préférences</li>
                <li>Analyser l'audience (données anonymisées)</li>
              </ul>
              <p className="mt-4">
                Vous pouvez paramétrer votre navigateur pour refuser les cookies ou être alerté de leur dépôt. 
                Consultez notre <a href="/cookies" className="text-orange-500 hover:underline">politique de cookies</a> pour plus d'informations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Transferts de données</h2>
              <p>
                Vos données personnelles sont hébergées en Europe. En cas de transfert hors UE, 
                nous nous assurons que des garanties appropriées sont mises en place conformément au RGPD.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Réclamations</h2>
              <p>
                Si vous estimez que le traitement de vos données personnelles constitue une violation du RGPD, 
                vous avez le droit d'introduire une réclamation auprès de la CNIL :
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p><strong>CNIL</strong><br />
                3 Place de Fontenoy - TSA 80715<br />
                75334 PARIS CEDEX 07<br />
                Téléphone : 01 53 73 22 22<br />
                <a href="https://www.cnil.fr" className="text-orange-500 hover:underline">www.cnil.fr</a></p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">12. Modifications</h2>
              <p>
                Cette politique de confidentialité peut être modifiée à tout moment. 
                La version en vigueur est celle publiée sur notre site web. 
                Nous vous informerons de toute modification substantielle.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Dernière mise à jour : Mars 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
