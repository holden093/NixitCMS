import type {
  AboutSectionContent,
  ContactsSectionContent,
  HomeSectionContent,
  NotFoundSectionContent,
  PublicSiteSlug,
  ServiceTemplateContent,
  SiteChromeContent,
} from '@/types/api'
import type { SectionFieldDefinition } from '@/lib/content/structuredSections'

type Translator = (key: string) => string

export interface WorkspaceTextFieldConfig {
  label: string
  description: string
  group?: string
  placeholder?: string
  example?: string
  rows?: number
  previewable?: boolean
  summary?: string
}

export interface WorkspaceFieldGroup {
  id: string
  label: string
  description: string
  summary?: string
}

export interface WorkspaceConfig {
  label: string
  description: string
  summary: string
  primaryTitle: string
  primaryDescription: string
  titleField?: WorkspaceTextFieldConfig
  subtitleField?: WorkspaceTextFieldConfig
  bodyField?: WorkspaceTextFieldConfig
  showTitle: boolean
  showSubtitle: boolean
  showBody: boolean
  groups: readonly WorkspaceFieldGroup[]
  fields: readonly SectionFieldDefinition<string>[]
}

const field = <T extends string>(definition: SectionFieldDefinition<T>) => definition

export const CONTENT_PAGE_VISIBILITY_SLUGS = ['home', 'about', 'rooms', 'contacts'] as const

export const CONTENT_WORKSPACE_SLUGS = [
  'home',
  'about',
  'rooms',
  'contacts',
  'site',
  'service-template',
  'not-found',
] as const satisfies readonly PublicSiteSlug[]

export type ContentWorkspaceSlug = typeof CONTENT_WORKSPACE_SLUGS[number]

const HOME_GROUPS = [
  {
    id: 'hero',
    label: 'Copertina',
    description: 'Messaggi che aprono la homepage e accompagnano la prenotazione.',
    summary: 'Titolo, testo introduttivo e pulsanti principali.',
  },
  {
    id: 'booking',
    label: 'Prenotazione',
    description: 'Testi che accompagnano il widget di prenotazione.',
    summary: "Aiuta l'utente a capire subito dove prenotare.",
  },
  {
    id: 'rooms',
    label: 'Camere',
    description: "Invito a esplorare le categorie camera dell'hotel.",
    summary: 'Introduce il teaser unico che porta alla pagina camere.',
  },
  {
    id: 'services',
    label: 'Servizi',
    description: "Invito a scoprire l'offerta dell'hotel.",
    summary: 'Introduce le card dei servizi disponibili.',
  },
  {
    id: 'map',
    label: 'Come raggiungerci',
    description: 'Messaggi della sezione posizione e indicazioni.',
    summary: "Aiuta l'utente a orientarsi e raggiungere l'hotel.",
  },
] as const satisfies readonly WorkspaceFieldGroup[]

export const HOME_SECTION_FIELDS = [
  field({
    key: 'eyebrow',
    label: 'Hero - Sopratitolo',
    group: 'hero',
    uiLabel: 'Testo piccolo sopra al titolo',
    description: 'Una frase breve che introduce la homepage prima del titolo grande.',
    placeholder: 'Accoglienza ritrovata',
    example: 'Accoglienza ritrovata',
    priority: 'primary',
    summary: 'Compare nella fascia alta della homepage.',
  }),
  field({
    key: 'primaryCta',
    label: 'Hero - CTA primaria',
    group: 'hero',
    uiLabel: 'Testo del pulsante principale',
    description: 'Il pulsante che vuoi far cliccare per primo.',
    placeholder: 'Verifica disponibilita',
    example: 'Verifica disponibilita',
    priority: 'primary',
    summary: 'Compare accanto al titolo principale.',
  }),
  field({
    key: 'secondaryCta',
    label: 'Hero - CTA secondaria',
    group: 'hero',
    uiLabel: 'Testo del pulsante secondario',
    description: 'Un invito alternativo per chi vuole esplorare il sito prima di prenotare.',
    placeholder: 'Scopri i servizi',
    example: 'Scopri i servizi',
    summary: 'Compare accanto al pulsante principale.',
  }),
  field({
    key: 'bookingLabel',
    label: 'Prenotazione - Etichetta sezione',
    group: 'booking',
    uiLabel: 'Etichetta piccola della sezione prenotazione',
    description: 'Un titolo corto sopra al widget di booking.',
    placeholder: 'Prenota',
    example: 'Prenota',
    summary: 'Compare sopra al motore di prenotazione.',
  }),
  field({
    key: 'bookingIntro',
    label: 'Prenotazione - Testo introduttivo',
    group: 'booking',
    uiLabel: 'Testo di aiuto vicino al booking',
    description: "Spiega in modo semplice cosa puo fare l'utente in questa area.",
    placeholder: 'Scegli le date del soggiorno e accedi al motore di prenotazione diretto.',
    example: 'Scegli le date del soggiorno e accedi al motore di prenotazione diretto.',
    summary: 'Compare accanto al widget di prenotazione.',
    multiline: true,
    rows: 3,
    markdown: true,
  }),
  field({
    key: 'roomsLabel',
    label: 'Camere - Etichetta sezione',
    group: 'rooms',
    uiLabel: 'Etichetta piccola della sezione camere',
    description: 'Una parola o breve frase sopra al blocco camere.',
    placeholder: 'Camere',
    example: 'Camere',
  }),
  field({
    key: 'roomsTitle',
    label: 'Camere - Titolo sezione',
    group: 'rooms',
    uiLabel: 'Titolo della sezione camere',
    description: 'Invita a scoprire le categorie di camere.',
    placeholder: 'Le nostre camere',
    example: 'Le nostre camere',
    priority: 'primary',
  }),
  field({
    key: 'roomsIntro',
    label: 'Camere - Testo introduttivo',
    group: 'rooms',
    uiLabel: 'Testo breve sotto al titolo camere',
    description: 'Una breve spiegazione che introduce il percorso verso la pagina camere.',
    placeholder: 'Introduci le categorie camera con un tono semplice e rassicurante.',
    example: 'Introduci le categorie camera con un tono semplice e rassicurante.',
    multiline: true,
    rows: 3,
    markdown: true,
  }),
  field({
    key: 'roomsCta',
    label: 'Camere - Testo pulsante',
    group: 'rooms',
    uiLabel: 'Testo del collegamento verso la pagina camere',
    description: 'Il testo che invita ad aprire la pagina con tutte le categorie.',
    placeholder: 'Esplora le camere',
    example: 'Esplora le camere',
  }),
  field({
    key: 'servicesLabel',
    label: 'Servizi - Etichetta sezione',
    group: 'services',
    uiLabel: 'Etichetta piccola della sezione servizi',
    description: 'Una parola o breve frase sopra al blocco servizi.',
    placeholder: 'Servizi',
    example: 'Servizi',
  }),
  field({
    key: 'servicesTitle',
    label: 'Servizi - Titolo sezione',
    group: 'services',
    uiLabel: 'Titolo della sezione servizi',
    description: "Invita a scoprire l'offerta dell'hotel.",
    placeholder: 'Ogni dettaglio e pensato per farti stare bene.',
    example: 'Ogni dettaglio e pensato per farti stare bene.',
    priority: 'primary',
  }),
  field({
    key: 'servicesIntro',
    label: 'Servizi - Testo introduttivo',
    group: 'services',
    uiLabel: 'Testo breve sotto al titolo servizi',
    description: 'Una breve spiegazione che prepara alle card dei servizi.',
    placeholder: 'Introduci i servizi con un tono semplice e rassicurante.',
    example: 'Introduci i servizi con un tono semplice e rassicurante.',
    multiline: true,
    rows: 3,
    markdown: true,
  }),
  field({
    key: 'mapLabel',
    label: 'Mappa - Etichetta sezione',
    group: 'map',
    uiLabel: 'Etichetta piccola della sezione posizione',
    description: 'Una parola o frase breve che introduce la mappa.',
    placeholder: 'Dove siamo',
    example: 'Dove siamo',
  }),
  field({
    key: 'mapTitle',
    label: 'Mappa - Titolo sezione',
    group: 'map',
    uiLabel: 'Titolo della sezione posizione',
    description: 'Racconta la comodita della posizione con una frase chiara.',
    placeholder: 'Raggiungerci e semplice, fermarsi e ancora meglio.',
    example: 'Raggiungerci e semplice, fermarsi e ancora meglio.',
    priority: 'primary',
  }),
  field({
    key: 'mapIntro',
    label: 'Mappa - Testo introduttivo',
    group: 'map',
    uiLabel: 'Testo breve vicino alla mappa',
    description: "Spiega in poche righe cosa c'e intorno o come arrivare.",
    placeholder: 'Una breve nota che accompagna mappa e indicazioni.',
    example: 'Una breve nota che accompagna mappa e indicazioni.',
    multiline: true,
    rows: 3,
    markdown: true,
  }),
  field({
    key: 'mapCta',
    label: 'Mappa - Testo pulsante',
    group: 'map',
    uiLabel: 'Testo del pulsante per aprire le indicazioni',
    description: 'Il bottone che porta alle indicazioni stradali.',
    placeholder: 'Ottieni indicazioni',
    example: 'Ottieni indicazioni',
  }),
  field({
    key: 'tourismCta',
    label: 'Mappa - CTA guida turistica',
    group: 'map',
    uiLabel: 'Testo del pulsante per aprire la guida dei dintorni',
    description: 'Compare accanto al pulsante delle indicazioni e apre la vista turistica dei POI.',
    placeholder: 'Esplora i dintorni',
    example: 'Esplora i dintorni',
    summary: 'Apre il dialog pubblico con i punti di interesse.',
  }),
  field({
    key: 'tourismLabel',
    label: 'Guida turistica - Etichetta sezione',
    group: 'map',
    uiLabel: 'Etichetta piccola della guida dei dintorni',
    description: 'Una parola o frase breve sopra al titolo del dialog turistico.',
    placeholder: 'Guida del territorio',
    example: 'Guida del territorio',
  }),
  field({
    key: 'tourismTitle',
    label: 'Guida turistica - Titolo sezione',
    group: 'map',
    uiLabel: 'Titolo del dialog turistico',
    description: 'Invita a esplorare i punti di interesse attorno all’hotel.',
    placeholder: 'Esplora i punti di interesse nei dintorni',
    example: 'Esplora i punti di interesse nei dintorni',
    priority: 'primary',
  }),
  field({
    key: 'tourismIntro',
    label: 'Guida turistica - Testo introduttivo',
    group: 'map',
    uiLabel: 'Testo breve introduttivo della guida dei dintorni',
    description: 'Spiega in poche righe come leggere la guida turistica e orientarsi.',
    placeholder: 'Un testo introduttivo che accompagna la lista dei punti di interesse.',
    example: 'Apri una vista dedicata per orientarti tra ristorazione, trasporti e attrazioni vicine all’hotel.',
    multiline: true,
    rows: 3,
    markdown: true,
  }),
] satisfies readonly SectionFieldDefinition<keyof HomeSectionContent>[]

const SITE_GROUPS = [
  {
    id: 'menu',
    label: 'Menu principale',
    description: 'Voci e microcopy usate nella navigazione del sito.',
    summary: 'Sono i testi che il visitatore vede piu spesso.',
  },
  {
    id: 'booking',
    label: 'Inviti alla prenotazione',
    description: 'Parole che accompagnano la scelta di prenotare o contattare la struttura.',
  },
  {
    id: 'footer',
    label: 'Footer',
    description: 'Testi fissi del piede pagina, dati aziendali e link utili.',
  },
] as const satisfies readonly WorkspaceFieldGroup[]

export const SITE_CHROME_FIELDS = [
  field({
    key: 'navHome',
    label: 'Navbar - Home',
    group: 'menu',
    uiLabel: 'Voce menu per la homepage',
    description: 'Testo del link che riporta alla homepage.',
    placeholder: 'Home',
    example: 'Home',
    priority: 'primary',
  }),
  field({
    key: 'navAbout',
    label: 'Navbar - Chi siamo',
    group: 'menu',
    uiLabel: 'Voce menu per la pagina chi siamo',
    description: 'Testo del link che racconta la struttura.',
    placeholder: 'Chi siamo',
    example: 'Chi siamo',
    priority: 'primary',
  }),
  field({
    key: 'navRooms',
    label: 'Navbar - Camere',
    group: 'menu',
    uiLabel: 'Voce menu per la pagina camere',
    description: 'Testo del link che porta alla pagina con le categorie camera.',
    placeholder: 'Camere',
    example: 'Camere',
    priority: 'primary',
  }),
  field({
    key: 'navContacts',
    label: 'Navbar - Contatti',
    group: 'menu',
    uiLabel: 'Voce menu per i contatti',
    description: 'Testo del link per scrivere o trovare i riferimenti.',
    placeholder: 'Contatti',
    example: 'Contatti',
    priority: 'primary',
  }),
  field({
    key: 'navBook',
    label: 'Navbar - Prenota',
    group: 'booking',
    uiLabel: 'Testo del pulsante prenota',
    description: 'Il pulsante piu visibile nella navigazione del sito.',
    placeholder: 'Prenota',
    example: 'Prenota',
    priority: 'primary',
  }),
  field({
    key: 'navTagline',
    label: 'Navbar - Tagline',
    group: 'menu',
    uiLabel: "Piccola frase sopra al nome dell'hotel",
    description: 'Una micro-frase che accompagna logo e nome del brand.',
    placeholder: 'Hotel CMS',
    example: 'Hotel CMS',
  }),
  field({
    key: 'footerDescription',
    label: 'Footer - Descrizione',
    group: 'footer',
    uiLabel: 'Testo descrittivo principale del footer',
    description: 'Una breve presentazione che appare nel piede pagina.',
    placeholder: "Racconta in poche righe l'identita del luogo.",
    example: "Racconta in poche righe l'identita del luogo.",
    summary: 'Compare nella colonna principale del footer.',
    multiline: true,
    rows: 3,
    previewable: true,
  }),
  field({
    key: 'footerExplore',
    label: 'Footer - Titolo Esplora',
    group: 'footer',
    uiLabel: 'Titolo della colonna con i link principali',
    description: 'Piccolo titolo sopra ai link di navigazione nel footer.',
    placeholder: 'Esplora',
    example: 'Esplora',
  }),
  field({
    key: 'footerBooking',
    label: 'Footer - Titolo Soggiorno',
    group: 'footer',
    uiLabel: 'Titolo della colonna dedicata al soggiorno',
    description: 'Piccolo titolo sopra ai link per prenotare o raggiungerci.',
    placeholder: 'Soggiorno',
    example: 'Soggiorno',
  }),
  field({
    key: 'footerCompanyData',
    label: 'Footer - Titolo Dati aziendali',
    group: 'footer',
    uiLabel: 'Titolo della colonna dati aziendali',
    description: 'Piccolo titolo sopra ai riferimenti societari nel footer.',
    placeholder: 'Dati aziendali',
    example: 'Dati aziendali',
  }),
  field({
    key: 'footerLegalName',
    label: 'Footer - Ragione sociale',
    group: 'footer',
    uiLabel: 'Etichetta per la ragione sociale',
    description: 'Nome del campo che introduce la ragione sociale.',
    placeholder: 'Ragione sociale',
    example: 'Ragione sociale',
  }),
  field({
    key: 'footerAddress',
    label: 'Footer - Indirizzo',
    group: 'footer',
    uiLabel: "Etichetta per l'indirizzo",
    description: 'Nome del campo che introduce indirizzo e sede.',
    placeholder: 'Indirizzo',
    example: 'Indirizzo',
  }),
  field({
    key: 'footerVatNumber',
    label: 'Footer - Partita IVA',
    group: 'footer',
    uiLabel: 'Etichetta per la partita IVA',
    description: 'Nome del campo che introduce la partita IVA.',
    placeholder: 'Partita IVA',
    example: 'Partita IVA',
  }),
  field({
    key: 'footerTaxCode',
    label: 'Footer - Codice fiscale',
    group: 'footer',
    uiLabel: 'Etichetta per il codice fiscale',
    description: 'Nome del campo che introduce il codice fiscale.',
    placeholder: 'Codice fiscale',
    example: 'Codice fiscale',
  }),
  field({
    key: 'footerPhone',
    label: 'Footer - Telefono',
    group: 'footer',
    uiLabel: 'Etichetta per il telefono',
    description: 'Nome del campo che introduce il numero di telefono.',
    placeholder: 'Telefono',
    example: 'Telefono',
  }),
  field({
    key: 'footerEmail',
    label: 'Footer - Email',
    group: 'footer',
    uiLabel: "Etichetta per l'email",
    description: "Nome del campo che introduce l'indirizzo email.",
    placeholder: 'Email',
    example: 'Email',
  }),
  field({
    key: 'footerLocationLink',
    label: 'Footer - Link Mappa',
    group: 'footer',
    uiLabel: 'Link del footer verso la mappa',
    description: "Testo del link rapido che porta alla posizione dell'hotel.",
    placeholder: 'Mappa',
    example: 'Mappa',
  }),
] satisfies readonly SectionFieldDefinition<keyof SiteChromeContent>[]

const ROOMS_GROUPS = [
  {
    id: 'editorial',
    label: 'Pagina camere',
    description: 'Titolo, sottotitolo e racconto introduttivo della pagina pubblica camere.',
  },
] as const satisfies readonly WorkspaceFieldGroup[]

const ABOUT_GROUPS = [
  {
    id: 'intro',
    label: 'Apertura pagina',
    description: 'Eyebrow, titolo e immagine che aprono la pagina in una colonna unica.',
  },
  {
    id: 'editorial',
    label: 'Testi della pagina',
    description: "Il racconto che scorre sotto l'immagine nella stessa colonna della pagina pubblica.",
  },
] as const satisfies readonly WorkspaceFieldGroup[]

export const ABOUT_SECTION_FIELDS = [
  field({
    key: 'label',
    label: 'Pagina - Etichetta sezione',
    group: 'intro',
    uiLabel: 'Etichetta piccola della pagina',
    description: 'Una parola o breve frase sopra al titolo della pagina.',
    placeholder: 'Chi siamo',
    example: 'Chi siamo',
  }),
  field({
    key: 'imageKey',
    type: 'media',
    label: 'Pagina - Immagine principale',
    group: 'intro',
    uiLabel: 'Immagine principale della pagina',
    description: 'La foto che compare subito sotto il titolo della pagina chi siamo.',
    example: 'Preferisci una foto orizzontale, luminosa e coerente con il tono istituzionale.',
    summary: 'Compare sotto il titolo della pagina chi siamo.',
    pickerTitle: 'Scegli l\'immagine principale della pagina chi siamo',
  }),
  field({
    key: 'quoteLabel',
    label: 'Pagina - Etichetta testo introduttivo',
    group: 'editorial',
    uiLabel: 'Etichetta del testo introduttivo',
    description: "Testo piccolo sopra al primo blocco testuale mostrato sotto l'immagine.",
    placeholder: 'Una storia ritrovata',
    example: 'Una storia ritrovata',
  }),
  field({
    key: 'quoteBody',
    label: 'Pagina - Testo introduttivo in evidenza',
    group: 'editorial',
    uiLabel: 'Testo introduttivo in evidenza',
    description: "Il primo testo mostrato sotto l'immagine, nello stesso flusso lineare della pagina.",
    placeholder: 'Scrivi il passaggio che vuoi far ricordare piu facilmente.',
    example: 'Scrivi il passaggio che vuoi far ricordare piu facilmente.',
    multiline: true,
    rows: 4,
    previewable: true,
    markdown: true,
  }),
] satisfies readonly SectionFieldDefinition<keyof AboutSectionContent>[]

const CONTACTS_GROUPS = [
  {
    id: 'form',
    label: 'Form contatti',
    description: "Titolo pagina, etichette e messaggi del modulo che l'utente compila.",
  },
  {
    id: 'feedback',
    label: 'Messaggi di conferma',
    description: 'Testi mostrati quando il form viene inviato o incontra un errore.',
  },
] as const satisfies readonly WorkspaceFieldGroup[]

export const CONTACTS_SECTION_FIELDS = [
  field({
    key: 'privacyNote',
    label: 'Form - Nota privacy',
    group: 'form',
    uiLabel: 'Nota privacy del form',
    description: 'Breve testo rassicurante sul trattamento dei dati.',
    placeholder: 'Una nota semplice e chiara sulla privacy.',
    example: 'Una nota semplice e chiara sulla privacy.',
    multiline: true,
    rows: 3,
    previewable: true,
    markdown: true,
  }),
  field({
    key: 'nameLabel',
    label: 'Form - Nome',
    group: 'form',
    uiLabel: 'Etichetta del campo nome',
    description: 'Testo mostrato sopra al campo nome.',
    placeholder: 'Nome',
    example: 'Nome',
  }),
  field({
    key: 'surnameLabel',
    label: 'Form - Cognome',
    group: 'form',
    uiLabel: 'Etichetta del campo cognome',
    description: 'Testo mostrato sopra al campo cognome.',
    placeholder: 'Cognome',
    example: 'Cognome',
  }),
  field({
    key: 'emailLabel',
    label: 'Form - Email',
    group: 'form',
    uiLabel: 'Etichetta del campo email',
    description: 'Testo mostrato sopra al campo email.',
    placeholder: 'Email',
    example: 'Email',
  }),
  field({
    key: 'messageLabel',
    label: 'Form - Messaggio',
    group: 'form',
    uiLabel: 'Etichetta del campo messaggio',
    description: "Testo mostrato sopra all'area dove il visitatore scrive il messaggio.",
    placeholder: 'Messaggio',
    example: 'Messaggio',
  }),
  field({
    key: 'sendLabel',
    label: 'Form - Pulsante invio',
    group: 'form',
    uiLabel: 'Testo del pulsante invio',
    description: 'Il pulsante che invia il messaggio.',
    placeholder: 'Invia messaggio',
    example: 'Invia messaggio',
    priority: 'primary',
  }),
  field({
    key: 'successMessage',
    label: 'Form - Successo',
    group: 'feedback',
    uiLabel: "Messaggio mostrato dopo l'invio",
    description: 'Testo rassicurante che appare quando il messaggio parte correttamente.',
    placeholder: 'Grazie, ti risponderemo presto.',
    example: 'Grazie, ti risponderemo presto.',
    multiline: true,
    rows: 2,
  }),
  field({
    key: 'errorMessage',
    label: 'Form - Errore',
    group: 'feedback',
    uiLabel: 'Messaggio mostrato in caso di errore',
    description: 'Spiega con tono calmo che cosa e successo e invita a riprovare.',
    placeholder: 'Non siamo riusciti a inviare il messaggio. Riprova tra poco.',
    example: 'Non siamo riusciti a inviare il messaggio. Riprova tra poco.',
    multiline: true,
    rows: 2,
  }),
  field({
    key: 'invalidEmail',
    label: 'Form - Email non valida',
    group: 'feedback',
    uiLabel: 'Messaggio per email non valida',
    description: "Avviso mostrato quando l'email non ha un formato corretto.",
    placeholder: "Controlla l'indirizzo email e riprova.",
    example: "Controlla l'indirizzo email e riprova.",
  }),
] satisfies readonly SectionFieldDefinition<keyof ContactsSectionContent>[]

const SERVICE_TEMPLATE_GROUPS = [
  {
    id: 'listing',
    label: 'Card elenco',
    description: 'Microcopy usate quando il servizio compare nelle liste o nelle card pubbliche.',
  },
] as const satisfies readonly WorkspaceFieldGroup[]

export const SERVICE_TEMPLATE_FIELDS = [
  field({
    key: 'readMore',
    label: "Card servizio - Leggi di piu'",
    group: 'listing',
    uiLabel: 'Testo del pulsante nelle card servizio',
    description: 'Invita ad aprire il dettaglio di un servizio.',
    placeholder: "Scopri di piu'",
    example: "Scopri di piu'",
    priority: 'primary',
  }),
] satisfies readonly SectionFieldDefinition<keyof ServiceTemplateContent>[]

const NOT_FOUND_GROUPS = [
  {
    id: 'message',
    label: 'Messaggio errore',
    description: 'Testi che spiegano in modo chiaro che la pagina non e disponibile.',
  },
  {
    id: 'actions',
    label: 'Pulsanti di recupero',
    description: 'Inviti per rientrare nel percorso giusto del sito.',
  },
] as const satisfies readonly WorkspaceFieldGroup[]

export const NOT_FOUND_SECTION_FIELDS = [
  field({
    key: 'label',
    label: '404 - Etichetta',
    group: 'message',
    uiLabel: 'Etichetta piccola sopra al messaggio di errore',
    description: 'Una parola breve che identifica la pagina di errore.',
    placeholder: '404',
    example: '404',
  }),
  field({
    key: 'home',
    label: '404 - CTA home',
    group: 'actions',
    uiLabel: 'Pulsante per tornare alla homepage',
    description: 'Il testo del bottone che riporta alla pagina iniziale.',
    placeholder: 'Torna alla home',
    example: 'Torna alla home',
    priority: 'primary',
  }),
  field({
    key: 'contacts',
    label: '404 - CTA contatti',
    group: 'actions',
    uiLabel: 'Pulsante per aprire i contatti',
    description: "Un'alternativa utile per chi non trova cio che cercava.",
    placeholder: 'Contattaci',
    example: 'Contattaci',
  }),
] satisfies readonly SectionFieldDefinition<keyof NotFoundSectionContent>[]

export const CONTENT_WORKSPACE_CONFIG: Record<ContentWorkspaceSlug, WorkspaceConfig> = {
  home: {
    label: 'Homepage',
    description: 'Testi e pulsanti della homepage focalizzata su prenotazione, camere, servizi e posizione.',
    summary: 'Lavora qui quando vuoi aggiornare la prima impressione del sito: apertura, prenotazione, camere, servizi e indicazioni.',
    primaryTitle: 'Testi principali della homepage',
    primaryDescription: "Questi sono i contenuti piu visibili appena l'utente atterra sulla homepage.",
    titleField: {
      label: 'Titolo grande in apertura',
      description: 'Il titolo piu importante della homepage.',
      group: 'hero',
      placeholder: 'Hotel CMS',
      example: 'Hotel CMS',
      summary: 'Compare nella hero della homepage.',
    },
    subtitleField: {
      label: 'Testo descrittivo sotto il titolo',
      description: 'Spiega in una o due frasi perche questo luogo vale un soggiorno o una prenotazione.',
      group: 'hero',
      placeholder: 'Racconta in modo semplice atmosfera, promessa e carattere della struttura.',
      example: 'Racconta in modo semplice atmosfera, promessa e carattere della struttura.',
      rows: 4,
      summary: 'Compare subito sotto al titolo principale.',
    },
    showTitle: true,
    showSubtitle: true,
    showBody: false,
    groups: HOME_GROUPS,
    fields: HOME_SECTION_FIELDS,
  },
  about: {
    label: 'Chi siamo',
    description: 'Pagina editoriale a colonna singola che racconta identita, storia e visione della struttura.',
    summary: "Usa questa area quando vuoi aggiornare il racconto dell'hotel in un flusso lineare: apertura, immagine e testo.",
    primaryTitle: 'Testi principali della pagina',
    primaryDescription: "Definiscono un racconto lineare: titolo, immagine sotto l'apertura e contenuti testuali nella stessa colonna.",
    titleField: {
      label: 'Titolo principale della pagina',
      description: 'Il titolo che apre la pagina chi siamo.',
      group: 'intro',
      placeholder: 'La nostra storia',
      example: 'La nostra storia',
    },
    subtitleField: {
      label: 'Testo introduttivo della pagina',
      description: 'Una breve introduzione che compare sotto il primo blocco testuale, nella stessa colonna della pagina.',
      group: 'intro',
      placeholder: 'Spiega in poche righe che cosa trovera il visitatore.',
      example: 'Spiega in poche righe che cosa trovera il visitatore.',
      rows: 4,
    },
    bodyField: {
      label: 'Racconto lungo della pagina',
      description: 'Il corpo editoriale completo della pagina chi siamo, mostrato sotto i testi introduttivi senza card separate. Puoi usare anche Markdown semplice.',
      group: 'editorial',
      placeholder: 'Racconta origini, recupero storico e visione della struttura.',
      example: '## Un luogo con una storia da condividere',
      rows: 10,
      previewable: true,
    },
    showTitle: true,
    showSubtitle: true,
    showBody: true,
    groups: ABOUT_GROUPS,
    fields: ABOUT_SECTION_FIELDS,
  },
  rooms: {
    label: 'Camere',
    description: 'Pagina editoriale che introduce le categorie camera pubbliche.',
    summary: 'Qui definisci il titolo, il sottotitolo e il racconto che aprono la pagina camere prima della griglia delle categorie.',
    primaryTitle: 'Testi principali della pagina camere',
    primaryDescription: 'Questi contenuti introducono la pagina pubblica delle camere con un tono editoriale coerente.',
    titleField: {
      label: 'Titolo principale della pagina',
      description: 'Il titolo che apre la pagina camere.',
      group: 'editorial',
      placeholder: 'Le nostre camere',
      example: 'Le nostre camere',
    },
    subtitleField: {
      label: 'Sottotitolo della pagina',
      description: 'Una breve frase che accompagna il titolo e chiarisce la promessa del soggiorno.',
      group: 'editorial',
      placeholder: 'Categorie di camera pensate per soggiorni semplici e confortevoli.',
      example: 'Categorie di camera pensate per soggiorni semplici e confortevoli.',
      rows: 4,
    },
    bodyField: {
      label: 'Testo introduttivo della pagina',
      description: 'Un racconto breve che introduce la collezione di camere. Puoi usare anche Markdown semplice.',
      group: 'editorial',
      placeholder: 'Racconta atmosfera, tipologie e modo di vivere il soggiorno.',
      example: 'Un’introduzione editoriale alle categorie di camere.',
      rows: 8,
      previewable: true,
    },
    showTitle: true,
    showSubtitle: true,
    showBody: true,
    groups: ROOMS_GROUPS,
    fields: [],
  },
  contacts: {
    label: 'Contatti',
    description: 'Titolo e microcopy del modulo contatti pubblico.',
    summary: 'Qui gestisci una pagina contatti essenziale: titolo, etichette del form, privacy e messaggi di esito.',
    primaryTitle: 'Titolo della pagina contatti',
    primaryDescription: 'Il titolo principale e il solo testo editoriale libero mostrato nella pagina pubblica contatti.',
    titleField: {
      label: 'Titolo principale della pagina',
      description: 'Il titolo che apre la pagina contatti.',
      group: 'form',
      placeholder: 'Contattaci',
      example: 'Contattaci',
      summary: 'Compare sopra al form pubblico della pagina contatti.',
    },
    showTitle: true,
    showSubtitle: false,
    showBody: false,
    groups: CONTACTS_GROUPS,
    fields: CONTACTS_SECTION_FIELDS,
  },
  site: {
    label: 'Navigazione e footer',
    description: 'Testi condivisi nelle aree fisse del sito pubblico.',
    summary: 'Aggiorna qui menu, CTA globali e footer senza entrare nelle singole pagine.',
    primaryTitle: 'Nessun testo principale da compilare',
    primaryDescription: 'Questa area usa solo blocchi guidati per menu e footer.',
    showTitle: false,
    showSubtitle: false,
    showBody: false,
    groups: SITE_GROUPS,
    fields: SITE_CHROME_FIELDS,
  },
  'service-template': {
    label: 'Template servizi',
    description: 'Microcopy condivise dalle card servizio mostrate negli elenchi pubblici.',
    summary: 'Qui gestisci il testo del pulsante riusato dalle card servizio, senza intervenire sul layout del dettaglio.',
    primaryTitle: 'Nessun testo principale da compilare',
    primaryDescription: 'Questa area contiene solo il copy condiviso delle card servizio.',
    showTitle: false,
    showSubtitle: false,
    showBody: false,
    groups: SERVICE_TEMPLATE_GROUPS,
    fields: SERVICE_TEMPLATE_FIELDS,
  },
  'not-found': {
    label: 'Pagina 404',
    description: 'Titolo, descrizione e pulsanti della pagina che appare quando il contenuto non esiste.',
    summary: "Qui puoi rendere l'errore piu umano e guidare subito l'utente verso una via d'uscita chiara.",
    primaryTitle: 'Testi principali della pagina 404',
    primaryDescription: 'Sono i contenuti che spiegano cosa e successo e tranquillizzano il visitatore.',
    titleField: {
      label: 'Titolo principale della pagina',
      description: 'La frase piu grande che comunica che la pagina non e disponibile.',
      group: 'message',
      placeholder: 'Pagina non trovata',
      example: 'Pagina non trovata',
    },
    subtitleField: {
      label: 'Testo descrittivo della pagina',
      description: 'Spiega in modo semplice che il contenuto potrebbe essere stato spostato o rimosso.',
      group: 'message',
      placeholder: 'Non siamo riusciti a trovare questa pagina.',
      example: 'Non siamo riusciti a trovare questa pagina.',
      rows: 4,
    },
    showTitle: true,
    showSubtitle: true,
    showBody: false,
    groups: NOT_FOUND_GROUPS,
    fields: NOT_FOUND_SECTION_FIELDS,
  },
}

export function getSectionFallback(slug: ContentWorkspaceSlug, t: Translator) {
  switch (slug) {
    case 'home':
      return {
        eyebrow: t('home.eyebrow'),
        primaryCta: t('home.primaryCta'),
        secondaryCta: t('home.secondaryCta'),
        bookingLabel: t('home.booking'),
        bookingIntro: t('home.bookingIntro'),
        roomsLabel: t('home.roomsLabel'),
        roomsTitle: t('home.roomsTitle'),
        roomsIntro: t('home.roomsIntro'),
        roomsCta: t('home.roomsCta'),
        servicesLabel: t('home.services'),
        servicesTitle: t('home.services'),
        servicesIntro: t('home.servicesIntro'),
        mapLabel: t('home.map'),
        mapTitle: t('home.map'),
        mapIntro: t('home.mapIntro'),
        mapCta: t('home.mapCta'),
        tourismCta: t('home.tourismCta'),
        tourismLabel: t('home.tourismLabel'),
        tourismTitle: t('home.tourismTitle'),
        tourismIntro: t('home.tourismIntro'),
      }
    case 'about':
      return {
        label: t('about.label'),
        imageKey: '',
        quoteLabel: t('about.quoteLabel'),
        quoteBody: t('about.quoteBody'),
      }
    case 'rooms':
      return {}
    case 'contacts':
      return {
        privacyNote: t('contacts.privacyNote'),
        nameLabel: t('contacts.name'),
        surnameLabel: t('contacts.surname'),
        emailLabel: t('contacts.email'),
        messageLabel: t('contacts.message'),
        sendLabel: t('contacts.send'),
        successMessage: t('contacts.success'),
        errorMessage: t('contacts.error'),
        invalidEmail: t('contacts.invalidEmail'),
      }
    case 'site':
      return {
        navHome: t('nav.home'),
        navAbout: t('nav.about'),
        navRooms: t('nav.rooms'),
        navContacts: t('nav.contacts'),
        navBook: t('nav.book'),
        navTagline: t('nav.tagline'),
        footerDescription: t('footer.description'),
        footerExplore: t('footer.explore'),
        footerBooking: t('footer.booking'),
        footerCompanyData: t('footer.companyData'),
        footerLegalName: t('footer.legalName'),
        footerAddress: t('footer.address'),
        footerVatNumber: t('footer.vatNumber'),
        footerTaxCode: t('footer.taxCode'),
        footerPhone: t('footer.phone'),
        footerEmail: t('footer.email'),
        footerLocationLink: t('home.map'),
      }
    case 'service-template':
      return {
        readMore: t('services.readMore'),
      }
    case 'not-found':
      return {
        label: t('notFound'),
        home: t('notFoundPage.home'),
        contacts: t('notFoundPage.contacts'),
      }
  }
}
