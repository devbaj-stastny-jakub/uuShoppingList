import axios from "axios";
import {expect} from "@jest/globals";

const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImNjaFQwT1liMFJ6OHcwVV9wbkNJMiJ9.eyJpc3MiOiJodHRwczovL2Rldi1kdWNiM2RlNWRxdGhzb3hsLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2NTNlNjM2OWVlNGJmNGE4OTYwZjQ5ZTQiLCJhdWQiOlsiaHR0cDovL3V1c2hvcHBpbmdsaXN0LmNvbSIsImh0dHBzOi8vZGV2LWR1Y2IzZGU1ZHF0aHNveGwudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY5OTgxNjk2NCwiZXhwIjoxNzAyNDA4OTY0LCJhenAiOiJQZ2M4OHNvY09CWnc1WkhSb1IxT3BNNTFSVDNVZkRQVSIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwifQ.M2EToo0H6wW34JntxLZ0VPamTmwAZad5B2r7hEaoRLy1Azy2FN895le4KtIsTL0Bwo5s2FsWbXFv5kjo4sNoYz-ougyDWPLxYi9FUkjQQ-RzlMWVbBm8Cj_-d4mBO7H4b3__9w9jCwZp9q1coMAuc60kLC7_5WvJgUoQFKCLDi7IXtkCNv4SwdblKSLUIXbkELbMvOcw4wU8Y7Wi2_Gs-SiI2Ns08bQ5mmD_gR3MJ6cMCfHCNW-fDy_yUEz7WYEW5wXwFTv1r1iR67U7tXLhAY08vTJyDNfEKpDUxqkyHaBs3LAtwmelF4rtUJT1bklR65VettDpAq5Punl5YodAkA"
const baseUrl = "http://127.0.0.1:3002"
let shoppingListId = ""

beforeAll(async ()=>{
    const res = await axios({
        method: "POST",
        baseURL: baseUrl,
        url: "/shoppingList/create",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    shoppingListId = res.data.result.id
})
test("HDC - shoppingList/list", async () => {
    expect.assertions(2)
    try {
        const res = await axios({
            method: "GET",
            baseURL: baseUrl,
            url: "/shoppingList/list",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        expect(res.status).toEqual(200)
        expect(res.data.error).toBeNull()
    } catch (e) {
    }
})
test("ALT - shoppingList/list - unauthorized", async () => {
    expect.assertions(2)
    try {
        const res = await axios({
            method: "GET",
            baseURL: baseUrl,
            url: "/shoppingList/list",
        })
    } catch (e) {
        expect(e.response.data.error).not.toBeNull()
        expect(e.response.status).toBe(401)
    }
})
test("HDC - shoppingList/get", async () => {
    expect.assertions(2)
    try {
        const res = await axios({
            method: "GET",
            baseURL: baseUrl,
            url: `/shoppingList/${shoppingListId}`,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        expect(res.status).toEqual(200)
        expect(res.data.error).toBeNull()
    } catch (e) {
    }
})
test("ALT - shoppingList/get - not found", async () => {
    expect.assertions(2)
    try {
        const res = await axios({
            method: "GET",
            baseURL: baseUrl,
            url: "/shoppingList/111111111111111111111111",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    } catch (e) {
        expect(e.response.status).toBe(400)
        expect(e.response.data.error.code).toEqual("shoppingList.get.notfound")
    }
})
test("ALT - shoppingList/get - validation", async () => {
    expect.assertions(2)
    try {
        const res = await axios({
            method: "GET",
            baseURL: baseUrl,
            url: "/shoppingList/1111",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    } catch (e) {
        expect(e.response.status).toBe(400)
        expect(e.response.data.error.code).toEqual("shoppingList.validation")
    }
})
test("HDC - shoppingList/create", async () => {
    expect.assertions(2)
    try {
        const res = await axios({
            method: "POST",
            baseURL: baseUrl,
            url: "/shoppingList/create",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        expect(res.status).toEqual(200)
        expect(res.data.error).toBeNull()
        await axios({
            method: "DELETE",
            baseURL: baseUrl,
            url: "/shoppingList/delete",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            data: {
                id: res.data.result.id
            }
        })
    } catch (e) {
    }
})
test("ALT - shoppingList/update - validation", async () => {
    expect.assertions(2)
    try {
        const valuesToBeUpdated = {
            name: "name",
            description: "description",
            image: "image",
            isArchived: true,
            ownerId: "ownerId",
            membersIds: ["memberId"]
        }
        const res = await axios({
            method: "PATCH",
            baseURL: baseUrl,
            url: "/shoppingList/update",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            data: {
                ...valuesToBeUpdated
            }
        })
    } catch (e) {
        expect(e.response.status).toBe(400)
        expect(e.response.data.error.code).toEqual("shoppingList.validation")
    }
})
test("ALT - shoppingList/update - not found", async () => {
    expect.assertions(2)
    try {
        const valuesToBeUpdated = {
            name: "name",
            description: "description",
            image: "image",
            isArchived: true,
            ownerId: "ownerId",
            membersIds: ["memberId"]
        }
        const res = await axios({
            method: "PATCH",
            baseURL: baseUrl,
            url: "/shoppingList/update",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            data: {
                id: "111111111111111111111111",
                ...valuesToBeUpdated
            }
        })
    } catch (e) {
        expect(e.response.status).toBe(400)
        expect(e.response.data.error.code).toEqual("shoppingList.get.notfound")
    }
})
test("ALT - shoppingList/delete - not found", async () => {
    expect.assertions(2)
    try {
        const res = await axios({
            method: "DELETE",
            baseURL: baseUrl,
            url: "/shoppingList/delete",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            data: {
                id: "111111111111111111111111"
            }
        })
    } catch (e) {
        expect(e.response.status).toBe(400)
        expect(e.response.data.error.code).toEqual("shoppingList.get.notfound")
    }
})
test("HDC - shoppingList/update", async () => {
    expect.assertions(3)
    try {
        const valuesToBeUpdated = {
            name: "name",
            description: "description",
            image: "image",
            isArchived: true,
            ownerId: "ownerId",
            membersIds: ["memberId"]
        }
        const res = await axios({
            method: "PATCH",
            baseURL: baseUrl,
            url: "/shoppingList/update",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            data: {
                id: shoppingListId,
                ...valuesToBeUpdated
            }
        })
        const updatedValues = {
            name: res.data.result.name,
            description: res.data.result.description,
            image: res.data.result.image,
            ownerId: res.data.result.ownerId,
            isArchived: res.data.result.isArchived,
            membersIds: res.data.result.membersIds,
        }
        expect(res.status).toEqual(200)
        expect(res.data.error).toBeNull()
        expect(updatedValues).toMatchObject(valuesToBeUpdated)
    } catch (e) {
    }
})
test("ALT - shoppingList/delete - unauthorized", async () => {
    expect.assertions(2)
    try {
        const res = await axios({
            method: "DELETE",
            baseURL: baseUrl,
            url: "/shoppingList/delete",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            data: {
                id: shoppingListId
            }
        })
    } catch (e) {
        expect(e.response.status).toBe(401)
        expect(e.response.data.error.code).toEqual("shoppingList.unauthorized")
    }
})
test("ALT - shoppingList/update - unauthorized", async () => {
    expect.assertions(2)
    try {
        const valuesToBeUpdated = {
            name: "name",
            description: "description",
            image: "image",
            isArchived: true,
            ownerId: "ownerId",
            membersIds: ["memberId"]
        }
        const res = await axios({
            method: "PATCH",
            baseURL: baseUrl,
            url: "/shoppingList/update",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            data: {
                id: shoppingListId,
                ...valuesToBeUpdated
            }
        })
    } catch (e) {
        expect(e.response.status).toBe(401)
        expect(e.response.data.error.code).toEqual("shoppingList.unauthorized")
    }
})
test("HDC - shoppingList/delete", async () => {
    expect.assertions(2)
    try {
        const createRes = await axios({
            method: "POST",
            baseURL: baseUrl,
            url: "/shoppingList/create",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        const res = await axios({
            method: "DELETE",
            baseURL: baseUrl,
            url: "/shoppingList/delete",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            data: {
                id: createRes.data.result.id
            }
        })
        expect(res.status).toEqual(200)
        expect(res.data.error).toBeNull()
    } catch (e) {
    }
})
