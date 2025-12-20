import z from "zod";

export const schemaOrgRequest = z.object({
    label: z.string(),
    value: z.string(),
    is_visible: z.boolean()
})

const schemaOrgData = z.object({
    guid: z.string(),
    key: z.string(),
    value: z.string(),
    is_visible: z.boolean(),
    created_by: z.string(),
    created_at: z.string(),
    updated_by: z.string(),
    updated_at: z.string(),
    deleted_at: z.string()
})

const schemaOrgResponse = z.object({
    success: z.boolean(),
    status: z.number(),
    message: z.string(),
    data: z.array(schemaOrgData)
})

export type SchemaOrgRequest = z.infer<typeof schemaOrgRequest>
export type SchemaOrgData = z.infer<typeof schemaOrgData>
export type SchemaOrgResponse = z.infer<typeof schemaOrgResponse>