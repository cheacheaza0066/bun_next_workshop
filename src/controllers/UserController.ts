import { PrismaClient } from "@prisma/client";
import { password } from "bun";

const prisma = new PrismaClient();

export const UserController = {
    list: async () => {
        try {
            const users = await prisma.user.findMany();
            return users;
        } catch (error) {
            return error;
        }
    },
    create: async ({ body }: { body: { email: string, password: string } }) => {

        try {
            const user = await prisma.user.create({ data: body });
            return {
                message: "User created successfully",
                user
            };
        } catch (error) {
            return error;
        }


    },
    update: async ({ body, params }: { body: { email: string, password: string }, params: { id: string } }) => {
        try {
            const user = await prisma.user.update({ data: body, where: { id: parseInt(params.id) } });
            return {
                message: "User updated successfully",
                user: user
            };
        } catch (error) {
            return error;
        }
    },
    delete: async ({ params }: { params: { id: string } }) => {
        try {
            const user = await prisma.user.delete({ where: { id: parseInt(params.id) } });
            return {
                message: "User deleted successfully",
                user: user
            };
        } catch (error) {
            return error;
        }
    },

    findsomeField: async () => {
        try {
            const user = await prisma.user.findMany({
                select: {
                    id: true,
                    email: true,
                    password: true
                }
            });
            return user;
        } catch (error) {
            return error;
        }
    },

    sort: async () => {
        return await prisma.user.findMany({ orderBy: { id: "desc" } });
    },
    between: async () => {
        return await prisma.user.findMany({ where: { credit: { gte: 0, lte: 200 } } });
    },

    count: async () => {
        try {
            const count = await prisma.user.count();
            return { count };
        } catch (error) {
            return error;
        }

    },

    sum: async () => {
        try {
            const sum = await prisma.user.aggregate({ _sum: { credit: true } });
            return { sum: sum._sum.credit };
        } catch (error) {
            return error;
        }
    },

    max: async () => {
        try {
            const max = await prisma.user.aggregate({ _max: { credit: true } });
            return { max: max._max.credit };
        } catch (error) {
            return error;
        }
    },
    min: async () => {
        try {
            const min = await prisma.user.aggregate({ _min: { credit: true } });
            return { min: min._min.credit };
        } catch (error) {
            return error;
        }
    },


    userAndDepartment: async () => {
        try {
            const users = await prisma.user.findMany({ include: {department: true}});
            return {users}
        } catch (error) {
            return error
        }
    },
    signIn : async ({body} : {body: {email: string, password: string}})=>{
        try {
            const users = await prisma.user.findMany({
                where :{
                    email : body.email,
                    password : body.password
                }
            })

            return {users:users}
        } catch (error) {
            return error

        }


    }

}