import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertCommentSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get featured articles
  app.get("/api/articles/featured", async (req, res) => {
    try {
      const articles = await storage.getFeaturedArticles();
      res.json(articles);
    } catch (error) {
      console.error("Error fetching featured articles:", error);
      res.status(500).json({ message: "Failed to fetch featured articles" });
    }
  });
  
  // Get all articles with optional filters
  app.get("/api/articles", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const search = req.query.search as string | undefined;
      
      const articles = await storage.getArticles({ category, search });
      res.json(articles);
    } catch (error) {
      console.error("Error fetching articles:", error);
      res.status(500).json({ message: "Failed to fetch articles" });
    }
  });
  
  // Get article by id
  app.get("/api/articles/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid article ID" });
      }
      
      const article = await storage.getArticle(id);
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      
      res.json(article);
    } catch (error) {
      console.error("Error fetching article:", error);
      res.status(500).json({ message: "Failed to fetch article" });
    }
  });
  
  // Get comments for an article
  app.get("/api/articles/:id/comments", async (req, res) => {
    try {
      const articleId = parseInt(req.params.id);
      if (isNaN(articleId)) {
        return res.status(400).json({ message: "Invalid article ID" });
      }
      
      const comments = await storage.getComments(articleId);
      res.json(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ message: "Failed to fetch comments" });
    }
  });
  
  // Create a comment
  app.post("/api/articles/:id/comments", async (req, res) => {
    try {
      const articleId = parseInt(req.params.id);
      if (isNaN(articleId)) {
        return res.status(400).json({ message: "Invalid article ID" });
      }
      
      const article = await storage.getArticle(articleId);
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      
      // Validate request body
      const commentData = insertCommentSchema.parse({
        ...req.body,
        articleId
      });
      
      const comment = await storage.createComment(commentData);
      res.status(201).json(comment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid comment data", errors: error.errors });
      }
      
      console.error("Error creating comment:", error);
      res.status(500).json({ message: "Failed to create comment" });
    }
  });
  
  // Like a comment
  app.post("/api/comments/:id/like", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid comment ID" });
      }
      
      const comment = await storage.likeComment(id);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      
      res.json(comment);
    } catch (error) {
      console.error("Error liking comment:", error);
      res.status(500).json({ message: "Failed to like comment" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
