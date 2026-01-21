import { describe, expect, test } from '@jest/globals';
import request from 'supertest';
import { app } from '../../lib/app.js';


describe('Movies list page', () => {
    test('lists movies from API', async () => {
       await request(app)
       .get('/')
       .expect('Content-Type',/html/)
         .expect(200)
    });
});


  