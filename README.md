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
- Sur Netlify, `data-netlify="true"`, le champ `form-name` et le honeypot activent la détection statique. Le formulaire n'est traité qu'après un déploiement Netlify avec la détection activée; les notifications e-mail doivent être ajoutées dans **Project configuration → Notifications → Emails and webhooks → Form submission notifications**, destinataire `lic.guarino.psicologo@gmail.com`.
- La configuration Netlify publie la racine (`netlify.toml`, dossier `.`), sans commande de build. `https://german-guarino.netlify.app/` sert actuellement une version correspondant à `origin/main`, avec une réécriture d'URL par Netlify; le formulaire traité par Netlify ne sera actif qu'après déploiement et activation de la détection. `https://floskinou.github.io/German/` reste une version GitHub Pages distincte. Ne pas promettre de notification e-mail avant de l'avoir configurée dans Netlify et vérifiée par un test réel.
- Les soumissions acceptées par Netlify restent disponibles dans le panneau Forms; les consulter et supprimer régulièrement. Le traitement des données de santé est exclu du formulaire.
- Sur la version GitHub Pages, le formulaire garde un secours `mailto:` vers `lic.guarino.psicologo@gmail.com`; l'utilisateur doit appuyer lui-même sur « Envoyer ». Cette voie ne confirme ni envoi ni réception.

## Conversions et tarifs

- Google Ads ne reçoit aucun champ du formulaire. Une conversion `contact_form_submit` ne part qu'après réponse HTTP de succès du formulaire Netlify et uniquement si la personne a consenti à la mesure. Le fallback `mailto:` ne compte pas comme conversion.
- Les clics WhatsApp/QR mesurent une interaction, jamais un message effectivement envoyé ou reçu. La CMP démarre avec les états de consentement à `denied`; Google Ads ne charge qu'après l'opt-in. Analytics, `ad_user_data`, personnalisation et remarketing restent désactivés.
- La grille proposée est de 30 EUR pour la première entrevue, 51 EUR par séance et 170 EUR pour quatre séances. Le tarif individuel correspond exactement à 15 % sous la borne espagnole de 60 EUR (60 × 0,85 = 51).
- Les références européennes affichées sont des repères publics observés en septembre 2026, pas des barèmes officiels.


## Sources professionnelles utilisées

- Profil public : https://psiquiatria.com/directorio/german-guarino/psicologo/consulta-online/argentina
- LinkedIn : https://ar.linkedin.com/in/licguarino
- Nomination officielle : https://www.boletinoficial.gov.ar/detalleAviso/primera/312058/20240812
- Loi nationale 23.277 : https://www.argentina.gob.ar/normativa/nacional/ley-23277-20059/texto
- Loi provinciale 10.306 : https://www.argentina.gob.ar/normativa/provincial/ley-10306-123456789-0abc-defg-603-0100bvorpyel/actualizacion
