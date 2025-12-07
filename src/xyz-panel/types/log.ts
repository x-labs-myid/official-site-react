import z from "zod";

const schemaLogUserDeviceData = z.object({
    activity_type: z.string(),
    activity_description: z.string().nullable(),
    app_name: z.string(),
    device_uuid: z.string(),
    device_type: z.string(),
    language: z.string(),
    manufacturer: z.string(),
    model: z.string(),
    os: z.string(),
    os_version: z.string(),
    region: z.string(),
    sdk_version: z.string(),
    app_version_name: z.string(),
    app_version_code: z.string(),
    timestamp: z.string(),
    ip_address: z.string(),
    user_agent: z.string()
})

const schemaLogUserDeviceGroupData = z.object({
    device_type: z.string(),
    total: z.number()
})

const schemaLogApiData = z.object({
    timestamp: z.string(),
    endpoint: z.string(),
    method: z.string(),
    ip: z.string(),
    userAgent: z.string(),
    body: z.object({
        activity_type: z.string(),
        activity_description: z.string().nullable(),
        app_name: z.string(),
        device_uuid: z.string(),
        device_type: z.string(),
        language: z.string(),
        manufacturer: z.string(),
        model: z.string(),
        os: z.string(),
        os_version: z.string(),
        region: z.string(),
        sdk_version: z.string(),
        app_version_name: z.string(),
        app_version_code: z.string()
    })
})

const schemaLogUserDeviceResponse = z.object({
    success: z.boolean(),
    status: z.number(),
    message: z.string(),
    data: z.array(schemaLogUserDeviceData),
    pagination: z.object({
        total: z.number(),
        per_page: z.number(),
        current_page: z.number(),
        last_page: z.number()
    }),
    total: z.number()
})

const schemaLogUserDeviceGroupResponse = z.object({
    success: z.boolean(),
    status: z.number(),
    message: z.string(),
    data: z.array(schemaLogUserDeviceGroupData)
})

const schemaLogApiResponse = z.object({
    status: z.string(),
    page: z.number(),
    perPage: z.number(),
    total: z.number(),
    totalPages: z.number(),
    data: z.array(schemaLogApiData),
})

export type SchemaLogUserDeviceResponse = z.infer<typeof schemaLogUserDeviceResponse>
export type SchemaLogUserDeviceGroupResponse = z.infer<typeof schemaLogUserDeviceGroupResponse>
export type SchemaLogUserDeviceData = z.infer<typeof schemaLogUserDeviceData>
export type SchemaLogUserDeviceGroupData = z.infer<typeof schemaLogUserDeviceGroupData>

export type SchemaLogApiResponse = z.infer<typeof schemaLogApiResponse>
export type SchemaLogApiData = z.infer<typeof schemaLogApiData>
