import axios from "axios";
import {afterAll, expect} from "@jest/globals";

const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImNjaFQwT1liMFJ6OHcwVV9wbkNJMiJ9.eyJpc3MiOiJodHRwczovL2Rldi1kdWNiM2RlNWRxdGhzb3hsLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2NTNlNjM2OWVlNGJmNGE4OTYwZjQ5ZTQiLCJhdWQiOlsiaHR0cDovL3V1c2hvcHBpbmdsaXN0LmNvbSIsImh0dHBzOi8vZGV2LWR1Y2IzZGU1ZHF0aHNveGwudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY5OTgxNjk2NCwiZXhwIjoxNzAyNDA4OTY0LCJhenAiOiJQZ2M4OHNvY09CWnc1WkhSb1IxT3BNNTFSVDNVZkRQVSIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwifQ.M2EToo0H6wW34JntxLZ0VPamTmwAZad5B2r7hEaoRLy1Azy2FN895le4KtIsTL0Bwo5s2FsWbXFv5kjo4sNoYz-ougyDWPLxYi9FUkjQQ-RzlMWVbBm8Cj_-d4mBO7H4b3__9w9jCwZp9q1coMAuc60kLC7_5WvJgUoQFKCLDi7IXtkCNv4SwdblKSLUIXbkELbMvOcw4wU8Y7Wi2_Gs-SiI2Ns08bQ5mmD_gR3MJ6cMCfHCNW-fDy_yUEz7WYEW5wXwFTv1r1iR67U7tXLhAY08vTJyDNfEKpDUxqkyHaBs3LAtwmelF4rtUJT1bklR65VettDpAq5Punl5YodAkA"
const unauthorizedToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImNjaFQwT1liMFJ6OHcwVV9wbkNJMiJ9.eyJpc3MiOiJodHRwczovL2Rldi1kdWNiM2RlNWRxdGhzb3hsLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2NTNlNjZmMGI0MGFlZDg3MTZlNTQwYmIiLCJhdWQiOlsiaHR0cDovL3V1c2hvcHBpbmdsaXN0LmNvbSIsImh0dHBzOi8vZGV2LWR1Y2IzZGU1ZHF0aHNveGwudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTcwMjIwMjc1NywiZXhwIjoxNzA0Nzk0NzU3LCJhenAiOiJQZ2M4OHNvY09CWnc1WkhSb1IxT3BNNTFSVDNVZkRQVSIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwifQ.lDbNY7S9gdSKUgaIz41QkcPG9Jqd3Cw6kfxCxgUn9Uaeu4Tyb5mBSZVZtQSjS47xIJWUfYxRt-_Mg7damLL0mtuAzcpzZ-6cHKMmmX-sgZzSGuJozKKS3tOTbbC-6bnueGtaWiTHPsnsuwf4Vw3VODi0LTdZxIgW9DDRPDRBxz2hpp5vgRPv9b0OsHx9VbGtcGAV4tgohZdVO2NlcMaPWUoUYQWK_S3WzYFETNlIYM1OtD6rHevdHnBLZXuOD2GuAoQGqYS5VsBohOE-J8dSXXigi7tMHQMHARgapTH7GOoRVtLAQYldSzIsT7pwV4X2nLxZi_ggAutVj8IFed2Qzg"
const baseUrl = "http://127.0.0.1:3002"
let shoppingListId = ""
let shoppingListItemId = ""

beforeAll(async () => {
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
test("HDC - shoppingListItem/create", async () => {
    expect.assertions(2)
    try {
        const res = await axios({
            method: "POST",
            baseURL: baseUrl,
            url: "/shoppingListItem/create",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            data: {
                name: "Salát",
                shoppingListId: shoppingListId
            }
        })
        shoppingListItemId = res.data.result.items[0].id
        expect(res.status).toEqual(200)
        expect(res.data.error).toBeNull()
    } catch (e) {
    }
})
test("ALT - shoppingListItem/create - not found", async () => {
    expect.assertions(2)
    try {
        const res = await axios({
            method: "POST",
            baseURL: baseUrl,
            url: "/shoppingListItem/create",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            data: {
                name: "Salát",
                shoppingListId: "111111111111111111111111"
            }
        })
    } catch (e) {
        expect(e.response.status).toBe(400)
        expect(e.response.data.error.code).toEqual("shoppingList.get.notfound")
    }
})
test("ALT - shoppingListItem/create - unauthorized", async () => {
    expect.assertions(2)
    try {
        const res = await axios({
            method: "POST",
            baseURL: baseUrl,
            url: "/shoppingListItem/create",
            headers: {
                "Authorization": `Bearer ${unauthorizedToken}`
            },
            data: {
                name: "Salát",
                shoppingListId: shoppingListId
            }
        })
    } catch (e) {
        expect(e.response.status).toBe(401)
        expect(e.response.data.error.code).toEqual("shoppingList.unauthorized")
    }
})
test("ALT - shoppingListItem/create - validation", async () => {
    expect.assertions(2)
    try {
        const res = await axios({
            method: "POST",
            baseURL: baseUrl,
            url: "/shoppingListItem/create",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            data: {
                name: "Salát"
            }
        })
    } catch (e) {
        expect(e.response.status).toBe(400)
        expect(e.response.data.error.code).toEqual("shoppingListItem.validation")
    }
})
test("HDC - shoppingListItem/update", async () => {
    expect.assertions(2)
    const valuesToUpdate = {
        solved: true,
        name: "name",
    }
    try {
        const res = await axios({
            method: "PATCH",
            baseURL: baseUrl,
            url: "/shoppingListItem/update",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            data: {
                id: shoppingListItemId,
                shoppingListId: shoppingListId,
                ...valuesToUpdate
            }
        })
        expect(res.status).toEqual(200)
        expect(res.data.error).toBeNull()
    } catch (e) {
    }
})
test("ALT - shoppingListItem/update - shopping list not found", async () => {
    expect.assertions(2)
    try {
        const res = await axios({
            method: "PATCH",
            baseURL: baseUrl,
            url: "/shoppingListItem/update",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            data: {
                id: shoppingListItemId,
                shoppingListId: "111111111111111111111111",
            }
        })
    } catch (e) {
        expect(e.response.status).toBe(400)
        expect(e.response.data.error.code).toEqual("shoppingList.get.notfound")
    }
})
test("ALT - shoppingListItem/update - shopping list item not found", async () => {
    expect.assertions(2)
    try {
        const res = await axios({
            method: "PATCH",
            baseURL: baseUrl,
            url: "/shoppingListItem/update",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            data: {
                id: "111111111111111111111111",
                shoppingListId: shoppingListId,
            }
        })
    } catch (e) {
        expect(e.response.status).toBe(400)
        expect(e.response.data.error.code).toEqual("shoppingListItem.update.notFound")
    }
})
test("ALT - shoppingListItem/update - unauthorized", async () => {
    expect.assertions(2)
    try {
        const res = await axios({
            method: "PATCH",
            baseURL: baseUrl,
            url: "/shoppingListItem/update",
            headers: {
                "Authorization": `Bearer ${unauthorizedToken}`
            },
            data: {
                id: shoppingListItemId,
                shoppingListId: shoppingListId,
            }
        })
    } catch (e) {
        expect(e.response.status).toBe(401)
        expect(e.response.data.error.code).toEqual("shoppingList.unauthorized")
    }
})
test("ALT - shoppingListItem/delete - unauthorized", async () => {
    expect.assertions(2)
    try {
        const res = await axios({
            method: "DELETE",
            baseURL: baseUrl,
            url: "/shoppingListItem/delete",
            headers: {
                "Authorization": `Bearer ${unauthorizedToken}`
            },
            data: {
                id: shoppingListItemId,
                shoppingListId: shoppingListId,
            }
        })
    } catch (e) {
        expect(e.response.status).toBe(401)
        expect(e.response.data.error.code).toEqual("shoppingList.unauthorized")
    }
})
test("ALT - shoppingListItem/delete - shopping list item not found", async () => {
    expect.assertions(2)
    try {
        const res = await axios({
            method: "DELETE",
            baseURL: baseUrl,
            url: "/shoppingListItem/delete",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            data: {
                id: "111111111111111111111111",
                shoppingListId: shoppingListId,
            }
        })
    } catch (e) {
        expect(e.response.status).toBe(400)
        expect(e.response.data.error.code).toEqual("shoppingListItem.delete.notFound")
    }
})
test("ALT - shoppingListItem/delete - shopping list not found", async () => {
    expect.assertions(2)
    try {
        const res = await axios({
            method: "DELETE",
            baseURL: baseUrl,
            url: "/shoppingListItem/delete",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            data: {
                id: shoppingListItemId,
                shoppingListId: "111111111111111111111111",
            }
        })
    } catch (e) {
        expect(e.response.status).toBe(400)
        expect(e.response.data.error.code).toEqual("shoppingList.get.notfound")
    }
})
test("HDC - shoppingListItem/delete", async () => {
    expect.assertions(2)
    try {
        const res = await axios({
            method: "DELETE",
            baseURL: baseUrl,
            url: "/shoppingListItem/delete",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            data: {
                id: shoppingListItemId,
                shoppingListId: shoppingListId,
            }
        })
        expect(res.status).toEqual(200)
        expect(res.data.error).toBeNull()
    } catch (e) {
        console.log(e.response.data)
    }
})
afterAll(async () => {
    await axios({
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
})
