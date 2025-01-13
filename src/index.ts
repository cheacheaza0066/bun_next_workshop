import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import {swagger} from "@elysiajs/swagger";
import {jwt} from "@elysiajs/jwt";

import {CustomerController} from "./controllers/CustomerController";
import {UserController} from "./controllers/UserController";
import { DeportmentController } from "./controllers/DeportmentController";

const app = new Elysia()

.use(cors())
.use(staticPlugin())
.use(swagger(
  {
    documentation: {
      tags: [{
        name: "User",
        description: "User API"
      },
    {
      name: "Customer",
      description: "Customer API"
    },
    {
      name: "Deportment",
      description: "Deportment API"
    }
    ]
    }
  }
))
.use(jwt({
  name: "jwt",
  secret: "secret",
}))
.group("/deportment",{tags:["Deportment"]},(app) => app
  .get("/", DeportmentController.list ,)
  .get("/user-in-department/:id", DeportmentController.userInDepartment ,)
  .post("/create-department-and-users", DeportmentController.createDepartmentAndUsers ,)

)

.group("/users",(app) => app
  .get("/", UserController.list ,{tags: ["User"]})
  .post("/", UserController.create ,{tags: ["User"]})
  .put("/:id", UserController.update ,{tags: ["User"]})
  .delete("/:id", UserController.delete ,{tags: ["User"]})
  .get("/findsomefield", UserController.findsomeField ,{tags: ["User"]})
  .get("/sort", UserController.sort ,{tags: ["User"]})
  .get("/between", UserController.between ,{tags: ["User"]})
  .get("/count", UserController.count ,{tags: ["User"]})
  .get("/sum", UserController.sum ,{tags: ["User"]})
  .get("/min", UserController.min ,{tags: ["User"]})  
  .get("/max", UserController.max ,{tags: ["User"]})
  .get("/user-and-department", UserController.userAndDepartment ,{tags: ["User"]})
   .post("/sigin", UserController.signIn ,{tags: ["User"]})
   
)
.group("/customers",(app) => app
  .get("/", CustomerController.list ,{tags: ["Customer"]})
.post("/customer", CustomerController.create ,{tags: ["Customer"]})
.put("/customer/:id", CustomerController.update ,{tags: ["Customer"]})
  .delete("/:id", CustomerController.delete ,{tags: ["Customer"]})
)

//login jwt token
.post("/login", async ({jwt,cookie:{auth}})=>{
  const user = {
    id: 1,
    name: "admin",
    username: "admin",
    level: "admin"
  }
  const token = await jwt.sign(user);
  auth.set({
    value: token,
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
    secure: true,
  })
  return {token: token};
})

.get("/profile", async ({cookie: {auth}, jwt})=> {
  const token = auth.value;
  const user = await jwt.verify(token);
  return user;
})
.get("/logout", ({cookie: {auth}})=> {
  auth.remove();
  return {message: "logout success"};
})

.get("/info", async ({ request, jwt }) => {
  if(request.headers.get("Authorization") === null) return {error: "No Authorization header"};
  const token = request.headers.get("Authorization")?? '';
  if(token === '') return {error: "No token"};

  const payload = await jwt.verify(token);
  return {
    message: "Success",
    payload: payload
  };
})


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

.get("/customer/query", ({query})=> {
  const name = query.name;
  const age = query.age;
  return {name, age};
})  

.get("/customer/status", ()=> {
  return new Response("ok", {status: 500});
})

.post("/customer/create", ({body})=> {
  const {name, age} = body as {name: string, age: number}; 
  return `create customer ${name} ${age}`;
})

.put("/customer/update/:id", ({params, body})=> {
  const {id} = params as {id: string}; 
  const {name, age} = body as {name: string, age: number};
  return `update customer ${id} ${name} ${age}`;
})

.delete("/customer/delete/:id", ({params})=> {
  const {id} = params as {id: string}; 
  return `delete customer ${id}`;
})

//upload file
.post("/upload-file", ({body})=> {
  const {file} = body as {file: File};

  Bun.write(`./uploads/${file.name}`, file);
  return `upload file ${file}`;
})  

.get("/write-file", ()=> {
 Bun.write(`./uploads/text.txt`, "hello world");
  return `write file`;
})

//read file
.get("/read-file", ()=> {
  const file = Bun.file(`./uploads/text.txt`);
  return file.text();
})




.listen(3000);




console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
