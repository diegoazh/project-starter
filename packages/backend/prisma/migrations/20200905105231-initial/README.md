# Migration `20200905105231-initial`

This migration has been generated at 9/5/2020, 10:52:31 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE `backend`.`Post` (
`id` int  NOT NULL  AUTO_INCREMENT,
`title` varchar(191)  NOT NULL ,
`content` varchar(191)  ,
`type` ENUM('TEXT', 'GALLERY')  NOT NULL DEFAULT 'TEXT',
`published` boolean  NOT NULL DEFAULT false,
`author_id` int  NOT NULL ,
`created_at` datetime(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
`updated_at` datetime(3)  NOT NULL ,
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `backend`.`Profile` (
`id` int  NOT NULL  AUTO_INCREMENT,
`bio` varchar(191)  ,
`first_name` varchar(191)  ,
`last_name` varchar(191)  ,
`user_id` int  NOT NULL ,
`created_at` datetime(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
`updated_at` datetime(3)  NOT NULL ,
UNIQUE Index `Profile.user_id_unique`(`user_id`),
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `backend`.`User` (
`id` int  NOT NULL  AUTO_INCREMENT,
`email` varchar(191)  NOT NULL ,
`password` varchar(191)  NOT NULL ,
`username` varchar(191)  ,
`created_at` datetime(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
`updated_at` datetime(3)  NOT NULL ,
UNIQUE Index `User.email_unique`(`email`),
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

ALTER TABLE `backend`.`Post` ADD FOREIGN KEY (`author_id`) REFERENCES `backend`.`User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `backend`.`Profile` ADD FOREIGN KEY (`user_id`) REFERENCES `backend`.`User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200905105231-initial
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,50 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "mysql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Post {
+  id        Int      @default(autoincrement()) @id
+  title     String
+  content   String?
+  type      PostType @default(TEXT)
+  published Boolean  @default(false)
+  author    User     @relation(fields: [authorId], references: [id])
+  authorId  Int      @map("author_id")
+  createdAt DateTime @default(now()) @map("created_at")
+  updatedAt DateTime @updatedAt @map("updated_at")
+}
+
+model Profile {
+  id        Int       @default(autoincrement()) @id
+  bio       String?
+  firstName  String?  @map("first_name")
+  lastName  String?   @map("last_name")
+  user      User      @relation(fields: [userId], references: [id])
+  userId    Int       @unique @map("user_id")
+  createdAt DateTime  @default(now()) @map("created_at")
+  updatedAt DateTime  @updatedAt @map("updated_at")
+}
+
+model User {
+  id          Int      @default(autoincrement()) @id
+  email       String   @unique
+  password    String
+  username    String?
+  posts       Post[]
+  profile     Profile?
+  createdAt   DateTime @default(now()) @map("created_at")
+  updatedAt   DateTime @updatedAt @map("updated_at")
+}
+
+enum PostType {
+  TEXT
+  GALLERY
+}
```


