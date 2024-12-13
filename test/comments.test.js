const request = require('supertest');
const app = require('../server');  
const Comment = require('../models/comments');


jest.mock('../models/comments');  

describe('GET /comments', () => {
  it('should return all comments successfully', async () => {
    
    const mockComments = [
      { _id: '1', text: 'This is a comment' },
      { _id: '2', text: 'This is another comment' }
    ];
    Comment.find.mockResolvedValue(mockComments); 

    const response = await request(app).get('/comments');

    expect(response.status).toBe(200); 
    expect(response.body).toEqual(mockComments);  
  });

  it('should return an error if there is a problem fetching comments', async () => {
   
    Comment.find.mockRejectedValue(new Error('Database Error'));

    const response = await request(app).get('/comments');

    expect(response.status).toBe(500); 
    expect(response.body).toEqual({ error: 'Database Error' });  
  });
});