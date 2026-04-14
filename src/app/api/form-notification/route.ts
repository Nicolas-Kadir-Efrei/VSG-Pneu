import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { format, isValid, parseISO } from 'date-fns'

type FormType = 'rendezvous' | 'devis'

/** Date du champ HTML (YYYY-MM-DD) → affichage Jour-Mois-Année (ex. 21-03-2026) */
function formatDateSouhaitee(raw: string): string {
  const s = raw?.trim()
  if (!s) return ''
  const parsed = parseISO(s)
  if (!isValid(parsed)) return s
  return format(parsed, 'dd-MM-yyyy')
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '<br/>')
}

function row(label: string, value: string) {
  const v = value?.trim() || '—'
  return `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #e4e4e7;font-size:14px;color:#52525b;width:38%;vertical-align:top;font-weight:600;">${escapeHtml(label)}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e4e4e7;font-size:14px;color:#18181b;vertical-align:top;">${escapeHtml(v)}</td>
    </tr>`
}

function buildMailContent(type: FormType, data: Record<string, string>) {
  const d = (key: string) => (data[key] ?? '').trim()

  if (type === 'rendezvous') {
    const dateAffichee = formatDateSouhaitee(d('date')) || d('date')
    const subject = `Nouveau rendez-vous — ${d('nom') || 'Client'}`
    const text = [
      'Nouvelle demande de rendez-vous',
      `Nom: ${d('nom') || '-'}`,
      `Téléphone: ${d('telephone') || '-'}`,
      `Email: ${d('email') || '-'}`,
      `Service: ${d('service') || '-'}`,
      `Véhicule: ${d('vehicule') || '-'}`,
      `Date souhaitée: ${dateAffichee || '-'}`,
      `Créneau: ${d('heure') || '-'}`,
      `Urgence: ${d('urgence') || '-'}`,
      `Message: ${d('message') || '-'}`,
    ].join('\n')

    const html = emailShell({
      badge: 'Rendez-vous',
      title: 'Nouvelle demande de rendez-vous',
      subtitle: 'Un client vient de remplir le formulaire sur le site.',
      rowsHtml: [
        row('Nom', d('nom')),
        row('Téléphone', d('telephone')),
        row('Email', d('email')),
        row('Service', d('service')),
        row('Véhicule', d('vehicule')),
        row('Date souhaitée', dateAffichee),
        row('Créneau', d('heure')),
        row('Urgence', d('urgence')),
        row('Message', d('message')),
      ].join(''),
    })

    return { subject, text, html }
  }

  const subject = `Nouveau devis — ${d('nom') || 'Client'}`
  const text = [
    'Nouvelle demande de devis',
    `Nom: ${d('nom') || '-'}`,
    `Téléphone: ${d('telephone') || '-'}`,
    `Email: ${d('email') || '-'}`,
    `Véhicule: ${d('vehicule') || '-'}`,
    `Marque: ${d('marque') || '-'}`,
    `Modèle: ${d('modele') || '-'}`,
    `Année: ${d('annee') || '-'}`,
    `Service: ${d('service') || '-'}`,
    `Nombre de pneus: ${d('nombrePneus') || '-'}`,
    `Dimensions: ${d('dimensionsPneus') || '-'}`,
    `Marque préférée: ${d('marquePreferee') || '-'}`,
    `Budget max: ${d('budgetMax') || '-'}`,
    `Pneus déjà achetés: ${d('pneusAchetes') || '-'}`,
    `Urgence: ${d('urgence') || '-'}`,
    `Message: ${d('message') || '-'}`,
  ].join('\n')

  const html = emailShell({
    badge: 'Devis',
    title: 'Nouvelle demande de devis',
    subtitle: 'Un client souhaite recevoir un devis depuis le site.',
    rowsHtml: [
      row('Nom', d('nom')),
      row('Téléphone', d('telephone')),
      row('Email', d('email')),
      row('Véhicule / plaque', d('vehicule')),
      row('Marque', d('marque')),
      row('Modèle', d('modele')),
      row('Année', d('annee')),
      row('Service', d('service')),
      row('Nombre de pneus', d('nombrePneus')),
      row('Dimensions pneus', d('dimensionsPneus')),
      row('Marque préférée', d('marquePreferee')),
      row('Budget max', d('budgetMax')),
      row('Pneus déjà achetés', d('pneusAchetes')),
      row('Délai / urgence', d('urgence')),
      row('Message', d('message')),
    ].join(''),
  })

  return { subject, text, html }
}

function emailShell(opts: {
  badge: string
  title: string
  subtitle: string
  rowsHtml: string
}) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VSG PNEUS</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f4f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);border:1px solid #e4e4e7;">
          <tr>
            <td style="background:linear-gradient(135deg,#dc2626 0%,#b91c1c 100%);padding:24px 28px;">
              <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="display:inline-block;background:rgba(255,255,255,0.2);color:#fff;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;padding:4px 10px;border-radius:999px;">${escapeHtml(opts.badge)}</span>
                    <h1 style="margin:14px 0 0;font-size:22px;font-weight:700;color:#ffffff;line-height:1.25;">${escapeHtml(opts.title)}</h1>
                    <p style="margin:8px 0 0;font-size:14px;color:#fecaca;line-height:1.5;">${escapeHtml(opts.subtitle)}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 0 0;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                ${opts.rowsHtml}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 24px 24px;background:#fafafa;border-top:1px solid #e4e4e7;">
              <p style="margin:0;font-size:12px;color:#71717a;line-height:1.6;">
                <strong style="color:#3f3f46;">VSG PNEUS</strong> — 192 Rue de Paris, 94190 Villeneuve-Saint-Georges<br>
                Ce message a été envoyé automatiquement depuis le formulaire du site.
              </p>
            </td>
          </tr>
        </table>
        <p style="margin:20px 0 0;font-size:11px;color:#a1a1aa;">Répondre à cet email répond au client si une adresse email a été renseignée.</p>
      </td>
    </tr>
  </table>
</body>
</html>`
}

/** Extrait l'email d'un champ "Nom <email@x.com>" ou retourne la chaîne nettoyée */
function extractEmailForReply(raw: string | undefined): string | undefined {
  if (!raw?.trim()) return undefined
  const angle = raw.match(/<([^>]+)>/)
  const candidate = (angle ? angle[1] : raw).trim()
  const simple = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return simple.test(candidate) ? candidate : undefined
}

function smtpErrorMessage(err: unknown): string {
  if (err && typeof err === 'object' && 'response' in err && typeof (err as { response?: string }).response === 'string') {
    return (err as { response: string }).response.slice(0, 500)
  }
  if (err instanceof Error) return err.message
  return String(err)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const type = body?.type as FormType
    const data = (body?.data || {}) as Record<string, string>

    if (!type || (type !== 'rendezvous' && type !== 'devis')) {
      return NextResponse.json({ error: 'Type de formulaire invalide' }, { status: 400 })
    }

    const smtpHost = process.env.SMTP_HOST?.trim()
    const smtpPort = Number(process.env.SMTP_PORT || 587)
    const smtpUser = process.env.SMTP_USER?.trim()
    // Mot de passe d'application Google : souvent affiché avec des espaces — Gmail attend 16 caractères sans espace
    const smtpPass = process.env.SMTP_PASS?.replace(/\s+/g, '').trim()
    const smtpSecure = process.env.SMTP_SECURE === 'true'
    const to = smtpUser

    if (!smtpHost || !smtpUser || !smtpPass) {
      return NextResponse.json(
        { error: 'Configuration SMTP manquante (SMTP_HOST, SMTP_USER, SMTP_PASS)' },
        { status: 500 }
      )
    }

    // Gmail : l'expéditeur doit être le compte authentifié (SMTP_USER)
    const from = `"VSG PNEUS" <${smtpUser}>`

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      // Port 587 (STARTTLS) — requis pour Gmail
      ...(smtpPort === 587 && !smtpSecure
        ? {
            requireTLS: true,
          }
        : {}),
    })

    const mail = buildMailContent(type, data)
    const replyTo = extractEmailForReply(data.email)

    await transporter.sendMail({
      from,
      to,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
      ...(replyTo ? { replyTo } : {}),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    const details = smtpErrorMessage(error)
    console.error('Erreur envoi notification formulaire:', details, error)

    const isDev = process.env.NODE_ENV === 'development'

    return NextResponse.json(
      {
        error: "Erreur serveur lors de l'envoi du mail",
        ...(isDev && {
          details,
          hint:
            'Erreur 535 = Gmail refuse le login. Utilise un mot de passe d’application (pas le mot de passe du compte), avec SMTP_USER = la même adresse Gmail. Active la validation en 2 étapes. Redémarre après .env.local.',
        }),
      },
      { status: 500 }
    )
  }
}
