const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server"); // Aquí importas tu archivo de servidor principal donde está configurada la app

// Mocking de las dependencias de la base de datos
jest.mock("../models/post", () => ({
  find: jest.fn(),
  findById: jest.fn()
}));

const Post = require("../models/post");

describe("GET /posts", () => {
  it("should return all posts", async () => {
    const mockPosts = [
      { _id: new mongoose.Types.ObjectId(), title: "Post 1", content: "Content 1" },
      { _id: new mongoose.Types.ObjectId(), title: "Post 2", content: "Content 2" }
    ];

    Post.find.mockResolvedValue(mockPosts); // Simulamos el comportamiento de Post.find()

    const response = await request(app).get("/posts");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(mockPosts.length);
    expect(response.body[0].title).toBe(mockPosts[0].title);
  });

  it("should return an error if there is a problem fetching posts", async () => {
    Post.find.mockRejectedValue(new Error("Database error"));

    const response = await request(app).get("/posts");

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Error fetching posts");
  });
});

describe("GET /posts/:id", () => {
  it("should return a post by ID", async () => {
    const mockPost = { _id: new mongoose.Types.ObjectId(), title: "Post 1", content: "Content 1" };
    Post.findById.mockResolvedValue(mockPost);

    const response = await request(app).get(`/posts/${mockPost._id}`);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(mockPost.title);
  });

  it("should return an error if the post is not found", async () => {
    const postId = new mongoose.Types.ObjectId();
    Post.findById.mockResolvedValue(null); // Simula que no se encuentra el post

    const response = await request(app).get(`/posts/${postId}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Post not found");
  });

  it("should return an error if there is a problem fetching the post", async () => {
    const postId = new mongoose.Types.ObjectId();
    Post.findById.mockRejectedValue(new Error("Database error"));

    const response = await request(app).get(`/posts/${postId}`);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Error fetching post");
  });
});
