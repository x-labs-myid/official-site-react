import z from "zod";

export const schemaLinkSocialMediaRequest = z.object({
    icon: z.string(),
    name: z.string(),
    url: z.string(),
    is_external_link: z.boolean(),
    position: z.string(),
    is_visible: z.boolean()
})

const schemaLinkSocialMediaData = z.object({
    guid: z.string(),
    icon: z.string(),
    name: z.string(),
    url: z.string(),
    is_external_link: z.boolean(),
    position: z.string(),
    is_visible: z.boolean(),
    created_by: z.string(),
    created_at: z.string(),
    updated_by: z.string(),
    updated_at: z.string(),
    deleted_at: z.string()
})

const schemaLinkSocialMediaResponse = z.object({
    success: z.boolean(),
    status: z.number(),
    message: z.string(),
    data: z.array(schemaLinkSocialMediaData)
})

export type SchemaLinkSocialMediaRequest = z.infer<typeof schemaLinkSocialMediaRequest>
export type SchemaLinkSocialMediaData = z.infer<typeof schemaLinkSocialMediaData>
export type SchemaLinkSocialMediaResponse = z.infer<typeof schemaLinkSocialMediaResponse>