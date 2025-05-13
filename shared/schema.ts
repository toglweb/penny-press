import { pgTable, text, serial, integer, boolean, decimal, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  avatarUrl: text("avatar_url"),
  bio: text("bio"),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

// Author model (extended from users)
export const authors = pgTable("authors", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  description: text("description"),
  followers: integer("followers").default(0),
});

export const insertAuthorSchema = createInsertSchema(authors).omit({
  id: true,
});

// Article model
export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url").notNull(),
  publishedDate: timestamp("published_date").notNull().defaultNow(),
  authorId: integer("author_id").notNull().references(() => authors.id),
  category: text("category").notNull(),
  price: decimal("price", { precision: 5, scale: 2 }).notNull(),
  readTime: integer("read_time").notNull(),
  featured: boolean("featured").default(false),
});

export const insertArticleSchema = createInsertSchema(articles).omit({
  id: true,
});

// Comment model
export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  articleId: integer("article_id").notNull().references(() => articles.id),
  userId: integer("user_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  likes: integer("likes").default(0),
});

export const insertCommentSchema = createInsertSchema(comments).omit({
  id: true,
  createdAt: true,
  likes: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Author = typeof authors.$inferSelect;
export type InsertAuthor = z.infer<typeof insertAuthorSchema>;

export type RawArticle = typeof articles.$inferSelect;
export type InsertArticle = z.infer<typeof insertArticleSchema>;

export type Comment = typeof comments.$inferSelect;
export type InsertComment = z.infer<typeof insertCommentSchema>;

// Extended types for API responses
export type AuthorInfo = {
  id: number;
  name: string;
  avatarUrl: string;
  bio: string;
  description: string;
}

export type CommentWithUser = {
  id: number;
  content: string;
  user: {
    id: number;
    name: string;
    avatarUrl: string;
  };
  timeAgo: string;
  likes: number;
}

export type Article = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  publishedDate: string;
  author: AuthorInfo;
  category: string;
  price: number;
  readTime: number;
  featured: boolean;
  comments: CommentWithUser[];
  publication?: string; // Publication source of the article
}
