import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions Légales - VSG PNEUS',
  description: 'Mentions légales du site VSG PNEUS - Informations sur l\'entreprise, hébergement et conditions d\'utilisation.',
}

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Mentions Légales</h1>
          
          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Informations sur l'entreprise</h2>
              <div className="space-y-2">
                <p><strong>Dénomination sociale :</strong> KAER VSG PNEUS</p>
                <p><strong>Forme juridique :</strong> Société à responsabilité limitée (SARL)</p>
                <p><strong>Capital social :</strong> 2 000 EUR</p>
                <p><strong>Numéro SIREN :</strong> 810 919 258</p>
                <p><strong>Numéro SIRET :</strong> 810 919 258 00014</p>
                <p><strong>Code APE :</strong> 45.20A (Entretien et réparation de véhicules automobiles légers)</p>
                <p><strong>RCS :</strong> Créteil</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Coordonnées</h2>
              <div className="space-y-2">
                <p><strong>Adresse du siège social :</strong><br />
                192 Rue de Paris<br />
                94190 Villeneuve-Saint-Georges</p>
                <p><strong>Téléphone :</strong> 01 43 89 68 08</p>
                <p><strong>Email :</strong> contact@vsg-pneus.fr</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Directeur de la publication</h2>
              <p>Le directeur de la publication du site est le représentant légal de la société KAER VSG PNEUS.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Hébergement</h2>
              <div className="space-y-2">
                <p><strong>Hébergeur :</strong> Vercel Inc.</p>
                <p><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</p>
                <p><strong>Site web :</strong> <a href="https://vercel.com" className="text-red-500 hover:underline">https://vercel.com</a></p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Propriété intellectuelle</h2>
              <p>
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. 
                Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
              <p className="mt-4">
                La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite 
                sauf autorisation expresse du directeur de la publication.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Responsabilité</h2>
              <p>
                Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour, 
                mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes.
              </p>
              <p className="mt-4">
                Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, 
                merci de bien vouloir le signaler par email en décrivant le problème de la manière la plus précise possible.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Liens hypertextes</h2>
              <p>
                Les liens hypertextes mis en place dans le cadre du présent site web en direction d'autres ressources présentes sur le réseau Internet 
                ne sauraient engager la responsabilité de KAER VSG PNEUS.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Collecte et traitement de données personnelles</h2>
              <p>
                Conformément aux dispositions de la loi n° 78-17 du 6 janvier 1978 modifiée relative à l'informatique, 
                aux fichiers et aux libertés et du Règlement Général sur la Protection des Données (RGPD), 
                vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition au traitement de vos données personnelles.
              </p>
              <p className="mt-4">
                Pour plus d'informations sur le traitement de vos données personnelles, 
                consultez notre <a href="/confidentialite" className="text-red-500 hover:underline">politique de confidentialité</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Droit applicable et juridiction compétente</h2>
              <p>
                Tout litige en relation avec l'utilisation du site www.vsg-pneus.fr est soumis au droit français. 
                Il est fait attribution exclusive de juridiction aux tribunaux compétents de Créteil.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Numéro de TVA</h2>
              <p>
                Conformément à l'article L. 441-3 du Code de commerce, 
                le numéro de TVA intracommunautaire sera communiqué sur demande.
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
