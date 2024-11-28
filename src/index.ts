import { Elysia } from "elysia";

const app = new Elysia()
.get("/", () => "Hello Elysia")
.get("/hello", ()=> "hello world")
.get("/hello/:name/:age", ({params})=> {
  const name = params.name;
  const age = params.age;
  return `hello ${name} ${age}`;
})

.get("/customer", ({params})=> {
  const customer = [
    {id: 1, name: "John", age: 20},
    {id: 2, name: "Jane", age: 21},
    {id: 3, name: "Jim", age: 22},
  ]
  return customer;
})
.get("/customer/:id", ({params})=> {
  const customers = [
    {id: 1, name: "John", age: 20},
    {id: 2, name: "Jane", age: 21},
    {id: 3, name: "Jim", age: 22},
  ]
  const customer = customers.find((customer)=> customer.id === parseInt(params.id));
  if(!customer) return {error: "Customer not found"};
  return customer;
})

.listen(3000);

//get params


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
