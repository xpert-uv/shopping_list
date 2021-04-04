process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");

let s_list = require("./fakeDb");

let newItem = { name: "Dell xps", price: 800 };
beforeAll(() => {
    s_list.length = 0;
})
beforeEach(function () {
    s_list.push(newItem);
});

afterEach(function () {
    s_list.length = 0;
});
// end afterEach

/** GET lists */

describe("GET /list", function () {
    test("Gets a list of shopping items", async function () {
        const resp = await request(app).get(`/list`);
        expect(resp.statusCode).toBe(200);

        expect(resp.body).toEqual({ s_list });
    });
});
// end



describe("GET /list/:name", function () {
    test("Gets a single item", async function () {
        const resp = await request(app).get(`/list/${s_list.name}`);
        expect(resp.statusCode).toBe(200);

        expect(resp.body).toEqual({ s_list: newItem });
    });

    test("Responds with 404 if can't find item", async function () {
        const resp = await request(app).get(`/item/0`);
        expect(resp.statusCode).toBe(404);
    });
});
// end

/** POST /list  */

describe("POST /list", function () {
    test("Creates a new item", async function () {
        const resp = await request(app)
            .post(`/list`)
            .send({
                name: "comp",
                price: 500
            });
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({
            s_list: { name: "comp", price: 500 }
        });
    });
});
// end

/** PATCH /cats/[name] - update cat; return `{cat: cat}` */

describe("PATCH /list/:name", function () {
    test("Updates a single item", async function () {
        const resp = await request(app)
            .patch(`/list/${s_list.name}`)
            .send({
                name: "Mouse"
            });
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({
            s_list: { name: "Mouse" }
        });
    });

    test("Responds with 404 if id invalid", async function () {
        const resp = await request(app).patch(`/list/0`);
        expect(resp.statusCode).toBe(404);
    });
});
// end

/** DELETE  item*/

describe("DELETE /list/:name", function () {
    test("Deletes a single item", async function () {
        const resp = await request(app).delete(`/list/${s_list.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ message: "Deleted" });
    });
});
// end