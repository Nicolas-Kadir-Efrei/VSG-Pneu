'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const faqs = [
    {
      question: "Puis-je venir sans rendez-vous ?",
      answer: "Oui, nous acceptons les clients sans rendez-vous selon nos disponibilités. Cependant, pour garantir votre créneau et éviter l'attente, nous recommandons de prendre rendez-vous, surtout en période de forte affluence."
    },
    {
      question: "Combien de temps faut-il pour monter 2 pneus ?",
      answer: "Le montage de 2 pneus prend généralement entre 30 et 45 minutes, incluant le démontage, montage, équilibrage et contrôle final. Ce délai peut varier selon le type de jantes et la complexité de l'intervention."
    },
    {
      question: "Acceptez-vous les pneus Run-flat ?",
      answer: "Oui, nous sommes équipés pour monter et réparer les pneus Run-flat. Un supplément de 5€ par pneu s'applique en raison de la technicité particulière de ces pneus."
    },
    {
      question: "Puis-je apporter mes propres pneus ?",
      answer: "Absolument ! Nous montons vos pneus achetés ailleurs. Le tarif de montage reste le même, que vous achetiez vos pneus chez nous ou que vous les apportiez."
    },
    {
      question: "Quels moyens de paiement acceptez-vous ?",
      answer: "Nous acceptons les espèces, cartes bancaires (CB, Visa, Mastercard), chèques et tickets restaurant pour la partie service (selon réglementation)."
    },
    {
      question: "Faites-vous la réparation de crevaison ?",
      answer: "Oui, nous réparons les crevaisons réparables selon les normes de sécurité. Nous effectuons d'abord un diagnostic gratuit pour déterminer si la réparation est possible et sûre."
    },
    {
      question: "Proposez-vous un service d'urgence ?",
      answer: "En cas d'urgence (crevaison, pneu dangereux), appelez-nous directement. Nous faisons notre possible pour vous recevoir dans la journée selon nos disponibilités."
    },
    {
      question: "Garantissez-vous vos interventions ?",
      answer: "Oui, nos prestations sont garanties. Le montage est garanti contre les défauts de pose."
    }
  ]

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Questions fréquentes
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Retrouvez les réponses aux questions les plus courantes sur nos services
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-border rounded-lg">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground">{faq.question}</span>
                  {openItems.includes(index) ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
                {openItems.includes(index) && (
                  <div className="px-6 pb-4">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Vous ne trouvez pas la réponse à votre question ?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:0143896808"
              className="inline-flex items-center justify-center px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Appelez-nous directement
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
