# SECURITY-MODEL — Teranga Resto

## 1. Authentification
- Système central géré par **Firebase Authentication** (Email/Password, Google, Apple, Phone).
- Aucun mot de passe stocké dans la base relationnelle Cloud SQL.
- Les identifiants (`UID`) Firebase sont utilisés comme clés primaires/étrangères dans la table `Users`.

## 2. Isolation Multi-Tenant (Données)
- Toutes les requêtes vers Cloud SQL filtreront systématiquement par `restaurant_id`.
- Utilisation de Drizzle ORM / Prisma avec des middlewares ou Row Level Security (RLS) PostgreSQL pour s'assurer qu'aucun compte ne peut lire les `Orders` ou `Products` d'un autre tenant.

## 3. Rôles et Permissions (RBAC)
- Vérification des permissions côté serveur (Server Actions ou API Routes) via la table `Restaurant_Members`.
- **Propriétaire (Owner)** : Tous les droits sur le `restaurant_id`. Gestion financière et équipe.
- **Manager** : Opérations complètes (Menu, Stocks, Commandes) sans facturation.
- **Serveur / Cuisine** : Modification restreinte aux statuts des commandes.
- **Livreur** : Lecture de l'adresse et mise à jour du statut d'expédition uniquement pour ses commandes assignées.

## 4. Paiements & Webhooks
- Validation par signature cryptographique des appels provenant de Wave / Orange Money.
- Architecture idempotente : chaque traitement de webhook enregistre une `transaction_id` unique pour éviter de valider deux fois le même paiement.
- Les clés API (Wave, Orange Money) restent strictement côté serveur (`process.env`).

## 5. Exposition des APIs
- Le front-end (Client B2C) appelle des routes sécurisées (`/api/...` ou Server Actions).
- Protection contre le spam (Rate Limiting) sur les endpoints de création de commande (guest checkout).
