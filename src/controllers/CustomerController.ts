export const CustomerController = {
    list : ()=>{
        const customers = [
            {id: 1, name: "John", email: "john@example.com"},
            {id: 2, name: "Jane", email: "Jane@example.com"},
        ]
        return customers;
    },

    create :({body}:{
        body: {
            name: string;
            email: string;
        }
    })=>{
        return body;
    },

    update :({body, params}:{
        body: {
            name: string;
            email: string;
        },
        params: {
            id: number;
        }
    })=>{
        return {body, params};
    },

    delete :({params}:{
        params: {
            id: number;
        }
    })=>{
        return params;
    }
}