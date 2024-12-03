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
    update : async ({body, params}:{body: {email: string, password: string}, params: {id: string}})=>{
        try{
            const user = await prisma.user.update({data: body, where: {id: parseInt(params.id)}});
            return {
                message: "User updated successfully",
                user:user};
        }catch(error){
            return error;
        }
    },
    delete : async ({params}:{params: {id: string}})=>{
        try{
            const user = await prisma.user.delete({where: {id: parseInt(params.id)}});
            return {
                message: "User deleted successfully",
                user:user};
        }catch(error){
            return error;
        }
    },

    findsomeField : async () =>{
        try{
            const user = await prisma.user.findMany({
                select: {
                    id: true,
                    email: true,
                    password: true
                }
            });
            return user;
        }catch(error){
            return error;
        }
    },

    sort : async () =>{
        return await prisma.user.findMany({orderBy: {id: "desc"}});
    },
    
    
    
        


}