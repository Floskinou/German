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
- La CMP personnalisée destinée au public britannique démarre Consent Mode avec tous les états à `denied` et utilise le mode basique : Google Ads ne charge qu'après l'opt-in de mesure. Les choix sont séparés par finalité, mémorisés 90 jours dans `localStorage`, révisables depuis le pied de page et retirables. Analytics, `ad_user_data`, personnalisation et remarketing restent désactivés. Les conversions restent génériques (`send_to`, `value: 1.0`, `currency: ARS`) et n'incluent aucun champ du formulaire ; la route QR ne mesure que si un opt-in valide est déjà enregistré et redirige dans tous les cas vers WhatsApp.
- La grille proposée est de 30 EUR pour la première entrevue, 51 EUR par séance et 170 EUR pour quatre séances. Le tarif individuel correspond exactement à 15 % sous la borne espagnole de 60 EUR (60 × 0,85 = 51).
- Les références européennes affichées sont des repères publics observés en septembre 2026, pas des barèmes officiels.


## Sources professionnelles utilisées

- Profil public : https://psiquiatria.com/directorio/german-guarino/psicologo/consulta-online/argentina
- LinkedIn : https://ar.linkedin.com/in/licguarino
- Nomination officielle : https://www.boletinoficial.gov.ar/detalleAviso/primera/312058/20240812
- Loi nationale 23.277 : https://www.argentina.gob.ar/normativa/nacional/ley-23277-20059/texto
- Loi provinciale 10.306 : https://www.argentina.gob.ar/normativa/provincial/ley-10306-123456789-0abc-defg-603-0100bvorpyel/actualizacion
