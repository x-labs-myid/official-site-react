import z from "zod";

export const schemaCatalogRequest = z.object({
    icon_url: z.string(),
    name: z.string(),
    package_name: z.string(),
    short_description: z.string(),
    description: z.string(),
    playstore_url: z.string(),
    appstore_url: z.string(),
    public: z.boolean(),
    is_web: z.boolean()
})

const schemaCatalogChangeStatusRequest = z.object({
    public: z.boolean()
})

const schemaCatalogData = z.object({
    guid: z.string(),
    icon_url: z.string(),
    slug: z.string(),
    name: z.string(),
    package_name: z.string(),
    short_description: z.string(),
    description: z.string(),
    playstore_url: z.string(),
    appstore_url: z.string(),
    public: z.boolean(),
    is_web: z.boolean(),
    users_guid: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    deleted_at: z.string().nullable(),
    terms: z.array(z.object({
        name: z.string(),
        public: z.string(),
    }))
})

const schemaCatalogAppsListData = z.object({
    guid: z.string(),
    name: z.string(),
})

const schemaCatalogResponse = z.object({
    success: z.boolean(),
    status: z.number(),
    message: z.string(),
    data: z.array(schemaCatalogData)
})

const schemaCatalogAppsListResponse = z.object({
    success: z.boolean(),
    status: z.number(),
    message: z.string(),
    data: z.array(schemaCatalogAppsListData)
})

export type SchemaCatalogRequest = z.infer<typeof schemaCatalogRequest>
export type SchemaCatalogChangeStatusRequest = z.infer<typeof schemaCatalogChangeStatusRequest>
export type SchemaCatalogData = z.infer<typeof schemaCatalogData>
export type SchemaCatalogResponse = z.infer<typeof schemaCatalogResponse>
export type SchemaCatalogAppsListResponse = z.infer<typeof schemaCatalogAppsListResponse>
export type SchemaCatalogAppsListData = z.infer<typeof schemaCatalogAppsListData>
