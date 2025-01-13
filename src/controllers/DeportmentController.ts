import { password } from "bun";

const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

export const DeportmentController = {    

    list: async () => {
        try {
            const users = await prisma.department.findMany({
                include: {
                    users:true
                }
            });
            return users;
        } catch (error) {
            return error;
        }
    },
    userInDepartment : async ({params}: {params: {id: string}}) =>{
        try {
            const users = await prisma.department.findMany({
                where :{
                    id : parseInt(params.id)
                },
                include: {
                    users:{
                        select:{
                            id: true,
                            level: true,
                            email :true,
                            credit : true
                        },
                        where : {
                            level :'user'
                        }
                    }
                },
                orderBy: {
                    id:'asc'
                }
            });
            return {users:users}
        } catch (error) {
            return error;
        }
    },

    createDepartmentAndUsers: async ({ body }: {
        body: {
            department: {
                name: string;
            };
            users: {
                email: string;
                password: string;
            }[];
        };
    }) => {
        try {
            // Create the department
            const department = await prisma.department.create({
                data: body.department,
            });
    
            // Ensure users are an array and map properly
            const users = body.users.map(user => ({
                email: user.email,
                password: user.password,
                departmentID: department.id,
            }));
    
            // Insert users into the database
            await prisma.user.createMany({
                data: users,
            });
    
            return { message: "Success" };
        } catch (error) {
            console.error("Error in createDepartmentAndUsers:", error);
            return error;
        }
    }
    

}