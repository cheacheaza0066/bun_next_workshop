import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const UserController = {
    list : async ()=>{
        try{
            const users = await prisma.user.findMany();
            return users;
        }catch(error){
            return error;
        }
    },
    create : async ({body}:{body: {email: string, password: string}})=>{

            try{
                const user = await prisma.user.create({data: body});
                return {
                    message: "User created successfully",
                    user};
            }catch(error){
                return error;
            }

        
    },
    update : async ({body, params}:{body: {email: string, password: string}, params: {id: number}})=>{
        try{
            const user = await prisma.user.update({data: body, where: {id: params.id}});
            return user;
        }catch(error){
            return error;
        }
    },
    delete : async ({params}:{params: {id: number}})=>{
        try{
            const user = await prisma.user.delete({where: {id: params.id}});
            return user;
        }catch(error){
            return error;
        }
    }
    
}