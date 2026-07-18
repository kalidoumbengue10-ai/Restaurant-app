# DATA-MODEL — Teranga Resto

## 1. Principes
- Base de données relationnelle (PostgreSQL via Cloud SQL).
- Isolation stricte par `restaurant_id` sur toutes les tables métiers (Multi-tenant).
- Intégrité référentielle pour les commandes, stocks et paiements.

## 2. Entités Principales

### Restaurants (Tenant)
- `id` (UUID, PK)
- `name` (String)
- `slug` (String, Unique)
- `owner_id` (String, FK Firebase Auth UID)
- `created_at`, `updated_at`

### Users (Comptes Clients & Équipes)
- Géré principalement par Firebase Auth. Les données additionnelles dans Cloud SQL:
- `id` (String, PK, correspond au UID Firebase)
- `phone`, `email`
- `first_name`, `last_name`

### Restaurant_Members (RBAC Équipe)
- `id` (UUID, PK)
- `restaurant_id` (UUID, FK)
- `user_id` (String, FK)
- `role` (Enum: owner, manager, server, kitchen, delivery)

### Products (Menu)
- `id` (UUID, PK)
- `restaurant_id` (UUID, FK)
- `name`, `description`
- `price` (Decimal)
- `is_available` (Boolean)
- `category` (String)
- `image_url` (String)

### Orders (Commandes)
- `id` (UUID, PK)
- `restaurant_id` (UUID, FK)
- `customer_id` (String, FK, Nullable)
- `status` (Enum: new, confirmed, preparing, ready, delivering, delivered, cancelled)
- `type` (Enum: delivery, takeaway, dine_in)
- `total_amount` (Decimal)
- `payment_method` (Enum: wave, orange_money, cash)
- `payment_status` (Enum: pending, paid, failed)
- `delivery_address` (Text, Nullable)
- `created_at`, `updated_at`

### Order_Items
- `id` (UUID, PK)
- `order_id` (UUID, FK)
- `product_id` (UUID, FK)
- `quantity` (Int)
- `unit_price` (Decimal)
- `options` (JSONB)
