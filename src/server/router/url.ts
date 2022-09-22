import { createRouter } from "./context";
import { z } from "zod";

export const urlRouter = createRouter()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("getLink", {
    input: z.object({ id: z.string()}),
    async resolve({input,ctx}) {
      return ctx.prisma.link.findUnique({
        where: {
          id: input.id
        }
      })
    }
  }).mutation("addLink", {
    input: z.object({ url: z.string()}),
    async resolve({input, ctx}) {
      const id = `${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`
      await ctx.prisma.link.create({
        data: {
          id: id,
          url: input.url,
        }
      })
      return id;
    }
  });
