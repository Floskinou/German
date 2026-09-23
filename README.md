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

## Fonctionnement du contact et des tarifs

- Le formulaire ouvre un e-mail prérempli à `lic.guarino.psicologo@gmail.com` ; aucun message n'est stocké par le site.
- Les conversions Google Ads sont installées avec le Google tag `AW-18469753508`. « Contact WhatsApp » se déclenche sur les clics `wa.me` et l'ouverture de la route QR (`qr_whatsapp_scan`) ; « Formulaire de contact » se déclenche après une soumission HTML valide, qui ouvre un e-mail prérempli. Ces événements mesurent des interactions, pas l'envoi confirmé d'un message WhatsApp ou d'un e-mail.
- Les paramètres d'événement Google Ads sont `send_to`, `value: 1.0` et `currency: ARS` ; aucun champ du formulaire (motif, message, nom, téléphone, e-mail) n'est inclus dans ces événements. Le Google tag peut transmettre des métadonnées techniques de navigation. Consent Mode démarre avec les stockages publicitaires/analytics et la personnalisation refusés ; aucun tag de remarketing n'est posé. Sans bannière/gestionnaire de consentement (CMP), cet état reste refusé et l'attribution peut être limitée.
- La grille proposée est de 30 EUR pour la première entrevue, 51 EUR par séance et 170 EUR pour quatre séances. Le tarif individuel correspond exactement à 15 % sous la borne espagnole de 60 EUR (60 × 0,85 = 51).
- Les références européennes affichées sont des repères publics observés en septembre 2026, pas des barèmes officiels.


## Sources professionnelles utilisées

- Profil public : https://psiquiatria.com/directorio/german-guarino/psicologo/consulta-online/argentina
- LinkedIn : https://ar.linkedin.com/in/licguarino
- Nomination officielle : https://www.boletinoficial.gov.ar/detalleAviso/primera/312058/20240812
- Loi nationale 23.277 : https://www.argentina.gob.ar/normativa/nacional/ley-23277-20059/texto
- Loi provinciale 10.306 : https://www.argentina.gob.ar/normativa/provincial/ley-10306-123456789-0abc-defg-603-0100bvorpyel/actualizacion
