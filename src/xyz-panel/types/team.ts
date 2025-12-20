import z from "zod";
import { schemaSocialMediaData } from "./social-media";

export const schemaTeamRequest = z.object({
    name: z.string(),
    title: z.string(),
    is_visible: z.boolean()
})

const schemaTeamData = z.object({
    guid: z.string(),
    name: z.string(),
    title: z.string(),
    is_visible: z.boolean(),
    created_by: z.string(),
    created_at: z.string(),
    updated_by: z.string(),
    updated_at: z.string(),
    deleted_at: z.string(),
    social_media: z.array(schemaSocialMediaData)
})

const schemaTeamResponse = z.object({
    success: z.boolean(),
    status: z.number(),
    message: z.string(),
    data: z.array(schemaTeamData)
})

export type SchemaTeamRequest = z.infer<typeof schemaTeamRequest>
export type SchemaTeamData = z.infer<typeof schemaTeamData>
export type SchemaTeamResponse = z.infer<typeof schemaTeamResponse>