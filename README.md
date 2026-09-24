# German

Landing page en espagnol du Lic. Germán Esteban Guarino, psychologue clinicien à Buenos Aires.

## Aperçu local

```bash
python -m http.server 8080
```

Puis ouvrir `http://localhost:8080`.

## Points à confirmer avant une campagne publicitaire

- Validité actuelle des matricules nationale 52.371 et provinciale 63.267 avant de les afficher.
- Autorisation du numéro WhatsApp et de l'adresse e-mail publiés.
- Modalités, tarifs et disponibilités exactes.

## Formulaire Netlify et données de contact

- Le formulaire ne demande que le nom et l'adresse e-mail. Le motif de consultation, les champs libres, le téléphone et le nom de famille ont été retirés : ne pas collecter de détails cliniques dans un formulaire public.
- Sur Netlify, `data-netlify="true"`, le champ `form-name` et le honeypot préparent la détection statique. **Activer d'abord Forms → Enable form detection dans le panneau Netlify, puis redéployer.** La marque `data-netlify` doit disparaître du HTML publié quand Netlify a traité le formulaire; tant qu'elle est présente, le site ouvre un brouillon `mailto:` sans soumettre de POST, même sur Netlify. Vérifier un enregistrement réel dans Forms avant de considérer le formulaire opérationnel. Les notifications e-mail doivent être ajoutées séparément dans **Project configuration → Notifications → Emails and webhooks → Form submission notifications**, destinataire `lic.guarino.psicologo@gmail.com`.
- La configuration Netlify publie la racine (`netlify.toml`, dossier `.`), sans commande de build. `https://german-guarino.netlify.app/` est la version canonique. `https://floskinou.github.io/German/` reste une version GitHub Pages distincte. Ne pas promettre de réception Netlify ni de notification e-mail avant de les avoir vérifiées dans le panneau Forms et par un test réel.
- Les soumissions acceptées par Netlify restent disponibles dans le panneau Forms; les consulter et supprimer régulièrement. Le traitement des données de santé est exclu du formulaire.
- Sur la version GitHub Pages, le formulaire garde un secours `mailto:` vers `lic.guarino.psicologo@gmail.com`; l'utilisateur doit appuyer lui-même sur « Envoyer ». Cette voie ne confirme ni envoi ni réception.

## Conversions et tarifs

- Google Ads ne reçoit aucun champ du formulaire. La conversion `contact_form_button_click` part au clic sur « Enviar consulta » uniquement si les champs requis sont valides et si la personne a consenti à la mesure. Elle mesure une tentative, pas l'acceptation du POST ni la réception d'une notification. Après le POST accepté, l'événement de première partie `contact_form_submit` reste séparé; le secours `mailto:` n'est pas une preuve d'e-mail envoyé.
- Les clics WhatsApp/QR mesurent une interaction, jamais un message effectivement envoyé ou reçu. La CMP démarre avec les états de consentement à `denied`; Google Ads ne charge qu'après l'opt-in. Analytics, `ad_user_data`, personnalisation et remarketing restent désactivés.
- La grille indicative est de £25.79 pour la première entrevue, £43.83 par séance et £146.12 pour quatre séances (£36.53 par séance). Montants convertis depuis 30/51/170 EUR au taux de référence BCE du 23/09/2026 (1 EUR = 0.8595 GBP). Le tarif individuel reste 15 % sous la référence espagnole basse convertie (£51.57 × 0.85 ≈ £43.83).
- Les références européennes affichées sont des repères publics observés en septembre 2026, convertis en GBP au taux BCE ci-dessus; ce ne sont pas des barèmes officiels. Le compte Google Ads du professionnel est en ARS: la devise de l'événement de conversion reste celle du compte, sans représenter le prix d'une séance ni un revenu.


## Sources professionnelles utilisées

- Profil public : https://psiquiatria.com/directorio/german-guarino/psicologo/consulta-online/argentina
- LinkedIn : https://ar.linkedin.com/in/licguarino
- Nomination officielle : https://www.boletinoficial.gov.ar/detalleAviso/primera/312058/20240812
- Loi nationale 23.277 : https://www.argentina.gob.ar/normativa/nacional/ley-23277-20059/texto
- Loi provinciale 10.306 : https://www.argentina.gob.ar/normativa/provincial/ley-10306-123456789-0abc-defg-603-0100bvorpyel/actualizacion
