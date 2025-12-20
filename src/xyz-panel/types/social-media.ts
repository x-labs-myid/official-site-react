import z from "zod";

export const schemaSocialMediaRequest = z.object({
    teams_guid: z.string(),
    icon: z.string(),
    name: z.string(),
    username: z.string()
})

export const schemaSocialMediaData = z.object({
    guid: z.string(),
    teams_guid: z.string(),
    icon: z.string(),
    name: z.string(),
    username: z.string(),
    is_global: z.string(),
    created_by: z.string(),
    created_at: z.string(),
    updated_by: z.string(),
    updated_at: z.string(),
    deleted_at: z.string()
})

const schemaSocialMediaResponse = z.object({
    success: z.boolean(),
    status: z.number(),
    message: z.string(),
    data: z.array(schemaSocialMediaData)
})

export type SchemaSocialMediaRequest = z.infer<typeof schemaSocialMediaRequest>
export type SchemaSocialMediaData = z.infer<typeof schemaSocialMediaData>
export type SchemaSocialMediaResponse = z.infer<typeof schemaSocialMediaResponse>