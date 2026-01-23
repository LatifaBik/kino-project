import { describe, expect, test } from '@jest/globals';
import request from 'supertest';
import initApp from '../server-side-rendering/lib/app.js';
/*import fs from 'fs'; // har lagt till denna rad*/

const mockApi = {
  loadMovie: async (id) => {
    return {
      data: {
        id: id,
        attributes: {
          title: "Pulp Fiction",
          imdbId: "tt0110912",
          intro: "In the realm of underworld, a series of incidents intertwines the lives of two Los Angeles mobsters, a gangster's wife, a boxer and two small-time criminals.",
          image: {
            url: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg"
          },
          createdAt: "2024-01-22T09:24:08.098Z",
          updatedAt: "2024-01-22T10:27:28.540Z",
          publishedAt: "2024-01-22T09:24:10.979Z"
        }
      }
    };
  },
  loadMovies: async () => {
    return {
      data: [
        {
          id: 8,
          attributes: {
            title: "Pulp Fiction",
            imdbId: "tt0110912",
            intro: "In the realm of underworld, a series of incidents intertwines the lives of two Los Angeles mobsters, a gangster's wife, a boxer and two small-time criminals.",
            image: {
              url: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg"
            },
            createdAt: "2024-01-22T09:24:08.098Z",
            updatedAt: "2024-01-22T10:27:28.540Z",
            publishedAt: "2024-01-22T09:24:10.979Z"
          }
        },
        {
          id: 6,
          attributes: {
            title: "Forrest Gump",
            imdbId: "tt0109830",
            intro: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
            image: {
              url: "https://m.media-amazon.com/images/M/MV5BNDYwNzVjMTItZmU5YS00YjQ5LTljYjgtMjY2NDVmYWMyNWFmXkEyXkFqcGc@._V1_.jpg"
            },
            createdAt: "2023-03-12T17:06:09.208Z",
            updatedAt: "2026-01-15T12:46:01.032Z",
            publishedAt: "2023-03-12T17:06:16.643Z"
          }
        }
      ],
      meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: 11 } }
    };
  },
};

describe('Movie list page', () => {
  test('lists movies from API', async () => {
    const app = initApp(mockApi);

    const response = await request(app)
      .get('/movies')
      .expect('Content-Type', /html/)
      .expect(200);


    expect(response.text).toContain('Forrest Gump');
    expect(response.text).toContain('Pulp Fiction');
  });
});

